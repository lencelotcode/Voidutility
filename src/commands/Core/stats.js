import { SlashCommandBuilder, version, MessageFlags } from 'discord.js';
import { createEmbed, formatProgressBar } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

export default {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("View real-time bot performance and server metrics"),

    async execute(interaction) {
        try {
            await InteractionHelper.safeDefer(interaction);

            const guild = interaction.guild;
            const client = interaction.client;
            
            const totalGuilds = client.guilds.cache.size;
            const totalMembers = client.guilds.cache.reduce(
                (acc, g) => acc + (g.memberCount || 0),
                0,
            );
            const totalChannels = client.channels.cache.size;

            const memUsage = process.memoryUsage();
            const heapUsedMB = (memUsage.heapUsed / 1024 / 1024).toFixed(1);
            const heapTotalMB = (memUsage.heapTotal / 1024 / 1024).toFixed(1);
            const rssMB = (memUsage.rss / 1024 / 1024).toFixed(1);
            const memoryBar = formatProgressBar(memUsage.heapUsed, memUsage.heapTotal, 12);

            const startTimeSec = Math.floor((Date.now() - client.uptime) / 1000);

            const embed = createEmbed({
                title: "🔮 VoidUtility • Private System Monitor",
                description: `Running dedicated instance for **${guild?.name || 'Local Server'}**.`,
                color: "#7C3AED",
                thumbnail: client.user?.displayAvatarURL?.({ size: 256 }),
            }).addFields(
                {
                    name: "📊 Host Runtime",
                    value: [
                        `• **Platform**: \`${process.platform} (${process.arch})\``,
                        `• **Node.js**: \`${process.version}\``,
                        `• **Discord.js**: \`v${version}\``,
                    ].join("\n"),
                    inline: true,
                },
                {
                    name: "💾 Memory Allocation",
                    value: [
                        `\`${heapUsedMB} MB\` / \`${heapTotalMB} MB\` heap`,
                        `\`${rssMB} MB\` RSS footprint`,
                        `\`${memoryBar}\``,
                    ].join("\n"),
                    inline: true,
                },
                {
                    name: "🌐 Server Scope",
                    value: [
                        `• **Active Servers**: \`${totalGuilds}\``,
                        `• **Cached Members**: \`${totalMembers.toLocaleString()}\``,
                        `• **Total Channels**: \`${totalChannels}\``,
                    ].join("\n"),
                    inline: false,
                },
                {
                    name: "⏱️ Online Since",
                    value: `<t:${startTimeSec}:F> (<t:${startTimeSec}:R>)`,
                    inline: false,
                }
            );

            embed.setFooter({ text: "⚡ VoidUtility • High Performance Engine" });
            embed.setTimestamp();

            await InteractionHelper.safeEditReply(interaction, { embeds: [embed] });
        } catch (error) {
            logger.error('Stats command error:', error);
            return InteractionHelper.safeEditReply(interaction, {
                embeds: [createEmbed({ title: 'System Error', description: 'Could not fetch system metrics.', color: 'error' })],
                flags: MessageFlags.Ephemeral,
            });
        }
    },
};