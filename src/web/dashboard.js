import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { ActivityType, ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import Transport from 'winston-transport';
import { logger } from '../utils/logger.js';
import { createEmbed } from '../utils/embeds.js';
import {
    buildCommandRegistry,
    getCommandAccessSnapshot,
    enableCommand,
    disableCommand,
    enableCategory,
    disableCategory,
    resetCategoryCommands,
} from '../services/commandAccessService.js';
import { getGuildConfig, updateGuildConfig, setGuildConfig } from '../services/config/guildConfig.js';
import { getLeaderboard, getLevelingConfig, setUserLevel } from '../services/leveling/leveling.js';
import { addXp } from '../services/leveling/xpSystem.js';
import { getWelcomeConfig, updateWelcomeConfig, getEconomyPrefix } from '../utils/database.js';
import { setLogChannel } from '../services/loggingService.js';
import { getEconomyData, updateBalance } from '../utils/economy.js';
import {
    provisionTicketsStructure,
    provisionVerificationStructure,
    provisionOnboardingStructure,
    provisionAuditStructure,
    provisionFullServerStructure,
    createCustomResource
} from '../services/provisionService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory real-time log buffer for the dashboard
export const recentDashboardLogs = [];
const MAX_LOG_HISTORY = 250;

class DashboardLogTransport extends Transport {
    log(info, callback) {
        setImmediate(() => {
            recentDashboardLogs.unshift({
                id: crypto.randomUUID(),
                timestamp: info.timestamp || new Date().toLocaleTimeString(),
                level: (info.level || 'info').toLowerCase(),
                message: typeof info.message === 'object' ? JSON.stringify(info.message) : String(info.message || ''),
                service: info.service || 'void-utility'
            });
            if (recentDashboardLogs.length > MAX_LOG_HISTORY) {
                recentDashboardLogs.pop();
            }
        });
        callback();
    }
}

try {
    logger.add(new DashboardLogTransport({ level: 'debug' }));
} catch (e) {
    // If transport fails, fallback gracefully
}

// Active session tokens
const validSessionTokens = new Set();

function getOwnerPassword() {
    return process.env.DASHBOARD_PASSWORD || 'voidowner';
}

function verifyAuthToken(req) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7).trim();
        if (validSessionTokens.has(token)) return true;
    }
    const directKey = req.headers['x-dashboard-key'];
    if (directKey && directKey === getOwnerPassword()) {
        return true;
    }
    return false;
}

export function setupDashboard(app, client) {
    const publicPath = path.join(__dirname, 'public');

    // Body parser middleware for dashboard API
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Serve static dashboard web assets
    app.use(express.static(publicPath));

    // Auth Middleware for protected /api routes
    const requireAuth = (req, res, next) => {
        if (verifyAuthToken(req)) {
            return next();
        }
        return res.status(401).json({ error: 'Unauthorized: Owner authentication required' });
    };

    // -------------------------------------------------------------
    // Authentication Endpoints
    // -------------------------------------------------------------
    app.post('/api/auth/login', (req, res) => {
        const { password } = req.body || {};
        const expected = getOwnerPassword();

        if (password === expected) {
            const token = crypto.randomBytes(32).toString('hex');
            validSessionTokens.add(token);
            // Auto expire after 24h
            setTimeout(() => validSessionTokens.delete(token), 24 * 60 * 60 * 1000);
            return res.json({ success: true, token });
        }

        return res.status(403).json({ success: false, error: 'Invalid owner password' });
    });

    app.get('/api/auth/verify', (req, res) => {
        const isValid = verifyAuthToken(req);
        return res.json({ authenticated: isValid });
    });

    app.post('/api/auth/logout', (req, res) => {
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7).trim();
            validSessionTokens.delete(token);
        }
        return res.json({ success: true });
    });

    // -------------------------------------------------------------
    // Overview & Real-Time Diagnostics
    // -------------------------------------------------------------
    app.get('/api/overview', requireAuth, (req, res) => {
        const mem = process.memoryUsage();
        const heapUsedMB = (mem.heapUsed / 1024 / 1024).toFixed(1);
        const heapTotalMB = (mem.heapTotal / 1024 / 1024).toFixed(1);
        const rssMB = (mem.rss / 1024 / 1024).toFixed(1);
        const memoryPercent = Math.min(100, Math.round((mem.heapUsed / mem.heapTotal) * 100));

        const dbStatus = client.db?.getStatus?.() || { connectionType: 'memory', isDegraded: true };

        const totalGuilds = client.guilds.cache.size;
        const totalMembers = client.guilds.cache.reduce((acc, g) => acc + (g.memberCount || 0), 0);
        const totalChannels = client.channels.cache.size;

        const currentPresence = client.user?.presence || {};
        const firstActivity = currentPresence.activities?.[0];

        res.json({
            bot: {
                id: client.user?.id,
                username: client.user?.username || 'VoidUtility',
                tag: client.user?.tag || 'VoidUtility#0000',
                avatar: client.user?.displayAvatarURL({ size: 256 }) || null,
                uptime: client.uptime || 0,
                status: currentPresence.status || 'online',
                activityName: firstActivity?.name || firstActivity?.state || 'Dedicated Utility',
                activityType: firstActivity?.type ?? 0,
            },
            system: {
                heapUsedMB: Number(heapUsedMB),
                heapTotalMB: Number(heapTotalMB),
                rssMB: Number(rssMB),
                memoryPercent,
                nodeVersion: process.version,
                platform: `${process.platform} (${process.arch})`,
                ping: Math.max(0, Math.round(client.ws?.ping ?? 0)),
            },
            database: {
                type: dbStatus.connectionType || 'memory',
                isDegraded: Boolean(dbStatus.isDegraded),
                message: dbStatus.isDegraded ? 'In-Memory Fallback' : 'PostgreSQL Online',
            },
            stats: {
                totalGuilds,
                totalMembers,
                totalChannels,
                totalCommands: client.commands?.size || 0,
            }
        });
    });

    // -------------------------------------------------------------
    // Presence / Bot Identity Editor
    // -------------------------------------------------------------
    app.post('/api/bot/presence', requireAuth, (req, res) => {
        try {
            const { status, activityType, activityName } = req.body;
            
            const validStatuses = ['online', 'idle', 'dnd', 'invisible'];
            const targetStatus = validStatuses.includes(status) ? status : 'online';

            const typeMap = {
                'PLAYING': ActivityType.Playing,
                'STREAMING': ActivityType.Streaming,
                'LISTENING': ActivityType.Listening,
                'WATCHING': ActivityType.Watching,
                'CUSTOM': ActivityType.Custom,
                'COMPETING': ActivityType.Competing,
            };

            const targetType = typeMap[activityType] ?? ActivityType.Custom;

            const activityConfig = {
                name: activityName || 'VoidUtility',
                type: targetType,
            };

            if (targetType === ActivityType.Custom) {
                activityConfig.state = activityName || 'VoidUtility';
            }

            client.user.setPresence({
                status: targetStatus,
                activities: [activityConfig],
            });

            logger.info(`Owner updated bot presence via dashboard: [${targetStatus}] "${activityName}"`);
            return res.json({ success: true, message: 'Presence updated successfully' });
        } catch (error) {
            logger.error('Failed to update bot presence from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Connected Guilds List
    // -------------------------------------------------------------
    app.get('/api/guilds', requireAuth, (req, res) => {
        const guilds = client.guilds.cache.map(g => {
            const textChannels = g.channels.cache
                .filter(c => c.type === ChannelType.GuildText)
                .map(c => ({ id: c.id, name: c.name, parentId: c.parentId }))
                .sort((a, b) => a.name.localeCompare(b.name));

            const roles = g.roles.cache
                .filter(r => r.id !== g.id)
                .map(r => ({ id: r.id, name: r.name, color: r.hexColor }))
                .sort((a, b) => a.name.localeCompare(b.name));

            const categories = g.channels.cache
                .filter(c => c.type === ChannelType.GuildCategory)
                .map(c => ({ id: c.id, name: c.name }))
                .sort((a, b) => a.name.localeCompare(b.name));

            return {
                id: g.id,
                name: g.name,
                icon: g.iconURL({ size: 128 }),
                memberCount: g.memberCount,
                textChannels,
                categories,
                roles,
            };
        });

        res.json({ guilds });
    });

    // -------------------------------------------------------------
    // Guild Configuration (Get & Save)
    // -------------------------------------------------------------
    app.get('/api/guild/:guildId/config', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                return res.status(404).json({ error: 'Server not found' });
            }

            const config = (await getGuildConfig(client, guildId)) || {};
            const welcome = (await getWelcomeConfig(client, guildId)) || {};
            return res.json({ config, welcome });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/config', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                return res.status(404).json({ error: 'Server not found' });
            }

            const body = req.body || {};

            // 1. Core Guild Config
            const guildUpdates = {};
            if (body.prefix !== undefined) guildUpdates.prefix = body.prefix;
            if (body.autoRole !== undefined) guildUpdates.autoRole = body.autoRole || null;
            if (body.modRole !== undefined) guildUpdates.modRole = body.modRole || null;
            if (body.welcomeChannel !== undefined) guildUpdates.welcomeChannel = body.welcomeChannel || null;
            if (body.welcomeMessage !== undefined) guildUpdates.welcomeMessage = body.welcomeMessage || null;

            // Audit log channel
            if (body.auditLogChannel !== undefined) {
                await setLogChannel(client, guildId, 'audit', body.auditLogChannel || null);
            }

            // Verification settings
            if (body.verification !== undefined) {
                guildUpdates.verification = body.verification;
            }

            const updatedGuildConfig = await updateGuildConfig(client, guildId, guildUpdates);

            // 2. Welcome & Goodbye System
            const welcomeUpdates = {};
            if (body.welcomeEnabled !== undefined) welcomeUpdates.enabled = Boolean(body.welcomeEnabled);
            if (body.welcomeChannel !== undefined) welcomeUpdates.channelId = body.welcomeChannel || null;
            if (body.welcomeMessage !== undefined) welcomeUpdates.welcomeMessage = body.welcomeMessage;
            if (body.welcomePing !== undefined) welcomeUpdates.welcomePing = Boolean(body.welcomePing);
            if (body.welcomeImage !== undefined) welcomeUpdates.welcomeImage = body.welcomeImage || undefined;
            if (body.welcomeThumbnail !== undefined) welcomeUpdates.welcomeThumbnail = body.welcomeThumbnail || undefined;
            if (body.welcomeColor !== undefined || body.welcomeTitle !== undefined) {
                welcomeUpdates.welcomeEmbed = {
                    title: body.welcomeTitle || '🎉 Welcome!',
                    color: body.welcomeColor || '#113E35',
                    description: body.welcomeMessage || 'Welcome {user} to {server}!',
                    footer: `Welcome to ${guild.name}!`
                };
            }
            if (body.autoRole !== undefined) {
                welcomeUpdates.roleIds = body.autoRole ? [body.autoRole] : [];
            }
            if (body.autoRoleDelay !== undefined) {
                welcomeUpdates.autoRoleDelay = Number(body.autoRoleDelay) || 0;
            }

            // Goodbye settings
            if (body.goodbyeEnabled !== undefined) welcomeUpdates.goodbyeEnabled = Boolean(body.goodbyeEnabled);
            if (body.goodbyeChannel !== undefined) welcomeUpdates.goodbyeChannelId = body.goodbyeChannel || null;
            if (body.goodbyeMessage !== undefined) {
                welcomeUpdates.leaveMessage = body.goodbyeMessage;
                welcomeUpdates.leaveEmbed = {
                    title: 'Goodbye {user.tag}',
                    description: body.goodbyeMessage,
                    color: '#E11D48',
                    footer: `Goodbye from ${guild.name}!`,
                    image: body.goodbyeImage || undefined,
                    thumbnail: body.goodbyeThumbnail || undefined
                };
            }

            const updatedWelcomeConfig = await updateWelcomeConfig(client, guildId, welcomeUpdates);

            logger.info(`Owner updated server onboarding & setup for ${guild.name} via dashboard`);
            return res.json({
                success: true,
                message: 'Server configuration saved successfully!',
                config: updatedGuildConfig,
                welcome: updatedWelcomeConfig
            });
        } catch (error) {
            logger.error('Failed to save guild config from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/welcome/test', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Server not found' });

            const welcomeConfig = (await getWelcomeConfig(client, guildId)) || {};
            const targetChannelId = req.body.channelId || welcomeConfig.channelId;
            if (!targetChannelId) {
                return res.status(400).json({ error: 'Please select or configure a welcome channel first.' });
            }

            const channel = guild.channels.cache.get(targetChannelId);
            if (!channel) return res.status(404).json({ error: 'Target welcome channel not found in server.' });

            const title = req.body.title || welcomeConfig.welcomeEmbed?.title || '🎉 Welcome to the Server!';
            const desc = req.body.message || welcomeConfig.welcomeMessage || 'Welcome {user} to {server}! You are member #{count}.';
            const color = req.body.color || welcomeConfig.welcomeEmbed?.color || '#113E35';
            const imageUrl = req.body.image || welcomeConfig.welcomeImage;
            const thumbnailUrl = req.body.thumbnail || welcomeConfig.welcomeThumbnail;

            const formattedDesc = desc
                .replace(/{user}/g, `<@${client.user.id}>`)
                .replace(/{username}/g, client.user.username)
                .replace(/{server}/g, guild.name)
                .replace(/{count}/g, String(guild.memberCount))
                .replace(/{memberCount}/g, String(guild.memberCount));

            const embed = createEmbed({
                title,
                description: formattedDesc,
                color,
            });

            if (thumbnailUrl && String(thumbnailUrl).trim()) {
                embed.setThumbnail(String(thumbnailUrl).trim());
            } else {
                embed.setThumbnail(client.user.displayAvatarURL());
            }

            embed.setFooter({ text: `Test Preview • Welcome to ${guild.name}!` });
            embed.setTimestamp();
            if (imageUrl && String(imageUrl).trim()) embed.setImage(String(imageUrl).trim());

            await channel.send({ embeds: [embed] });
            logger.info(`Owner dispatched test welcome card to #${channel.name} via dashboard (image: ${Boolean(imageUrl)}, thumb: ${Boolean(thumbnailUrl)})`);
            return res.json({ success: true, message: `Test welcome message dispatched to #${channel.name}!` });
        } catch (error) {
            logger.error('Failed to send test welcome message from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Command Management Endpoints
    // -------------------------------------------------------------
    app.get('/api/commands', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.query;
            let targetGuildId = guildId;

            if (!targetGuildId && client.guilds.cache.size > 0) {
                targetGuildId = client.guilds.cache.first().id;
            }

            let config = {};
            if (targetGuildId) {
                config = await getGuildConfig(client, targetGuildId);
            }

            const snapshot = getCommandAccessSnapshot(client, config);
            return res.json({
                guildId: targetGuildId,
                ...snapshot,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/commands/toggle-command', requireAuth, async (req, res) => {
        try {
            const { guildId, commandName, enabled } = req.body;
            if (!guildId || !commandName) {
                return res.status(400).json({ error: 'Missing guildId or commandName' });
            }

            let result;
            if (enabled) {
                result = await enableCommand(client, guildId, commandName);
            } else {
                result = await disableCommand(client, guildId, commandName);
            }

            logger.info(`Dashboard toggled command ${commandName} -> ${enabled ? 'ENABLED' : 'DISABLED'} on guild ${guildId}`);
            return res.json({ success: true, result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });

    app.post('/api/commands/toggle-category', requireAuth, async (req, res) => {
        try {
            const { guildId, categoryKey, enabled } = req.body;
            if (!guildId || !categoryKey) {
                return res.status(400).json({ error: 'Missing guildId or categoryKey' });
            }

            let result;
            if (enabled) {
                result = await enableCategory(client, guildId, categoryKey);
            } else {
                result = await disableCategory(client, guildId, categoryKey);
            }

            logger.info(`Dashboard toggled category ${categoryKey} -> ${enabled ? 'ENABLED' : 'DISABLED'} on guild ${guildId}`);
            return res.json({ success: true, result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Announcement / Broadcast
    // -------------------------------------------------------------
    app.post('/api/broadcast', requireAuth, async (req, res) => {
        try {
            const { guildId, channelId, title, description, color, pingRole, imageUrl, thumbnailUrl } = req.body;
            if (!guildId || !channelId || !title || !description) {
                return res.status(400).json({ error: 'Please provide guildId, channelId, title, and description' });
            }

            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const channel = guild.channels.cache.get(channelId);
            if (!channel) return res.status(404).json({ error: 'Channel not found' });

            const embed = createEmbed({
                title: String(title).trim(),
                description: String(description).trim(),
                color: color || '#7C3AED',
            });

            if (thumbnailUrl && String(thumbnailUrl).trim()) {
                embed.setThumbnail(String(thumbnailUrl).trim());
            }
            if (imageUrl && String(imageUrl).trim()) {
                embed.setImage(String(imageUrl).trim());
            }

            embed.setFooter({ text: `Broadcasted by Server Administration • VoidUtility` });
            embed.setTimestamp();

            const messageOptions = { embeds: [embed] };
            if (pingRole && pingRole !== 'none') {
                if (pingRole === 'everyone') messageOptions.content = '@everyone';
                else if (pingRole === 'here') messageOptions.content = '@here';
                else messageOptions.content = `<@&${pingRole}>`;
            }

            await channel.send(messageOptions);
            logger.info(`Owner sent announcement to #${channel.name} via dashboard (image: ${Boolean(imageUrl)}, thumb: ${Boolean(thumbnailUrl)})`);
            return res.json({ success: true, message: `Dispatched to #${channel.name}` });
        } catch (error) {
            logger.error('Failed to send broadcast from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Interactive Panel Deployer (Tickets & Verification)
    // -------------------------------------------------------------
    app.post('/api/panels/ticket', requireAuth, async (req, res) => {
        try {
            const { guildId, channelId, title, message, buttonLabel, categoryId, closedCategoryId, staffRoleId, color, imageUrl, thumbnailUrl } = req.body;
            if (!guildId || !channelId) {
                return res.status(400).json({ error: 'guildId and channelId are required' });
            }

            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const channel = guild.channels.cache.get(channelId);
            if (!channel) return res.status(404).json({ error: 'Target channel not found' });

            const embed = createEmbed({
                title: title || 'Support Tickets',
                description: message || 'Click the button below to create a support ticket with server staff.',
                color: color || '#113E35'
            });

            if (thumbnailUrl && String(thumbnailUrl).trim()) {
                embed.setThumbnail(String(thumbnailUrl).trim());
            }
            if (imageUrl && String(imageUrl).trim()) {
                embed.setImage(String(imageUrl).trim());
            }

            embed.setFooter({ text: 'VoidUtility Ticket System' });
            embed.setTimestamp();

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel(buttonLabel || 'Create Ticket')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('📩')
            );

            const sent = await channel.send({ embeds: [embed], components: [button] });

            const currentConfig = (await getGuildConfig(client, guildId)) || {};
            currentConfig.ticketPanelChannelId = channel.id;
            currentConfig.ticketPanelMessageId = sent.id;
            currentConfig.ticketPanelMessage = message || 'Click the button below to create a support ticket.';
            currentConfig.ticketButtonLabel = buttonLabel || 'Create Ticket';
            if (imageUrl) currentConfig.ticketPanelImageUrl = String(imageUrl).trim();
            if (thumbnailUrl) currentConfig.ticketPanelThumbnailUrl = String(thumbnailUrl).trim();
            if (categoryId) currentConfig.ticketCategoryId = categoryId;
            if (closedCategoryId) currentConfig.ticketClosedCategoryId = closedCategoryId;
            if (staffRoleId) currentConfig.ticketStaffRoleId = staffRoleId;

            await setGuildConfig(client, guildId, currentConfig);
            logger.info(`Owner deployed Ticket Panel to #${channel.name} via dashboard (banner: ${Boolean(imageUrl)}, thumb: ${Boolean(thumbnailUrl)})`);
            return res.json({ success: true, message: `Ticket panel deployed to #${channel.name}!` });
        } catch (error) {
            logger.error('Failed to deploy ticket panel from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/panels/verification', requireAuth, async (req, res) => {
        try {
            const { guildId, channelId, title, message, roleId, buttonText, color, imageUrl, thumbnailUrl } = req.body;
            if (!guildId || !channelId || !roleId) {
                return res.status(400).json({ error: 'guildId, channelId, and roleId are required' });
            }

            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const channel = guild.channels.cache.get(channelId);
            if (!channel) return res.status(404).json({ error: 'Target channel not found' });

            const embed = createEmbed({
                title: title || 'Server Verification',
                description: message || 'Click the button below to verify your membership and gain full access to the server.',
                color: color || '#108A65'
            });

            if (thumbnailUrl && String(thumbnailUrl).trim()) {
                embed.setThumbnail(String(thumbnailUrl).trim());
            }
            if (imageUrl && String(imageUrl).trim()) {
                embed.setImage(String(imageUrl).trim());
            }

            embed.setFooter({ text: 'VoidUtility Verification Gate' });
            embed.setTimestamp();

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('verify_user')
                    .setLabel(buttonText || 'Verify Membership')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('✅')
            );

            const sent = await channel.send({ embeds: [embed], components: [button] });

            const currentConfig = (await getGuildConfig(client, guildId)) || {};
            currentConfig.verification = {
                enabled: true,
                channelId: channel.id,
                roleId: roleId,
                messageId: sent.id,
                message: message || 'Click the button below to verify your membership.',
                buttonText: buttonText || 'Verify Membership',
                imageUrl: imageUrl ? String(imageUrl).trim() : undefined,
                thumbnailUrl: thumbnailUrl ? String(thumbnailUrl).trim() : undefined
            };

            await setGuildConfig(client, guildId, currentConfig);
            logger.info(`Owner deployed Verification Gate to #${channel.name} via dashboard (banner: ${Boolean(imageUrl)}, thumb: ${Boolean(thumbnailUrl)})`);
            return res.json({ success: true, message: `Verification gate deployed to #${channel.name}!` });
        } catch (error) {
            logger.error('Failed to deploy verification panel from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Automated Server Structure & Infrastructure Provisioning
    // -------------------------------------------------------------
    app.post('/api/guild/:guildId/provision/tickets', requireAuth, async (req, res) => {
        try {
            const guild = client.guilds.cache.get(req.params.guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const { deploySetup, imageUrl, thumbnailUrl } = req.body || {};
            const result = await provisionTicketsStructure(guild, {
                deploySetup: deploySetup !== false,
                imageUrl: imageUrl || undefined,
                thumbnailUrl: thumbnailUrl || undefined
            });
            const summary = result.createdItems.length > 0 
                ? `Provisioned: ${result.createdItems.join(', ')}` 
                : 'Verified existing ticket category, closed category, and staff role';
            return res.json({
                success: true,
                message: summary,
                data: {
                    categoryId: result.category.id,
                    closedCategoryId: result.closedCategory.id,
                    staffRoleId: result.staffRole.id,
                    panelChannelId: result.panelChannel.id,
                    createdItems: result.createdItems
                }
            });
        } catch (error) {
            logger.error('Failed to provision tickets structure:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/provision/verification', requireAuth, async (req, res) => {
        try {
            const guild = client.guilds.cache.get(req.params.guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const { deploySetup, imageUrl, thumbnailUrl } = req.body || {};
            const result = await provisionVerificationStructure(guild, {
                deploySetup: deploySetup !== false,
                imageUrl: imageUrl || undefined,
                thumbnailUrl: thumbnailUrl || undefined
            });
            const summary = result.createdItems.length > 0 
                ? `Provisioned: ${result.createdItems.join(', ')}` 
                : 'Verified existing verification category, channel, and member role';
            return res.json({
                success: true,
                message: summary,
                data: {
                    categoryId: result.category?.id,
                    verifyChannelId: result.verifyChannel?.id,
                    memberRoleId: result.memberRole?.id,
                    createdItems: result.createdItems
                }
            });
        } catch (error) {
            logger.error('Failed to provision verification structure:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/provision/onboarding', requireAuth, async (req, res) => {
        try {
            const guild = client.guilds.cache.get(req.params.guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const { deploySetup } = req.body || {};
            const result = await provisionOnboardingStructure(guild, {
                deploySetup: deploySetup !== false
            });
            const summary = result.createdItems.length > 0 
                ? `Provisioned: ${result.createdItems.join(', ')}` 
                : 'Verified existing onboarding category, welcome channel, and member role';
            return res.json({
                success: true,
                message: summary,
                data: {
                    infoCategoryId: result.infoCategory.id,
                    welcomeChannelId: result.welcomeChannel.id,
                    rulesChannelId: result.rulesChannel.id,
                    memberRoleId: result.memberRole.id,
                    createdItems: result.createdItems
                }
            });
        } catch (error) {
            logger.error('Failed to provision onboarding structure:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/provision/audit', requireAuth, async (req, res) => {
        try {
            const guild = client.guilds.cache.get(req.params.guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const { deploySetup } = req.body || {};
            const result = await provisionAuditStructure(guild, {
                deploySetup: deploySetup !== false
            });
            const summary = result.createdItems.length > 0 
                ? `Provisioned: ${result.createdItems.join(', ')}` 
                : 'Verified existing audit category, logs channel, and moderator role';
            return res.json({
                success: true,
                message: summary,
                data: {
                    adminCategoryId: result.adminCategory.id,
                    logsChannelId: result.logsChannel.id,
                    modRoleId: result.modRole.id,
                    createdItems: result.createdItems
                }
            });
        } catch (error) {
            logger.error('Failed to provision audit structure:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/provision/full', requireAuth, async (req, res) => {
        try {
            const guild = client.guilds.cache.get(req.params.guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const result = await provisionFullServerStructure(guild);

            return res.json({
                success: true,
                message: result.createdItems.length > 0
                    ? `Fully provisioned server architecture (${result.createdItems.join(', ')})`
                    : 'Verified all channels, categories, roles, and setup panels are deployed',
                data: result
            });
        } catch (error) {
            logger.error('Failed to full-provision server:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/provision/custom', requireAuth, async (req, res) => {
        try {
            const guild = client.guilds.cache.get(req.params.guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const { type, name, parentId, color, isPrivate } = req.body;
            if (!name) return res.status(400).json({ error: 'Resource name is required' });

            const resource = await createCustomResource(guild, { type, name, parentId, color, isPrivate });
            logger.info(`Owner created custom ${type} "${name}" in guild ${guild.id}`);
            return res.json({
                success: true,
                message: `Created ${type} "${resource.name}" successfully!`,
                data: resource
            });
        } catch (error) {
            logger.error('Failed to create custom resource:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Leveling & XP Leaderboard API
    // -------------------------------------------------------------
    app.get('/api/guild/:guildId/leaderboard', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const levelingConfig = (await getLevelingConfig(client, guildId)) || { enabled: true };
            const rawLeaderboard = await getLeaderboard(client, guildId, 25).catch(() => []);

            const members = await Promise.all(
                rawLeaderboard.map(async (entry, index) => {
                    let member = guild.members.cache.get(entry.userId);
                    if (!member) {
                        member = await guild.members.fetch(entry.userId).catch(() => null);
                    }
                    return {
                        rank: index + 1,
                        userId: entry.userId,
                        username: member?.user?.username || `User ${entry.userId.slice(-4)}`,
                        avatar: member?.user?.displayAvatarURL({ size: 128 }) || null,
                        level: entry.level || 0,
                        xp: entry.xp || 0
                    };
                })
            );

            return res.json({
                config: levelingConfig,
                leaderboard: members
            });
        } catch (error) {
            logger.error('Failed to get leaderboard for dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/levels/modify', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const { userId, action, value } = req.body;
            if (!userId || !action || value === undefined) {
                return res.status(400).json({ error: 'userId, action, and value are required' });
            }

            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const val = Number(value);
            if (isNaN(val)) return res.status(400).json({ error: 'Invalid numeric value' });

            if (action === 'setLevel') {
                await setUserLevel(client, guildId, userId, Math.max(0, val));
                logger.info(`Owner set level for user ${userId} to ${val}`);
            } else if (action === 'addXp') {
                await addXp(client, guildId, userId, val);
                logger.info(`Owner added ${val} XP to user ${userId}`);
            } else {
                return res.status(400).json({ error: 'Action must be setLevel or addXp' });
            }

            return res.json({ success: true, message: `Member level updated successfully!` });
        } catch (error) {
            logger.error('Failed to modify level from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Economy Treasury API
    // -------------------------------------------------------------
    app.get('/api/guild/:guildId/economy', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const guild = client.guilds.cache.get(guildId);
            if (!guild) return res.status(404).json({ error: 'Guild not found' });

            const prefix = getEconomyPrefix(guildId);
            let allKeys = (await client.db?.list?.(prefix)) || [];
            if (!Array.isArray(allKeys)) allKeys = [];

            let totalCirculation = 0;
            const allUsers = [];

            for (const key of allKeys) {
                const userId = key.replace(prefix, '');
                const data = await client.db.get(key);
                if (data) {
                    const wallet = Number(data.wallet) || 0;
                    const bank = Number(data.bank) || 0;
                    const net = wallet + bank;
                    totalCirculation += net;
                    allUsers.push({ userId, wallet, bank, netWorth: net });
                }
            }

            allUsers.sort((a, b) => b.netWorth - a.netWorth);
            const topSlice = allUsers.slice(0, 25);

            const topUsers = await Promise.all(
                topSlice.map(async (u, idx) => {
                    let member = guild.members.cache.get(u.userId);
                    if (!member) {
                        member = await guild.members.fetch(u.userId).catch(() => null);
                    }
                    return {
                        rank: idx + 1,
                        userId: u.userId,
                        username: member?.user?.username || `User ${u.userId.slice(-4)}`,
                        avatar: member?.user?.displayAvatarURL({ size: 128 }) || null,
                        wallet: u.wallet,
                        bank: u.bank,
                        netWorth: u.netWorth
                    };
                })
            );

            return res.json({
                stats: {
                    totalUsers: allUsers.length,
                    totalCirculation,
                    averageNetWorth: allUsers.length ? Math.round(totalCirculation / allUsers.length) : 0
                },
                topUsers
            });
        } catch (error) {
            logger.error('Failed to get economy data for dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/guild/:guildId/economy/modify', requireAuth, async (req, res) => {
        try {
            const { guildId } = req.params;
            const { userId, walletChange = 0, bankChange = 0 } = req.body;
            if (!userId) {
                return res.status(400).json({ error: 'userId is required' });
            }

            const updated = await updateBalance(client, guildId, userId, {
                wallet: Number(walletChange) || 0,
                bank: Number(bankChange) || 0
            });

            logger.info(`Owner updated economy balance for ${userId}: wallet += ${walletChange}, bank += ${bankChange}`);
            return res.json({ success: true, data: updated, message: 'Balance updated successfully!' });
        } catch (error) {
            logger.error('Failed to modify economy from dashboard:', error);
            return res.status(500).json({ error: error.message });
        }
    });

    // -------------------------------------------------------------
    // Live Real-Time Logs
    // -------------------------------------------------------------
    app.get('/api/logs', requireAuth, (req, res) => {
        const { limit = 100, level } = req.query;
        let logs = [...recentDashboardLogs];

        if (level && level !== 'all') {
            logs = logs.filter(l => l.level === level.toLowerCase());
        }

        res.json({
            logs: logs.slice(0, Number(limit) || 100),
            total: recentDashboardLogs.length
        });
    });

    // Fallback: direct browser visits to `/dashboard` or `/` load the dashboard SPA
    app.get(['/', '/dashboard'], (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}
