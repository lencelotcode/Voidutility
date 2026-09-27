import {
    SlashCommandBuilder,
} from "discord.js";
import { InteractionHelper } from '../../utils/interactionHelper.js';
import { createEmbed } from "../../utils/embeds.js";
import { createSelectMenu } from "../../utils/components.js";
import { logger } from "../../utils/logger.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATEGORY_SELECT_ID = "help-category-select";
const ALL_COMMANDS_ID = "help-all-commands";
const HELP_MENU_TIMEOUT_MS = 5 * 60 * 1000;

const CATEGORY_ICONS = {
    Core: "⚡",
    Moderation: "🛡️",
    Economy: "💎",
    Music: "🎵",
    Fun: "🎲",
    Leveling: "📈",
    Utility: "🔮",
    Ticket: "🎫",
    Welcome: "✨",
    Giveaway: "🎁",
    Counter: "🔢",
    Tools: "⚙️",
    Search: "🔎",
    "Reaction Roles": "🎭",
    Community: "👥",
    Birthday: "🎂",
    "Join To Create": "🔊",
    Verification: "🔒",
};

function formatCategoryName(rawCategory) {
    return rawCategory
        .replace(/_/g, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function createInitialHelpMenu(client) {
    const commandsPath = path.join(__dirname, "../../commands");
    const categoryDirs = (
        await fs.readdir(commandsPath, { withFileTypes: true })
    )
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .sort();

    const options = [
        {
            label: "📋 All Commands",
            description: "Browse the complete directory of bot commands",
            value: ALL_COMMANDS_ID,
        },
        ...categoryDirs.map((category) => {
            const categoryName = formatCategoryName(category);
            const icon = CATEGORY_ICONS[categoryName] || "🔮";
            return {
                label: `${icon} ${categoryName}`,
                description: `Explore commands in ${categoryName}`,
                value: category,
            };
        }),
    ];

    const botName = client?.user?.username || "VoidUtility";
    const embed = createEmbed({
        title: `⚡ ${botName} • Command Center`,
        description: `Welcome to **${botName}** — your server's dedicated management suite. Select a category from the dropdown menu below to view available slash commands.`,
        color: 'primary',
        thumbnail: client.user?.displayAvatarURL?.({ size: 1024 }),
        fields: [
            {
                name: '🚀 Quick Navigation',
                value: [
                    '• **Initial Setup**: Run `/configwizard` to configure roles and audit channels.',
                    '• **Module Control**: Run `/commands dashboard` to toggle feature sets.',
                    '• **System Stats**: Run `/stats` or `/ping` for live diagnostics.',
                ].join('\n'),
                inline: false,
            },
            {
                name: '💡 Usage Tip',
                value: 'Type `/` followed by any command name to see interactive parameter previews and options directly in Discord.',
                inline: false,
            },
        ],
    });

    embed.setFooter({ 
        text: "⚡ VoidUtility • Dedicated Server Utility" 
    });
    embed.setTimestamp();

    const selectRow = createSelectMenu(
        CATEGORY_SELECT_ID,
        "Select a category to view commands...",
        options,
    );

    return {
        embeds: [embed],
        components: [selectRow],
    };
}

export default {
    slashOnly: true,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays the command center and module directory"),

    async execute(interaction, guildConfig, client) {
        await InteractionHelper.safeDefer(interaction);
        
        const { embeds, components } = await createInitialHelpMenu(client);

        await InteractionHelper.safeEditReply(interaction, {
            embeds,
            components,
        });

        setTimeout(async () => {
            try {
                if (!InteractionHelper.isInteractionValid(interaction)) {
                    return;
                }

                const closedEmbed = createEmbed({
                    title: "Help Menu Expired",
                    description: "This menu session has timed out. Run `/help` to open a new one.",
                    color: "secondary",
                });

                await InteractionHelper.safeEditReply(interaction, {
                    embeds: [closedEmbed],
                    components: [],
                });
            } catch (error) {
                logger.debug('Help menu close edit failed (interaction may have expired):', error?.message);
            }
        }, HELP_MENU_TIMEOUT_MS);
    },
};