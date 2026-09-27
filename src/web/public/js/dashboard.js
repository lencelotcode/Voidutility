/**
 * VoidUtility • Executive Dashboard Application Client
 * Styled with Volodymyr Gruev / Heartbeat editorial aesthetics
 * Powered with Streamline Vector Icons
 */

const StreamlineCategoryIcons = {
    all: `<svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    birthday: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s2-1 4-1 4 2 4 2 2-1 4-1 4 1 4 1"/><line x1="2" y1="21" x2="22" y2="21"/><line x1="12" y1="7" x2="12" y2="11"/><path d="M12 3a1 1 0 0 1 1 1c0 1-1 2-1 2s-1-1-1-2a1 1 0 0 1 1-1z"/></svg>`,
    moderation: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
    admin: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
    utility: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    giveaways: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
    ticket: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3z"/><line x1="13" y1="5" x2="13" y2="19" stroke-dasharray="2 2"/></svg>`,
    economy: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="3"/><path d="M2 10h20"/><circle cx="17" cy="14" r="1.5"/></svg>`,
    level: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    welcomer: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`,
    fun: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="6"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>`,
    games: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="6"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>`,
    music: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
    suggestion: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5h6.18z"/></svg>`,
    information: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    default: `<svg class="streamline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

class VoidDashboard {
    constructor() {
        this.token = localStorage.getItem('void_auth_token') || null;
        this.currentTab = 'overview';
        this.guilds = [];
        this.selectedGuildId = null;
        this.commandsData = null;
        this.pollInterval = null;
        this.logsInterval = null;
        this.activeCategoryFilter = 'all';
        this.presenceFormInitialized = false;

        this.init();
    }

    async init() {
        this.bindEvents();
        this.switchTab('overview');
        this.updateBroadcastPreview();

        if (this.token) {
            const isValid = await this.verifySession();
            if (isValid) {
                this.updateAuthUI(true);
                this.enterDashboard();
            } else {
                this.updateAuthUI(false);
                this.showLogin();
            }
        } else {
            this.updateAuthUI(false);
            this.showLogin();
        }
    }

    // -------------------------------------------------------------
    // Authentication & Session
    // -------------------------------------------------------------
    async verifySession() {
        try {
            const res = await this.apiFetch('/api/auth/verify');
            return Boolean(res && res.authenticated);
        } catch {
            return false;
        }
    }

    updateAuthUI(isAuthenticated) {
        const authBtn = document.getElementById('auth-state-btn');
        if (authBtn) {
            if (isAuthenticated) {
                authBtn.innerHTML = `
                    <svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>Owner Active</span>
                `;
                authBtn.classList.remove('logged-out');
                authBtn.classList.add('logged-in');
            } else {
                authBtn.innerHTML = `
                    <svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>Owner Login</span>
                `;
                authBtn.classList.remove('logged-in');
                authBtn.classList.add('logged-out');
            }
        }
    }

    handleAuthButton() {
        if (this.token) {
            if (confirm('Lock owner session and log out of VoidUtility console?')) {
                this.logout();
            }
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.classList.add('active');
            const pwdInput = document.getElementById('password-input');
            if (pwdInput) {
                setTimeout(() => pwdInput.focus(), 100);
            }
        }
    }

    hideLogin() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        const errEl = document.getElementById('login-error');
        if (errEl) {
            errEl.classList.add('hidden');
        }
    }

    enterDashboard() {
        this.hideLogin();
        this.updateAuthUI(true);
        this.loadInitialData();

        if (this.pollInterval) clearInterval(this.pollInterval);
        if (this.logsInterval) clearInterval(this.logsInterval);

        // Start background telemetry polling
        this.pollInterval = setInterval(() => this.pollOverview(), 4000);
        this.logsInterval = setInterval(() => {
            if (this.currentTab === 'logs') this.loadLogs();
        }, 3000);
    }

    async login(password) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (res.ok && data.success && data.token) {
                this.token = data.token;
                localStorage.setItem('void_auth_token', this.token);
                this.enterDashboard();
                this.showToast('Authorized successfully. Welcome, Owner.', 'success');
            } else {
                this.showAuthError(data.error || 'Access denied: Invalid key');
            }
        } catch (err) {
            this.showAuthError('Connection error: Is VoidUtility running?');
        }
    }

    logout() {
        if (this.token) {
            this.apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
        }
        this.token = null;
        localStorage.removeItem('void_auth_token');
        this.updateAuthUI(false);
        if (this.pollInterval) clearInterval(this.pollInterval);
        if (this.logsInterval) clearInterval(this.logsInterval);
        this.showLogin();
        this.showToast('Console session locked.', 'info');
    }

    showAuthError(msg) {
        const errEl = document.getElementById('login-error');
        if (errEl) {
            errEl.textContent = msg;
            errEl.classList.remove('hidden');
        }
    }

    // -------------------------------------------------------------
    // API Helper with Auth Header
    // -------------------------------------------------------------
    async apiFetch(url, options = {}) {
        const headers = options.headers || {};
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        if (!headers['Content-Type'] && options.body && typeof options.body === 'string') {
            headers['Content-Type'] = 'application/json';
        }

        const res = await fetch(url, { ...options, headers });
        if (res.status === 401) {
            this.logout();
            throw new Error('Unauthorized');
        }
        return res.json();
    }

    // -------------------------------------------------------------
    // Data Loading & Live Polling
    // -------------------------------------------------------------
    async loadInitialData() {
        await Promise.all([
            this.pollOverview(),
            this.loadGuilds(),
            this.loadLogs(),
        ]);
    }

    async pollOverview() {
        try {
            const data = await this.apiFetch('/api/overview');
            if (!data) return;

            // Top Status Strip
            const stripStatus = document.getElementById('strip-status-text');
            if (stripStatus) stripStatus.textContent = 'Operational';

            const stripPing = document.getElementById('strip-ping-text');
            if (stripPing && data.system) {
                stripPing.textContent = `${data.system.ping}ms Latency`;
            }

            const stripDb = document.getElementById('strip-db-text');
            if (stripDb && data.database) {
                stripDb.textContent = data.database.message || 'Connected';
            }

            // Bot Profile & Preview
            if (data.bot) {
                const avatarMockup = document.getElementById('mockup-avatar');
                if (avatarMockup && data.bot.avatar) {
                    avatarMockup.src = data.bot.avatar;
                }

                const mockupDot = document.getElementById('mockup-status-dot');
                if (mockupDot) {
                    mockupDot.className = `presence-dot ${data.bot.status || 'online'}`;
                }

                const mockupName = document.getElementById('mockup-username');
                if (mockupName) {
                    mockupName.textContent = data.bot.username || 'VoidUtility';
                }

                const mockupActivity = document.getElementById('mockup-activity-text');
                if (mockupActivity) {
                    mockupActivity.textContent = data.bot.activityName || 'Custom Status';
                }

                // Initial populate for presence form
                if (!this.presenceFormInitialized) {
                    const statusSelect = document.getElementById('presence-status-select');
                    if (statusSelect && data.bot.status) {
                        statusSelect.value = data.bot.status;
                    }
                    const nameInput = document.getElementById('presence-name-input');
                    if (nameInput && data.bot.activityName) {
                        nameInput.value = data.bot.activityName;
                    }
                    this.presenceFormInitialized = true;
                }
            }

            // System Metrics & KPIs
            if (data.system) {
                const topPing = document.getElementById('top-ping-val');
                if (topPing) topPing.textContent = `${data.system.ping} ms`;

                const uptimeVal = document.getElementById('top-uptime-val');
                if (uptimeVal && data.bot) {
                    uptimeVal.textContent = this.formatDuration(data.bot.uptime);
                }

                const mockupUptime = document.getElementById('mockup-live-uptime');
                if (mockupUptime && data.bot) {
                    mockupUptime.textContent = `Uptime ${this.formatDuration(data.bot.uptime)}`;
                }

                const kpiMem = document.getElementById('kpi-memory');
                if (kpiMem) kpiMem.textContent = `${data.system.heapUsedMB} MB`;

                const kpiMemPct = document.getElementById('kpi-mem-percent');
                if (kpiMemPct) {
                    kpiMemPct.textContent = `${data.system.memoryPercent}% of ${data.system.heapTotalMB} MB heap`;
                }

                const specPlatform = document.getElementById('spec-platform');
                if (specPlatform) specPlatform.textContent = data.system.platform;

                const specNode = document.getElementById('spec-node');
                if (specNode) specNode.textContent = data.system.nodeVersion;
            }

            // Database details
            if (data.database) {
                const specDb = document.getElementById('spec-db-mode');
                if (specDb) specDb.textContent = data.database.type === 'postgres' ? 'PostgreSQL' : 'Key/Value Store';

                const dbText = document.getElementById('db-status-text');
                if (dbText) dbText.textContent = data.database.message || 'Operational';
            }

            // Counts & Badges
            if (data.stats) {
                const kpiGuilds = document.getElementById('kpi-guilds');
                if (kpiGuilds) kpiGuilds.textContent = data.stats.totalGuilds;

                const kpiMembers = document.getElementById('kpi-members');
                if (kpiMembers) kpiMembers.textContent = Number(data.stats.totalMembers).toLocaleString();

                const kpiCmds = document.getElementById('kpi-commands');
                if (kpiCmds) kpiCmds.textContent = data.stats.totalCommands;

                const navCmd = document.getElementById('nav-cmd-count');
                if (navCmd) navCmd.textContent = data.stats.totalCommands;
            }
        } catch (err) {
            console.warn('Overview telemetry poll warning:', err);
        }
    }

    async loadGuilds() {
        try {
            const data = await this.apiFetch('/api/guilds');
            if (!data || !data.guilds) return;
            this.guilds = data.guilds;

            const selectEl = document.getElementById('active-guild-select');
            if (!selectEl) return;
            selectEl.innerHTML = '';

            if (this.guilds.length === 0) {
                selectEl.innerHTML = '<option value="">No Servers Connected</option>';
                return;
            }

            this.guilds.forEach(g => {
                const opt = document.createElement('option');
                opt.value = g.id;
                opt.textContent = `${g.name} (${g.memberCount} members)`;
                selectEl.appendChild(opt);
            });

            if (!this.selectedGuildId || !this.guilds.find(g => g.id === this.selectedGuildId)) {
                this.selectedGuildId = this.guilds[0].id;
            }
            selectEl.value = this.selectedGuildId;

            this.populateGuildDependentForms();
            this.loadCommands();
            this.loadGuildConfig();
        } catch (err) {
            console.error('Failed to load guilds:', err);
        }
    }

    populateGuildDependentForms() {
        const guild = this.guilds.find(g => g.id === this.selectedGuildId);
        if (!guild) return;

        // Broadcast Channel Select
        const broadcastChanSelect = document.getElementById('broadcast-channel-select');
        if (broadcastChanSelect) {
            broadcastChanSelect.innerHTML = '<option value="">Select target channel...</option>';
            guild.textChannels.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = `#${c.name}`;
                broadcastChanSelect.appendChild(opt);
            });
        }

        // Settings Dropdowns (Roles & Channels)
        const autoroleSelect = document.getElementById('setting-autorole');
        const modroleSelect = document.getElementById('setting-modrole');
        const welcomeChanSelect = document.getElementById('setting-welcome-chan');

        if (autoroleSelect) {
            autoroleSelect.innerHTML = '<option value="">Disabled / None</option>';
            guild.roles.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = `@${r.name}`;
                autoroleSelect.appendChild(opt);
            });
        }

        if (modroleSelect) {
            modroleSelect.innerHTML = '<option value="">Select Moderator Role...</option>';
            guild.roles.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = `@${r.name}`;
                modroleSelect.appendChild(opt);
            });
        }

        if (welcomeChanSelect) {
            welcomeChanSelect.innerHTML = '<option value="">Disabled / None</option>';
            guild.textChannels.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = `#${c.name}`;
                welcomeChanSelect.appendChild(opt);
            });
        }

        const auditChanSelect = document.getElementById('setting-audit-chan');
        if (auditChanSelect) {
            auditChanSelect.innerHTML = '<option value="">Disabled / None</option>';
            guild.textChannels.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = `#${c.name}`;
                auditChanSelect.appendChild(opt);
            });
        }

        const goodbyeChanSelect = document.getElementById('setting-goodbye-chan');
        if (goodbyeChanSelect) {
            goodbyeChanSelect.innerHTML = '<option value="">Disabled / None</option>';
            guild.textChannels.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = `#${c.name}`;
                goodbyeChanSelect.appendChild(opt);
            });
        }

        // Ticket Panel Dropdowns
        const ticketChan = document.getElementById('ticket-panel-channel');
        if (ticketChan) {
            ticketChan.innerHTML = '<option value="">Select target channel...</option>';
            guild.textChannels.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = `#${c.name}`;
                ticketChan.appendChild(opt);
            });
        }

        const verifyChan = document.getElementById('verify-panel-channel');
        if (verifyChan) {
            verifyChan.innerHTML = '<option value="">Select target channel...</option>';
            guild.textChannels.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = `#${c.name}`;
                verifyChan.appendChild(opt);
            });
        }

        const ticketStaff = document.getElementById('ticket-staff-role');
        if (ticketStaff) {
            ticketStaff.innerHTML = '<option value="">Select Staff Role...</option>';
            guild.roles.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = `@${r.name}`;
                ticketStaff.appendChild(opt);
            });
        }

        const verifyRole = document.getElementById('verify-role-select');
        if (verifyRole) {
            verifyRole.innerHTML = '<option value="">Select Member Role...</option>';
            guild.roles.forEach(r => {
                const opt = document.createElement('option');
                opt.value = r.id;
                opt.textContent = `@${r.name}`;
                verifyRole.appendChild(opt);
            });
        }

        const ticketCat = document.getElementById('ticket-category-select');
        if (ticketCat) {
            ticketCat.innerHTML = '<option value="">Automatic / Server Default</option>';
            (guild.categories || []).forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = `📁 ${cat.name}`;
                ticketCat.appendChild(opt);
            });
        }

        const ticketClosedCat = document.getElementById('ticket-closed-category-select');
        if (ticketClosedCat) {
            ticketClosedCat.innerHTML = '<option value="">Leave In Current Category</option>';
            (guild.categories || []).forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = `📁 ${cat.name}`;
                ticketClosedCat.appendChild(opt);
            });
        }

        const customResParent = document.getElementById('custom-res-parent');
        if (customResParent) {
            customResParent.innerHTML = '<option value="">(None / Root)</option>';
            (guild.categories || []).forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.id;
                opt.textContent = `📁 ${cat.name}`;
                customResParent.appendChild(opt);
            });
        }
    }

    // -------------------------------------------------------------
    // Command Control Center with Streamline Vector Icons
    // -------------------------------------------------------------
    async loadCommands() {
        if (!this.selectedGuildId) return;
        try {
            const data = await this.apiFetch(`/api/commands?guildId=${this.selectedGuildId}`);
            if (!data || !data.categories) return;
            this.applyCommandSnapshot(data);
        } catch (err) {
            console.error('Failed to load commands:', err);
        }
    }

    applyCommandSnapshot(data) {
        if (!data || !data.categories) return;
        this.commandsData = data;

        const navCount = document.getElementById('nav-cmd-count');
        if (navCount) navCount.textContent = data.totalCommands;

        const kpiCount = document.getElementById('kpi-commands');
        if (kpiCount) kpiCount.textContent = data.totalCommands;

        this.renderCategoryPills(data.categories);
        this.renderCommands();
    }

    renderCategoryPills(categories) {
        const bar = document.getElementById('category-pills-bar');
        if (!bar) return;

        const currentFilter = this.activeCategoryFilter || 'all';

        bar.innerHTML = `
            <button class="category-pill ${currentFilter === 'all' ? 'active' : ''}" data-category="all">
                ${StreamlineCategoryIcons.all}
                <span>All Modules</span>
            </button>
        `;

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `category-pill ${currentFilter === cat.key ? 'active' : ''}`;
            btn.dataset.category = cat.key;
            const iconSvg = StreamlineCategoryIcons[cat.key.toLowerCase()] || StreamlineCategoryIcons.default;
            btn.innerHTML = `${iconSvg} <span>${cat.displayName}</span>`;
            
            btn.addEventListener('click', () => {
                bar.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                this.activeCategoryFilter = cat.key;
                this.renderCommands();
            });
            bar.appendChild(btn);
        });

        const allBtn = bar.querySelector('[data-category="all"]');
        if (allBtn) {
            allBtn.addEventListener('click', (e) => {
                bar.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.activeCategoryFilter = 'all';
                this.renderCommands();
            });
        }
    }

    renderCommands() {
        const container = document.getElementById('categories-container');
        if (!container || !this.commandsData || !this.commandsData.categories) return;

        const searchQuery = (document.getElementById('command-search')?.value || '').toLowerCase().trim();
        container.innerHTML = '';

        let categoriesToRender = this.commandsData.categories;
        if (this.activeCategoryFilter !== 'all') {
            categoriesToRender = categoriesToRender.filter(c => c.key === this.activeCategoryFilter);
        }

        let totalShown = 0;

        categoriesToRender.forEach(cat => {
            const matchingCommands = cat.commands.filter(cmd => {
                if (!searchQuery) return true;
                return cmd.name.toLowerCase().includes(searchQuery) ||
                       (cmd.description && cmd.description.toLowerCase().includes(searchQuery));
            });

            if (matchingCommands.length === 0) return;
            totalShown += matchingCommands.length;

            const isCatDisabled = Boolean(cat.categoryDisabled);
            const iconSvg = StreamlineCategoryIcons[cat.key.toLowerCase()] || StreamlineCategoryIcons.default;

            const card = document.createElement('div');
            card.className = `editorial-category-card ${isCatDisabled ? 'is-cat-disabled' : ''}`;

            card.innerHTML = `
                <div class="cat-header-row">
                    <div class="cat-header-title">
                        <div class="cat-icon-symbol">${iconSvg}</div>
                        <div>
                            <h3 class="cat-name-h3" style="margin: 0; line-height: 1.2;">${cat.displayName}</h3>
                            <span style="font-size: 11.5px; color: ${isCatDisabled ? '#BA3C2A' : 'var(--ink-muted)'}; font-weight: 600;">
                                ${isCatDisabled ? '⚠️ Entire Module is Disabled' : `${cat.enabledCount} of ${cat.totalCount} active`}
                            </span>
                        </div>
                        <span class="cat-qty-badge" style="${isCatDisabled ? 'background: rgba(186,60,42,0.12); color: #BA3C2A;' : ''}">
                            ${matchingCommands.length} commands
                        </span>
                    </div>
                    <label class="editorial-switch" title="${isCatDisabled ? 'Click to enable entire module' : 'Click to disable entire module'}">
                        <input type="checkbox" ${!isCatDisabled ? 'checked' : ''} data-cat-key="${cat.key}">
                        <span class="slider-pill"></span>
                    </label>
                </div>
                <div class="commands-card-grid">
                    ${matchingCommands.map(cmd => {
                        const isCmdDisabled = cat.disabledCommandNames.includes(cmd.name);
                        const isProtected = Boolean(cmd.protected);
                        const isChecked = !isCmdDisabled && !isCatDisabled;
                        const isInputDisabled = isProtected || isCatDisabled;
                        const switchTitle = isProtected
                            ? 'Protected core command (cannot be disabled)'
                            : isCatDisabled
                            ? 'Enable this module switch above to configure commands'
                            : (isChecked ? 'Click to disable command' : 'Click to enable command');

                        return `
                            <div class="single-command-tile ${isCatDisabled ? 'dimmed' : ''}">
                                <div class="cmd-info-group">
                                    <span class="cmd-slash-name">/${cmd.name}</span>
                                    <span class="cmd-explanation" title="${this.escapeHtml(cmd.description || '')}">
                                        ${this.escapeHtml(cmd.description || 'No description available.')}
                                    </span>
                                </div>
                                <label class="editorial-switch" title="${switchTitle}">
                                    <input type="checkbox" 
                                           ${isChecked ? 'checked' : ''} 
                                           ${isInputDisabled ? 'disabled' : ''} 
                                           data-cmd-name="${cmd.name}"
                                           data-cat-key="${cat.key}">
                                    <span class="slider-pill"></span>
                                </label>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            // Category Toggle Event
            const catCheckbox = card.querySelector(`input[data-cat-key="${cat.key}"]:not([data-cmd-name])`);
            if (catCheckbox) {
                catCheckbox.addEventListener('change', async (e) => {
                    const enabled = e.target.checked;
                    catCheckbox.disabled = true;
                    try {
                        await this.toggleCategory(cat.key, enabled);
                    } catch (err) {
                        catCheckbox.checked = !enabled;
                    } finally {
                        catCheckbox.disabled = false;
                    }
                });
            }

            // Individual Command Toggle Events
            card.querySelectorAll('input[data-cmd-name]').forEach(cmdCheckbox => {
                cmdCheckbox.addEventListener('change', async (e) => {
                    const cmdName = e.target.dataset.cmdName;
                    const enabled = e.target.checked;
                    cmdCheckbox.disabled = true;
                    try {
                        await this.toggleCommand(cmdName, enabled);
                    } catch (err) {
                        cmdCheckbox.checked = !enabled;
                    } finally {
                        cmdCheckbox.disabled = false;
                    }
                });
            });

            container.appendChild(card);
        });

        if (totalShown === 0) {
            container.innerHTML = `
                <div class="editorial-card" style="padding: 48px; text-align: center; justify-content: center; width: 100%;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                        <svg class="streamline-icon xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--peach);">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <strong style="color: var(--pine-deep); font-size: 16px;">No commands match your search</strong>
                        <span style="color: var(--ink-muted); font-size: 13px;">Try typing a different name or category keyword.</span>
                    </div>
                </div>
            `;
        }
    }

    async toggleCommand(commandName, enabled) {
        try {
            const res = await this.apiFetch('/api/commands/toggle-command', {
                method: 'POST',
                body: JSON.stringify({
                    guildId: this.selectedGuildId,
                    commandName,
                    enabled,
                }),
            });

            if (res && res.success) {
                this.showToast(`/${commandName} is now ${enabled ? 'ENABLED' : 'DISABLED'}`, 'success');
                if (res.snapshot) {
                    this.applyCommandSnapshot(res.snapshot);
                } else {
                    await this.loadCommands();
                }
            } else {
                this.showToast(res?.error || 'Failed to toggle command', 'error');
                await this.loadCommands();
            }
        } catch (err) {
            this.showToast(err.message, 'error');
            await this.loadCommands();
        }
    }

    async toggleCategory(categoryKey, enabled) {
        try {
            const res = await this.apiFetch('/api/commands/toggle-category', {
                method: 'POST',
                body: JSON.stringify({
                    guildId: this.selectedGuildId,
                    categoryKey,
                    enabled,
                }),
            });

            if (res && res.success) {
                this.showToast(`Module '${categoryKey}' is now ${enabled ? 'ENABLED' : 'DISABLED'}`, 'success');
                if (res.snapshot) {
                    this.applyCommandSnapshot(res.snapshot);
                } else {
                    await this.loadCommands();
                }
            } else {
                this.showToast(res?.error || 'Failed to toggle module', 'error');
                await this.loadCommands();
            }
        } catch (err) {
            this.showToast(err.message, 'error');
            await this.loadCommands();
        }
    }

    // -------------------------------------------------------------
    // Bot Presence Form
    // -------------------------------------------------------------
    async savePresence(e) {
        e.preventDefault();
        const status = document.getElementById('presence-status-select').value;
        const activityType = document.getElementById('presence-type-select').value;
        const activityName = document.getElementById('presence-name-input').value.trim();

        try {
            const res = await this.apiFetch('/api/bot/presence', {
                method: 'POST',
                body: JSON.stringify({ status, activityType, activityName }),
            });

            if (res && res.success) {
                this.showToast('Presence updated live on Discord!', 'success');
                
                // Immediately reflect on mockup card
                const mockupDot = document.getElementById('mockup-status-dot');
                if (mockupDot) mockupDot.className = `presence-dot ${status}`;
                
                const mockupActivity = document.getElementById('mockup-activity-text');
                if (mockupActivity) mockupActivity.textContent = activityName || 'Online';

                this.pollOverview();
            } else {
                this.showToast(res.error || 'Failed to update presence', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    // -------------------------------------------------------------
    // Guild Settings & Onboarding Suite
    // -------------------------------------------------------------
    async loadGuildConfig() {
        if (!this.selectedGuildId) return;
        try {
            const data = await this.apiFetch(`/api/guild/${this.selectedGuildId}/config`);
            if (!data) return;
            const c = data.config || {};
            const w = data.welcome || {};

            // 1. Core & Staff
            const prefixInput = document.getElementById('setting-prefix');
            if (prefixInput) prefixInput.value = c.prefix || '!';

            const modroleSelect = document.getElementById('setting-modrole');
            if (modroleSelect) modroleSelect.value = c.modRole || '';

            const auditChanSelect = document.getElementById('setting-audit-chan');
            if (auditChanSelect) auditChanSelect.value = c.logging?.channels?.audit || '';

            const autoroleSelect = document.getElementById('setting-autorole');
            if (autoroleSelect) autoroleSelect.value = c.autoRole || (w.roleIds && w.roleIds[0]) || '';

            const autoroleDelay = document.getElementById('setting-autorole-delay');
            if (autoroleDelay) autoroleDelay.value = String(w.autoRoleDelay ?? 0);

            // 2. Welcome System
            const welcomeToggle = document.getElementById('setting-welcome-toggle');
            if (welcomeToggle) {
                welcomeToggle.checked = w.enabled !== false;
                this.updateWelcomeToggleUI(welcomeToggle.checked);
            }

            const welcomeChanSelect = document.getElementById('setting-welcome-chan');
            if (welcomeChanSelect) welcomeChanSelect.value = w.channelId || c.welcomeChannel || '';

            const welcomePing = document.getElementById('setting-welcome-ping');
            if (welcomePing) welcomePing.checked = Boolean(w.welcomePing);

            const welcomeTitle = document.getElementById('setting-welcome-title');
            if (welcomeTitle) welcomeTitle.value = w.welcomeEmbed?.title || '🎉 Welcome to Voidwallz!';

            const welcomeColor = document.getElementById('setting-welcome-color');
            if (welcomeColor) welcomeColor.value = w.welcomeEmbed?.color || '#113E35';

            const welcomeMsgText = document.getElementById('setting-welcome-msg');
            if (welcomeMsgText) welcomeMsgText.value = w.welcomeMessage || 'Welcome {user} to {server}! You are member #{count}.';

            const welcomeImg = document.getElementById('setting-welcome-img');
            if (welcomeImg) welcomeImg.value = w.welcomeImage || '';

            const welcomeThumb = document.getElementById('setting-welcome-thumb');
            if (welcomeThumb) welcomeThumb.value = w.welcomeThumbnail || '';

            // 3. Goodbye System
            const goodbyeToggle = document.getElementById('setting-goodbye-toggle');
            if (goodbyeToggle) {
                goodbyeToggle.checked = Boolean(w.goodbyeEnabled);
                this.updateGoodbyeToggleUI(goodbyeToggle.checked);
            }

            const goodbyeChanSelect = document.getElementById('setting-goodbye-chan');
            if (goodbyeChanSelect) goodbyeChanSelect.value = w.goodbyeChannelId || '';

            const goodbyeMsgText = document.getElementById('setting-goodbye-msg');
            if (goodbyeMsgText) goodbyeMsgText.value = w.leaveMessage || '{user} has left the server. We are now at {count} members.';

            const goodbyeImg = document.getElementById('setting-goodbye-img');
            if (goodbyeImg) goodbyeImg.value = w.leaveEmbed?.image || '';

            const goodbyeThumb = document.getElementById('setting-goodbye-thumb');
            if (goodbyeThumb) goodbyeThumb.value = w.leaveEmbed?.thumbnail || '';

            this.updateWelcomeSimulator();
        } catch (err) {
            console.error('Failed to load guild config:', err);
        }
    }

    updateWelcomeSimulator() {
        const title = document.getElementById('setting-welcome-title')?.value || '🎉 Welcome to Voidwallz!';
        const msg = document.getElementById('setting-welcome-msg')?.value || 'Welcome {user} to {server}! You are member #{count}.';
        const color = document.getElementById('setting-welcome-color')?.value || '#113E35';
        const image = document.getElementById('setting-welcome-img')?.value.trim();
        const thumb = document.getElementById('setting-welcome-thumb')?.value.trim();

        const simTitle = document.getElementById('sim-welcome-title');
        const simDesc = document.getElementById('sim-welcome-desc');
        const simBar = document.getElementById('sim-welcome-bar');
        const simImg = document.getElementById('sim-welcome-img');
        const simThumb = document.getElementById('sim-welcome-thumb');

        const guild = this.guilds.find(g => g.id === this.selectedGuildId);
        const count = guild ? guild.memberCount : 2;
        const serverName = guild ? guild.name : 'Voidwallz';

        const previewText = msg
            .replace(/{user}/g, '@NewMember')
            .replace(/{username}/g, 'NewMember')
            .replace(/{server}/g, serverName)
            .replace(/{count}/g, String(count))
            .replace(/{memberCount}/g, String(count));

        if (simTitle) simTitle.textContent = title;
        if (simDesc) simDesc.textContent = previewText;
        if (simBar) simBar.style.backgroundColor = color;

        if (simImg) {
            if (image) {
                simImg.src = image;
                simImg.classList.remove('hidden');
                simImg.onerror = () => simImg.classList.add('hidden');
            } else {
                simImg.classList.add('hidden');
                simImg.removeAttribute('src');
            }
        }

        if (simThumb) {
            if (thumb) {
                simThumb.src = thumb;
                simThumb.classList.remove('hidden');
                simThumb.onerror = () => simThumb.classList.add('hidden');
            } else {
                simThumb.classList.add('hidden');
                simThumb.removeAttribute('src');
            }
        }
    }

    updateWelcomeToggleUI(enabled) {
        const welcomeFormContainer = document.getElementById('setting-welcome-chan')?.closest('.broadcast-two-column');
        if (welcomeFormContainer) {
            welcomeFormContainer.style.opacity = enabled ? '1' : '0.45';
            welcomeFormContainer.style.pointerEvents = enabled ? 'auto' : 'none';
            welcomeFormContainer.style.transition = 'opacity 0.2s ease';
        }
    }

    updateGoodbyeToggleUI(enabled) {
        const goodbyeChan = document.getElementById('setting-goodbye-chan');
        const goodbyeSection = goodbyeChan ? goodbyeChan.closest('.editorial-card') : null;
        if (goodbyeSection) {
            const innerGrid = goodbyeSection.querySelector('.broadcast-two-column') || goodbyeSection.querySelector('div[style*="display: flex"]');
            if (innerGrid) {
                innerGrid.style.opacity = enabled ? '1' : '0.45';
                innerGrid.style.pointerEvents = enabled ? 'auto' : 'none';
                innerGrid.style.transition = 'opacity 0.2s ease';
            }
        }
    }

    async sendTestWelcome() {
        if (!this.selectedGuildId) return;

        const channelId = document.getElementById('setting-welcome-chan')?.value;
        const title = document.getElementById('setting-welcome-title')?.value.trim();
        const message = document.getElementById('setting-welcome-msg')?.value.trim();
        const color = document.getElementById('setting-welcome-color')?.value;
        const image = document.getElementById('setting-welcome-img')?.value.trim();
        const thumbnail = document.getElementById('setting-welcome-thumb')?.value.trim();

        if (!channelId) {
            this.showToast('Please select a welcome target channel first.', 'error');
            return;
        }

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/welcome/test`, {
                method: 'POST',
                body: JSON.stringify({ channelId, title, message, color, image, thumbnail })
            });

            if (res && res.success) {
                this.showToast(res.message || 'Test welcome message sent to Discord!', 'success');
            } else {
                this.showToast(res.error || 'Failed to dispatch test welcome message', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    async saveGuildConfig(e) {
        e.preventDefault();
        if (!this.selectedGuildId) return;

        const updates = {
            prefix: document.getElementById('setting-prefix')?.value.trim() || '!',
            modRole: document.getElementById('setting-modrole')?.value || null,
            auditLogChannel: document.getElementById('setting-audit-chan')?.value || null,
            autoRole: document.getElementById('setting-autorole')?.value || null,
            autoRoleDelay: Number(document.getElementById('setting-autorole-delay')?.value || 0),

            welcomeEnabled: document.getElementById('setting-welcome-toggle')?.checked,
            welcomeChannel: document.getElementById('setting-welcome-chan')?.value || null,
            welcomePing: document.getElementById('setting-welcome-ping')?.checked,
            welcomeTitle: document.getElementById('setting-welcome-title')?.value.trim() || '🎉 Welcome!',
            welcomeColor: document.getElementById('setting-welcome-color')?.value || '#113E35',
            welcomeMessage: document.getElementById('setting-welcome-msg')?.value.trim() || 'Welcome {user} to {server}!',
            welcomeImage: document.getElementById('setting-welcome-img')?.value.trim() || null,
            welcomeThumbnail: document.getElementById('setting-welcome-thumb')?.value.trim() || null,

            goodbyeEnabled: document.getElementById('setting-goodbye-toggle')?.checked,
            goodbyeChannel: document.getElementById('setting-goodbye-chan')?.value || null,
            goodbyeMessage: document.getElementById('setting-goodbye-msg')?.value.trim() || '{user} has left the server.',
            goodbyeImage: document.getElementById('setting-goodbye-img')?.value.trim() || null,
            goodbyeThumbnail: document.getElementById('setting-goodbye-thumb')?.value.trim() || null,
        };

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/config`, {
                method: 'POST',
                body: JSON.stringify(updates),
            });

            if (res && res.success) {
                this.showToast('Server setup & onboarding saved successfully!', 'success');
                this.loadGuildConfig();
            } else {
                this.showToast(res.error || 'Failed to save configuration', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    // -------------------------------------------------------------
    // Announcement Studio & Live Preview
    // -------------------------------------------------------------
    loadTemplate(type) {
        // Toggle subtab active classes
        ['rules', 'wallpapers', 'leveling', 'blank'].forEach(t => {
            const btn = document.getElementById(`btn-tpl-${t}`);
            if (btn) btn.classList.toggle('active', t === type);
        });

        const guild = this.guilds.find(g => g.id === this.selectedGuildId);
        const titleInput = document.getElementById('broadcast-title-input');
        const descInput = document.getElementById('broadcast-desc-input');
        const colorInput = document.getElementById('broadcast-color-input');
        const chanSelect = document.getElementById('broadcast-channel-select');
        const pingSelect = document.getElementById('broadcast-ping-select');

        if (!titleInput || !descInput || !colorInput || !chanSelect) return;

        if (type === 'rules') {
            titleInput.value = '📜 Voidwallz • Official Community Guidelines';
            colorInput.value = '#113E35';
            descInput.value = 
`Welcome to **Voidwallz**! To keep our community safe, creative, and respectful, all members must abide by the guidelines below:

### 1. Respect & Conduct
- Treat everyone with dignity. Harassment, hate speech, racism, sexism, and toxic behavior will result in an immediate strike or ban.
- Follow instructions given by the Server Staff (\`⚔️・Staff Team\`, \`🎓・Owner\`).

### 2. No Unauthorized Promotion or DM Advertising
- Direct messaging members with unsolicited invites, services, or self-promotion will lead to an immediate ban.
- Sharing other Discord server links in public chat without permission is strictly prohibited.

### 3. Channel Organization
- Post phone wallpapers exclusively in <#1502715437404651533> (\`•┃phone\`).
- Post desktop wallpapers exclusively in <#1502715437404651532> (\`•┃desktop\`).
- Keep general discussions in <#1502715437404651538> (\`•┃general\`).

### 4. Safety & Content Policies
- Absolutely no NSFW, Gore, Piracy, or Malicious files.
- Keep personal drama and arguments private; do not escalate conflicts in public channels.

### 5. Need Assistance?
- If you encounter a rule violator or have an inquiry, open a private support ticket in <#1502715437404651539> (\`•┃setup\`) or contact a \`⚔️・Moderator\`.`;

            // Auto-select rules channel if present
            if (guild && guild.textChannels) {
                const target = guild.textChannels.find(c => c.name.toLowerCase().includes('rule'));
                if (target) chanSelect.value = target.id;
            }
            if (pingSelect) pingSelect.value = 'none';
        } else if (type === 'wallpapers') {
            titleInput.value = '🖼️ Voidwallz • Wallpaper Submission Standards';
            colorInput.value = '#E29578';
            descInput.value =
`Help us keep Voidwallz the cleanest wallpaper gallery on Discord! Please adhere to our resolution and quality standards before posting:

### 📱 Phone Wallpapers (<#1502715437404651533>)
- **Minimum Resolution**: 1080 × 1920 (FHD 9:16)
- **Preferred Quality**: 1440p (QHD) or 4K AMOLED
- High contrast, dark/minimalist, and anime aesthetics are encouraged!

### 🖥️ Desktop Wallpapers (<#1502715437404651532>)
- **Minimum Resolution**: 1920 × 1080 (16:9)
- **Ultrawide & 4K**: 2560 × 1440 (2K) and 3840 × 2160 (4K) welcome
- Avoid stretched, pixelated, or heavily compressed JPEG artifacts.

### 🚫 Quality & Copyright Rules
- **No Watermarks**: Do not upload images covered in obtrusive promotional text.
- **Original Credit**: Credit artists or photographers where applicable.
- **Strictly SFW**: Non-safe content will be deleted immediately.`;

            // Auto-select desktop or server-assets or phone
            if (guild && guild.textChannels) {
                const target = guild.textChannels.find(c => c.name.toLowerCase().includes('desktop') || c.name.toLowerCase().includes('asset'));
                if (target) chanSelect.value = target.id;
            }
            if (pingSelect) pingSelect.value = 'none';
        } else if (type === 'leveling') {
            titleInput.value = '🏆 Voidwallz • Leveling & Role Rewards Guide';
            colorInput.value = '#108A65';
            descInput.value =
`Earn XP simply by chatting and engaging in conversation across Voidwallz text channels!

### 🌟 Milestone Roles & Unlocks
- 🏆 **Level 1**: Member verification and standard chat badge
- 🏆 **Level 5**: Embed link & custom sticker privileges
- 🏆 **Level 10**: Access to exclusive asset showcase channels
- 🏆 **Level 20**: Custom Voice Channel creation priority
- 🏆 **Level 30**: Access to VIP chat & priority server giveaways
- 🏆 **Level 50**: Veteran title & honorary Staff recognition

### 💎 Special Server Perks
- 💎 **VIP & MVP**: Granted to loyal and active community contributors.
- 🎨 **Color Roles**: Choose your custom display color in <#1502715437404651539>.

> **Note**: Spamming or sending repetitive short messages to farm XP will result in an XP reset.`;

            // Auto-select announcements or general
            if (guild && guild.textChannels) {
                const target = guild.textChannels.find(c => c.name.toLowerCase().includes('announc') || c.name.toLowerCase().includes('general'));
                if (target) chanSelect.value = target.id;
            }
            if (pingSelect) pingSelect.value = 'none';
        } else {
            // Blank Custom
            titleInput.value = 'Server Announcement';
            colorInput.value = '#114232';
            descInput.value = '';
            if (pingSelect) pingSelect.value = 'none';
        }

        this.updateBroadcastPreview();
    }

    updateBroadcastPreview() {
        const title = document.getElementById('broadcast-title-input')?.value || 'Server Announcement';
        const desc = document.getElementById('broadcast-desc-input')?.value || 'Write your announcement details here...';
        const color = document.getElementById('broadcast-color-input')?.value || '#114232';
        const image = document.getElementById('broadcast-image-input')?.value.trim();
        const thumb = document.getElementById('broadcast-thumb-input')?.value.trim();

        const prevTitle = document.getElementById('preview-title');
        const prevDesc = document.getElementById('preview-desc');
        const prevBar = document.getElementById('preview-color-bar');
        const prevImg = document.getElementById('preview-img');
        const prevThumb = document.getElementById('preview-thumb');

        if (prevTitle) prevTitle.textContent = title;
        if (prevDesc) prevDesc.textContent = desc;
        if (prevBar) prevBar.style.backgroundColor = color;

        if (prevImg) {
            if (image) {
                prevImg.src = image;
                prevImg.classList.remove('hidden');
                prevImg.onerror = () => prevImg.classList.add('hidden');
            } else {
                prevImg.classList.add('hidden');
                prevImg.removeAttribute('src');
            }
        }

        if (prevThumb) {
            if (thumb) {
                prevThumb.src = thumb;
                prevThumb.classList.remove('hidden');
                prevThumb.onerror = () => prevThumb.classList.add('hidden');
            } else {
                prevThumb.classList.add('hidden');
                prevThumb.removeAttribute('src');
            }
        }
    }

    async sendBroadcast(e) {
        e.preventDefault();
        const channelId = document.getElementById('broadcast-channel-select').value;
        const title = document.getElementById('broadcast-title-input').value.trim();
        const description = document.getElementById('broadcast-desc-input').value.trim();
        const color = document.getElementById('broadcast-color-input').value;
        const pingRole = document.getElementById('broadcast-ping-select').value;
        const imageUrl = document.getElementById('broadcast-image-input')?.value.trim() || undefined;
        const thumbnailUrl = document.getElementById('broadcast-thumb-input')?.value.trim() || undefined;

        if (!channelId) {
            this.showToast('Please select a target Discord channel.', 'error');
            return;
        }

        try {
            const res = await this.apiFetch('/api/broadcast', {
                method: 'POST',
                body: JSON.stringify({
                    guildId: this.selectedGuildId,
                    channelId,
                    title,
                    description,
                    color,
                    pingRole,
                    imageUrl,
                    thumbnailUrl,
                }),
            });

            if (res && res.success) {
                this.showToast('Embed announcement dispatched to Discord!', 'success');
                document.getElementById('broadcast-title-input').value = '';
                document.getElementById('broadcast-desc-input').value = '';
                const bImg = document.getElementById('broadcast-image-input');
                const bThumb = document.getElementById('broadcast-thumb-input');
                if (bImg) bImg.value = '';
                if (bThumb) bThumb.value = '';
                this.updateBroadcastPreview();
            } else {
                this.showToast(res.error || 'Failed to dispatch broadcast', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    // -------------------------------------------------------------
    // Real-Time Console Logs with Streamline Icons
    // -------------------------------------------------------------
    async loadLogs() {
        try {
            const filterLevel = document.getElementById('log-filter-select')?.value || 'all';
            const data = await this.apiFetch(`/api/logs?level=${filterLevel}&limit=120`);
            if (!data || !data.logs) return;

            const container = document.getElementById('logs-container');
            const countEl = document.getElementById('log-count-indicator');
            if (countEl) countEl.textContent = `${data.logs.length} entries`;

            if (data.logs.length === 0) {
                container.innerHTML = `
                    <div class="log-line info">
                        <span class="log-t">[--:--:--]</span>
                        <span class="log-tag info">INFO</span>
                        <span class="log-text" style="color: #6B8B84;">No log entries match the selected filter.</span>
                    </div>
                `;
                return;
            }

            container.innerHTML = data.logs.map(log => `
                <div class="log-line ${log.level}">
                    <span class="log-t">[${log.timestamp.split(' ')[1] || log.timestamp}]</span>
                    <span class="log-tag ${log.level}">${log.level.toUpperCase()}</span>
                    <span class="log-text">${this.escapeHtml(log.message)}</span>
                </div>
            `).join('');

            // Scroll to bottom
            container.scrollTop = container.scrollHeight;
        } catch (err) {
            console.warn('Failed to fetch logs:', err);
        }
    }

    clearLogs() {
        const container = document.getElementById('logs-container');
        if (container) {
            container.innerHTML = `
                <div class="log-line info">
                    <span class="log-t">[CONSOLE]</span>
                    <span class="log-tag info">INFO</span>
                    <span class="log-text" style="color: #6B8B84;">Terminal view cleared. Live stream running...</span>
                </div>
            `;
        }
        const countEl = document.getElementById('log-count-indicator');
        if (countEl) countEl.textContent = '0 entries';
    }

    // -------------------------------------------------------------
    // Interactive Panel Deployer (Tickets & Verification)
    // -------------------------------------------------------------
    switchPanelSubtab(mode) {
        const ticketView = document.getElementById('panel-ticket-view');
        const verifyView = document.getElementById('panel-verify-view');
        const btnTicket = document.getElementById('btn-subtab-ticket');
        const btnVerify = document.getElementById('btn-subtab-verify');

        if (mode === 'ticket') {
            if (ticketView) ticketView.classList.remove('hidden');
            if (verifyView) verifyView.classList.add('hidden');
            if (btnTicket) btnTicket.classList.add('active');
            if (btnVerify) btnVerify.classList.remove('active');
        } else {
            if (ticketView) ticketView.classList.add('hidden');
            if (verifyView) verifyView.classList.remove('hidden');
            if (btnTicket) btnTicket.classList.remove('active');
            if (btnVerify) btnVerify.classList.add('active');
        }
    }

    updateTicketPreview() {
        const title = document.getElementById('ticket-panel-title')?.value || '📩 Support Tickets';
        const desc = document.getElementById('ticket-panel-desc')?.value || 'Need assistance or have a question? Click the button below to open a private support ticket with server staff.';
        const color = document.getElementById('ticket-panel-color')?.value || '#113E35';
        const btnLabel = document.getElementById('ticket-btn-label')?.value || 'Create Ticket';
        const image = document.getElementById('ticket-panel-image')?.value.trim();
        const thumb = document.getElementById('ticket-panel-thumbnail')?.value.trim();

        const simTitle = document.getElementById('sim-ticket-title');
        const simDesc = document.getElementById('sim-ticket-desc');
        const simBar = document.getElementById('sim-ticket-bar');
        const simBtn = document.getElementById('sim-ticket-btn-label');
        const simImg = document.getElementById('sim-ticket-img');
        const simThumb = document.getElementById('sim-ticket-thumb');

        if (simTitle) simTitle.textContent = title;
        if (simDesc) simDesc.textContent = desc;
        if (simBar) simBar.style.backgroundColor = color;
        if (simBtn) simBtn.textContent = btnLabel;

        if (simImg) {
            if (image) {
                simImg.src = image;
                simImg.classList.remove('hidden');
                simImg.onerror = () => simImg.classList.add('hidden');
            } else {
                simImg.classList.add('hidden');
                simImg.removeAttribute('src');
            }
        }

        if (simThumb) {
            if (thumb) {
                simThumb.src = thumb;
                simThumb.classList.remove('hidden');
                simThumb.onerror = () => simThumb.classList.add('hidden');
            } else {
                simThumb.classList.add('hidden');
                simThumb.removeAttribute('src');
            }
        }
    }

    updateVerifyPreview() {
        const title = document.getElementById('verify-panel-title')?.value || '🛡️ Member Verification';
        const desc = document.getElementById('verify-panel-desc')?.value || 'Welcome to the server! Click the green button below to verify your account, unlock all channels, and start chatting.';
        const color = document.getElementById('verify-panel-color')?.value || '#108A65';
        const btnLabel = document.getElementById('verify-btn-text')?.value || 'Verify Membership';
        const image = document.getElementById('verify-panel-image')?.value.trim();
        const thumb = document.getElementById('verify-panel-thumbnail')?.value.trim();

        const simTitle = document.getElementById('sim-verify-title');
        const simDesc = document.getElementById('sim-verify-desc');
        const simBar = document.getElementById('sim-verify-bar');
        const simBtn = document.getElementById('sim-verify-btn-label');
        const simImg = document.getElementById('sim-verify-img');
        const simThumb = document.getElementById('sim-verify-thumb');

        if (simTitle) simTitle.textContent = title;
        if (simDesc) simDesc.textContent = desc;
        if (simBar) simBar.style.backgroundColor = color;
        if (simBtn) simBtn.textContent = btnLabel;

        if (simImg) {
            if (image) {
                simImg.src = image;
                simImg.classList.remove('hidden');
                simImg.onerror = () => simImg.classList.add('hidden');
            } else {
                simImg.classList.add('hidden');
                simImg.removeAttribute('src');
            }
        }

        if (simThumb) {
            if (thumb) {
                simThumb.src = thumb;
                simThumb.classList.remove('hidden');
                simThumb.onerror = () => simThumb.classList.add('hidden');
            } else {
                simThumb.classList.add('hidden');
                simThumb.removeAttribute('src');
            }
        }
    }

    async deployTicketPanel(e) {
        e.preventDefault();
        if (!this.selectedGuildId) return;

        const channelId = document.getElementById('ticket-panel-channel').value;
        const title = document.getElementById('ticket-panel-title').value.trim();
        const message = document.getElementById('ticket-panel-desc').value.trim();
        const color = document.getElementById('ticket-panel-color').value;
        const buttonLabel = document.getElementById('ticket-btn-label').value.trim();
        const staffRoleId = document.getElementById('ticket-staff-role').value || null;
        const categoryId = document.getElementById('ticket-category-select').value || null;
        const closedCategoryId = document.getElementById('ticket-closed-category-select').value || null;
        const imageUrl = document.getElementById('ticket-panel-image')?.value.trim() || undefined;
        const thumbnailUrl = document.getElementById('ticket-panel-thumbnail')?.value.trim() || undefined;

        if (!channelId) {
            this.showToast('Please select a target channel for the ticket panel.', 'error');
            return;
        }

        try {
            const res = await this.apiFetch('/api/panels/ticket', {
                method: 'POST',
                body: JSON.stringify({
                    guildId: this.selectedGuildId,
                    channelId,
                    title,
                    message,
                    buttonLabel,
                    color,
                    staffRoleId,
                    categoryId,
                    closedCategoryId,
                    imageUrl,
                    thumbnailUrl
                })
            });

            if (res && res.success) {
                this.showToast(res.message || 'Ticket panel deployed to Discord!', 'success');
            } else {
                this.showToast(res.error || 'Failed to deploy ticket panel', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    async deployVerifyPanel(e) {
        e.preventDefault();
        if (!this.selectedGuildId) return;

        const channelId = document.getElementById('verify-panel-channel').value;
        const title = document.getElementById('verify-panel-title').value.trim();
        const message = document.getElementById('verify-panel-desc').value.trim();
        const color = document.getElementById('verify-panel-color').value;
        const buttonText = document.getElementById('verify-btn-text').value.trim();
        const roleId = document.getElementById('verify-role-select').value;
        const imageUrl = document.getElementById('verify-panel-image')?.value.trim() || undefined;
        const thumbnailUrl = document.getElementById('verify-panel-thumbnail')?.value.trim() || undefined;

        if (!channelId || !roleId) {
            this.showToast('Please select both a channel and a role to grant.', 'error');
            return;
        }

        try {
            const res = await this.apiFetch('/api/panels/verification', {
                method: 'POST',
                body: JSON.stringify({
                    guildId: this.selectedGuildId,
                    channelId,
                    title,
                    message,
                    buttonText,
                    color,
                    roleId,
                    imageUrl,
                    thumbnailUrl
                })
            });

            if (res && res.success) {
                this.showToast(res.message || 'Verification panel deployed to Discord!', 'success');
            } else {
                this.showToast(res.error || 'Failed to deploy verification gate', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    // -------------------------------------------------------------
    // Automated Server Infrastructure Provisioning
    // -------------------------------------------------------------
    async provisionTickets() {
        if (!this.selectedGuildId) {
            this.showToast('Please select a server first', 'error');
            return;
        }

        const btn = document.getElementById('btn-provision-tickets-quick');
        const oldText = btn ? btn.textContent : '';
        if (btn) {
            btn.disabled = true;
            btn.textContent = '⚡ Provisioning...';
        }

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/provision/tickets`, {
                method: 'POST'
            });

            if (res && res.success) {
                this.showToast(res.message || 'Ticket infrastructure provisioned in Discord!', 'success');
                await this.loadGuilds();
                if (res.data) {
                    if (res.data.panelChannelId) {
                        const chanEl = document.getElementById('ticket-panel-channel');
                        if (chanEl) chanEl.value = res.data.panelChannelId;
                    }
                    if (res.data.categoryId) {
                        const catEl = document.getElementById('ticket-category-select');
                        if (catEl) catEl.value = res.data.categoryId;
                    }
                    if (res.data.closedCategoryId) {
                        const closedCatEl = document.getElementById('ticket-closed-category-select');
                        if (closedCatEl) closedCatEl.value = res.data.closedCategoryId;
                    }
                    if (res.data.staffRoleId) {
                        const roleEl = document.getElementById('ticket-staff-role');
                        if (roleEl) roleEl.value = res.data.staffRoleId;
                    }
                }
            } else {
                this.showToast(res.error || 'Failed to provision ticket structure', 'error');
            }
        } catch (err) {
            this.showToast(err.message || 'Error provisioning tickets', 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = oldText || '⚡ Auto-Provision';
            }
        }
    }

    async provisionVerification() {
        if (!this.selectedGuildId) {
            this.showToast('Please select a server first', 'error');
            return;
        }

        const btn = document.getElementById('btn-provision-verify-quick');
        const oldText = btn ? btn.textContent : '';
        if (btn) {
            btn.disabled = true;
            btn.textContent = '⚡ Provisioning...';
        }

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/provision/verification`, {
                method: 'POST'
            });

            if (res && res.success) {
                this.showToast(res.message || 'Verification gateway provisioned & deployed in Discord!', 'success');
                await this.loadGuilds();
                if (res.data) {
                    if (res.data.verifyChannelId) {
                        const chanEl = document.getElementById('verify-panel-channel');
                        if (chanEl) chanEl.value = res.data.verifyChannelId;
                    }
                    if (res.data.memberRoleId) {
                        const roleEl = document.getElementById('verify-role-select');
                        if (roleEl) roleEl.value = res.data.memberRoleId;
                    }
                }
            } else {
                this.showToast(res.error || 'Failed to provision verification structure', 'error');
            }
        } catch (err) {
            this.showToast(err.message || 'Error provisioning verification gateway', 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                btn.textContent = oldText || '⚡ Auto-Provision';
            }
        }
    }

    async provisionFull() {
        if (!this.selectedGuildId) {
            this.showToast('Please select a server first', 'error');
            return;
        }

        if (!confirm('This will provision the full server architecture in Discord (Categories, Channels, Roles, and Interactive Panels for Tickets, Verification, Onboarding, and Audit Logs). Proceed?')) {
            return;
        }

        try {
            this.showToast('Deploying full server architecture to Discord...', 'info');
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/provision/full`, {
                method: 'POST'
            });

            if (res && res.success) {
                this.showToast(res.message || 'Full server architecture successfully deployed!', 'success');
                await this.loadGuilds();
            } else {
                this.showToast(res.error || 'Failed to deploy full server architecture', 'error');
            }
        } catch (err) {
            this.showToast(err.message || 'Error executing full provisioning', 'error');
        }
    }

    async provisionOnboarding() {
        if (!this.selectedGuildId) {
            this.showToast('Please select a server first', 'error');
            return;
        }

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/provision/onboarding`, {
                method: 'POST'
            });

            if (res && res.success) {
                this.showToast(res.message || 'Onboarding infrastructure provisioned!', 'success');
                await this.loadGuilds();
                if (res.data) {
                    if (res.data.welcomeChannelId) {
                        const wEl = document.getElementById('setting-welcome-chan');
                        if (wEl) wEl.value = res.data.welcomeChannelId;
                    }
                    if (res.data.memberRoleId) {
                        const rEl = document.getElementById('setting-autorole');
                        if (rEl) rEl.value = res.data.memberRoleId;
                    }
                }
            } else {
                this.showToast(res.error || 'Failed to provision onboarding', 'error');
            }
        } catch (err) {
            this.showToast(err.message || 'Error provisioning onboarding', 'error');
        }
    }

    async provisionAudit() {
        if (!this.selectedGuildId) {
            this.showToast('Please select a server first', 'error');
            return;
        }

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/provision/audit`, {
                method: 'POST'
            });

            if (res && res.success) {
                this.showToast(res.message || 'Audit infrastructure provisioned!', 'success');
                await this.loadGuilds();
                if (res.data) {
                    if (res.data.logsChannelId) {
                        const lEl = document.getElementById('setting-audit-chan');
                        if (lEl) lEl.value = res.data.logsChannelId;
                    }
                    if (res.data.modRoleId) {
                        const mEl = document.getElementById('setting-modrole');
                        if (mEl) mEl.value = res.data.modRoleId;
                    }
                }
            } else {
                this.showToast(res.error || 'Failed to provision audit logs', 'error');
            }
        } catch (err) {
            this.showToast(err.message || 'Error provisioning audit logs', 'error');
        }
    }

    async createCustomResource() {
        if (!this.selectedGuildId) {
            this.showToast('Please select a server first', 'error');
            return;
        }

        const type = document.getElementById('custom-res-type')?.value || 'text';
        const name = document.getElementById('custom-res-name')?.value?.trim();
        const parentId = document.getElementById('custom-res-parent')?.value || null;

        if (!name) {
            this.showToast('Please enter a name for the channel or role', 'error');
            return;
        }

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/provision/custom`, {
                method: 'POST',
                body: JSON.stringify({ type, name, parentId })
            });

            if (res && res.success) {
                this.showToast(res.message || `Created ${type} "${name}" in Discord!`, 'success');
                document.getElementById('custom-res-name').value = '';
                await this.loadGuilds();
            } else {
                this.showToast(res.error || 'Failed to create resource', 'error');
            }
        } catch (err) {
            this.showToast(err.message || 'Error creating resource in Discord', 'error');
        }
    }

    // -------------------------------------------------------------
    // Economy Treasury & Leveling Rankings
    // -------------------------------------------------------------
    async loadCommunityData() {
        if (!this.selectedGuildId) return;
        await Promise.all([
            this.loadLeaderboard(),
            this.loadEconomy()
        ]);
    }

    async loadLeaderboard() {
        if (!this.selectedGuildId) return;
        const container = document.getElementById('xp-leaderboard-list');
        const statusVal = document.getElementById('lvl-status-val');

        try {
            const data = await this.apiFetch(`/api/guild/${this.selectedGuildId}/leaderboard`);
            if (!data) return;

            if (statusVal) {
                statusVal.textContent = data.config && data.config.enabled === false ? 'Disabled' : 'Active';
            }

            if (!container) return;
            if (!data.leaderboard || data.leaderboard.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; color: var(--ink-muted); padding: 24px; font-size: 13px;">
                        No XP activity recorded yet in this server. Chat in text channels to earn XP!
                    </div>
                `;
                return;
            }

            container.innerHTML = data.leaderboard.map(item => `
                <div class="leaderboard-row">
                    <span class="lb-rank-badge rank-${item.rank}">#${item.rank}</span>
                    <img class="lb-user-avatar" src="${item.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="avatar">
                    <div class="lb-user-details">
                        <strong class="lb-user-name">${this.escapeHtml(item.username)}</strong>
                        <span class="lb-user-sub">${Number(item.xp).toLocaleString()} XP Points</span>
                    </div>
                    <span class="lb-stat-pill">Level ${item.level}</span>
                </div>
            `).join('');
        } catch (err) {
            console.error('Failed to load leaderboard:', err);
            if (container) {
                container.innerHTML = `<div style="text-align: center; color: var(--terracotta); padding: 16px;">Failed to load leaderboard data.</div>`;
            }
        }
    }

    async loadEconomy() {
        if (!this.selectedGuildId) return;
        const container = document.getElementById('economy-richest-list');
        const totalCoinsEl = document.getElementById('eco-total-coins');
        const totalUsersEl = document.getElementById('eco-total-users');
        const avgNetEl = document.getElementById('eco-avg-networth');

        try {
            const data = await this.apiFetch(`/api/guild/${this.selectedGuildId}/economy`);
            if (!data) return;

            if (data.stats) {
                if (totalCoinsEl) totalCoinsEl.textContent = Number(data.stats.totalCirculation || 0).toLocaleString();
                if (totalUsersEl) totalUsersEl.textContent = Number(data.stats.totalUsers || 0).toLocaleString();
                if (avgNetEl) avgNetEl.textContent = Number(data.stats.averageNetWorth || 0).toLocaleString();
            }

            if (!container) return;
            if (!data.topUsers || data.topUsers.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; color: var(--ink-muted); padding: 24px; font-size: 13px;">
                        No wallets created yet. Run economy commands (/work, /daily) to open an account!
                    </div>
                `;
                return;
            }

            container.innerHTML = data.topUsers.map(user => `
                <div class="leaderboard-row">
                    <span class="lb-rank-badge rank-${user.rank}">#${user.rank}</span>
                    <img class="lb-user-avatar" src="${user.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}" alt="avatar">
                    <div class="lb-user-details">
                        <strong class="lb-user-name">${this.escapeHtml(user.username)}</strong>
                        <span class="lb-user-sub">Wallet: ${Number(user.wallet).toLocaleString()} • Bank: ${Number(user.bank).toLocaleString()}</span>
                    </div>
                    <span class="lb-stat-pill" style="color: var(--pine-deep); font-weight: 700;">🪙 ${Number(user.netWorth).toLocaleString()}</span>
                </div>
            `).join('');
        } catch (err) {
            console.error('Failed to load economy data:', err);
            if (container) {
                container.innerHTML = `<div style="text-align: center; color: var(--terracotta); padding: 16px;">Failed to load economy treasury.</div>`;
            }
        }
    }

    async handleLevelOverride(e) {
        e.preventDefault();
        if (!this.selectedGuildId) return;

        const userId = document.getElementById('lvl-target-user').value.trim();
        const action = document.getElementById('lvl-action-select').value;
        const value = document.getElementById('lvl-value-input').value;

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/levels/modify`, {
                method: 'POST',
                body: JSON.stringify({ userId, action, value })
            });

            if (res && res.success) {
                this.showToast(res.message || 'Level modified successfully!', 'success');
                this.loadLeaderboard();
                document.getElementById('lvl-target-user').value = '';
            } else {
                this.showToast(res.error || 'Failed to modify level', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    async handleEconomyGrant(e) {
        e.preventDefault();
        if (!this.selectedGuildId) return;

        const userId = document.getElementById('eco-target-user').value.trim();
        const walletChange = document.getElementById('eco-wallet-change').value || 0;
        const bankChange = document.getElementById('eco-bank-change').value || 0;

        try {
            const res = await this.apiFetch(`/api/guild/${this.selectedGuildId}/economy/modify`, {
                method: 'POST',
                body: JSON.stringify({ userId, walletChange, bankChange })
            });

            if (res && res.success) {
                this.showToast(res.message || 'Balance adjusted successfully!', 'success');
                this.loadEconomy();
                document.getElementById('eco-target-user').value = '';
            } else {
                this.showToast(res.error || 'Failed to adjust balance', 'error');
            }
        } catch (err) {
            this.showToast(err.message, 'error');
        }
    }

    // -------------------------------------------------------------
    // Utilities & Navigation
    // -------------------------------------------------------------
    switchTab(tabId) {
        if (!tabId) return;
        if (tabId === 'studio') tabId = 'broadcast';
        this.currentTab = tabId;

        // Map sub-views to primary minimal navbar items
        const navMap = {
            'overview': 'overview',
            'commands': 'commands',
            'broadcast': 'studio',
            'panels': 'studio',
            'studio': 'studio',
            'settings': 'settings',
            'presence': 'settings',
            'community': 'community',
            'logs': 'logs'
        };
        const activeNavKey = navMap[tabId] || tabId;

        // Update nav buttons
        document.querySelectorAll('.nav-links .nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === activeNavKey);
        });

        // Update pane visibility
        document.querySelectorAll('.tab-pane').forEach(pane => {
            const isTarget = pane.id === `tab-${tabId}`;
            pane.classList.toggle('active', isTarget);
            pane.style.display = isTarget ? 'block' : 'none';
        });

        // Update in-page subtab switchers if present
        if (tabId === 'broadcast' || tabId === 'panels') {
            document.querySelectorAll('#tab-broadcast .subtab-pill-bar .subtab-btn, #tab-panels .subtab-pill-bar .subtab-btn').forEach(btn => {
                const isRules = btn.textContent.includes('Rules') && tabId === 'broadcast';
                const isPanels = btn.textContent.includes('Panels') && tabId === 'panels';
                btn.classList.toggle('active', isRules || isPanels);
            });
        }

        if (tabId === 'settings' || tabId === 'presence') {
            document.querySelectorAll('#tab-settings .subtab-pill-bar .subtab-btn, #tab-presence .subtab-pill-bar .subtab-btn').forEach(btn => {
                const isSettings = btn.textContent.includes('Server Setup') && tabId === 'settings';
                const isPresence = btn.textContent.includes('Bot Presence') && tabId === 'presence';
                btn.classList.toggle('active', isSettings || isPresence);
            });
        }

        // Trigger load on switch
        if (tabId === 'logs') this.loadLogs();
        if (tabId === 'commands') this.loadCommands();
        if (tabId === 'settings') this.loadGuildConfig();
        if (tabId === 'presence') this.loadBotIdentity();
        if (tabId === 'panels') {
            this.populateGuildDependentForms();
            this.updateTicketPreview();
            this.updateVerifyPreview();
        }
        if (tabId === 'community') this.loadCommunityData();
        if (tabId === 'broadcast') {
            this.populateGuildDependentForms();
            const desc = document.getElementById('broadcast-desc-input')?.value;
            if (!desc || desc.trim() === '' || desc === 'Write your announcement details here...') {
                this.loadTemplate('rules');
            } else {
                this.updateBroadcastPreview();
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    formatDuration(ms) {
        if (!ms || ms < 0) return '0s';
        const s = Math.floor(ms / 1000) % 60;
        const m = Math.floor(ms / 60000) % 60;
        const h = Math.floor(ms / 3600000) % 24;
        const d = Math.floor(ms / 86400000);
        if (d > 0) return `${d}d ${h}h`;
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m ${s}s`;
    }

    escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    showToast(message, type = 'info') {
        const tray = document.getElementById('toast-container');
        if (!tray) return;

        const toast = document.createElement('div');
        toast.className = `clean-toast toast-${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="#108A65" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
        } else if (type === 'error') {
            iconSvg = `<svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
        } else {
            iconSvg = `<svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        }

        toast.innerHTML = `${iconSvg}<span>${this.escapeHtml(message)}</span>`;
        tray.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.25s ease';
            setTimeout(() => toast.remove(), 250);
        }, 3600);
    }

    bindEvents() {
        // Nav Links Buttons
        document.querySelectorAll('.nav-links .nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetBtn = e.target.closest('.nav-btn');
                const tab = targetBtn ? targetBtn.dataset.tab : btn.dataset.tab;
                if (tab) this.switchTab(tab);
            });
        });

        // Login Form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const pwd = document.getElementById('password-input').value;
            this.login(pwd);
        });

        // Close Login Modal when clicking backdrop
        document.getElementById('login-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'login-modal') {
                this.hideLogin();
            }
        });

        // Escape Key Closes Modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideLogin();
            }
        });

        // Toggle Password Visibility with Streamline Eye
        document.getElementById('toggle-pwd-btn')?.addEventListener('click', () => {
            const input = document.getElementById('password-input');
            const btn = document.getElementById('toggle-pwd-btn');
            if (input && btn) {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                btn.innerHTML = isPassword ? `
                    <svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                ` : `
                    <svg class="streamline-icon sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                `;
            }
        });

        // Guild Selector
        document.getElementById('active-guild-select')?.addEventListener('change', (e) => {
            this.selectedGuildId = e.target.value;
            this.populateGuildDependentForms();
            this.loadCommands();
            this.loadGuildConfig();
            this.showToast('Switched server context.', 'info');
        });

        // Command Search Filter
        document.getElementById('command-search')?.addEventListener('input', () => this.renderCommands());

        // Presence Form
        document.getElementById('presence-form')?.addEventListener('submit', (e) => this.savePresence(e));

        // Guild Settings Form
        document.getElementById('guild-settings-form')?.addEventListener('submit', (e) => this.saveGuildConfig(e));

        // Welcome Simulator & Test Dispatch Listeners
        document.getElementById('setting-welcome-toggle')?.addEventListener('change', (e) => this.updateWelcomeToggleUI(e.target.checked));
        document.getElementById('setting-goodbye-toggle')?.addEventListener('change', (e) => this.updateGoodbyeToggleUI(e.target.checked));
        document.getElementById('setting-welcome-title')?.addEventListener('input', () => this.updateWelcomeSimulator());
        document.getElementById('setting-welcome-color')?.addEventListener('input', () => this.updateWelcomeSimulator());
        document.getElementById('setting-welcome-msg')?.addEventListener('input', () => this.updateWelcomeSimulator());
        document.getElementById('setting-welcome-img')?.addEventListener('input', () => this.updateWelcomeSimulator());
        document.getElementById('setting-welcome-thumb')?.addEventListener('input', () => this.updateWelcomeSimulator());
        document.getElementById('btn-test-welcome')?.addEventListener('click', () => this.sendTestWelcome());

        // Broadcast Form & Live Preview Listeners
        document.getElementById('broadcast-form')?.addEventListener('submit', (e) => this.sendBroadcast(e));
        document.getElementById('broadcast-title-input')?.addEventListener('input', () => this.updateBroadcastPreview());
        document.getElementById('broadcast-desc-input')?.addEventListener('input', () => this.updateBroadcastPreview());
        document.getElementById('broadcast-color-input')?.addEventListener('input', () => this.updateBroadcastPreview());
        document.getElementById('broadcast-image-input')?.addEventListener('input', () => this.updateBroadcastPreview());
        document.getElementById('broadcast-thumb-input')?.addEventListener('input', () => this.updateBroadcastPreview());

        // Ticket Panel Preview Listeners & Submit
        document.getElementById('ticket-panel-form')?.addEventListener('submit', (e) => this.deployTicketPanel(e));
        document.getElementById('ticket-panel-title')?.addEventListener('input', () => this.updateTicketPreview());
        document.getElementById('ticket-panel-desc')?.addEventListener('input', () => this.updateTicketPreview());
        document.getElementById('ticket-panel-color')?.addEventListener('input', () => this.updateTicketPreview());
        document.getElementById('ticket-btn-label')?.addEventListener('input', () => this.updateTicketPreview());
        document.getElementById('ticket-panel-image')?.addEventListener('input', () => this.updateTicketPreview());
        document.getElementById('ticket-panel-thumbnail')?.addEventListener('input', () => this.updateTicketPreview());

        // Verification Panel Preview Listeners & Submit
        document.getElementById('verify-panel-form')?.addEventListener('submit', (e) => this.deployVerifyPanel(e));
        document.getElementById('verify-panel-title')?.addEventListener('input', () => this.updateVerifyPreview());
        document.getElementById('verify-panel-desc')?.addEventListener('input', () => this.updateVerifyPreview());
        document.getElementById('verify-panel-color')?.addEventListener('input', () => this.updateVerifyPreview());
        document.getElementById('verify-btn-text')?.addEventListener('input', () => this.updateVerifyPreview());
        document.getElementById('verify-panel-image')?.addEventListener('input', () => this.updateVerifyPreview());
        document.getElementById('verify-panel-thumbnail')?.addEventListener('input', () => this.updateVerifyPreview());

        // Level Override & Economy Grant Forms
        document.getElementById('level-override-form')?.addEventListener('submit', (e) => this.handleLevelOverride(e));
        document.getElementById('economy-grant-form')?.addEventListener('submit', (e) => this.handleEconomyGrant(e));

        // Logs Filter & Clear
        document.getElementById('log-filter-select')?.addEventListener('change', () => this.loadLogs());
        document.getElementById('clear-logs-btn')?.addEventListener('click', () => this.clearLogs());

        // Custom Resource Creator Type Toggle
        document.getElementById('custom-res-type')?.addEventListener('change', (e) => {
            const isRole = e.target.value === 'role';
            const isCat = e.target.value === 'category';
            const parentGroup = document.getElementById('custom-res-parent-group');
            if (parentGroup) {
                parentGroup.style.display = (isRole || isCat) ? 'none' : 'block';
            }
        });
    }
}

// Global instance
window.dashboard = new VoidDashboard();
