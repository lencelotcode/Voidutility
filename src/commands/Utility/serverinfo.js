import { SlashCommandBuilder, ChannelType } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Displays an executive summary of server metrics and structure"),

    async execute(interaction) {
        const deferSuccess = await InteractionHelper.safeDefer(interaction);
        if (!deferSuccess) {
            logger.warn(`ServerInfo interaction defer failed`, {
                userId: interaction.user.id,
                guildId: interaction.guildId,
                commandName: 'serverinfo'
            });
            return;
        }

        const guild = interaction.guild;
        const owner = await guild.fetchOwner().catch(() => null);

        const createdTimestamp = Math.floor(guild.createdAt.getTime() / 1000);
        
        const textChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;
        const stageChannels = guild.channels.cache.filter(c => c.type === ChannelType.GuildStageVoice).size;
        const categories = guild.channels.cache.filter(c => c.type === ChannelType.GuildCategory).size;
        
        const tierName = guild.premiumTier === 0 ? 'No Level' : `Tier ${guild.premiumTier}`;
        const boostCount = guild.premiumSubscriptionCount || 0;

        const embed = createEmbed({
            title: `🏛️ ${guild.name}`,
            description: guild.description ? `> *${guild.description}*\n` : undefined,
            color: "#7C3AED",
        })
            .setThumbnail(guild.iconURL({ size: 512 }))
            .addFields(
                {
                    name: "👑 Ownership",
                    value: owner ? `<@${owner.id}> (\`${owner.user.tag}\`)` : "Unknown",
                    inline: true,
                },
                {
                    name: "👥 Population",
                    value: `**${guild.memberCount.toLocaleString()}** members`,
                    inline: true,
                },
                {
                    name: "🚀 Boost Status",
                    value: `${tierName} (${boostCount} boosts)`,
                    inline: true,
                },
                {
                    name: "💬 Channels & Categories",
                    value: [
                        `• **Text**: \`${textChannels}\``,
                        `• **Voice**: \`${voiceChannels}\``,
                        stageChannels ? `• **Stage**: \`${stageChannels}\`` : null,
                        `• **Categories**: \`${categories}\``,
                    ].filter(Boolean).join("\n"),
                    inline: true,
                },
                {
                    name: "🎭 Server Assets",
                    value: [
                        `• **Roles**: \`${guild.roles.cache.size}\``,
                        `• **Emojis**: \`${guild.emojis.cache.size}\``,
                        `• **Stickers**: \`${guild.stickers.cache.size}\``,
                    ].join("\n"),
                    inline: true,
                },
                {
                    name: "🛡️ Security Level",
                    value: `\`${guild.verificationLevel}\``,
                    inline: true,
                },
                {
                    name: "📅 Established",
                    value: `<t:${createdTimestamp}:D> (<t:${createdTimestamp}:R>)`,
                    inline: false,
                }
            );

        if (guild.bannerURL()) {
            embed.setImage(guild.bannerURL({ size: 1024 }));
        }

        embed.setFooter({ text: `Server ID: ${guild.id} • VoidUtility` });
        embed.setTimestamp();

        await InteractionHelper.safeEditReply(interaction, { embeds: [embed] });
    },
};