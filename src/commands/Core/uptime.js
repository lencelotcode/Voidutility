import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { createEmbed, formatDuration } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Check how long VoidUtility has been continuously operating"),

    async execute(interaction) {
        try {
            await InteractionHelper.safeDefer(interaction);

            const uptimeMs = interaction.client.uptime;
            const startTime = Math.floor((Date.now() - uptimeMs) / 1000);
            const formattedTime = formatDuration(uptimeMs);

            const embed = createEmbed({ 
                title: "⏱️ VoidUtility • Operational Uptime", 
                description: "Continuous service status without disruption.",
                color: "#7C3AED"
            }).addFields(
                { name: "⚡ Active Duration", value: `\`${formattedTime}\``, inline: true },
                { name: "📅 Started At", value: `<t:${startTime}:f>`, inline: true },
                { name: "⌛ Elapsed", value: `<t:${startTime}:R>`, inline: true },
                { name: "🛡️ Service Health", value: "🟢 Fully Operational (Degraded memory or DB online)", inline: false }
            );

            embed.setFooter({ text: "⚡ VoidUtility • Dedicated Host" });
            embed.setTimestamp();

            await InteractionHelper.safeEditReply(interaction, {
                embeds: [embed],
            });
        } catch (error) {
            logger.error('Uptime command error:', error);
            try {
                return await InteractionHelper.safeEditReply(interaction, {
                    embeds: [createEmbed({ title: 'System Error', description: 'Could not compute uptime.', color: 'error' })],
                    flags: MessageFlags.Ephemeral,
                });
            } catch (replyError) {
                logger.error('Failed to send error reply:', replyError);
            }
        }
    },
};