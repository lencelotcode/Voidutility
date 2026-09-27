import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from 'discord.js';
import {
    provisionTicketsStructure,
    provisionVerificationStructure,
    provisionOnboardingStructure,
    provisionAuditStructure,
    provisionFullServerStructure,
    createCustomResource
} from '../../services/provisionService.js';
import { createEmbed, successEmbed, errorEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';

export default {
    data: new SlashCommandBuilder()
        .setName('provision')
        .setDescription('Automatically provision server channels, categories, and roles according to needs.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub =>
            sub
                .setName('tickets')
                .setDescription('Auto-create ticket category, closed category, support staff role, and panel channel.')
        )
        .addSubcommand(sub =>
            sub
                .setName('verification')
                .setDescription('Auto-create security gateway category, verify channel, member role, and verification gate panel.')
        )
        .addSubcommand(sub =>
            sub
                .setName('onboarding')
                .setDescription('Auto-create information category, welcome channel, rules channel, and member auto-role.')
        )
        .addSubcommand(sub =>
            sub
                .setName('audit')
                .setDescription('Auto-create admin & audit category, moderator role, and logging channel.')
        )
        .addSubcommand(sub =>
            sub
                .setName('full')
                .setDescription('1-Click complete server architecture provisioning: tickets, verification, onboarding & logs.')
        )
        .addSubcommand(sub =>
            sub
                .setName('channel')
                .setDescription('Quickly create a text channel, voice channel, or category.')
                .addStringOption(opt =>
                    opt.setName('name')
                        .setDescription('The name of the new channel or category (e.g. •┃chat or 📂・Community)')
                        .setRequired(true)
                )
                .addStringOption(opt =>
                    opt.setName('type')
                        .setDescription('Type of channel to create')
                        .setRequired(false)
                        .addChoices(
                            { name: 'Text Channel', value: 'text' },
                            { name: 'Voice Channel', value: 'voice' },
                            { name: 'Category', value: 'category' }
                        )
                )
                .addChannelOption(opt =>
                    opt.setName('category')
                        .setDescription('Parent category for the new channel (optional)')
                        .addChannelTypes(ChannelType.GuildCategory)
                        .setRequired(false)
                )
                .addBooleanOption(opt =>
                    opt.setName('private')
                        .setDescription('Make channel visible only to staff and bot (default: false)')
                        .setRequired(false)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName('role')
                .setDescription('Quickly create a server role with customized color.')
                .addStringOption(opt =>
                    opt.setName('name')
                        .setDescription('The name of the new role (e.g. 👤・Member or 👑・VIP)')
                        .setRequired(true)
                )
                .addStringOption(opt =>
                    opt.setName('color')
                        .setDescription('Hex color code (e.g. #113E35 or #E29578)')
                        .setRequired(false)
                )
        ),
    category: 'Utility',

    async execute(interaction, config, client) {
        await interaction.deferReply({ ephemeral: true });

        const subcommand = interaction.options.getSubcommand();
        const guild = interaction.guild;

        try {
            if (subcommand === 'tickets') {
                const result = await provisionTicketsStructure(guild, { deploySetup: true });
                const embed = successEmbed(
                    'Ticket Infrastructure & Panel Deployed',
                    `Successfully built and configured ticket resources for **${guild.name}**!\n\n` +
                    `📂 **Open Category:** ${result.category}\n` +
                    `📁 **Closed Category:** ${result.closedCategory}\n` +
                    `🎫 **Support Role:** ${result.staffRole}\n` +
                    `•┃ **Panel Channel:** ${result.panelChannel} *(inside category)*\n` +
                    `📩 **Panel Status:** Interactive ticket creation panel deployed with button\n\n` +
                    `*All permissions and guild configuration settings were automatically synced.*`
                );
                return await interaction.editReply({ embeds: [embed] });
            }

            if (subcommand === 'verification') {
                const result = await provisionVerificationStructure(guild, { deploySetup: true });
                const embed = successEmbed(
                    'Verification Gateway Deployed',
                    `Successfully built and configured member verification for **${guild.name}**!\n\n` +
                    `🛡️ **Gateway Category:** ${result.category}\n` +
                    `•┃ **Verification Channel:** ${result.verifyChannel} *(inside category)*\n` +
                    `👤 **Member Role:** ${result.memberRole}\n` +
                    `✅ **Gate Status:** Interactive verification embed deployed with verify button\n\n` +
                    `*Server verification database configuration has been enabled.*`
                );
                return await interaction.editReply({ embeds: [embed] });
            }

            if (subcommand === 'onboarding') {
                const result = await provisionOnboardingStructure(guild);
                const embed = successEmbed(
                    'Onboarding Infrastructure Provisioned',
                    `Successfully configured member onboarding resources for **${guild.name}**!\n\n` +
                    `📌 **Category:** ${result.infoCategory}\n` +
                    `•┃ **Welcome Channel:** ${result.welcomeChannel}\n` +
                    `•┃ **Rules Channel:** ${result.rulesChannel}\n` +
                    `👤 **Member Auto-Role:** ${result.memberRole}\n\n` +
                    `*Welcome greeting and join auto-roles have been enabled and linked.*`
                );
                return await interaction.editReply({ embeds: [embed] });
            }

            if (subcommand === 'audit') {
                const result = await provisionAuditStructure(guild, { deploySetup: true });
                const embed = successEmbed(
                    'Audit & Security Infrastructure Provisioned',
                    `Successfully set up administrative and moderation logging for **${guild.name}**!\n\n` +
                    `🛡️ **Admin Category:** ${result.adminCategory}\n` +
                    `•┃ **Audit Logs Channel:** ${result.logsChannel} *(inside category)*\n` +
                    `🛡️ **Staff Moderator Role:** ${result.modRole}\n` +
                    `🔒 **Audit Card:** Initialized security card sent to logs channel\n\n` +
                    `*Live audit logging and staff permissions have been linked.*`
                );
                return await interaction.editReply({ embeds: [embed] });
            }

            if (subcommand === 'full') {
                const result = await provisionFullServerStructure(guild);
                const embed = successEmbed(
                    'Full Server Architecture Provisioned',
                    `Successfully built the entire server foundation for **${guild.name}** with all channels placed inside categories and setup panels deployed!\n\n` +
                    `• **Tickets:** ${result.tickets.panelChannel} (under ${result.tickets.category})\n` +
                    `• **Verification:** ${result.verification.verifyChannel} (under ${result.verification.category})\n` +
                    `• **Onboarding:** ${result.onboarding.welcomeChannel} & ${result.onboarding.rulesChannel} (under ${result.onboarding.infoCategory})\n` +
                    `• **Audit Logging:** ${result.audit.logsChannel} (under ${result.audit.adminCategory})\n\n` +
                    `*Created / verified items: ${result.createdItems.join(', ')}*`
                );
                return await interaction.editReply({ embeds: [embed] });
            }

            if (subcommand === 'channel') {
                const name = interaction.options.getString('name');
                const type = interaction.options.getString('type') || 'text';
                const category = interaction.options.getChannel('category');
                const isPrivate = interaction.options.getBoolean('private') || false;

                const resource = await createCustomResource(guild, {
                    type,
                    name,
                    parentId: category?.id,
                    isPrivate
                });

                const embed = successEmbed(
                    'Channel Resource Created',
                    `Created **${resource.name}** (${type}) ${category ? `under **${category.name}**` : ''}${isPrivate ? ' [Private]' : ''}!`
                );
                return await interaction.editReply({ embeds: [embed] });
            }

            if (subcommand === 'role') {
                const name = interaction.options.getString('name');
                const color = interaction.options.getString('color') || '#113E35';

                const role = await createCustomResource(guild, {
                    type: 'role',
                    name,
                    color
                });

                const embed = successEmbed(
                    'Role Created',
                    `Created role **@${role.name}** with color \`${color}\`!`
                );
                return await interaction.editReply({ embeds: [embed] });
            }
        } catch (error) {
            logger.error(`Error in /provision ${subcommand}:`, error);
            const err = errorEmbed(
                'Provisioning Failed',
                error.message || 'An error occurred while creating Discord resources.'
            );
            return await interaction.editReply({ embeds: [err] });
        }
    }
};
