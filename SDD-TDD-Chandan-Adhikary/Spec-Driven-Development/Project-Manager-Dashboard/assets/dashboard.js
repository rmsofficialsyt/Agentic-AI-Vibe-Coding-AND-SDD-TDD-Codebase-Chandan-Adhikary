/**
 * Project-Manager-Dashboard — Teamify Master Engine & Reactive Telemetry
 * Production-grade zero-dependency reactive client with Anime.js and Motion integration.
 */

class BentoDashboardClient {
  static apiHeaders() {
    const meta = document.querySelector('meta[name="dashboard-token"]');
    return { 'Content-Type': 'application/json', 'X-Dashboard-Token': meta ? meta.content : '' };
  }

  constructor() {
    this.state = null;
    this.activeView = 'overview';
    this.theme = localStorage.getItem('pm_dashboard_theme') || 'dark';
    this.taskViewMode = 'kanban'; // 'kanban' | 'list'
    this.taskFilter = 'ALL';
    this.searchQuery = '';
    this.draggedTaskId = null;
    this.currentTddState = 'GREEN';
    this.errorFilter = 'all';
    this.errorSearchQuery = '';
    this.activeLogFile = 'dev.log';
    this.logTailLines = 100;
    this.logSearchQuery = '';
    this.logAutoScroll = true;
    this.isFetchingLog = false;

    this.initMotion();
    this.initTheme();
    this.bindNavigation();
    this.bindTaskControls();
    this.bindActionControls();
    this.bindSearchFilter();
    this.bindKeyboardShortcuts();
    this.initLiveClock();
    this.initTokenTimers();
    this.bindAcModalEvents();
    this.bindErrorControls();
    this.bindLogControls();
    this.bindArchitectureEvents();
    this.connectSSE();
  }

  initMotion() {
    this.motion = window.Motion || null;
    this.springSnappy = { type: 'spring', stiffness: 500, damping: 28, mass: 0.8 };
    this.springGentle = { type: 'spring', stiffness: 220, damping: 24, mass: 1 };
  }

  animateSpring(target, keyframes, options = this.springSnappy) {
    if (this.motion && this.motion.animate) {
      try {
        return this.motion.animate(target, keyframes, options);
      } catch (e) {}
    }
    return null;
  }

  initTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    if (document.body) {
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${this.theme}`);
    }
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = this.theme === 'dark' ? '🌙' : '☀️';
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pm_dashboard_theme', this.theme);
    this.initTheme();
    if (this.state) {
      this.renderDeliveries();
      this.renderOrbitalHealth();
      this.renderPillars();
    }
    this.showToast(`Theme switched to ${this.theme}`);
  }

  /* --------------------------------------------------------------------------
     1. NAVIGATION SYSTEM & RESPONSIVE DRAWER TOGGLE
     -------------------------------------------------------------------------- */
  bindNavigation() {
    // Sidebar Nav Items click
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewTarget = item.getAttribute('data-view');
        this.switchView(viewTarget);
        this.closeMobileSidebar();
      });
    });

    // Mobile Hamburger Button
    const hamburgerBtn = document.getElementById('btn-toggle-sidebar');
    const sidebar = document.getElementById('app-sidebar');
    if (hamburgerBtn && sidebar) {
      hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
      });
    }

    // Close sidebar on background click in mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 600 && sidebar && sidebar.classList.contains('sidebar-open')) {
        if (!sidebar.contains(e.target) && !hamburgerBtn.contains(e.target)) {
          this.closeMobileSidebar();
        }
      }
    });

    // Overview Card Click-Throughs to Granular Views
    const cardTaskStrength = document.getElementById('card-task-strength');
    if (cardTaskStrength) {
      cardTaskStrength.addEventListener('click', (e) => {
        if (!e.target.closest('.clean-select')) this.switchView('tasks');
      });
    }

    const cardSystemHealth = document.getElementById('card-system-health');
    if (cardSystemHealth) {
      cardSystemHealth.addEventListener('click', (e) => {
        if (!e.target.closest('.clean-select')) this.switchView('specs');
      });
    }

    const cardDeliveries = document.getElementById('card-project-deliveries');
    if (cardDeliveries) {
      cardDeliveries.addEventListener('click', () => this.switchView('specs'));
    }

    const notifCard = document.getElementById('card-notifications');
    const viewAllNotifs = document.getElementById('btn-view-all-notifs');
    const notifBell = document.getElementById('btn-notif-bell');
    if (notifCard) notifCard.addEventListener('click', () => this.switchView('git'));
    if (viewAllNotifs) viewAllNotifs.addEventListener('click', (e) => { e.stopPropagation(); this.switchView('git'); });
    if (notifBell) notifBell.addEventListener('click', () => this.switchView('git'));

    // Pillar Chart Legend Chips click-to-filter
    document.querySelectorAll('.legend-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const status = chip.getAttribute('data-status');
        this.switchView('tasks');
        this.setTaskFilter(status);
      });
    });
  }

  closeMobileSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) sidebar.classList.remove('sidebar-open');
  }

  switchView(viewName) {
    if (!viewName) return;
    this.activeView = viewName;

    // Update Nav item active classes
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update View panels
    document.querySelectorAll('.dashboard-view-panel').forEach(panel => {
      if (panel.id === `view-${viewName}`) {
        panel.classList.add('active');
        this.animateSpring(panel, { opacity: [0, 1], y: [6, 0] }, this.springGentle);
      } else {
        panel.classList.remove('active');
      }
    });

    if (viewName === 'logs') {
      this.fetchActiveLogContent();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* --------------------------------------------------------------------------
     2. KANBAN VS LINEAR LIST VIEW CONTROLS & FILTER TABS
     -------------------------------------------------------------------------- */
  bindTaskControls() {
    const btnKanban = document.getElementById('btn-view-kanban');
    const btnList = document.getElementById('btn-view-list');
    const kanbanWrapper = document.getElementById('kanban-board-container');
    const listWrapper = document.getElementById('task-list-container');

    if (btnKanban && btnList) {
      btnKanban.addEventListener('click', () => {
        this.taskViewMode = 'kanban';
        btnKanban.classList.add('active');
        btnList.classList.remove('active');
        if (kanbanWrapper) kanbanWrapper.style.display = 'grid';
        if (listWrapper) listWrapper.style.display = 'none';
        this.renderKanbanTasks();
      });

      btnList.addEventListener('click', () => {
        this.taskViewMode = 'list';
        btnList.classList.add('active');
        btnKanban.classList.remove('active');
        if (kanbanWrapper) kanbanWrapper.style.display = 'none';
        if (listWrapper) listWrapper.style.display = 'flex';
        this.renderTaskList();
      });
    }

    // Filter Tabs
    document.querySelectorAll('#task-filter-tabs .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#task-filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.taskFilter = tab.getAttribute('data-filter') || 'ALL';
        if (this.taskViewMode === 'kanban') {
          this.renderKanbanTasks();
        } else {
          this.renderTaskList();
        }
      });
    });
  }

  setTaskFilter(status) {
    this.taskFilter = status;
    document.querySelectorAll('#task-filter-tabs .filter-tab').forEach(t => {
      if (t.getAttribute('data-filter') === status) t.classList.add('active');
      else t.classList.remove('active');
    });
    if (this.taskViewMode === 'kanban') this.renderKanbanTasks();
    else this.renderTaskList();
  }

  /* --------------------------------------------------------------------------
     3. LIVE SEARCH FILTER
     -------------------------------------------------------------------------- */
  bindSearchFilter() {
    const searchInput = document.getElementById('header-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target.value || '').trim().toLowerCase();
        this.render();
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. ACTION CONTROL CONSOLE
     -------------------------------------------------------------------------- */
  bindActionControls() {
    document.querySelectorAll('.action-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'copy-standup') {
          this.copyStandupToClipboard();
        } else {
          this.runAction(action);
        }
      });
    });

    // Theme toggle & Sidebar CTA
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    const btnSidebarCta = document.getElementById('btn-sidebar-cta');
    if (btnSidebarCta) btnSidebarCta.addEventListener('click', () => this.runAction('run-tests'));

    const btnRunTestsSpecs = document.getElementById('btn-run-tests-specs');
    if (btnRunTestsSpecs) {
      btnRunTestsSpecs.addEventListener('click', () => {
        this.switchView('actions');
        this.runAction('run-tests');
      });
    }

    const btnCloseDrawer = document.getElementById('close-drawer');
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', () => this.closeDrawer());
  }

  async runAction(action) {
    const now = new Date();
    const timeStr = `${this.formatDDMMYYYY(now)} | ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`;

    const terminalStatus = document.getElementById('terminal-status-pill');
    const terminalLastRun = document.getElementById('terminal-last-run');
    const terminalBody = document.getElementById('action-terminal-body');

    if (terminalStatus) {
      terminalStatus.textContent = 'Executing...';
      terminalStatus.className = 'badge-pill warn';
    }
    if (terminalLastRun) terminalLastRun.textContent = `Running: ${action} (${timeStr})`;
    if (terminalBody) terminalBody.textContent = `⚡ [${timeStr}] Initializing action: ${action}...\nExecuting pipeline task on 127.0.0.1...`;

    this.openDrawer(`⚡ [${timeStr}] Executing action: ${action}...`);

    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: BentoDashboardClient.apiHeaders(),
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      const output = data.output || data.message || 'Execution completed successfully.';

      if (terminalStatus) {
        terminalStatus.textContent = data.success !== false ? 'Success' : 'Error';
        terminalStatus.className = data.success !== false ? 'badge-pill optimal' : 'badge-pill crit';
      }
      if (terminalLastRun) terminalLastRun.textContent = `Completed at ${timeStr}`;
      if (terminalBody) terminalBody.textContent = `⚡ [${timeStr}] Action ${action} completed:\n\n${output}`;

      const drawerOutput = document.getElementById('drawer-output');
      if (drawerOutput) drawerOutput.textContent = output;

      this.showToast(`Action ${action} executed successfully`);
    } catch (err) {
      const errTxt = `Error executing action: ${err.message}`;
      if (terminalStatus) {
        terminalStatus.textContent = 'Failed';
        terminalStatus.className = 'badge-pill crit';
      }
      if (terminalBody) terminalBody.textContent = errTxt;
      const drawerOutput = document.getElementById('drawer-output');
      if (drawerOutput) drawerOutput.textContent = errTxt;
      this.showToast(`Failed: ${err.message}`);
    }
  }

  openDrawer(initialText = '') {
    const drawer = document.getElementById('test-drawer');
    const outputEl = document.getElementById('drawer-output');
    if (outputEl) outputEl.textContent = initialText;
    if (drawer) drawer.classList.add('active');
  }

  closeDrawer() {
    const drawer = document.getElementById('test-drawer');
    if (drawer) drawer.classList.remove('active');
  }

  copyStandupToClipboard() {
    if (!this.state) return;
    const { kpis, currentDate } = this.state;
    const dateStr = currentDate || this.formatDDMMYYYY(new Date());
    const standup = `### 📋 Daily Standup Summary (${dateStr})\n- **Scope Progress**: ${kpis.scopeProgress}%\n- **Active In-Flight**: ${kpis.activeTasks} tasks\n- **Completed Tasks**: ${kpis.completedTasks}\n- **AC Contract Pass Rate**: ${kpis.acPassRate}%\n- **Active Blockers**: ${kpis.blockerCount}\n- **TDD Quality State**: ${kpis.tddState}\n- **Zero Regression**: Clean Gated Pipeline (2026)`;

    navigator.clipboard.writeText(standup).then(() => {
      this.showToast('📋 Standup summary copied to clipboard!');
      const terminalBody = document.getElementById('action-terminal-body');
      if (terminalBody) terminalBody.textContent = `📋 Standup Summary Copied (${dateStr}):\n\n${standup}`;
    });
  }

  /* --------------------------------------------------------------------------
     5. KEYBOARD SHORTCUTS & ERGONOMICS
     -------------------------------------------------------------------------- */
  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key === '1') this.switchView('overview');
      else if (e.key === '2' || e.key === 'a' || e.key === 'A') this.switchView('architecture');
      else if (e.key === '3' || e.key === 't' || e.key === 'T') this.switchView('tasks');
      else if (e.key === '4') this.switchView('specs');
      else if (e.key === '5' || e.key === 'e' || e.key === 'E') this.switchView('errors');
      else if (e.key === '6' || e.key === 'l' || e.key === 'L') this.switchView('logs');
      else if (e.key === '7' || e.key === 'g' || e.key === 'G') this.switchView('git');
      else if (e.key === '8') this.switchView('tokens');
      else if (e.key === '9') this.switchView('actions');
      else if (e.key === 'r' || e.key === 'R') this.runAction('run-tests');
      else if (e.key === 's' || e.key === 'S') this.copyStandupToClipboard();
      else if (e.key === 'Escape') {
        this.closeAcModal();
        this.closeErrorDetail();
        this.closeNewErrorModal();
        this.closeArchitectureModal();
        this.closeDrawer();
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. LIVE SYSTEM CLOCK (Strict 2026 DD-MM-YYYY) & DYNAMIC GREETING
     -------------------------------------------------------------------------- */
  initLiveClock() {
    const updateTime = () => {
      const now = new Date();
      const dateStr = this.formatDDMMYYYY(now);
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

      const dateEl = document.getElementById('live-date-str');
      const timeEl = document.getElementById('live-time-str');
      if (dateEl) dateEl.textContent = dateStr;
      if (timeEl) timeEl.textContent = timeStr;

      // Update Greeting
      const hours = now.getHours();
      let greeting = 'Good Evening Developer';
      if (hours < 12) greeting = 'Good Morning Developer';
      else if (hours < 18) greeting = 'Good Afternoon Developer';

      const greetingEl = document.getElementById('header-greeting');
      if (greetingEl) greetingEl.textContent = greeting;
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  formatDDMMYYYY(d = new Date()) {
    const dt = (d instanceof Date && !isNaN(d)) ? d : new Date();
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    return `${day}-${month}-${year}`;
  }

  /* --------------------------------------------------------------------------
     7. TICKING MULTI-WINDOW TOKEN QUOTA COUNTDOWNS
     -------------------------------------------------------------------------- */
  initTokenTimers() {
    setInterval(() => {
      if (!this.state || !this.state.tokens || !this.state.tokens.windows) return;
      const now = Date.now();
      const { fiveHour, daily, weekly } = this.state.tokens.windows;

      const formatCountdown = (targetEpoch) => {
        if (!targetEpoch) return '00:00:00';
        const rem = Math.max(0, targetEpoch - now);
        const totalSecs = Math.floor(rem / 1000);
        const d = Math.floor(totalSecs / 86400);
        const h = Math.floor((totalSecs % 86400) / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;
        if (d > 0) return `${d}d ${String(h).padStart(2, '0')}h`;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      };

      const t5h = document.getElementById('timer-5h-countdown');
      const tDaily = document.getElementById('timer-daily-countdown');
      const tWeekly = document.getElementById('timer-weekly-countdown');

      if (t5h && fiveHour) t5h.textContent = formatCountdown(fiveHour.resetEpochMs);
      if (tDaily && daily) tDaily.textContent = formatCountdown(daily.resetEpochMs);
      if (tWeekly && weekly) tWeekly.textContent = formatCountdown(weekly.resetEpochMs);
    }, 1000);
  }

  /* --------------------------------------------------------------------------
     8. SERVER-SENT EVENTS (SSE) REAL-TIME TELEMETRY STREAM
     -------------------------------------------------------------------------- */
  connectSSE() {
    let retryDelay = 1000;

    // Fast initial fetch snapshot
    fetch('/api/state')
      .then(res => res.json())
      .then(data => {
        this.state = data;
        this.render();
      })
      .catch(() => {});

    const connect = () => {
      const es = new EventSource('/api/stream');

      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          this.state = payload;
          retryDelay = 1000;
          this.render();
        } catch (err) {
          console.error('SSE JSON parse error:', err);
        }
      };

      es.onerror = () => {
        es.close();
        const pulse = document.getElementById('agent-status-text');
        if (pulse) pulse.textContent = 'Reconnecting...';
        setTimeout(connect, retryDelay);
        retryDelay = Math.min(retryDelay * 1.5, 10000);
      };
    };

    connect();
  }

  /* --------------------------------------------------------------------------
     9. MAIN RENDER DISPATCHER
     -------------------------------------------------------------------------- */
  render() {
    if (!this.state) return;

    // 1. Render Overview 5-Card Teamify Charts
    this.renderTaskStrengthBars();
    this.renderConcentricOrbitalHealth();
    this.renderStackedKpis();
    this.renderProjectDeliveriesSpline();
    this.renderNotificationsFeed();

    // 2. Render Granular Views
    this.renderArchitecture();
    if (this.taskViewMode === 'kanban') {
      this.renderKanbanTasks();
    } else {
      this.renderTaskList();
    }

    this.renderSpecsAndPhases();
    this.renderTokenTelemetry();
    this.renderGitRadar();
    this.renderErrors();
    this.renderLogs();
  }

  /* --------------------------------------------------------------------------
     10. EXACT CHART 1: TASK STRENGTH 4-PILLAR VERTICAL BAR CHART
     -------------------------------------------------------------------------- */
  renderTaskStrengthBars() {
    const svg = document.getElementById('svg-pillar-chart');
    if (!svg) return;

    const ts = this.state.taskStrength || {
      a: { count: 0 },
      b: { count: 0 },
      c: { count: 0 },
      d: { count: 0 },
      total: 0
    };

    const countA = ts.a && ts.a.count !== undefined ? ts.a.count : 0;
    const countB = ts.b && ts.b.count !== undefined ? ts.b.count : 0;
    const countC = ts.c && ts.c.count !== undefined ? ts.c.count : 0;
    const countD = ts.d && ts.d.count !== undefined ? ts.d.count : 0;
    const totalCount = ts.total !== undefined ? ts.total : (countA + countB + countC + countD);

    const totalEl = document.getElementById('task-strength-total');
    if (totalEl) totalEl.textContent = `${totalCount} Tasks Active`;

    const maxVal = Math.max(countA, countB, countC, countD, 1);
    const chartHeight = 110;
    const baselineY = 125;

    const bars = [
      { key: 'a', val: countA, x: 22, color: 'var(--gold-accent)' },
      { key: 'b', val: countB, x: 88, color: 'var(--coral-accent)' },
      { key: 'c', val: countC, x: 154, color: 'var(--cyan-accent)' },
      { key: 'd', val: countD, x: 220, color: 'var(--purple-accent)' }
    ];

    let svgHtml = '';
    bars.forEach(b => {
      const barH = b.val > 0 ? Math.max(12, Math.round((b.val / maxVal) * chartHeight)) : 4;
      const barY = baselineY - barH;

      // Floating Count Value above bar
      svgHtml += `<text x="${b.x + 19}" y="${barY - 8}" text-anchor="middle" font-family="var(--font-sans)" font-size="12" font-weight="700" fill="#ffffff">${b.val}</text>`;

      // Rounded Top Pillar Bar
      svgHtml += `<rect x="${b.x}" y="${barY}" width="38" height="${barH}" rx="8" ry="8" fill="${b.color}" filter="drop-shadow(0 4px 12px ${b.color})"></rect>`;

      // Letter label below bar
      svgHtml += `<text x="${b.x + 19}" y="142" text-anchor="middle" font-family="var(--font-sans)" font-size="11" font-weight="600" fill="var(--text-faint)">${b.key}</text>`;
    });

    svg.innerHTML = svgHtml;
  }

  /* --------------------------------------------------------------------------
     11. EXACT CHART 2: CONCENTRIC MULTI-ORBITAL PLANETARY RINGS
     -------------------------------------------------------------------------- */
  renderConcentricOrbitalHealth() {
    const svg = document.getElementById('svg-concentric-orbits');
    if (!svg) return;

    const kpis = this.state.kpis || {};
    const blockedCount = kpis.blockerCount !== undefined ? kpis.blockerCount : 0;
    const specs = this.state.specs || [];
    const passingCount = specs.filter(s => s.status === 'GREEN').length;
    const totalSpecs = specs.length || 1;
    const totalRate = `${kpis.acPassRate !== undefined ? kpis.acPassRate : 100}%`;

    const bEl = document.getElementById('metric-blocked-count');
    const pEl = document.getElementById('metric-passing-count');
    const tEl = document.getElementById('metric-total-rate');
    if (bEl) bEl.textContent = blockedCount;
    if (pEl) pEl.textContent = `${passingCount} / ${specs.length}`;
    if (tEl) tEl.textContent = totalRate;

    // Build Concentric Orbits SVG
    const cx = 90, cy = 90;
    const r1 = 72, r2 = 52, r3 = 34;

    const node1X = cx + r1 * Math.cos(0.65);
    const node1Y = cy + r1 * Math.sin(0.65);

    const node2X = cx + r2 * Math.cos(2.8);
    const node2Y = cy + r2 * Math.sin(2.8);

    const node3X = cx + r3 * Math.cos(4.9);
    const node3Y = cy + r3 * Math.sin(4.9);

    svg.innerHTML = `
      <circle cx="${cx}" cy="${cy}" r="${r1}" fill="none" stroke="rgba(56, 189, 248, 0.16)" stroke-width="1.5" />
      <circle cx="${cx}" cy="${cy}" r="${r2}" fill="none" stroke="rgba(255, 112, 67, 0.2)" stroke-width="1.5" />
      <circle cx="${cx}" cy="${cy}" r="${r3}" fill="none" stroke="rgba(251, 191, 36, 0.22)" stroke-width="1.5" />

      <circle cx="${node1X}" cy="${node1Y}" r="4.5" fill="var(--cyan-accent)" filter="drop-shadow(0 0 6px var(--cyan-accent))" />
      <circle cx="${node2X}" cy="${node2Y}" r="5" fill="var(--coral-accent)" filter="drop-shadow(0 0 8px var(--coral-accent))" />
      <circle cx="${node3X}" cy="${node3Y}" r="4" fill="var(--gold-accent)" filter="drop-shadow(0 0 6px var(--gold-accent))" />
    `;
  }

  /* --------------------------------------------------------------------------
     12. EXACT CHART 3: STACKED KPI METRIC PILL CARDS
     -------------------------------------------------------------------------- */
  renderStackedKpis() {
    const kpis = this.state.kpis || {};
    const tokens = this.state.tokens || {};

    const topVal = document.getElementById('kpi-val-top');
    const tasksVal = document.getElementById('kpi-val-tasks');
    const headroomVal = document.getElementById('kpi-val-headroom');

    if (topVal) topVal.textContent = `${kpis.acPassRate !== undefined ? kpis.acPassRate : 100}%`;
    if (tasksVal) tasksVal.textContent = kpis.completedTasks !== undefined ? kpis.completedTasks : 0;
    if (headroomVal) {
      const free = tokens.freeTokens ? `${Math.round(tokens.freeTokens / 1000)}k` : '500k';
      headroomVal.textContent = free;
    }
  }

  /* --------------------------------------------------------------------------
     13. EXACT CHART 4: SCOPE VELOCITY & DELIVERY TRAJECTORY GRAPH
     -------------------------------------------------------------------------- */
  renderProjectDeliveriesSpline() {
    const svg = document.getElementById('svg-deliveries-chart');
    if (!svg) return;

    const traj = this.state.deliveriesTrajectory || {
      labels: ['10-10-2026', '17-10-2026', '24-10-2026', '31-10-2026', '07-11-2026', '14-11-2026'],
      target: [4, 8, 12, 16, 20, 24],
      achieved: [4, 9, 13, 17, 21, 24]
    };

    const width = 540;
    const height = 190;
    const paddingLeft = 30;
    const paddingBottom = 20;
    const chartW = width - paddingLeft - 10;
    const chartH = height - paddingBottom - 10;

    const maxVal = Math.max(...traj.target, ...traj.achieved, 24);

    // Subtle horizontal dashed gridlines
    let gridHtml = '';
    const ticks = [24, 20, 16, 12, 8, 4, 0];
    ticks.forEach((val, idx) => {
      const y = Math.round(10 + (idx / (ticks.length - 1)) * chartH);
      gridHtml += `<line x1="${paddingLeft}" y1="${y}" x2="${width}" y2="${y}" stroke="var(--chart-grid)" stroke-dasharray="3,3" />`;
      gridHtml += `<text x="${paddingLeft - 8}" y="${y + 4}" text-anchor="end" font-family="var(--font-mono)" font-size="9" fill="var(--text-faint)">${val}</text>`;
    });

    const getX = (idx) => paddingLeft + (idx / (traj.labels.length - 1)) * chartW;
    const getY = (val) => Math.round(10 + (1 - val / maxVal) * chartH);

    const buildCurve = (pts) => {
      let d = `M ${getX(0)} ${getY(pts[0])}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const x0 = getX(i);
        const y0 = getY(pts[i]);
        const x1 = getX(i + 1);
        const y1 = getY(pts[i + 1]);
        const mx = (x0 + x1) / 2;
        d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
      }
      return d;
    };

    const pathAchieved = buildCurve(traj.achieved);
    const pathTarget = buildCurve(traj.target);

    // Active Guideline & Tooltip Knot at 14-11-2026 (last point)
    const activeIdx = traj.labels.length - 1;
    const activeX = getX(activeIdx);
    const activeAchievedY = getY(traj.achieved[activeIdx]);
    const activeTargetY = getY(traj.target[activeIdx]);

    svg.innerHTML = `
      <defs>
        <filter id="glowCoral" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#ff7043" flood-opacity="0.5"/>
        </filter>
        <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#38bdf8" flood-opacity="0.4"/>
        </filter>
      </defs>
      ${gridHtml}
      <path d="${pathTarget}" fill="none" stroke="var(--cyan-accent)" stroke-width="2.8" filter="url(#glowCyan)"/>
      <path d="${pathAchieved}" fill="none" stroke="var(--coral-accent)" stroke-width="3" filter="url(#glowCoral)"/>
      <line x1="${activeX}" y1="10" x2="${activeX}" y2="${height - paddingBottom}" stroke="var(--chart-marker)" stroke-dasharray="4,4" />
      <circle cx="${activeX}" cy="${activeAchievedY}" r="4.5" fill="#ffffff" stroke="var(--coral-accent)" stroke-width="2.5" />
      <circle cx="${activeX}" cy="${activeTargetY}" r="4" fill="#ffffff" stroke="var(--cyan-accent)" stroke-width="2.5" />
    `;

    // Tooltip position alignment & labels
    const tooltipEl = document.getElementById('floating-delivery-tooltip');
    if (tooltipEl) {
      tooltipEl.style.left = `${(activeX / width) * 100}%`;
      tooltipEl.style.top = `${(activeAchievedY / height) * 100}%`;
    }

    const tAchieved = document.getElementById('tooltip-achieved-txt');
    const tTarget = document.getElementById('tooltip-target-txt');
    if (tAchieved && traj.currentTooltip) tAchieved.textContent = traj.currentTooltip.achievedLabel;
    if (tTarget && traj.currentTooltip) tTarget.textContent = traj.currentTooltip.targetLabel;

    // Render dynamic timeline axis in strict DD-MM-YYYY
    const axisEl = document.getElementById('deliveries-timeline-axis');
    if (axisEl && traj.labels) {
      axisEl.innerHTML = traj.labels.map((lbl, idx) => {
        const isCurrent = idx === traj.labels.length - 1;
        return `<span class="${isCurrent ? 'active-timeline-stop' : ''}">${lbl}</span>`;
      }).join('');
    }
  }

  /* --------------------------------------------------------------------------
     14. EXACT CHART 5: NOTIFICATIONS & LIVE ACTIVITY FEED
     -------------------------------------------------------------------------- */
  renderNotificationsFeed() {
    const list = document.getElementById('notifications-list');
    if (!list) return;

    const notifs = this.state.notifications || [];
    let html = '';

    notifs.slice(0, 5).forEach(n => {
      html += `
        <div class="notif-row-item ${n.isHead ? 'is-head' : ''}">
          <div class="notif-avatar-box ${n.avatarColor || 'grey'}">
            <span>${n.avatarIcon || '⚡'}</span>
          </div>
          <div class="notif-content-box">
            <span class="notif-title">${n.title}</span>
            <span class="notif-time">${n.timestamp}</span>
          </div>
        </div>
      `;
    });

    list.innerHTML = html;
  }

  /* --------------------------------------------------------------------------
     15. KANBAN BOARD VIEW
     -------------------------------------------------------------------------- */
  renderKanbanTasks() {
    const tasks = (this.state.tasks || []).filter(t => {
      if (this.searchQuery) {
        const matchTitle = (t.title || '').toLowerCase().includes(this.searchQuery);
        const matchId = (t.id || '').toLowerCase().includes(this.searchQuery);
        if (!matchTitle && !matchId) return false;
      }
      if (this.taskFilter === 'ALL') return true;
      if (this.taskFilter === 'IN_PROGRESS') return t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL';
      if (this.taskFilter === 'DONE') return t.status === 'DONE';
      if (this.taskFilter === 'REVIEW_BLOCKED') return t.status === 'REVIEW' || t.status === 'REVIEW_BLOCKED' || t.status === 'BLOCKED';
      if (this.taskFilter === 'BACKLOG') return t.status === 'BACKLOG' || t.status === 'READY';
      return t.status === this.taskFilter;
    });

    const cols = {
      BACKLOG: document.getElementById('drop-backlog'),
      IN_PROGRESS: document.getElementById('drop-progress'),
      REVIEW_BLOCKED: document.getElementById('drop-review'),
      DONE: document.getElementById('drop-done')
    };

    if (!cols.BACKLOG) return;

    Object.values(cols).forEach(col => { if (col) col.innerHTML = ''; });

    const counts = { BACKLOG: 0, IN_PROGRESS: 0, REVIEW_BLOCKED: 0, DONE: 0 };

    tasks.forEach(task => {
      let colKey = task.status;
      if (colKey === 'READY') colKey = 'BACKLOG';
      if (colKey === 'RED_TEST_FAIL') colKey = 'IN_PROGRESS';
      if (colKey === 'REVIEW' || colKey === 'BLOCKED') colKey = 'REVIEW_BLOCKED';

      if (cols[colKey]) {
        counts[colKey]++;
        const isRunning = task.status === 'IN_PROGRESS' || task.status === 'RED_TEST_FAIL';
        const card = document.createElement('div');
        card.className = `bento-task-card ${isRunning ? 'running-task-top' : ''}`;
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-task-id', task.id);

        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:10px;font-family:var(--font-mono);font-weight:700;color:var(--cyan-accent)">${task.id}</span>
            ${isRunning ? '<span class="running-tag">⚡ RUNNING</span>' : ''}
          </div>
          <span class="task-title">${task.title}</span>
          <div class="task-footer-row">
            <span>🟢 ${task.startDate || '14-11-2026'}</span>
            <span>⏹️ ${task.stopDate || '14-11-2026'}</span>
          </div>
        `;

        this.bindDragEvents(card, task.id);
        cols[colKey].appendChild(card);
      }
    });

    const cBacklog = document.getElementById('count-col-backlog');
    const wipBadge = document.getElementById('wip-badge');
    const cReview = document.getElementById('count-col-review');
    const cDone = document.getElementById('count-col-done');

    if (cBacklog) cBacklog.textContent = counts.BACKLOG;
    if (wipBadge) wipBadge.textContent = `${counts.IN_PROGRESS}/3 WIP`;
    if (cReview) cReview.textContent = counts.REVIEW_BLOCKED;
    if (cDone) cDone.textContent = counts.DONE;

    this.bindDropzones();
  }

  /* --------------------------------------------------------------------------
     16. LINEAR TASK LIST VIEW (FIX FOR KANBAN LIST)
     -------------------------------------------------------------------------- */
  renderTaskList() {
    const listContainer = document.getElementById('task-list-container');
    if (!listContainer) return;

    const tasks = (this.state.tasks || []).filter(t => {
      if (this.searchQuery) {
        const matchTitle = (t.title || '').toLowerCase().includes(this.searchQuery);
        const matchId = (t.id || '').toLowerCase().includes(this.searchQuery);
        if (!matchTitle && !matchId) return false;
      }
      if (this.taskFilter === 'ALL') return true;
      if (this.taskFilter === 'IN_PROGRESS') return t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL';
      if (this.taskFilter === 'DONE') return t.status === 'DONE';
      if (this.taskFilter === 'REVIEW_BLOCKED') return t.status === 'REVIEW' || t.status === 'REVIEW_BLOCKED' || t.status === 'BLOCKED';
      if (this.taskFilter === 'BACKLOG') return t.status === 'BACKLOG' || t.status === 'READY';
      return t.status === this.taskFilter;
    });

    if (tasks.length === 0) {
      listContainer.innerHTML = `
        <div class="teamify-card" style="text-align:center;padding:32px">
          <span style="font-size:13px;color:var(--text-faint)">No tasks match the active filter or search query.</span>
        </div>
      `;
      return;
    }

    let html = '';
    tasks.forEach(t => {
      const isRunning = t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL';
      const subtasks = t.subtasks || [];
      const completedSub = subtasks.filter(s => s.completed).length;
      const subtaskPct = subtasks.length > 0 ? Math.round((completedSub / subtasks.length) * 100) : (t.status === 'DONE' ? 100 : 0);

      const filesHtml = (t.impactedFiles || []).map(f => `<span class="file-chip">📄 ${f}</span>`).join('');

      html += `
        <div class="linear-task-item ${isRunning ? 'running-task-top' : ''}">
          <div class="linear-task-header">
            <div style="display:flex;align-items:center;gap:10px">
              <span class="linear-task-id-badge">${t.id}</span>
              <span class="linear-task-title">${t.title}</span>
              ${isRunning ? '<span class="running-tag">⚡ RUNNING</span>' : ''}
            </div>
            <select class="linear-task-select" data-task-id="${t.id}">
              <option value="BACKLOG" ${t.status === 'BACKLOG' || t.status === 'READY' ? 'selected' : ''}>Backlog</option>
              <option value="IN_PROGRESS" ${t.status === 'IN_PROGRESS' ? 'selected' : ''}>In Progress</option>
              <option value="REVIEW_BLOCKED" ${t.status === 'REVIEW_BLOCKED' || t.status === 'REVIEW' ? 'selected' : ''}>Review / Hold</option>
              <option value="DONE" ${t.status === 'DONE' ? 'selected' : ''}>Done</option>
            </select>
          </div>

          ${subtasks.length > 0 ? `
            <div class="linear-task-subtasks">
              <span class="subtasks-text">Subtasks: ${completedSub}/${subtasks.length}</span>
              <div class="subtasks-bar-track">
                <div class="subtasks-bar-fill" style="width:${subtaskPct}%"></div>
              </div>
              <span class="subtasks-text">${subtaskPct}%</span>
            </div>
          ` : ''}

          ${filesHtml ? `<div class="linear-task-files">${filesHtml}</div>` : ''}

          <div class="linear-task-footer">
            <span>🟢 Start: ${t.startDate || '14-11-2026'}</span>
            <span>⏹️ Stop: ${t.stopDate || '14-11-2026'}</span>
            <span style="color:var(--text-main)">Status: <b>${t.status}</b></span>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;

    // Attach status dropdown change event
    listContainer.querySelectorAll('.linear-task-select').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const taskId = sel.getAttribute('data-task-id');
        const newStatus = e.target.value;
        await this.updateTaskStatus(taskId, newStatus);
      });
    });
  }

  bindDragEvents(card, taskId) {
    card.addEventListener('dragstart', (e) => {
      this.draggedTaskId = taskId;
      e.dataTransfer.setData('text/plain', taskId);
      card.style.opacity = '0.5';
    });

    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
      this.draggedTaskId = null;
    });
  }

  bindDropzones() {
    document.querySelectorAll('.kanban-col-dropzone').forEach(dz => {
      dz.addEventListener('dragover', (e) => {
        e.preventDefault();
        dz.style.background = 'rgba(255, 255, 255, 0.05)';
      });

      dz.addEventListener('dragleave', () => {
        dz.style.background = 'transparent';
      });

      dz.addEventListener('drop', async (e) => {
        e.preventDefault();
        dz.style.background = 'transparent';
        const taskId = e.dataTransfer.getData('text/plain');
        const targetCol = dz.getAttribute('data-col');
        if (taskId && targetCol) {
          await this.updateTaskStatus(taskId, targetCol);
        }
      });
    });
  }

  async updateTaskStatus(taskId, newStatus) {
    try {
      const res = await fetch('/api/task-status', {
        method: 'POST',
        headers: BentoDashboardClient.apiHeaders(),
        body: JSON.stringify({ taskId, newStatus })
      });
      if (res.ok) {
        this.showToast(`Task ${taskId} moved to ${newStatus}`);
      }
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  }

  /* --------------------------------------------------------------------------
     17. SPECS & ACCEPTANCE CRITERIA CONTRACTS
     -------------------------------------------------------------------------- */
  renderSpecsAndPhases() {
    const specs = (this.state.specs || []).filter(s => {
      if (this.searchQuery) {
        const matchTitle = (s.title || '').toLowerCase().includes(this.searchQuery);
        const matchId = (s.id || '').toLowerCase().includes(this.searchQuery);
        if (!matchTitle && !matchId) return false;
      }
      return true;
    });

    const container = document.getElementById('specs-container');
    if (!container) return;

    let html = '';
    specs.forEach(s => {
      html += `
        <div class="spec-card-item" data-ac-id="${s.id}">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-family:var(--font-mono);font-size:11.5px;font-weight:700;color:var(--cyan-accent)">${s.id}</span>
            <span style="font-size:12px;font-weight:600;color:var(--text-main)">${s.title}</span>
          </div>
          <span class="status-pill ${s.status}">${s.status}</span>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.spec-card-item').forEach(item => {
      item.addEventListener('click', () => {
        const acId = item.getAttribute('data-ac-id');
        this.openAcModal(acId);
      });
    });
  }

  openAcModal(acId) {
    const spec = (this.state.specs || []).find(s => s.id === acId);
    if (!spec) return;

    const modal = document.getElementById('ac-modal');
    if (!modal) return;

    const elId = document.getElementById('modal-ac-id');
    const elTitle = document.getElementById('modal-ac-title');
    const elStatus = document.getElementById('modal-ac-status');
    const elFile = document.getElementById('modal-ac-file');
    const elGiven = document.getElementById('modal-ac-given');
    const elWhen = document.getElementById('modal-ac-when');
    const elThen = document.getElementById('modal-ac-then');
    const elTestId = document.getElementById('modal-ac-testid');
    const elTestLevel = document.getElementById('modal-ac-testlevel');
    const elTestLoc = document.getElementById('modal-ac-testloc');

    if (elId) elId.textContent = spec.id;
    if (elTitle) elTitle.textContent = spec.title;
    if (elStatus) {
      elStatus.className = `status-pill ${spec.status}`;
      elStatus.textContent = spec.status;
    }
    if (elFile) elFile.textContent = spec.specFile || spec.file || 'docs/features/';

    const sc = spec.scenario || {};
    if (elGiven) elGiven.textContent = sc.given || spec.given || 'Active user in system';
    if (elWhen) elWhen.textContent = sc.when || spec.when || 'Executes contractual action';
    if (elThen) elThen.textContent = sc.then || spec.then || 'System verifies contract assertions';

    const verification = spec.verification || {};
    if (elTestId) elTestId.textContent = verification.testId || `TEST-${spec.id.replace('AC-', '')}`;
    if (elTestLevel) elTestLevel.textContent = verification.level || 'Integration';
    if (elTestLoc) elTestLoc.textContent = verification.location || 'tests/spec.test.ts';

    modal.classList.add('active');
  }

  closeAcModal() {
    const modal = document.getElementById('ac-modal');
    if (modal) modal.classList.remove('active');
  }

  bindAcModalEvents() {
    const closeBtn = document.getElementById('modal-ac-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeAcModal());

    const btnGreen = document.getElementById('modal-btn-green');
    const btnRed = document.getElementById('modal-btn-red');
    const btnPending = document.getElementById('modal-btn-pending');

    const updateStatus = async (status) => {
      const acId = document.getElementById('modal-ac-id').textContent;
      try {
        const res = await fetch('/api/ac-status', {
          method: 'POST',
          headers: BentoDashboardClient.apiHeaders(),
          body: JSON.stringify({ acId, newStatus: status })
        });
        if (res.ok) {
          this.showToast(`${acId} status set to ${status}`);
          this.closeAcModal();
        }
      } catch (e) {}
    };

    if (btnGreen) btnGreen.addEventListener('click', () => updateStatus('GREEN'));
    if (btnRed) btnRed.addEventListener('click', () => updateStatus('RED'));
    if (btnPending) btnPending.addEventListener('click', () => updateStatus('PENDING'));
  }

  /* --------------------------------------------------------------------------
     18. TOKEN TELEMETRY MULTI-WINDOW MATRIX
     -------------------------------------------------------------------------- */
  renderTokenTelemetry() {
    const tokens = this.state.tokens;
    if (!tokens) return;

    const usedEl = document.getElementById('token-ctx-used');
    const limitEl = document.getElementById('token-ctx-limit-str');
    const pctEl = document.getElementById('token-ctx-pct');
    const fillEl = document.getElementById('token-capacity-fill');

    if (usedEl) usedEl.textContent = `${Math.round(tokens.currentContext / 1000)}k`;
    if (limitEl) limitEl.textContent = (tokens.windowLimit || 1000000).toLocaleString();
    if (pctEl) pctEl.textContent = `${tokens.utilizationPercent}%`;
    if (fillEl) {
      fillEl.style.width = `${Math.min(100, tokens.utilizationPercent)}%`;
      fillEl.className = `token-capacity-fill ${tokens.utilizationPercent > 80 ? 'crit' : tokens.utilizationPercent > 60 ? 'warn' : 'optimal'}`;
    }

    // Windows Matrix Table
    const tbody = document.getElementById('token-matrix-tbody');
    if (tbody && tokens.windows) {
      const { session, fiveHour, daily, weekly } = tokens.windows;
      const rows = [
        { label: '5-Hour Rolling', ...fiveHour },
        { label: 'Daily Midnight', ...daily },
        { label: 'Weekly Allocation', ...weekly }
      ];

      let html = '';
      rows.forEach(r => {
        html += `
          <tr>
            <td style="font-weight:700">${r.label}</td>
            <td style="color:var(--cyan-accent)">${(r.totalTokens || 0).toLocaleString()}</td>
            <td>${(r.limit || 0).toLocaleString()}</td>
            <td><b>${r.utilizationPercent || 0}%</b></td>
            <td>${(r.inputTokens || 0).toLocaleString()}</td>
            <td>${(r.cacheReadTokens || 0).toLocaleString()}</td>
            <td>${(r.outputTokens || 0).toLocaleString()}</td>
            <td>${r.turnCount || 0}</td>
            <td style="color:var(--mint-accent)">${r.economics ? r.economics.costCachedFormatted : '$0.00'}</td>
            <td>${r.resetLabel || '-'}</td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }
  }

  /* --------------------------------------------------------------------------
     19. GIT TELEMETRY RADAR
     -------------------------------------------------------------------------- */
  renderGitRadar() {
    const git = this.state.git;
    if (!git) return;

    const container = document.getElementById('commit-feed-container');
    if (!container) return;

    const commits = (git.recentCommits || []).filter(c => {
      if (this.searchQuery) {
        const matchMsg = (c.subject || c.message || '').toLowerCase().includes(this.searchQuery);
        const matchHash = (c.hash || '').toLowerCase().includes(this.searchQuery);
        if (!matchMsg && !matchHash) return false;
      }
      return true;
    });

    let html = '';
    commits.forEach((c, idx) => {
      const isHead = idx === 0;
      html += `
        <div class="notif-row-item ${isHead ? 'is-head' : ''}">
          <div class="notif-avatar-box ${isHead ? 'yellow' : 'grey'}">
            <span>${isHead ? '⚡' : '🌿'}</span>
          </div>
          <div class="notif-content-box">
            <span class="notif-title">${isHead ? '<b>[HEAD]</b> ' : ''}${c.subject || c.message}</span>
            <span class="notif-time">${c.hash || 'HEAD'} · ${c.author || 'Author'} · ${c.date || '14-11-2026'} | ${c.time || '15:30:00'}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  /* --------------------------------------------------------------------------
     18. PREVENTIVE ERROR TRACKING & DEFECT COMMAND CENTER
     -------------------------------------------------------------------------- */
  bindErrorControls() {
    const btnOpenNew = document.getElementById('btn-open-error-modal');
    if (btnOpenNew) btnOpenNew.addEventListener('click', () => this.openNewErrorModal());

    const btnCloseDetail = document.getElementById('modal-err-close');
    if (btnCloseDetail) btnCloseDetail.addEventListener('click', () => this.closeErrorDetail());

    const btnCloseNew = document.getElementById('modal-new-err-close');
    if (btnCloseNew) btnCloseNew.addEventListener('click', () => this.closeNewErrorModal());

    const btnCancelNew = document.getElementById('btn-cancel-new-err');
    if (btnCancelNew) btnCancelNew.addEventListener('click', () => this.closeNewErrorModal());

    const formLog = document.getElementById('form-log-defect');
    if (formLog) {
      formLog.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitNewDefect();
      });
    }

    const btnResolve = document.getElementById('modal-err-btn-resolve');
    if (btnResolve) {
      btnResolve.addEventListener('click', () => {
        const id = document.getElementById('modal-err-id').textContent;
        this.updateDefectStatus(id, 'RESOLVED');
      });
    }

    const btnActive = document.getElementById('modal-err-btn-active');
    if (btnActive) {
      btnActive.addEventListener('click', () => {
        const id = document.getElementById('modal-err-id').textContent;
        this.updateDefectStatus(id, 'ACTIVE');
      });
    }

    // Filter tabs
    document.querySelectorAll('.error-filter-tabs .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.error-filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.errorFilter = tab.getAttribute('data-error-filter') || 'all';
        this.renderErrors();
      });
    });

    // Search filter input
    const filterInput = document.getElementById('error-filter-input');
    if (filterInput) {
      filterInput.addEventListener('input', (e) => {
        this.errorSearchQuery = (e.target.value || '').toLowerCase().trim();
        this.renderErrors();
      });
    }
  }

  renderErrors() {
    const errorTracking = (this.state && this.state.errorTracking) || { defects: [], summary: {} };
    const allDefects = errorTracking.defects || [];
    const summary = errorTracking.summary || {};

    // 1. Update Navigation Badge
    const navBadge = document.getElementById('nav-error-badge');
    const activeCount = summary.active !== undefined ? summary.active : allDefects.filter(d => d.status !== 'RESOLVED').length;
    if (navBadge) {
      navBadge.textContent = activeCount;
      navBadge.style.display = activeCount > 0 ? 'inline-block' : 'none';
    }

    // 2. Update Bento Stat Cards
    const elActive = document.getElementById('stat-error-active');
    const elActivePill = document.getElementById('stat-error-active-pill');
    const elTotal = document.getElementById('stat-error-total');
    const elResolved = document.getElementById('stat-error-resolved');
    const elRate = document.getElementById('stat-error-rate');

    if (elActive) elActive.textContent = activeCount;
    if (elActivePill) {
      const p0 = summary.p0 || 0;
      const p1 = summary.p1 || 0;
      elActivePill.textContent = `${p0} P0 · ${p1} P1`;
      elActivePill.className = `status-pill ${p0 > 0 || p1 > 0 ? 'RED' : 'GREEN'}`;
    }
    if (elTotal) elTotal.textContent = summary.total !== undefined ? summary.total : allDefects.length;
    if (elResolved) elResolved.textContent = summary.resolved !== undefined ? summary.resolved : allDefects.filter(d => d.status === 'RESOLVED').length;
    if (elRate) elRate.textContent = `${summary.rate !== undefined ? summary.rate : 100}%`;

    // 3. Filter defects
    const filtered = allDefects.filter(d => {
      if (this.errorFilter === 'active' && d.status === 'RESOLVED') return false;
      if (this.errorFilter === 'resolved' && d.status !== 'RESOLVED') return false;
      if (this.errorFilter === 'p0p1' && !['P0', 'P1'].includes(d.severity)) return false;

      if (this.errorSearchQuery) {
        const text = `${d.id} ${d.summary} ${d.impactedPath} ${d.violatedAc} ${d.rootCause}`.toLowerCase();
        if (!text.includes(this.errorSearchQuery)) return false;
      }
      return true;
    });

    // 4. Render Table Body
    const tbody = document.getElementById('error-table-body');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center;padding:36px;color:var(--text-muted)">
            🎉 No defects matching current filter criteria. All contracts guarded.
          </td>
        </tr>
      `;
      return;
    }

    let rowsHtml = '';
    filtered.forEach(d => {
      const isResolved = d.status === 'RESOLVED';
      const statusPillClass = isResolved ? 'GREEN' : 'RED';
      rowsHtml += `
        <tr class="error-row" data-err-id="${d.id}">
          <td><span class="modal-ac-code">${d.id}</span></td>
          <td><span class="sev-pill ${d.severity}">${d.severity}</span> <span style="font-size:10.5px;color:var(--text-faint);margin-left:4px">${d.sla || ''}</span></td>
          <td><span class="date-mono">${d.date}</span></td>
          <td><span style="font-weight:600;color:var(--text-main)">${d.summary}</span></td>
          <td><span class="path-mono" title="${d.impactedPath}">${d.impactedPath}</span></td>
          <td><span class="ac-tag">${d.violatedAc}</span></td>
          <td><span style="color:var(--text-muted);font-size:11.5px;max-width:220px;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.rootCause}</span></td>
          <td><span class="path-mono" style="color:var(--text-faint)">${d.regressionTest}</span></td>
          <td>
            <button class="status-pill ${statusPillClass}" style="cursor:pointer;border:none" data-err-toggle="${d.id}" title="Click to toggle status">
              ${d.status}
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = rowsHtml;

    // Attach click listeners
    tbody.querySelectorAll('tr.error-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('[data-err-toggle]')) return;
        const id = row.getAttribute('data-err-id');
        this.openErrorDetail(id);
      });
    });

    tbody.querySelectorAll('[data-err-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-err-toggle');
        const defect = allDefects.find(x => x.id === id);
        if (defect) {
          const nextStatus = defect.status === 'RESOLVED' ? 'ACTIVE' : 'RESOLVED';
          this.updateDefectStatus(id, nextStatus);
        }
      });
    });
  }

  openErrorDetail(defectId) {
    const errorTracking = (this.state && this.state.errorTracking) || {};
    const defects = errorTracking.defects || [];
    const defect = defects.find(d => d.id === defectId);
    if (!defect) return;

    const modal = document.getElementById('error-detail-modal');
    if (!modal) return;

    const elId = document.getElementById('modal-err-id');
    const elSev = document.getElementById('modal-err-sev');
    const elStatus = document.getElementById('modal-err-status');
    const elSummary = document.getElementById('modal-err-summary');
    const elPath = document.getElementById('modal-err-path');
    const elDate = document.getElementById('modal-err-date');
    const elSla = document.getElementById('modal-err-sla');
    const elAc = document.getElementById('modal-err-ac');
    const elTest = document.getElementById('modal-err-test');
    const elFix = document.getElementById('modal-err-fix');
    const elRoot = document.getElementById('modal-err-rootcause');

    if (elId) elId.textContent = defect.id;
    if (elSev) {
      elSev.className = `sev-pill ${defect.severity}`;
      elSev.textContent = defect.severity;
    }
    if (elStatus) {
      elStatus.className = `status-pill ${defect.status === 'RESOLVED' ? 'GREEN' : 'RED'}`;
      elStatus.textContent = defect.status;
    }
    if (elSummary) elSummary.textContent = defect.summary;
    if (elPath) elPath.textContent = defect.impactedPath;
    if (elDate) elDate.textContent = defect.date;
    if (elSla) elSla.textContent = defect.sla || 'Within standard SLA';
    if (elAc) elAc.textContent = defect.violatedAc;
    if (elTest) elTest.textContent = defect.regressionTest;
    if (elFix) elFix.textContent = defect.fix || 'In Triage';
    if (elRoot) elRoot.textContent = defect.rootCause;

    modal.classList.add('active');
  }

  closeErrorDetail() {
    const modal = document.getElementById('error-detail-modal');
    if (modal) modal.classList.remove('active');
  }

  openNewErrorModal() {
    const modal = document.getElementById('new-error-modal');
    if (modal) modal.classList.add('active');
  }

  closeNewErrorModal() {
    const modal = document.getElementById('new-error-modal');
    if (modal) modal.classList.remove('active');
  }

  async updateDefectStatus(errorId, newStatus) {
    try {
      const res = await fetch('/api/error-status', {
        method: 'POST',
        headers: BentoDashboardClient.apiHeaders(),
        body: JSON.stringify({ errorId, newStatus })
      });
      const data = await res.json();
      if (data.success) {
        this.showToast(`Defect ${errorId} set to ${newStatus}`);
        this.closeErrorDetail();
      } else {
        this.showToast(`Failed: ${data.error || 'Server error'}`);
      }
    } catch (err) {
      this.showToast(`Error updating status: ${err.message}`);
    }
  }

  async submitNewDefect() {
    const summary = document.getElementById('input-err-summary').value;
    const severity = document.getElementById('select-err-sev').value;
    const impactedPath = document.getElementById('input-err-path').value;
    const violatedAc = document.getElementById('input-err-ac').value || 'N/A';
    const regressionTest = document.getElementById('input-err-test').value || 'tests/';
    const rootCause = document.getElementById('input-err-rootcause').value || 'Root cause under investigation';
    const fix = document.getElementById('input-err-fix').value || 'In Triage';

    try {
      const res = await fetch('/api/log-error', {
        method: 'POST',
        headers: BentoDashboardClient.apiHeaders(),
        body: JSON.stringify({
          summary,
          severity,
          impactedPath,
          violatedAc,
          regressionTest,
          rootCause,
          fix
        })
      });
      const data = await res.json();
      if (data.success) {
        this.showToast(`Defect ${data.defectId} logged to docs/error-tracker.md`);
        this.closeNewErrorModal();
        const form = document.getElementById('form-log-defect');
        if (form) form.reset();
      } else {
        this.showToast(`Failed: ${data.error || 'Server error'}`);
      }
    } catch (err) {
      this.showToast(`Error logging defect: ${err.message}`);
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* --------------------------------------------------------------------------
     14. LIVE DEVELOPMENT LOGS EXPLORER (logs/ DIRECTORY)
     -------------------------------------------------------------------------- */
  bindLogControls() {
    // Tail select dropdown
    const tailSelect = document.getElementById('log-tail-select');
    if (tailSelect) {
      tailSelect.addEventListener('change', (e) => {
        this.logTailLines = parseInt(e.target.value, 10);
        this.fetchActiveLogContent();
      });
    }

    // Keyword search input
    const searchInput = document.getElementById('log-search-input');
    if (searchInput) {
      let debounce = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          this.logSearchQuery = e.target.value.trim();
          this.fetchActiveLogContent();
        }, 200);
      });
    }

    // Auto-scroll toggle
    const autoscrollToggle = document.getElementById('log-autoscroll-toggle');
    if (autoscrollToggle) {
      autoscrollToggle.addEventListener('change', (e) => {
        this.logAutoScroll = e.target.checked;
      });
    }

    // Refresh button
    const btnRefresh = document.getElementById('btn-refresh-log');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        this.fetchActiveLogContent();
      });
    }

    // Copy to clipboard
    const btnCopy = document.getElementById('btn-copy-log');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const body = document.getElementById('log-viewer-body');
        if (!body) return;
        const text = body.innerText || body.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const original = btnCopy.textContent;
          btnCopy.textContent = '✅ Copied!';
          setTimeout(() => { btnCopy.textContent = original; }, 1500);
        }).catch(err => {
          console.error('Copy failed:', err);
        });
      });
    }

    // Download log file
    const btnDownload = document.getElementById('btn-download-log');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        const body = document.getElementById('log-viewer-body');
        if (!body) return;
        const text = body.innerText || body.textContent;
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.activeLogFile || 'download.log';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Clear log button
    const btnClear = document.getElementById('btn-clear-log');
    if (btnClear) {
      btnClear.addEventListener('click', async () => {
        if (!this.activeLogFile) return;
        const confirmClear = window.confirm(`Are you sure you want to clear/truncate "${this.activeLogFile}"?`);
        if (!confirmClear) return;

        try {
          const res = await fetch('/api/clear-log', {
            method: 'POST',
            headers: BentoDashboardClient.apiHeaders(),
            body: JSON.stringify({ filename: this.activeLogFile })
          });
          const result = await res.json();
          if (result.success) {
            this.showToast(`Cleared ${this.activeLogFile}`);
            this.fetchActiveLogContent();
          } else {
            alert(`Error: ${result.error || 'Failed to clear log'}`);
          }
        } catch (err) {
          alert(`Network error clearing log: ${err.message}`);
        }
      });
    }
  }

  renderLogs() {
    const logsData = (this.state && this.state.logs) || { files: [], summary: {} };
    const files = logsData.files || [];
    const summary = logsData.summary || {};

    // 1. Update Navigation Badge
    const navBadge = document.getElementById('nav-log-badge');
    if (navBadge) {
      const count = summary.totalFiles !== undefined ? summary.totalFiles : files.length;
      navBadge.textContent = count;
      navBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }

    // 2. Update Bento Summary Cards
    const elFiles = document.getElementById('stat-log-files');
    const elSize = document.getElementById('stat-log-size');
    const elLines = document.getElementById('stat-log-lines');
    const elErrors = document.getElementById('stat-log-errors');
    const elErrorsSub = document.getElementById('stat-log-errors-sub');
    const elActivity = document.getElementById('stat-log-activity');
    const elFileActive = document.getElementById('stat-log-file-active');

    if (elFiles) elFiles.textContent = summary.totalFiles !== undefined ? summary.totalFiles : files.length;
    if (elSize) elSize.textContent = summary.formattedSize || '0 B';
    if (elLines) elLines.textContent = `${summary.totalLines || 0} lines tracked across files`;
    if (elErrors) elErrors.textContent = summary.errorLines || 0;
    if (elErrorsSub) elErrorsSub.textContent = `${summary.errorLines || 0} errors · ${summary.warnLines || 0} warnings`;
    if (elActivity) elActivity.textContent = summary.lastModified ? summary.lastModified.split(' ')[1] : '-';
    if (elFileActive) elFileActive.textContent = `Active: ${this.activeLogFile || (files[0] && files[0].filename) || 'dev.log'}`;

    // 3. Render Log File Selector Pills
    const pillsContainer = document.getElementById('logs-file-pills');
    if (pillsContainer) {
      if (files.length === 0) {
        pillsContainer.innerHTML = '<span style="color:var(--text-muted);font-size:12px">No .log files found in logs/</span>';
      } else {
        if (!this.activeLogFile || !files.some(f => f.filename === this.activeLogFile)) {
          this.activeLogFile = files[0].filename;
        }

        let html = '';
        files.forEach(f => {
          const isActive = f.filename === this.activeLogFile;
          html += `
            <button class="log-pill ${isActive ? 'active' : ''}" data-logfile="${f.filename}" title="${f.filename} (${f.formattedSize}, ${f.lineCount} lines)">
              <span class="log-pill-name">📜 ${f.filename}</span>
              <span class="log-pill-size">${f.formattedSize}</span>
              ${f.errorCount > 0 ? `<span class="log-pill-err" title="${f.errorCount} error lines">${f.errorCount}</span>` : ''}
            </button>
          `;
        });
        pillsContainer.innerHTML = html;

        // Attach click listeners to pills
        pillsContainer.querySelectorAll('.log-pill').forEach(pill => {
          pill.addEventListener('click', () => {
            const file = pill.getAttribute('data-logfile');
            if (file && file !== this.activeLogFile) {
              this.activeLogFile = file;
              this.renderLogs();
              this.fetchActiveLogContent();
            }
          });
        });
      }
    }

    // If currently viewing logs, auto-fetch updated content
    if (this.activeView === 'logs') {
      this.fetchActiveLogContent();
    }
  }

  async fetchActiveLogContent() {
    if (!this.activeLogFile || this.isFetchingLog) return;
    this.isFetchingLog = true;

    try {
      const url = `/api/log-content?file=${encodeURIComponent(this.activeLogFile)}&lines=${this.logTailLines}&search=${encodeURIComponent(this.logSearchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        const body = document.getElementById('log-viewer-body');
        if (body) {
          body.innerHTML = `<div class="log-line log-line-error"><span class="log-line-num">!</span><span class="log-line-content">${this.escapeHtml(data.error)}</span></div>`;
        }
        return;
      }

      // Update header details
      const titleEl = document.getElementById('log-viewer-file-title');
      const linesPill = document.getElementById('log-viewer-line-count-pill');
      const sizePill = document.getElementById('log-viewer-size-pill');
      const mtimeEl = document.getElementById('log-viewer-mtime');

      if (titleEl) titleEl.textContent = `📜 ${data.filename}`;
      if (linesPill) linesPill.textContent = `${data.displayedLines} / ${data.totalLines} lines`;
      if (sizePill) sizePill.textContent = data.formattedSize;
      if (mtimeEl) mtimeEl.textContent = `Last Modified: ${data.lastModified || '-'}`;

      // Render lines
      const body = document.getElementById('log-viewer-body');
      if (body) {
        if (!data.lines || data.lines.length === 0) {
          body.innerHTML = '<div style="color:var(--text-muted);padding:24px;text-align:center">No log entries found. Start development servers or tests to stream logs into logs/' + this.escapeHtml(data.filename) + '</div>';
        } else {
          let linesHtml = '';
          data.lines.forEach(l => {
            linesHtml += `<div class="log-line log-line-${l.type}"><span class="log-line-num">${l.lineNum}</span><span class="log-line-content">${this.escapeHtml(l.text)}</span></div>`;
          });
          body.innerHTML = linesHtml;

          if (this.logAutoScroll) {
            const container = document.getElementById('log-terminal-container');
            if (container) container.scrollTop = container.scrollHeight;
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch log content:', err);
    } finally {
      this.isFetchingLog = false;
    }
  }

  /* --------------------------------------------------------------------------
     25. SYSTEM ARCHITECTURE & BOUNDARY BLUEPRINT CONTROLLER
     -------------------------------------------------------------------------- */
  bindArchitectureEvents() {
    const btnRefresh = document.getElementById('btn-refresh-arch');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', async () => {
        try {
          const res = await fetch('/api/state');
          if (res.ok) {
            this.state = await res.json();
            this.renderArchitecture();
            this.showToast('🏛️ Architecture blueprint synchronized from disk');
          }
        } catch (e) {
          this.showToast('Failed to sync architecture');
        }
      });
    }

    const btnViewSpec = document.getElementById('btn-view-arch-spec');
    if (btnViewSpec) {
      btnViewSpec.addEventListener('click', () => {
        this.openArchitectureModal();
      });
    }

    const btnCloseModal = document.getElementById('modal-arch-close');
    const btnCloseModalBottom = document.getElementById('btn-modal-close-arch-btn');
    if (btnCloseModal) btnCloseModal.addEventListener('click', () => this.closeArchitectureModal());
    if (btnCloseModalBottom) btnCloseModalBottom.addEventListener('click', () => this.closeArchitectureModal());

    const archModal = document.getElementById('arch-modal');
    if (archModal) {
      archModal.addEventListener('click', (e) => {
        if (e.target === archModal) this.closeArchitectureModal();
      });
    }

    // Tier filter tabs
    document.querySelectorAll('#arch-tier-filter-tabs .filter-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#arch-tier-filter-tabs .filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tier = tab.getAttribute('data-tier') || 'all';
        this.filterHldTiers(tier);
      });
    });
  }

  openArchitectureModal() {
    const modal = document.getElementById('arch-modal');
    const mdBody = document.getElementById('arch-modal-markdown');
    const titleEl = document.getElementById('arch-modal-title');
    const fileEl = document.getElementById('arch-modal-file');
    const statusEl = document.getElementById('arch-modal-status-badge');
    const lastModEl = document.getElementById('arch-modal-lastmod');

    const arch = (this.state && this.state.architecture) || {};
    const meta = arch.meta || {};

    if (titleEl) titleEl.textContent = meta.title || 'System Architecture & System Design Specification';
    if (fileEl) fileEl.textContent = `${meta.docPath || 'docs/system-architecture.md'} · Guideline Baseline ${meta.baseline || '2.0.0'}`;
    if (statusEl) statusEl.textContent = meta.status || 'Active Baseline';
    if (lastModEl) lastModEl.textContent = `Synced: ${meta.lastUpdated || this.formatDDMMYYYY()} · Strict DD-MM-YYYY`;

    if (mdBody) {
      mdBody.textContent = arch.rawContent || 'No architecture specification content found at docs/system-architecture.md.';
    }

    if (modal) {
      modal.classList.add('active');
      const dialog = modal.querySelector('.shadcn-modal-dialog');
      if (dialog) this.animateSpring(dialog, { opacity: [0, 1], scale: [0.96, 1], y: [16, 0] }, this.springSnappy);
    }
  }

  closeArchitectureModal() {
    const modal = document.getElementById('arch-modal');
    if (modal) modal.classList.remove('active');
  }

  filterHldTiers(tierId) {
    const columns = document.querySelectorAll('.arch-tier-column');
    const arrows = document.querySelectorAll('.arch-tier-arrow');

    if (tierId === 'all') {
      columns.forEach(col => col.style.display = 'flex');
      arrows.forEach(arr => arr.style.display = 'flex');
    } else {
      columns.forEach(col => {
        if (col.getAttribute('data-tier') === tierId) {
          col.style.display = 'flex';
        } else {
          col.style.display = 'none';
        }
      });
      arrows.forEach(arr => arr.style.display = 'none');
    }
  }

  renderArchitecture() {
    const arch = (this.state && this.state.architecture) || {};
    const meta = arch.meta || {};
    const hld = arch.hld || {};
    const lld = arch.lld || {};
    const consistency = arch.consistency || {};
    const caching = arch.caching || {};
    const resilience = arch.resilience || {};

    // 1. Header Badges
    const versionBadge = document.getElementById('arch-version-badge');
    if (versionBadge) {
      versionBadge.textContent = `v${meta.baseline || '2.0.0'} · ${meta.status || 'Production Baseline'}`;
    }

    // 2. Bento Metrics
    const statIngress = document.getElementById('arch-stat-ingress');
    const statCompute = document.getElementById('arch-stat-compute');
    const statStorage = document.getElementById('arch-stat-storage');
    const statResilience = document.getElementById('arch-stat-resilience');
    if (statIngress) statIngress.textContent = 'Cloudflare WAF';
    if (statCompute) statCompute.textContent = `${(lld.layers && lld.layers.length) || 4} Clean Layers`;
    if (statStorage) statStorage.textContent = 'PostgreSQL + Redis';
    if (statResilience) statResilience.textContent = 'Circuit Breakers';

    // 3. High-Level Design (HLD) Visual Topology Flow
    const hldContainer = document.getElementById('arch-hld-container');
    if (hldContainer && hld.tiers) {
      let tiersHtml = '<div class="arch-tiers-flex">';
      hld.tiers.forEach((tier, idx) => {
        tiersHtml += `
          <div class="arch-tier-column" data-tier="${tier.id}">
            <div class="arch-tier-header">
              <div class="arch-tier-title-wrap">
                <span class="arch-tier-icon">${tier.icon || '📦'}</span>
                <span class="arch-tier-title">${tier.name}</span>
              </div>
              <span class="arch-tier-badge">${tier.badge}</span>
            </div>
            <div class="arch-tier-nodes">
              ${(tier.nodes || []).map(node => `
                <div class="arch-node-card accent-${tier.color || 'blue'}">
                  <div class="arch-node-top">
                    <span class="arch-node-name">${node.name}</span>
                    <span class="arch-node-tag">${node.tag}</span>
                  </div>
                  <div class="arch-node-desc">${node.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        if (idx < hld.tiers.length - 1) {
          tiersHtml += `<div class="arch-tier-arrow">➔</div>`;
        }
      });
      tiersHtml += '</div>';
      hldContainer.innerHTML = tiersHtml;
    }

    // 4. Clean Architecture (LLD) Layers Stack
    const layersList = document.getElementById('arch-clean-layers-list');
    if (layersList && lld.layers) {
      let layersHtml = '';
      lld.layers.forEach(l => {
        layersHtml += `
          <div class="arch-layer-item layer-${l.id}">
            <div class="arch-layer-header">
              <div class="arch-layer-name-wrap">
                <span class="arch-layer-icon">${l.icon || '📦'}</span>
                <span class="arch-layer-name">${l.name}</span>
              </div>
              <span class="arch-layer-dep-rule">${l.depRule}</span>
            </div>
            <div class="arch-layer-desc">${l.description}</div>
            <div class="arch-layer-components">
              ${(l.items || []).map(item => `<span class="arch-comp-pill">${item}</span>`).join('')}
            </div>
          </div>
        `;
      });
      layersList.innerHTML = layersHtml;
    }

    // 5. Data Consistency & Idempotency Pipeline Timeline
    const consistencyTimeline = document.getElementById('arch-consistency-timeline');
    if (consistencyTimeline && consistency.steps) {
      let timelineHtml = '';
      consistency.steps.forEach(s => {
        timelineHtml += `
          <div class="arch-step-item">
            <div class="arch-step-num">${s.step}</div>
            <div class="arch-step-content">
              <div class="arch-step-header">
                <span class="arch-step-title">${s.title}</span>
                <span class="arch-step-actor">${s.actor}</span>
              </div>
              <div class="arch-step-desc">${s.desc}</div>
            </div>
          </div>
        `;
      });
      consistencyTimeline.innerHTML = timelineHtml;
    }

    // 6. Multi-Layer Caching Strategy
    const cachingList = document.getElementById('arch-caching-list');
    if (cachingList && caching.layers) {
      let cachingHtml = '';
      caching.layers.forEach(c => {
        cachingHtml += `
          <div class="arch-cache-card">
            <div class="arch-cache-header">
              <div class="arch-cache-name-wrap">
                <span class="arch-cache-level">${c.level}</span>
                <span class="arch-cache-name">${c.name}</span>
              </div>
              <div class="arch-cache-meta">
                <span class="arch-cache-latency">⚡ ${c.latency}</span>
                <span class="arch-cache-ttl">TTL: ${c.ttl}</span>
              </div>
            </div>
            <div class="arch-cache-target">Target Scope: ${c.target}</div>
          </div>
        `;
      });
      cachingList.innerHTML = cachingHtml;
    }

    // 7. Circuit Breaker States & Guards
    const breakerStates = document.getElementById('arch-breaker-states');
    if (breakerStates && resilience.states) {
      let breakerHtml = '';
      resilience.states.forEach(st => {
        const cls = st.state.toLowerCase().replace(/_/g, '-');
        breakerHtml += `
          <div class="arch-breaker-state-card state-${cls}">
            <div class="arch-breaker-state-header">
              <span class="arch-breaker-state-name">${st.state}</span>
              <span class="status-pill ${st.color === 'emerald' ? 'GREEN' : (st.color === 'red' ? 'RED' : 'WARN')}">${st.badge}</span>
            </div>
            <div class="arch-breaker-condition">${st.condition}</div>
            <div class="arch-breaker-action">${st.action}</div>
          </div>
        `;
      });
      breakerStates.innerHTML = breakerHtml;
    }

    const guardsList = document.getElementById('arch-guards-list');
    if (guardsList && resilience.guards) {
      let guardsHtml = '';
      resilience.guards.forEach(g => {
        guardsHtml += `
          <div class="arch-guard-row">
            <span style="color:var(--mint-accent)">✓</span>
            <span class="arch-guard-name">${g.name}:</span>
            <span class="arch-guard-desc">${g.desc}</span>
          </div>
        `;
      });
      guardsList.innerHTML = guardsHtml;
    }
  }

  showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'shadcn-toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3200);
  }
}

// Instantiate client when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.dashboardClient = new BentoDashboardClient();
});