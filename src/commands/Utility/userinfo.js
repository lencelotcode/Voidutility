import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Displays an executive profile of a server member")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The user to inspect (defaults to you)"),
        ),

    async execute(interaction) {
        const deferSuccess = await InteractionHelper.safeDefer(interaction);
        if (!deferSuccess) {
            logger.warn(`UserInfo interaction defer failed`, {
                userId: interaction.user.id,
                guildId: interaction.guildId,
                commandName: 'userinfo'
            });
            return;
        }

        const user = interaction.options.getUser("target") || interaction.user;
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        const createdTimestamp = Math.floor(user.createdAt.getTime() / 1000);
        const joinedTimestamp = member?.joinedAt ? Math.floor(member.joinedAt.getTime() / 1000) : null;

        // Roles list (excluding @everyone)
        const roles = member ? member.roles.cache.filter(r => r.id !== interaction.guild.id) : null;
        let roleDisplay = "None";
        if (roles && roles.size > 0) {
            const roleList = roles.map(r => `<@&${r.id}>`).slice(0, 15);
            const remaining = roles.size - 15;
            roleDisplay = roleList.join(" ") + (remaining > 0 ? ` *+${remaining} more*` : "");
        }

        // Key permissions
        const keyPerms = [];
        if (member) {
            if (member.permissions.has(PermissionFlagsBits.Administrator)) keyPerms.push("👑 Administrator");
            else {
                if (member.permissions.has(PermissionFlagsBits.ManageGuild)) keyPerms.push("⚙️ Manage Server");
                if (member.permissions.has(PermissionFlagsBits.BanMembers)) keyPerms.push("🔨 Ban Members");
                if (member.permissions.has(PermissionFlagsBits.KickMembers)) keyPerms.push("👢 Kick Members");
                if (member.permissions.has(PermissionFlagsBits.ManageChannels)) keyPerms.push("📁 Manage Channels");
                if (member.permissions.has(PermissionFlagsBits.ManageRoles)) keyPerms.push("🏷️ Manage Roles");
                if (member.permissions.has(PermissionFlagsBits.MentionEveryone)) keyPerms.push("📢 Mention Everyone");
            }
        }

        const embed = createEmbed({
            title: `👤 ${member?.displayName || user.username}`,
            description: member && member.nickname ? `Known on server as **${member.nickname}**` : undefined,
            color: member?.displayHexColor !== '#000000' ? member?.displayHexColor : "#7C3AED",
        })
            .setThumbnail(user.displayAvatarURL({ size: 512 }))
            .addFields(
                {
                    name: "🏷️ Identity",
                    value: [
                        `• **Mention**: <@${user.id}>`,
                        `• **Tag**: \`${user.tag}\``,
                        `• **ID**: \`${user.id}\``,
                        `• **Type**: \`${user.bot ? "Bot Application" : "Human User"}\``,
                    ].join("\n"),
                    inline: true,
                },
                {
                    name: "🛡️ Server Stance",
                    value: member ? [
                        `• **Highest Role**: ${member.roles.highest.id !== interaction.guild.id ? `<@&${member.roles.highest.id}>` : "\`@everyone\`"}`,
                        `• **Color**: \`${member.displayHexColor}\``,
                        `• **Booster**: ${member.premiumSince ? `Yes (<t:${Math.floor(member.premiumSince.getTime() / 1000)}:R>)` : "No"}`,
                    ].join("\n") : "Not a member of this server",
                    inline: true,
                },
                {
                    name: "📅 History",
                    value: [
                        `• **Account Created**: <t:${createdTimestamp}:D> (<t:${createdTimestamp}:R>)`,
                        joinedTimestamp ? `• **Joined Server**: <t:${joinedTimestamp}:D> (<t:${joinedTimestamp}:R>)` : null,
                    ].filter(Boolean).join("\n"),
                    inline: false,
                },
                {
                    name: `🎭 Roles [${roles?.size || 0}]`,
                    value: roleDisplay,
                    inline: false,
                }
            );

        if (keyPerms.length > 0) {
            embed.addFields({
                name: "🔑 Key Permissions",
                value: keyPerms.join(" • "),
                inline: false,
            });
        }

        embed.setFooter({ text: `Requested by ${interaction.user.tag} • VoidUtility` });
        embed.setTimestamp();

        await InteractionHelper.safeEditReply(interaction, { embeds: [embed] });
    },
};