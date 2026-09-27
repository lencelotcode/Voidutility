# VoidUtility • Private Server Utility

**VoidUtility** is a dedicated, multi-purpose Discord bot custom-built for our server. Built with Discord.js v14 and PostgreSQL (with automatic in-memory fallback), it centralizes server management, ticket management, moderation, server statistics, utility tools, and interactive dashboards.

---

## ⚡ Quick Start

### 1. Configuration
Create or configure your `.env` file in the project root:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id
OWNER_IDS=your_discord_user_id

NODE_ENV=development
PORT=3000

# PostgreSQL Configuration (Optional: in-memory mode active if not running)
POSTGRES_URL=postgresql://postgres:password@localhost:5432/voidutility
```

### 2. Launching the Bot
```bash
# Start bot in development / local mode
npm start
```

---

## 🛠️ Feature Modules

| Module | Description | Core Commands |
| :--- | :--- | :--- |
| **⚡ Core** | System diagnostics and control center | `/help`, `/ping`, `/stats`, `/uptime`, `/commands` |
| **🛡️ Moderation** | Full suite moderation & user auditing | `/ban`, `/kick`, `/timeout`, `/warn`, `/cases`, `/usernotes` |
| **🎫 Ticket System** | Private support ticket channels & dashboards | `/ticket setup`, `/ticket dashboard`, `/claim`, `/close` |
| **👋 Welcome & Roles** | Member onboarding and automated role assignment | `/welcome setup`, `/autorole`, `/goodbye` |
| **📊 Server Stats** | Dynamic voice and text channel stat counters | `/serverstats create`, `/serverstats update` |
| **💎 Economy & Shop** | Virtual server economy with shop & inventory | `/balance`, `/daily`, `/work`, `/shop`, `/pay` |
| **📈 Leveling** | Activity tracking, ranks, and role rewards | `/rank`, `/leaderboard`, `/level setup` |
| **🔮 Utility & Tools** | Server information and productivity utilities | `/serverinfo`, `/userinfo`, `/poll`, `/countdown`, `/todo` |
| **🔒 Verification** | Captcha and button verification gateway | `/verification setup`, `/verify` |

---

## ⚙️ Administration & Setup

1. **First-Time Server Setup**:
   Run `/configwizard` in your server to interactively configure logging channels, staff roles, and preferences.

2. **Feature Control Dashboard**:
   Run `/commands dashboard` to enable or disable specific command modules on demand.

3. **Database Maintenance**:
   - **Apply migrations**: `npm run migrate`
   - **Check migration status**: `npm run migrate:status`
   - **Database backup**: `npm run backup:db`

---

## 📁 Project Architecture

```
├── src/
│   ├── app.js               # Bot entry point & lifecycle manager
│   ├── commands/            # Slash command modules by category
│   ├── config/              # Centralized bot, database, and system configs
│   ├── events/              # Discord gateway event handlers
│   ├── handlers/            # Component, modal, and button routers
│   ├── interactions/        # Button, modal, and select menu controllers
│   ├── services/            # Business logic & data access services
│   └── utils/               # Shared helpers, embeds, logger, database facade
├── scripts/                 # Maintenance, migration, and backup scripts
└── .env                     # Local environment variables & secrets
```
