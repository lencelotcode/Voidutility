import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

function getHealthStatus(latency, apiLatency) {
    const max = Math.max(latency, apiLatency);
    if (max < 150) return { label: '🟢 Optimal', color: '#10B981', note: 'All connections running at peak performance.' };
    if (max < 300) return { label: '🟡 Normal', color: '#F59E0B', note: 'Network is stable with slight latency.' };
    return { label: '🔴 Degraded', color: '#EF4444', note: 'High latency detected on the gateway.' };
}

export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check bot roundtrip latency and Discord API heartbeat"),

    async prefixExecute(interaction) {
        try {
            const startTime = Date.now();
            const pingingMessage = await interaction.reply({ content: '⚡ Measuring network speed...' });

            const latency = Math.max(0, Date.now() - startTime);
            const apiLatency = Math.max(0, Math.round(interaction.client.ws.ping));
            const status = getHealthStatus(latency, apiLatency);

            const embed = createEmbed({
                title: '⚡ VoidUtility • Network Diagnostic',
                description: `**Gateway Status:** ${status.label}\n> ${status.note}`,
                color: status.color,
            }).addFields(
                { name: '🛰️ Bot Roundtrip', value: `\`${latency} ms\``, inline: true },
                { name: '📡 Discord API', value: `\`${apiLatency} ms\``, inline: true },
                { name: '⏱️ Shard Uptime', value: `<t:${Math.floor((Date.now() - interaction.client.uptime) / 1000)}:R>`, inline: true }
            );

            await pingingMessage.edit({ content: null, embeds: [embed] });
        } catch (error) {
            logger.error('Ping prefix command error:', error);
            if (!interaction.replied && !interaction._replyMessage) {
                await interaction.channel.send({
                    embeds: [createEmbed({ title: 'Diagnostic Error', description: 'Could not calculate latency.', color: 'error' })],
                }).catch(() => {});
            }
        }
    },

    async execute(interaction) {
        const deferSuccess = await InteractionHelper.safeDefer(interaction);
        if (!deferSuccess) {
            logger.warn(`Ping interaction defer failed`, {
                userId: interaction.user.id,
                guildId: interaction.guildId,
                commandName: 'ping'
            });
            return;
        }

        try {
            const startTime = interaction._commandStartTime || interaction.createdTimestamp;
            const latency = Math.max(0, Date.now() - startTime);
            const apiLatency = Math.max(0, Math.round(interaction.client.ws.ping));
            const status = getHealthStatus(latency, apiLatency);

            const embed = createEmbed({
                title: '⚡ VoidUtility • Network Diagnostic',
                description: `**Gateway Status:** ${status.label}\n> ${status.note}`,
                color: status.color,
            }).addFields(
                { name: '🛰️ Bot Roundtrip', value: `\`${latency} ms\``, inline: true },
                { name: '📡 Discord API', value: `\`${apiLatency} ms\``, inline: true },
                { name: '⏱️ Shard Uptime', value: `<t:${Math.floor((Date.now() - interaction.client.uptime) / 1000)}:R>`, inline: true }
            );

            await InteractionHelper.safeEditReply(interaction, {
                embeds: [embed],
            });
        } catch (error) {
            logger.error('Ping command error:', error);
            try {
                return await InteractionHelper.safeReply(interaction, {
                    embeds: [createEmbed({ title: 'Diagnostic Error', description: 'Could not determine latency at this time.', color: 'error' })],
                    flags: MessageFlags.Ephemeral,
                });
            } catch (replyError) {
                logger.error('Failed to send error reply:', replyError);
            }
        }
    },
};