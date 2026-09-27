// provisionService.js — Automated channel, category, role provisioning & interactive setup suite

import { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { updateGuildConfig, getGuildConfig, setGuildConfig } from './config/guildConfig.js';
import { getWelcomeConfig, updateWelcomeConfig } from '../utils/database.js';
import { setLogChannel } from './loggingService.js';
import { createEmbed } from '../utils/embeds.js';
import { logger } from '../utils/logger.js';

/**
 * Automatically provisions the complete ticket infrastructure & interactive panel:
 * - 🎫・Support Staff role
 * - 🎫・SUPPORT TICKETS category (private to everyone, accessible by staff & bot)
 * - 📁・CLOSED TICKETS category (archive)
 * - •┃tickets panel channel placed INSIDE the category
 * - Deploys interactive Ticket Panel embed with "Create Ticket" button
 */
export async function provisionTicketsStructure(guild, { deploySetup = true, imageUrl, thumbnailUrl } = {}) {
    if (!guild) throw new Error('Invalid guild provided');

    const me = guild.members.me;
    if (!me || !me.permissions.has(PermissionFlagsBits.ManageChannels) || !me.permissions.has(PermissionFlagsBits.ManageRoles)) {
        throw new Error('Bot lacks "Manage Channels" or "Manage Roles" permissions in this server.');
    }

    // Ensure Discord cache is completely fresh
    await guild.channels.fetch().catch(() => null);
    await guild.roles.fetch().catch(() => null);

    const created = {
        category: null,
        closedCategory: null,
        staffRole: null,
        panelChannel: null,
        panelMessage: null,
        createdItems: []
    };

    // 1. Find or create Support Staff role
    let staffRole = guild.roles.cache.find(r => 
        r.name.toLowerCase().includes('support staff') || 
        r.name.toLowerCase().includes('ticket staff') ||
        (r.name.toLowerCase().includes('staff') && !r.name.toLowerCase().includes('bot'))
    );
    if (!staffRole) {
        staffRole = await guild.roles.create({
            name: '🎫・Support Staff',
            color: '#113E35',
            mentionable: true,
            reason: 'Auto-provisioned by VoidUtility for Support Tickets'
        });
        created.createdItems.push(`Role: @${staffRole.name}`);
        logger.info(`Provisioned role ${staffRole.name} in guild ${guild.id}`);
    }
    created.staffRole = staffRole;

    // 2. Find or create Open Tickets category (private)
    let category = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildCategory && 
        (c.name.toLowerCase().includes('ticket') && !c.name.toLowerCase().includes('closed') && !c.name.toLowerCase().includes('archive'))
    );
    if (!category) {
        category = await guild.channels.create({
            name: '🎫・SUPPORT TICKETS',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: guild.id, // @everyone
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                {
                    id: staffRole.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.AttachFiles,
                        PermissionFlagsBits.ReadMessageHistory,
                        PermissionFlagsBits.ManageMessages
                    ]
                },
                {
                    id: me.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ManageChannels,
                        PermissionFlagsBits.ManageMessages
                    ]
                }
            ],
            reason: 'Auto-provisioned by VoidUtility for Support Tickets'
        });
        created.createdItems.push(`Category: ${category.name}`);
        logger.info(`Provisioned category ${category.name} in guild ${guild.id}`);
    }
    created.category = category;

    // 3. Find or create Closed Archive category (private)
    let closedCategory = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildCategory && 
        (c.name.toLowerCase().includes('closed') || c.name.toLowerCase().includes('archive'))
    );
    if (!closedCategory) {
        closedCategory = await guild.channels.create({
            name: '📁・CLOSED TICKETS',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                {
                    id: staffRole.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.ReadMessageHistory
                    ],
                    deny: [
                        PermissionFlagsBits.SendMessages
                    ]
                },
                {
                    id: me.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ManageChannels
                    ]
                }
            ],
            reason: 'Auto-provisioned by VoidUtility for Closed Tickets Archive'
        });
        created.createdItems.push(`Category: ${closedCategory.name}`);
        logger.info(`Provisioned category ${closedCategory.name} in guild ${guild.id}`);
    }
    created.closedCategory = closedCategory;

    // 4. Find or create panel creation channel INSIDE the open tickets category
    let panelChannel = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildText && 
        c.parentId === category.id &&
        (c.name === 'tickets' || c.name === 'create-ticket' || c.name === '•┃tickets')
    );

    if (!panelChannel) {
        // Adopt orphan channel if one exists elsewhere in the server
        const orphanChannel = guild.channels.cache.find(c => 
            c.type === ChannelType.GuildText && 
            (c.name === '•┃tickets' || c.name === 'tickets' || c.name === 'create-ticket')
        );

        if (orphanChannel) {
            panelChannel = orphanChannel;
            try {
                await panelChannel.setParent(category.id, { lockPermissions: false });
                created.createdItems.push(`Moved #${panelChannel.name} under ${category.name}`);
            } catch (err) {
                logger.warn(`Could not set parent for #${panelChannel.name}:`, err);
            }
        } else {
            panelChannel = await guild.channels.create({
                name: '•┃tickets',
                type: ChannelType.GuildText,
                parent: category.id,
                topic: 'Create private support tickets with staff',
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: me.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.EmbedLinks,
                            PermissionFlagsBits.AttachFiles
                        ]
                    }
                ],
                reason: 'Auto-provisioned by VoidUtility for Ticket Panel'
            });
            created.createdItems.push(`Channel: #${panelChannel.name} (inside ${category.name})`);
            logger.info(`Provisioned panel channel #${panelChannel.name} under category ${category.name} in guild ${guild.id}`);
        }
    } else {
        if (panelChannel.parentId !== category.id) {
            try {
                await panelChannel.setParent(category.id, { lockPermissions: false });
            } catch (e) {}
        }
    }
    created.panelChannel = panelChannel;

    // 5. Automatically deploy the complete Ticket Panel setup if requested (default: true)
    if (deploySetup && panelChannel) {
        try {
            const embed = createEmbed({
                title: '🎫 Support Tickets',
                description: 'Need assistance or have a question? Click the button below to open a private support ticket with server staff.',
                color: '#113E35'
            });

            if (thumbnailUrl || guild.iconURL()) {
                embed.setThumbnail(thumbnailUrl || guild.iconURL({ size: 128 }));
            }
            if (imageUrl) {
                embed.setImage(imageUrl);
            }
            embed.setFooter({ text: 'VoidUtility Ticket System • Safe & Private' });
            embed.setTimestamp();

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('📩')
            );

            const sent = await panelChannel.send({ embeds: [embed], components: [button] });
            created.panelMessage = sent;
            created.createdItems.push('Deployed: Interactive Ticket Panel');

            await updateGuildConfig(guild.client, guild.id, {
                ticketCategoryId: category.id,
                ticketClosedCategoryId: closedCategory.id,
                ticketStaffRoleId: staffRole.id,
                ticketPanelChannelId: panelChannel.id,
                ticketPanelMessageId: sent.id,
                ticketPanelMessage: embed.data.description,
                ticketButtonLabel: 'Create Ticket',
                ticketPanelImageUrl: imageUrl || null,
                ticketPanelThumbnailUrl: thumbnailUrl || null
            });
        } catch (embedErr) {
            logger.error('Failed to deploy ticket setup panel during provisioning:', embedErr);
        }
    } else {
        await updateGuildConfig(guild.client, guild.id, {
            ticketCategoryId: category.id,
            ticketClosedCategoryId: closedCategory.id,
            ticketStaffRoleId: staffRole.id,
            ticketPanelChannelId: panelChannel.id
        });
    }

    return created;
}

/**
 * Automatically provisions the complete verification gateway & setup:
 * - 🛡️・SECURITY GATEWAY category
 * - •┃verify channel placed INSIDE the category
 * - 👤・Member role to grant upon verification
 * - Deploys interactive Verification Gate embed with "Verify Membership" button
 */
export async function provisionVerificationStructure(guild, { deploySetup = true, imageUrl, thumbnailUrl } = {}) {
    if (!guild) throw new Error('Invalid guild provided');

    const me = guild.members.me;
    if (!me || !me.permissions.has(PermissionFlagsBits.ManageChannels) || !me.permissions.has(PermissionFlagsBits.ManageRoles)) {
        throw new Error('Bot lacks "Manage Channels" or "Manage Roles" permissions in this server.');
    }

    // Ensure Discord cache is completely fresh
    await guild.channels.fetch().catch(() => null);
    await guild.roles.fetch().catch(() => null);

    const created = {
        category: null,
        verifyChannel: null,
        memberRole: null,
        panelMessage: null,
        createdItems: []
    };

    // 1. Member Role to grant
    let memberRole = guild.roles.cache.find(r => 
        r.name.toLowerCase().includes('member') || 
        r.name.toLowerCase().includes('verified')
    );
    if (!memberRole) {
        memberRole = await guild.roles.create({
            name: '👤・Member',
            color: '#108A65',
            mentionable: false,
            reason: 'Auto-provisioned by VoidUtility for Member Verification'
        });
        created.createdItems.push(`Role: @${memberRole.name}`);
        logger.info(`Provisioned role ${memberRole.name} in guild ${guild.id}`);
    }
    created.memberRole = memberRole;

    // 2. Verification Category
    let category = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildCategory && 
        (c.name.toLowerCase().includes('verif') || c.name.toLowerCase().includes('gateway') || c.name.toLowerCase().includes('welcome'))
    );
    if (!category) {
        category = await guild.channels.create({
            name: '🛡️・SECURITY GATEWAY',
            type: ChannelType.GuildCategory,
            reason: 'Auto-provisioned by VoidUtility for Verification Gateway'
        });
        created.createdItems.push(`Category: ${category.name}`);
        logger.info(`Provisioned category ${category.name} in guild ${guild.id}`);
    }
    created.category = category;

    // 3. Verification Channel inside Category
    let verifyChannel = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildText && 
        c.parentId === category.id &&
        (c.name === 'verify' || c.name === 'verification' || c.name === '•┃verify' || c.name === '•┃setup')
    );

    if (!verifyChannel) {
        const orphanChannel = guild.channels.cache.find(c =>
            c.type === ChannelType.GuildText &&
            (c.name === '•┃verify' || c.name === 'verify' || c.name === 'verification')
        );

        if (orphanChannel) {
            verifyChannel = orphanChannel;
            try {
                await verifyChannel.setParent(category.id, { lockPermissions: false });
                created.createdItems.push(`Moved #${verifyChannel.name} under ${category.name}`);
            } catch (e) {}
        } else {
            verifyChannel = await guild.channels.create({
                name: '•┃verify',
                type: ChannelType.GuildText,
                parent: category.id,
                topic: 'Click the button below to verify your membership and gain full access.',
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: me.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.EmbedLinks,
                            PermissionFlagsBits.ManageRoles,
                            PermissionFlagsBits.ManageChannels
                        ]
                    }
                ],
                reason: 'Auto-provisioned by VoidUtility for Verification Gate'
            });
            created.createdItems.push(`Channel: #${verifyChannel.name} (inside ${category.name})`);
        }
    } else {
        if (verifyChannel.parentId !== category.id) {
            try {
                await verifyChannel.setParent(category.id, { lockPermissions: false });
            } catch (e) {}
        }
    }
    created.verifyChannel = verifyChannel;

    // 4. Automatically deploy Verification Gate Setup
    if (deploySetup && verifyChannel) {
        try {
            const embed = createEmbed({
                title: '🛡️ Server Verification Gate',
                description: `Welcome to **${guild.name}**! Click the green button below to verify your account, unlock all server channels, and start chatting.`,
                color: '#108A65'
            });

            if (thumbnailUrl || guild.iconURL()) {
                embed.setThumbnail(thumbnailUrl || guild.iconURL({ size: 128 }));
            }
            if (imageUrl) {
                embed.setImage(imageUrl);
            }
            embed.setFooter({ text: 'VoidUtility Verification Gate • Anti-Raid Protected' });
            embed.setTimestamp();

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('verify_user')
                    .setLabel('Verify Membership')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('✅')
            );

            const sent = await verifyChannel.send({ embeds: [embed], components: [button] });
            created.panelMessage = sent;
            created.createdItems.push('Deployed: Interactive Verification Gate');

            const currentConfig = (await getGuildConfig(guild.client, guild.id)) || {};
            currentConfig.verification = {
                enabled: true,
                channelId: verifyChannel.id,
                roleId: memberRole.id,
                messageId: sent.id,
                message: embed.data.description,
                buttonText: 'Verify Membership',
                imageUrl: imageUrl || undefined,
                thumbnailUrl: thumbnailUrl || undefined
            };
            await setGuildConfig(guild.client, guild.id, currentConfig);
        } catch (err) {
            logger.error('Failed to deploy verification panel during provisioning:', err);
        }
    }

    return created;
}

/**
 * Automatically provisions onboarding, community essentials, and rules poster:
 * - 👤・Member auto-role
 * - 📌・INFORMATION category
 * - •┃welcome channel placed INSIDE the category + Welcome greeting card
 * - •┃rules channel placed INSIDE the category + Official Server Rules poster
 */
export async function provisionOnboardingStructure(guild, { deploySetup = true } = {}) {
    if (!guild) throw new Error('Invalid guild provided');

    const me = guild.members.me;
    if (!me || !me.permissions.has(PermissionFlagsBits.ManageChannels) || !me.permissions.has(PermissionFlagsBits.ManageRoles)) {
        throw new Error('Bot lacks "Manage Channels" or "Manage Roles" permissions in this server.');
    }

    // Ensure Discord cache is completely fresh
    await guild.channels.fetch().catch(() => null);
    await guild.roles.fetch().catch(() => null);

    const created = {
        memberRole: null,
        infoCategory: null,
        welcomeChannel: null,
        rulesChannel: null,
        createdItems: []
    };

    // 1. Member Auto-Role
    let memberRole = guild.roles.cache.find(r => 
        r.name.toLowerCase().includes('member') || 
        r.name.toLowerCase() === 'community'
    );
    if (!memberRole) {
        memberRole = await guild.roles.create({
            name: '👤・Member',
            color: '#F4EAE1',
            mentionable: false,
            reason: 'Auto-provisioned by VoidUtility for Auto-Roles'
        });
        created.createdItems.push(`Role: @${memberRole.name}`);
        logger.info(`Provisioned role ${memberRole.name} in guild ${guild.id}`);
    }
    created.memberRole = memberRole;

    // 2. Information Category
    let infoCategory = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildCategory && 
        (c.name.toLowerCase().includes('information') || c.name.toLowerCase().includes('info') || c.name.toLowerCase().includes('welcome'))
    );
    if (!infoCategory) {
        infoCategory = await guild.channels.create({
            name: '📌・INFORMATION',
            type: ChannelType.GuildCategory,
            reason: 'Auto-provisioned by VoidUtility'
        });
        created.createdItems.push(`Category: ${infoCategory.name}`);
        logger.info(`Provisioned category ${infoCategory.name} in guild ${guild.id}`);
    }
    created.infoCategory = infoCategory;

    // 3. Welcome channel inside category
    let welcomeChannel = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildText && 
        c.parentId === infoCategory.id &&
        (c.name === 'welcome' || c.name === '•┃welcome')
    );
    if (!welcomeChannel) {
        const orphanChannel = guild.channels.cache.find(c =>
            c.type === ChannelType.GuildText &&
            (c.name === '•┃welcome' || c.name === 'welcome')
        );

        if (orphanChannel) {
            welcomeChannel = orphanChannel;
            try {
                await welcomeChannel.setParent(infoCategory.id, { lockPermissions: false });
                created.createdItems.push(`Moved #${welcomeChannel.name} under ${infoCategory.name}`);
            } catch (e) {}
        } else {
            welcomeChannel = await guild.channels.create({
                name: '•┃welcome',
                type: ChannelType.GuildText,
                parent: infoCategory.id,
                topic: 'Welcome arrivals to our server',
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: me.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks]
                    }
                ],
                reason: 'Auto-provisioned by VoidUtility'
            });
            created.createdItems.push(`Channel: #${welcomeChannel.name} (inside ${infoCategory.name})`);
        }
    } else {
        if (welcomeChannel.parentId !== infoCategory.id) {
            try {
                await welcomeChannel.setParent(infoCategory.id, { lockPermissions: false });
            } catch (e) {}
        }
    }
    created.welcomeChannel = welcomeChannel;

    // 4. Rules channel inside category
    let rulesChannel = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildText && 
        c.parentId === infoCategory.id &&
        (c.name === 'rules' || c.name === '•┃rules')
    );
    if (!rulesChannel) {
        const orphanChannel = guild.channels.cache.find(c =>
            c.type === ChannelType.GuildText &&
            (c.name === '•┃rules' || c.name === 'rules')
        );

        if (orphanChannel) {
            rulesChannel = orphanChannel;
            try {
                await rulesChannel.setParent(infoCategory.id, { lockPermissions: false });
                created.createdItems.push(`Moved #${rulesChannel.name} under ${infoCategory.name}`);
            } catch (e) {}
        } else {
            rulesChannel = await guild.channels.create({
                name: '•┃rules',
                type: ChannelType.GuildText,
                parent: infoCategory.id,
                topic: 'Official server code of conduct',
                permissionOverwrites: [
                    {
                        id: guild.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: me.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks]
                    }
                ],
                reason: 'Auto-provisioned by VoidUtility'
            });
            created.createdItems.push(`Channel: #${rulesChannel.name} (inside ${infoCategory.name})`);
        }
    } else {
        if (rulesChannel.parentId !== infoCategory.id) {
            try {
                await rulesChannel.setParent(infoCategory.id, { lockPermissions: false });
            } catch (e) {}
        }
    }
    created.rulesChannel = rulesChannel;

    // 5. Deploy Setup (Rules Poster & Welcome Card)
    if (deploySetup) {
        try {
            // Post Official Rules Poster to #•┃rules
            const rulesEmbed = createEmbed({
                title: `📜 ${guild.name} • Official Community Guidelines`,
                description: 
`Welcome to **${guild.name}**! To ensure a safe, enjoyable, and creative space, please review and abide by our core rules:

### 1. Respect & Conduct
- Treat all members with courtesy and dignity. No hate speech, harassment, sexism, or discrimination.
- Follow instructions from the server moderation team at all times.

### 2. No Unauthorized Promotion or DM Spam
- Unsolicited advertising, server invite links, and commercial DMs are strictly prohibited.

### 3. Content & Safety Policies
- Keep all shared files, images, and discussions strictly SFW. Absolutely no malicious links or piracy.

### 4. Need Assistance?
- If you have questions or encounter an issue, open a private support ticket with staff.`,
                color: '#113E35'
            });
            if (guild.iconURL()) rulesEmbed.setThumbnail(guild.iconURL({ size: 128 }));
            rulesEmbed.setFooter({ text: `${guild.name} Server Administration • Rules & Safety` });
            rulesEmbed.setTimestamp();
            await rulesChannel.send({ embeds: [rulesEmbed] });
            created.createdItems.push('Deployed: Official Rules Poster');

            // Post Welcome Announcement to #•┃welcome
            const welcomeEmbed = createEmbed({
                title: `🎉 Welcome to ${guild.name}!`,
                description: `We're thrilled to have you here! Check out <#${rulesChannel.id}> to get familiar with our server, and introduce yourself to the community.`,
                color: '#108A65'
            });
            if (guild.iconURL()) welcomeEmbed.setThumbnail(guild.iconURL({ size: 128 }));
            welcomeEmbed.setFooter({ text: `VoidUtility Welcome Gateway • Serving ${guild.memberCount} members` });
            welcomeEmbed.setTimestamp();
            await welcomeChannel.send({ embeds: [welcomeEmbed] });
            created.createdItems.push('Deployed: Welcome Greeting Card');
        } catch (err) {
            logger.error('Failed to deploy onboarding embeds during provisioning:', err);
        }
    }

    // Sync guild config and welcome config
    await updateGuildConfig(guild.client, guild.id, {
        autoRole: memberRole.id
    });

    try {
        const wConfig = (await getWelcomeConfig(guild.client, guild.id)) || {};
        wConfig.enabled = true;
        wConfig.channelId = welcomeChannel.id;
        wConfig.roleIds = [memberRole.id];
        await updateWelcomeConfig(guild.client, guild.id, wConfig);
    } catch (dbErr) {
        logger.warn('Could not sync welcome config to DB:', dbErr);
    }

    return created;
}

/**
 * Automatically provisions security, staff, and audit channels:
 * - 🛡️・Moderator role
 * - 🛡️・ADMIN & AUDIT category placed as private
 * - •┃logs channel placed INSIDE the category
 * - Deploys Audit Logging Initialized card
 */
export async function provisionAuditStructure(guild, { deploySetup = true } = {}) {
    if (!guild) throw new Error('Invalid guild provided');

    const me = guild.members.me;
    if (!me || !me.permissions.has(PermissionFlagsBits.ManageChannels) || !me.permissions.has(PermissionFlagsBits.ManageRoles)) {
        throw new Error('Bot lacks "Manage Channels" or "Manage Roles" permissions in this server.');
    }

    // Ensure Discord cache is completely fresh
    await guild.channels.fetch().catch(() => null);
    await guild.roles.fetch().catch(() => null);

    const created = {
        modRole: null,
        adminCategory: null,
        logsChannel: null,
        createdItems: []
    };

    // 1. Moderator Role
    let modRole = guild.roles.cache.find(r => 
        r.name.toLowerCase().includes('moderator') || 
        r.name.toLowerCase() === 'mod'
    );
    if (!modRole) {
        modRole = await guild.roles.create({
            name: '🛡️・Moderator',
            color: '#E29578',
            mentionable: true,
            reason: 'Auto-provisioned by VoidUtility for Moderation'
        });
        created.createdItems.push(`Role: @${modRole.name}`);
    }
    created.modRole = modRole;

    // 2. Admin & Audit Category (private)
    let adminCategory = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildCategory && 
        (c.name.toLowerCase().includes('admin') || c.name.toLowerCase().includes('audit'))
    );
    if (!adminCategory) {
        adminCategory = await guild.channels.create({
            name: '🛡️・ADMIN & AUDIT',
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                {
                    id: modRole.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                },
                {
                    id: me.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ManageChannels
                    ]
                }
            ],
            reason: 'Auto-provisioned by VoidUtility'
        });
        created.createdItems.push(`Category: ${adminCategory.name}`);
    }
    created.adminCategory = adminCategory;

    // 3. Logs Channel inside Category
    let logsChannel = guild.channels.cache.find(c => 
        c.type === ChannelType.GuildText && 
        c.parentId === adminCategory.id &&
        (c.name === 'logs' || c.name === '•┃logs')
    );
    if (!logsChannel) {
        const orphanChannel = guild.channels.cache.find(c =>
            c.type === ChannelType.GuildText &&
            (c.name === '•┃logs' || c.name === 'logs')
        );

        if (orphanChannel) {
            logsChannel = orphanChannel;
            try {
                await logsChannel.setParent(adminCategory.id, { lockPermissions: false });
                created.createdItems.push(`Moved #${logsChannel.name} under ${adminCategory.name}`);
            } catch (e) {}
        } else {
            logsChannel = await guild.channels.create({
                name: '•┃logs',
                type: ChannelType.GuildText,
                parent: adminCategory.id,
                topic: 'Real-time security and administrative logs',
                permissionOverwrites: [
                    {
                        id: guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: modRole.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                        deny: [PermissionFlagsBits.SendMessages]
                    },
                    {
                        id: me.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks]
                    }
                ],
                reason: 'Auto-provisioned by VoidUtility for Audit Logging'
            });
            created.createdItems.push(`Channel: #${logsChannel.name} (inside ${adminCategory.name})`);
        }
    } else {
        if (logsChannel.parentId !== adminCategory.id) {
            try {
                await logsChannel.setParent(adminCategory.id, { lockPermissions: false });
            } catch (e) {}
        }
    }
    created.logsChannel = logsChannel;

    // 4. Deploy Setup
    if (deploySetup) {
        try {
            const embed = createEmbed({
                title: '🔒 Administrative Security & Audit Logging Active',
                description: `Audit logging has been initialized for **${guild.name}**. Moderation actions, member events, and server modifications will be recorded here in real-time.`,
                color: '#113E35'
            });
            embed.setFooter({ text: 'VoidUtility Audit Service • Active Security' });
            embed.setTimestamp();
            await logsChannel.send({ embeds: [embed] });
            created.createdItems.push('Deployed: Audit Logging Setup Card');
        } catch (err) {
            logger.error('Failed to deploy audit card during provisioning:', err);
        }
    }

    // Sync guild config and set audit log destination
    await updateGuildConfig(guild.client, guild.id, {
        moderatorRole: modRole.id,
        modRoleId: modRole.id,
        auditLogChannel: logsChannel.id
    });
    try {
        await setLogChannel(guild.client, guild.id, 'audit', logsChannel.id);
    } catch (e) {}

    return created;
}

/**
 * 1-Click Provisioning of the entire server structure with all panels and setups
 */
export async function provisionFullServerStructure(guild) {
    if (!guild) throw new Error('Invalid guild provided');

    const tickets = await provisionTicketsStructure(guild, { deploySetup: true });
    const verification = await provisionVerificationStructure(guild, { deploySetup: true });
    const onboarding = await provisionOnboardingStructure(guild, { deploySetup: true });
    const audit = await provisionAuditStructure(guild, { deploySetup: true });

    const allCreated = [
        ...tickets.createdItems,
        ...verification.createdItems,
        ...onboarding.createdItems,
        ...audit.createdItems
    ];

    return {
        tickets,
        verification,
        onboarding,
        audit,
        createdItems: allCreated
    };
}

/**
 * Creates custom channels, categories, or roles on-demand
 */
export async function createCustomResource(guild, { type, name, parentId, color, isPrivate }) {
    if (!guild) throw new Error('Invalid guild provided');
    if (!name || !name.trim()) throw new Error('Resource name is required');

    const me = guild.members.me;
    const cleanName = name.trim();

    if (type === 'role') {
        if (!me.permissions.has(PermissionFlagsBits.ManageRoles)) {
            throw new Error('Bot lacks Manage Roles permission.');
        }
        const role = await guild.roles.create({
            name: cleanName,
            color: color || '#113E35',
            reason: 'Created via VoidUtility Dashboard'
        });
        return { type: 'role', id: role.id, name: role.name, color: role.hexColor };
    }

    if (!me.permissions.has(PermissionFlagsBits.ManageChannels)) {
        throw new Error('Bot lacks Manage Channels permission.');
    }

    const overwrites = isPrivate ? [
        {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel]
        },
        {
            id: me.id,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels]
        }
    ] : [];

    if (type === 'category') {
        const category = await guild.channels.create({
            name: cleanName,
            type: ChannelType.GuildCategory,
            permissionOverwrites: overwrites,
            reason: 'Created via VoidUtility Dashboard'
        });
        return { type: 'category', id: category.id, name: category.name };
    }

    if (type === 'voice') {
        const voice = await guild.channels.create({
            name: cleanName,
            type: ChannelType.GuildVoice,
            parent: parentId || null,
            permissionOverwrites: overwrites,
            reason: 'Created via VoidUtility Dashboard'
        });
        return { type: 'voice', id: voice.id, name: voice.name };
    }

    // Default: text channel
    const textChannel = await guild.channels.create({
        name: cleanName,
        type: ChannelType.GuildText,
        parent: parentId || null,
        permissionOverwrites: overwrites,
        reason: 'Created via VoidUtility Dashboard'
    });
    return { type: 'text', id: textChannel.id, name: textChannel.name };
}
