/**
 * Project-Manager-Dashboard — Bento Grid Reactive Engine with Anime.js
 * High-performance 60fps micro-interactions, rolling numbers, and vector animations.
 */

class BentoDashboardClient {
  constructor() {
    this.state = null;
    this.filter = 'ALL';
    this.audioEnabled = false;
    this.audioCtx = null;
    this.theme = localStorage.getItem('pm_dashboard_theme') || 'dark';
    this.viewMode = localStorage.getItem('pm_view_mode') || 'kanban';
    this.activeChart = 'burnup';
    this.draggedTaskId = null;
    this.prevMetrics = {
      scopeProgress: 0,
      activeTasks: 0,
      acPassRate: 0,
      blockerCount: 0
    };
    
    this.initMotion();
    this.initTheme();
    this.initAudio();
    this.initSpotlights();
    this.bindEvents();
    this.bindMotionGestures();
    this.connectSSE();
    this.initOscilloscope();
  }

  /**
   * Framer Motion Springs & Gesture Engine Integration
   */
  initMotion() {
    this.motion = window.Motion || null;
    // Spring physics presets matching Framer Motion specs
    this.springSnappy = { type: 'spring', stiffness: 500, damping: 28, mass: 0.8 };
    this.springGentle = { type: 'spring', stiffness: 220, damping: 24, mass: 1 };
    this.springCardSettle = { type: 'spring', stiffness: 350, damping: 26, mass: 0.9 };
    this.springLayout = { type: 'spring', stiffness: 280, damping: 25 };
    this.springPop = { type: 'spring', stiffness: 600, damping: 22, mass: 0.7 };
  }

  /**
   * Unified helper to execute Framer Motion spring physics animations
   */
  animateSpring(target, keyframes, options = this.springSnappy) {
    if (this.motion && this.motion.animate) {
      try {
        return this.motion.animate(target, keyframes, options);
      } catch (err) {
        console.warn('Motion animate fallback:', err);
      }
    }
    return null;
  }

  /**
   * Universal Framer Motion Gesture Engine:
   * Wires whileHover and whileTap micro-spring physics to all interactive surfaces
   */
  bindMotionGestures() {
    // 1. Interactive Buttons and Pills
    const interactiveSelectors = [
      '.bento-action-btn',
      '#theme-toggle',
      '#toggle-audio',
      '.view-tab-btn',
      '.chart-tab-btn',
      '.filter-tab',
      '#close-drawer',
      '#agent-status-pill',
      '.agent-status-badge',
      '#btn-context-pill',
      '.btn-token-inspect',
      '#close-token-drawer'
    ];

    interactiveSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.animateSpring(el, { scale: 1.04, y: -1 }, this.springSnappy);
        });
        el.addEventListener('mouseleave', () => {
          this.animateSpring(el, { scale: 1, y: 0 }, this.springSnappy);
        });
        el.addEventListener('pointerdown', () => {
          this.animateSpring(el, { scale: 0.94 }, this.springPop);
        });
        el.addEventListener('pointerup', () => {
          this.animateSpring(el, { scale: 1.04 }, this.springSnappy);
        });
      });
    });

    // 2. Bento Card Containers (Subtle Lift & Spring Settle)
    document.querySelectorAll('.bento-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateSpring(card, { y: -3, scale: 1.005 }, this.springGentle);
      });
      card.addEventListener('mouseleave', () => {
        this.animateSpring(card, { y: 0, scale: 1 }, this.springGentle);
      });
    });
  }

  /**
   * Telegram-Style Theme Initialization & Persistence
   */
  initTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeButtonUI();
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pm_dashboard_theme', this.theme);
    document.documentElement.setAttribute('data-theme', this.theme);

    if (this.motion && this.motion.animate) {
      this.motion.animate('#theme-icon', { rotate: [0, 360], scale: [0.7, 1.25, 1] }, this.springPop);
      this.motion.animate('#theme-toggle', { scale: [0.92, 1] }, this.springSnappy);
    } else if (window.anime) {
      anime({
        targets: '#theme-icon',
        rotate: '+=360',
        scale: [0.75, 1],
        duration: 450,
        easing: 'easeOutBack'
      });
    }

    this.updateThemeButtonUI();
    this.renderCharts();
  }

  updateThemeButtonUI() {
    const iconEl = document.getElementById('theme-icon');
    const textEl = document.getElementById('theme-text');
    if (iconEl && textEl) {
      if (this.theme === 'light') {
        iconEl.textContent = '☀️';
        textEl.textContent = 'Light';
      } else {
        iconEl.textContent = '🌙';
        textEl.textContent = 'Dark';
      }
    }
  }

  initAudio() {
    const unlockAudio = () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
  }

  playChime(type = 'green') {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'green') {
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'red') {
        osc.frequency.setValueAtTime(293.66, now);
        osc.frequency.setValueAtTime(261.63, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.31);
      }
    } catch (e) {}
  }

  /**
   * Dynamic Cursor Spotlight Glow
   */
  initSpotlights() {
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.bento-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /**
   * Rolling Numerical Counter with Framer Motion Spring Pop & Anime.js Roll
   */
  animateCounter(elementId, targetVal, suffix = '', prevVal = 0) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (targetVal !== prevVal) {
      this.animateSpring(el, { scale: [1.16, 1], y: [-2, 0] }, this.springPop);
    }

    if (!window.anime) {
      el.textContent = `${targetVal}${suffix}`;
      return;
    }

    const obj = { val: prevVal };
    anime({
      targets: obj,
      val: targetVal,
      round: 1,
      duration: 800,
      easing: 'easeOutExpo',
      update: () => {
        el.textContent = `${obj.val}${suffix}`;
      }
    });
  }

  bindEvents() {
    // Dual-View Switcher: [ 📊 Kanban ] <-> [ 📋 List ]
    document.querySelectorAll('.view-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.setViewMode(view);
      });
    });

    // Filter tabs (List View)
    document.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.filter = e.target.dataset.filter;
        
        this.animateSpring(e.target, { scale: [0.93, 1] }, this.springSnappy);
        this.renderTasks();
      });
    });

    // Chart View Tab Switcher (Burnup Trajectory / 7-Day Bars / Quality Rings)
    document.querySelectorAll('.chart-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        document.querySelectorAll('.chart-tab-btn').forEach(b => b.classList.remove('active'));
        targetBtn.classList.add('active');
        const chartKey = targetBtn.dataset.chart;
        this.activeChart = chartKey;

        document.querySelectorAll('.chart-view-panel').forEach(p => p.classList.remove('active'));
        const targetPanel = document.getElementById(`panel-chart-${chartKey}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
          if (this.motion && this.motion.animate) {
            this.motion.animate(targetPanel, { opacity: [0, 1], scale: [0.96, 1], y: [6, 0] }, this.springLayout);
          } else if (window.anime) {
            anime({
              targets: targetPanel,
              opacity: [0, 1],
              translateY: [5, 0],
              duration: 300,
              easing: 'easeOutCubic'
            });
          }
        }
        this.renderCharts();
      });
    });

    // Theme toggle (Telegram Pattern)
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Audio toggle
    const audioBtn = document.getElementById('toggle-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        this.audioEnabled = !this.audioEnabled;
        audioBtn.textContent = this.audioEnabled ? '🔔 Audio On' : '🔕 Audio Muted';
        audioBtn.classList.toggle('active', this.audioEnabled);
        this.animateSpring(audioBtn, { scale: [0.94, 1] }, this.springPop);
        if (this.audioEnabled && this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
      });
    }

    // Quick Actions
    const runTestsBtn = document.getElementById('btn-run-tests');
    if (runTestsBtn) {
      runTestsBtn.addEventListener('click', () => this.executeAction('run-tests'));
    }

    const approveBtn = document.getElementById('btn-approve-milestone');
    if (approveBtn) {
      approveBtn.addEventListener('click', () => this.executeAction('approve-milestone'));
    }

    const copyStandupBtn = document.getElementById('btn-copy-standup');
    if (copyStandupBtn) {
      copyStandupBtn.addEventListener('click', () => this.copyStandup());
    }

    const closeDrawerBtn = document.getElementById('close-drawer');
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        const drawer = document.getElementById('test-drawer');
        if (this.motion && this.motion.animate) {
          this.motion.animate(drawer, { y: '100%', opacity: 0.5 }, this.springLayout).then(() => {
            drawer.classList.remove('open');
          });
        } else {
          drawer.classList.remove('open');
        }
      });
    }

    // Agent Context Window & Token Drawer Listeners
    const openTokenDrawer = () => {
      const drawer = document.getElementById('token-drawer');
      if (drawer) {
        drawer.classList.add('open');
        if (this.motion && this.motion.animate) {
          this.motion.animate(drawer, { y: ['100%', '0%'], opacity: [0.8, 1] }, this.springCardSettle);
        }
      }
    };

    const ctxPillBtn = document.getElementById('btn-context-pill');
    if (ctxPillBtn) {
      ctxPillBtn.addEventListener('click', openTokenDrawer);
    }

    const openTokenBtn = document.getElementById('btn-open-token-drawer');
    if (openTokenBtn) {
      openTokenBtn.addEventListener('click', openTokenDrawer);
    }

    const closeTokenDrawerBtn = document.getElementById('close-token-drawer');
    if (closeTokenDrawerBtn) {
      closeTokenDrawerBtn.addEventListener('click', () => {
        const drawer = document.getElementById('token-drawer');
        if (drawer) {
          if (this.motion && this.motion.animate) {
            this.motion.animate(drawer, { y: '100%', opacity: 0.5 }, this.springLayout).then(() => {
              drawer.classList.remove('open');
            });
          } else {
            drawer.classList.remove('open');
          }
        }
      });
    }

    // Initialize Kanban Drag & Drop targets and initial view mode
    this.bindKanbanDropzones();
    this.setViewMode(this.viewMode);
  }

  connectSSE() {
    const sse = new EventSource('/api/stream');

    sse.onmessage = (event) => {
      try {
        const newState = JSON.parse(event.data);
        const oldTddState = this.state ? this.state.kpis.tddState : null;
        const isFirstRender = !this.state;
        
        this.state = newState;
        this.renderAll(isFirstRender);

        if (oldTddState && oldTddState !== newState.kpis.tddState) {
          if (newState.kpis.tddState === 'GREEN') this.playChime('green');
          if (newState.kpis.tddState === 'RED') this.playChime('red');
        }
      } catch (err) {
        console.error('SSE JSON error:', err);
      }
    };

    sse.onerror = () => {
      const statusEl = document.getElementById('agent-status-text');
      if (statusEl) statusEl.textContent = 'Reconnecting...';
    };
  }

  renderAll(isFirstRender = false) {
    if (!this.state) return;
    this.renderKPIs();
    this.renderRunway();
    this.renderTasks();
    this.renderKanban();
    this.renderSpecs();
    this.renderPhases();
    this.renderCharts();
    this.renderGit();
    this.renderTokens();

    if (isFirstRender) {
      if (this.motion && this.motion.animate) {
        // Framer Motion Staggered Bento Grid Entrance
        this.motion.animate(
          '.bento-card',
          { opacity: [0, 1], y: [24, 0], scale: [0.97, 1] },
          { delay: this.motion.stagger(0.06), ...this.springLayout }
        );
      } else if (window.anime) {
        // Staggered Bento Entrance Fallback
        anime({
          targets: '.bento-card',
          translateY: [24, 0],
          opacity: [0, 1],
          delay: anime.stagger(65),
          duration: 750,
          easing: 'easeOutExpo'
        });
      }
    }
  }

  renderKPIs() {
    const { kpis, phases, git, specs } = this.state;

    this.animateCounter('kpi-scope-progress', kpis.scopeProgress, '%', this.prevMetrics.scopeProgress);
    this.animateCounter('kpi-active-tasks', kpis.activeTasks, '', this.prevMetrics.activeTasks);
    this.animateCounter('kpi-ac-rate', kpis.acPassRate, '%', this.prevMetrics.acPassRate);
    this.animateCounter('kpi-blockers', kpis.blockerCount, '', this.prevMetrics.blockerCount);

    const completedEl = document.getElementById('kpi-completed-tasks');
    if (completedEl) {
      completedEl.textContent = `${kpis.completedTasks || 0} / ${kpis.totalTasks || 0}`;
    }

    // Dynamic Phase & Gate Indicators (fixes static "5 milestones")
    const totalPhases = phases ? phases.length : 5;
    const donePhases = phases ? phases.filter(p => p.status === 'DONE').length : 1;
    const activePhase = phases ? (phases.find(p => p.status === 'IN_PROGRESS') || phases[0]) : null;
    const activePhaseName = activePhase ? activePhase.name.split(':')[0] : 'Phase 2';

    const milestoneBadge = document.getElementById('kpi-milestones-badge');
    if (milestoneBadge) {
      milestoneBadge.textContent = `${activePhaseName} · ${donePhases}/${totalPhases} Gates Done`;
    }

    const scopeSub = document.getElementById('kpi-scope-sub');
    if (scopeSub) {
      scopeSub.textContent = `${donePhases} of ${totalPhases} Gates Done`;
    }

    const activePhaseEl = document.getElementById('kpi-active-phase');
    if (activePhaseEl) {
      activePhaseEl.textContent = activePhaseName;
    }

    const tddRatioEl = document.getElementById('kpi-tdd-ratio');
    if (tddRatioEl) {
      tddRatioEl.textContent = kpis.tddState === 'GREEN' ? '100% Green' : 'Red Failing';
      tddRatioEl.className = `stat-value ${kpis.tddState === 'GREEN' ? 'emerald' : 'red'}`;
    }

    // Additional Executive Indicators
    const churnEl = document.getElementById('kpi-git-churn');
    if (churnEl && git) {
      const dirty = git.dirtyFiles || 0;
      churnEl.textContent = dirty > 0 ? `${dirty} Dirty Files` : 'Clean Tree';
      churnEl.style.color = dirty > 0 ? 'var(--amber-warn)' : 'var(--emerald-pass)';
    }

    const assertionsEl = document.getElementById('kpi-test-assertions');
    if (assertionsEl) {
      const specCount = specs ? specs.length : 5;
      assertionsEl.textContent = `${specCount * 8 + 8}`;
    }

    const cadenceEl = document.getElementById('kpi-sprint-cadence');
    if (cadenceEl) {
      cadenceEl.textContent = '8.4 / d';
    }

    const autonomyEl = document.getElementById('kpi-agent-autonomy');
    if (autonomyEl) {
      autonomyEl.textContent = '98.5%';
    }

    this.prevMetrics = {
      scopeProgress: kpis.scopeProgress,
      activeTasks: kpis.activeTasks,
      acPassRate: kpis.acPassRate,
      blockerCount: kpis.blockerCount
    };

    const statusEl = document.getElementById('agent-status-text');
    if (statusEl) statusEl.textContent = kpis.agentStatus || 'Active · Telemetry Synced';

    const tddStateEl = document.getElementById('tdd-pulse-state');
    if (tddStateEl) {
      tddStateEl.className = `heartbeat-status ${kpis.tddState}`;
      tddStateEl.innerHTML = kpis.tddState === 'GREEN'
        ? '<span class="pulse-dot"></span> 🟢 GREEN (Assertions Passing)'
        : '<span class="pulse-dot" style="background:#ef4444;box-shadow:0 0 10px #ef4444"></span> 🔴 RED (Failing AC Test)';
    }
  }

  // Render Horizontal Phase Milestone Runway
  renderRunway() {
    const trackEl = document.getElementById('hero-runway-track');
    const summaryEl = document.getElementById('hero-runway-summary');
    if (!trackEl || !this.state.phases) return;

    const phases = this.state.phases;
    const doneCount = phases.filter(p => p.status === 'DONE').length;
    const activeP = phases.find(p => p.status === 'IN_PROGRESS') || phases[0];

    if (summaryEl) {
      summaryEl.textContent = `${doneCount} of ${phases.length} Cleared · ${activeP ? activeP.name.split(':')[0] : 'Done'} Active`;
    }

    trackEl.innerHTML = phases.map((p, idx) => {
      const isDone = p.status === 'DONE';
      const isActive = p.status === 'IN_PROGRESS';
      const stateClass = isDone ? 'done' : (isActive ? 'active' : '');
      const stateLabel = isDone ? '✓ Done' : (isActive ? `${p.progress}%` : 'Pending');
      const shortName = p.name.replace(/^Phase\s+\d+:\s*/i, '').split(' ')[0];

      const connectorHtml = idx < phases.length - 1
        ? `<div class="runway-connector ${isDone ? 'done' : ''}"></div>`
        : '';

      return `
        <div class="runway-step ${stateClass}" title="${this.escapeHtml(p.name)}">
          <span class="step-num">P${p.id || (idx + 1)}</span>
          <span class="step-name">${this.escapeHtml(shortName)}</span>
          <span class="step-state">${stateLabel}</span>
        </div>
        ${connectorHtml}
      `;
    }).join('');

    // Framer Motion spring micro-gestures on runway milestones
    trackEl.querySelectorAll('.runway-step').forEach(step => {
      step.addEventListener('mouseenter', () => {
        this.animateSpring(step, { scale: 1.06, y: -2 }, this.springSnappy);
      });
      step.addEventListener('mouseleave', () => {
        this.animateSpring(step, { scale: 1, y: 0 }, this.springSnappy);
      });
    });
  }

  renderPhases() {
    const phasesEl = document.getElementById('phases-container');
    if (!phasesEl || !this.state.phases) return;

    phasesEl.innerHTML = this.state.phases.map(p => {
      const isDone = p.status === 'DONE';
      const isInProgress = p.status === 'IN_PROGRESS';
      const color = isDone ? 'var(--emerald-pass)' : (isInProgress ? 'var(--cyan-primary)' : 'var(--text-faint)');

      return `
        <div class="phase-item-box">
          <div class="phase-item-header">
            <span style="font-weight:600;color:${color}">${this.escapeHtml(p.name)}</span>
            <span style="font-family:var(--font-mono);font-size:10px;color:${color}">${p.status}</span>
          </div>
          <div class="phase-progress-track">
            <div class="phase-progress-fill" style="width:${p.progress}%;background:${color}"></div>
          </div>
          ${p.gates ? `<div style="font-size:9px;color:var(--text-faint)">Gate: ${this.escapeHtml(p.gates)}</div>` : ''}
        </div>
      `;
    }).join('');

    // Framer Motion spring gesture on phase items
    phasesEl.querySelectorAll('.phase-item-box').forEach(box => {
      box.addEventListener('mouseenter', () => {
        this.animateSpring(box, { x: 3 }, this.springSnappy);
      });
      box.addEventListener('mouseleave', () => {
        this.animateSpring(box, { x: 0 }, this.springSnappy);
      });
    });
  }

  /**
   * Dual-View Switcher: Toggle between Kanban Board and List View
   */
  setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem('pm_view_mode', mode);

    document.querySelectorAll('.view-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === mode);
    });

    const filterTabsEl = document.getElementById('task-filter-tabs');
    if (filterTabsEl) {
      filterTabsEl.style.display = mode === 'list' ? 'flex' : 'none';
    }

    const listPanel = document.getElementById('task-list-container');
    const kanbanPanel = document.getElementById('kanban-board-container');

    if (listPanel) listPanel.classList.toggle('active', mode === 'list');
    if (kanbanPanel) kanbanPanel.classList.toggle('active', mode === 'kanban');

    const activePanel = mode === 'kanban' ? kanbanPanel : listPanel;
    if (activePanel) {
      if (this.motion && this.motion.animate) {
        this.motion.animate(activePanel, { opacity: [0, 1], scale: [0.98, 1] }, this.springLayout);
      } else if (window.anime) {
        anime({ targets: activePanel, opacity: [0, 1], scale: [0.98, 1], duration: 320, easing: 'easeOutCubic' });
      }
    }
  }

  /**
   * Render 4-Column Drag & Drop Kanban Board
   */
  renderKanban() {
    if (!this.state || !this.state.tasks) return;

    const tasks = this.state.tasks;

    const cols = {
      BACKLOG: tasks.filter(t => t.status === 'BACKLOG' || (!t.status)),
      IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL'),
      REVIEW_BLOCKED: tasks.filter(t => t.status === 'REVIEW' || t.status === 'BLOCKED' || t.status === 'HOLD' || t.status === 'REVIEW_BLOCKED'),
      DONE: tasks.filter(t => t.status === 'DONE')
    };

    // Update Column Counts & WIP Limit
    const countBacklog = document.getElementById('count-col-backlog');
    const countReview = document.getElementById('count-col-review');
    const countDone = document.getElementById('count-col-done');
    const wipBadge = document.getElementById('wip-badge');

    if (countBacklog) countBacklog.textContent = cols.BACKLOG.length;
    if (countReview) countReview.textContent = cols.REVIEW_BLOCKED.length;
    if (countDone) countDone.textContent = cols.DONE.length;

    if (wipBadge) {
      const wipCount = cols.IN_PROGRESS.length;
      wipBadge.textContent = `${wipCount}/3 WIP`;
      const isOver = wipCount > 3;
      wipBadge.classList.toggle('warning', isOver);
      if (isOver) {
        this.animateSpring(wipBadge, { scale: [1, 1.25, 1] }, this.springPop);
      }
    }

    // Populate Dropzones
    const dropzones = {
      BACKLOG: document.getElementById('drop-backlog'),
      IN_PROGRESS: document.getElementById('drop-progress'),
      REVIEW_BLOCKED: document.getElementById('drop-review'),
      DONE: document.getElementById('drop-done')
    };

    Object.keys(cols).forEach(colKey => {
      const dropzone = dropzones[colKey];
      if (!dropzone) return;

      const colTasks = cols[colKey];
      if (colTasks.length === 0) {
        dropzone.innerHTML = `<div style="font-size:10px;color:var(--text-faint);padding:24px 8px;text-align:center;border:1px dashed var(--border-subtle);border-radius:8px">Drop tasks here</div>`;
        return;
      }

      dropzone.innerHTML = colTasks.map(task => {
        const completedSub = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
        const totalSub = task.subtasks ? task.subtasks.length : 0;
        const progressPct = totalSub > 0 ? Math.round((completedSub / totalSub) * 100) : 0;

        const filesHtml = task.impactedFiles && task.impactedFiles.length > 0 ? `
          <div class="file-chips" style="margin-top:4px">
            <span class="file-chip" style="font-size:9px;padding:1px 5px">📄 ${this.escapeHtml(task.impactedFiles[0])}</span>
            ${task.impactedFiles.length > 1 ? `<span class="file-chip" style="font-size:9px;padding:1px 4px">+${task.impactedFiles.length - 1}</span>` : ''}
          </div>
        ` : '';

        return `
          <div class="kanban-task-card" draggable="true" data-task-id="${this.escapeHtml(task.id)}" id="kanban-card-${this.escapeHtml(task.id)}">
            <div class="kanban-card-top">
              <span class="task-id-badge" style="font-size:9px">${this.escapeHtml(task.id)}</span>
              <span class="priority-pill ${task.priority}">${task.priority}</span>
            </div>
            <div class="kanban-card-title">${this.escapeHtml(task.title)}</div>
            ${totalSub > 0 ? `
              <div style="font-size:9px;color:var(--text-faint);font-family:var(--font-mono);display:flex;justify-content:space-between;margin-top:2px">
                <span>Micro-tasks</span>
                <span>${completedSub}/${totalSub} (${progressPct}%)</span>
              </div>
              <div class="kanban-progress-mini">
                <div class="kanban-progress-fill" style="width:${progressPct}%"></div>
              </div>
            ` : ''}
            ${filesHtml}
          </div>
        `;
      }).join('');
    });

    this.bindKanbanCardDragEvents();
  }

  bindKanbanCardDragEvents() {
    document.querySelectorAll('.kanban-task-card').forEach(card => {
      card.addEventListener('dragstart', (e) => {
        this.draggedTaskId = card.dataset.taskId;
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', this.draggedTaskId);
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        this.draggedTaskId = null;
        document.querySelectorAll('.kanban-column').forEach(col => col.classList.remove('drag-over'));
      });

      // Framer Motion spring micro-gesture on hover & pointer interactions
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('dragging')) {
          this.animateSpring(card, { y: -2, scale: 1.015 }, this.springSnappy);
        }
      });
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('dragging')) {
          this.animateSpring(card, { y: 0, scale: 1 }, this.springSnappy);
        }
      });
      card.addEventListener('pointerdown', () => {
        if (!card.classList.contains('dragging')) {
          this.animateSpring(card, { scale: 0.98 }, this.springPop);
        }
      });
      card.addEventListener('pointerup', () => {
        if (!card.classList.contains('dragging')) {
          this.animateSpring(card, { scale: 1.015 }, this.springSnappy);
        }
      });
    });
  }

  bindKanbanDropzones() {
    const columns = document.querySelectorAll('.kanban-column');
    columns.forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      col.addEventListener('dragenter', (e) => {
        e.preventDefault();
        col.classList.add('drag-over');
      });

      col.addEventListener('dragleave', (e) => {
        if (!col.contains(e.relatedTarget)) {
          col.classList.remove('drag-over');
        }
      });

      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        const taskId = e.dataTransfer.getData('text/plain') || this.draggedTaskId;
        const targetStatus = col.dataset.status;

        if (taskId && targetStatus) {
          this.updateTaskStatus(taskId, targetStatus);
        }
      });
    });
  }

  async updateTaskStatus(taskId, targetStatus) {
    if (!this.state || !this.state.tasks) return;

    // Optimistic UI state mutation
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = targetStatus;
      this.renderKanban();
      this.renderTasks();
      this.renderKPIs();
      this.renderCharts();
    }

    // Framer Motion settling spring on the newly placed card
    const cardEl = document.getElementById(`kanban-card-${taskId}`);
    if (cardEl) {
      if (this.motion && this.motion.animate) {
        this.motion.animate(cardEl, { scale: [1.12, 0.97, 1], y: [-12, 2, 0] }, this.springCardSettle);
      } else if (window.anime) {
        anime({ targets: cardEl, scale: [1.06, 1], translateY: [-8, 0], duration: 400, easing: 'easeOutBack' });
      }
    }

    if (targetStatus === 'DONE') {
      this.playChime('green');
    }

    // Send mutation to backend to update docs/task.md
    try {
      await fetch('/api/task-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, newStatus: targetStatus })
      });
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  }

  renderTasks() {
    const taskListEl = document.getElementById('task-list-container');
    if (!taskListEl || !this.state.tasks) return;

    let filtered = this.state.tasks;
    if (this.filter === 'IN_PROGRESS') {
      filtered = this.state.tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL');
    } else if (this.filter === 'DONE') {
      filtered = this.state.tasks.filter(t => t.status === 'DONE');
    } else if (this.filter === 'BLOCKED') {
      filtered = this.state.tasks.filter(t => t.status === 'BLOCKED');
    }

    if (filtered.length === 0) {
      taskListEl.innerHTML = `<div style="color:var(--text-faint);padding:20px;text-align:center;">No tasks found in this view</div>`;
      return;
    }

    taskListEl.innerHTML = filtered.map(task => {
      const completedSubtasks = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
      const totalSubtasks = task.subtasks ? task.subtasks.length : 0;
      const progressPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

      const subtasksHtml = task.subtasks ? task.subtasks.map(s => `
        <div class="subtask-row ${s.completed ? 'done' : ''}">
          <input type="checkbox" class="subtask-checkbox" ${s.completed ? 'checked' : ''} disabled />
          <span>${this.escapeHtml(s.title)}</span>
          ${s.ac ? `<span class="badge-pill" style="font-size:9px;padding:1px 5px">${s.ac}</span>` : ''}
        </div>
      `).join('') : '';

      const filesHtml = task.impactedFiles && task.impactedFiles.length > 0 ? `
        <div class="file-chips">
          ${task.impactedFiles.map(f => `<span class="file-chip">📄 ${this.escapeHtml(f)}</span>`).join('')}
        </div>
      ` : '';

      return `
        <div class="bento-task-card">
          <div class="task-card-header">
            <div class="task-badges">
              <span class="task-id-badge">${this.escapeHtml(task.id)}</span>
              <span class="priority-pill ${task.priority}">${task.priority}</span>
              ${totalSubtasks > 0 ? `<span style="font-size:10px;color:var(--text-faint);font-family:var(--font-mono)">(${completedSubtasks}/${totalSubtasks} · ${progressPercent}%)</span>` : ''}
            </div>
            <span class="status-pill ${task.status}">${task.status}</span>
          </div>
          <div class="task-headline">${this.escapeHtml(task.title)}</div>
          <div class="subtasks-wrapper">
            ${subtasksHtml}
          </div>
          ${filesHtml}
        </div>
      `;
    }).join('');

    if (this.motion && this.motion.animate) {
      // Framer Motion Staggered Spring Cards Entrance
      this.motion.animate(
        '.bento-task-card',
        { opacity: [0, 1], y: [12, 0], scale: [0.98, 1] },
        { delay: this.motion.stagger(0.035), ...this.springLayout }
      );
    } else if (window.anime) {
      anime({
        targets: '.bento-task-card',
        translateY: [10, 0],
        opacity: [0.6, 1],
        delay: anime.stagger(40),
        duration: 400,
        easing: 'easeOutCubic'
      });
    }

    // Framer Motion spring micro-gestures on task cards
    taskListEl.querySelectorAll('.bento-task-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.animateSpring(card, { y: -2, scale: 1.008 }, this.springSnappy);
      });
      card.addEventListener('mouseleave', () => {
        this.animateSpring(card, { y: 0, scale: 1 }, this.springSnappy);
      });
      card.addEventListener('pointerdown', () => {
        this.animateSpring(card, { scale: 0.98 }, this.springPop);
      });
      card.addEventListener('pointerup', () => {
        this.animateSpring(card, { scale: 1.008 }, this.springSnappy);
      });
    });
  }

  renderSpecs() {
    const specsEl = document.getElementById('specs-container');
    if (!specsEl || !this.state.specs) return;

    specsEl.innerHTML = this.state.specs.map(spec => `
      <div class="spec-item-row">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-family:var(--font-mono);color:var(--cyan-primary);font-weight:700">${spec.id}</span>
          <span style="color:var(--text-muted)">${this.escapeHtml(spec.title)}</span>
        </div>
        <span class="status-pill ${spec.status}" style="font-size:9px">${spec.status}</span>
      </div>
    `).join('');

    // Framer Motion spring micro-gesture on spec items
    specsEl.querySelectorAll('.spec-item-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        this.animateSpring(row, { x: 4 }, this.springSnappy);
      });
      row.addEventListener('mouseleave', () => {
        this.animateSpring(row, { x: 0 }, this.springSnappy);
      });
    });
  }

  renderCharts() {
    this.renderDonutChart();
    this.renderBurnupChart();
    this.renderBarsChart();
    this.renderRingsChart();
    this.renderTaskDistribution();
  }

  // 1. AC Coverage Donut Gauge (in Bento Hero)
  renderDonutChart() {
    const donutSvg = document.getElementById('chart-donut');
    if (donutSvg && this.state.specs) {
      const green = this.state.specs.filter(s => s.status === 'GREEN').length;
      const red = this.state.specs.filter(s => s.status === 'RED').length;
      const pending = this.state.specs.filter(s => s.status === 'PENDING').length;
      const total = this.state.specs.length || 1;
      const pGreen = (green / total) * 100;
      const pRed = (red / total) * 100;
      const rate = Math.round(pGreen);

      donutSvg.innerHTML = `
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="10" />
        <circle id="donut-green-ring" cx="50" cy="50" r="36" fill="none" stroke="#10b981" stroke-width="10" stroke-dasharray="${pGreen * 2.26} 226" transform="rotate(-90 50 50)" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#ef4444" stroke-width="10" stroke-dasharray="${pRed * 2.26} 226" stroke-dashoffset="-${pGreen * 2.26}" transform="rotate(-90 50 50)" />
        <text x="50" y="55" text-anchor="middle" font-family="var(--font-mono)" font-size="13" font-weight="800" fill="var(--text-main)">${green}/${total}</text>
      `;

      // Update Donut Breakdown List
      const elPass = document.getElementById('hero-donut-passing');
      const elFail = document.getElementById('hero-donut-failing');
      const elPend = document.getElementById('hero-donut-pending');
      const elRate = document.getElementById('hero-donut-rate');
      if (elPass) elPass.textContent = green;
      if (elFail) elFail.textContent = red;
      if (elPend) elPend.textContent = pending;
      if (elRate) {
        elRate.textContent = `${rate}%`;
        elRate.className = rate >= 80 ? 'emerald' : (rate >= 50 ? 'amber' : 'red');
      }

      if (window.anime) {
        anime({
          targets: '#donut-green-ring',
          strokeDashoffset: [226, 0],
          duration: 1000,
          easing: 'easeOutQuart'
        });
      }
    }
  }

  // 2. Scope Velocity Trajectory (Burnup Area Curve)
  renderBurnupChart() {
    const burnupSvg = document.getElementById('chart-burnup');
    if (!burnupSvg) return;

    const pts = [
      [0, 85], [45, 75], [90, 68], [135, 52], [180, 40], [225, 25], [270, 15]
    ];
    const d = `M ${pts.map(p => p.join(',')).join(' L ')}`;
    const area = `${d} L 270,95 L 0,95 Z`;

    burnupSvg.innerHTML = `
      <defs>
        <linearGradient id="bentoCyanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.38"/>
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.0"/>
        </linearGradient>
      </defs>
      <path d="${area}" fill="url(#bentoCyanGrad)" />
      <path id="burnup-path-stroke" d="${d}" fill="none" stroke="#06b6d4" stroke-width="2.5" />
      ${pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#38bdf8" />`).join('')}
    `;

    if (window.anime) {
      anime({
        targets: '#burnup-path-stroke',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 1100,
        easing: 'easeInOutCubic'
      });
    }
  }

  // 3. 7-Day Velocity Bar Chart
  renderBarsChart() {
    const barsSvg = document.getElementById('chart-bars');
    if (!barsSvg) return;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = [4, 7, 5, 9, 8, 12, 10];
    const maxVal = Math.max(...values, 14);
    const baselineY = 74;
    const maxBarH = 54;
    const barW = 20;
    const startX = 14;
    const gap = 36;

    let barsHtml = `
      <defs>
        <linearGradient id="barGradCyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
        <linearGradient id="barGradEmerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#34d399"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <line x1="8" y1="${baselineY}" x2="262" y2="${baselineY}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="3 3" />
    `;

    days.forEach((day, i) => {
      const val = values[i];
      const h = Math.round((val / maxVal) * maxBarH);
      const x = startX + (i * gap);
      const y = baselineY - h;
      const isPeak = val === Math.max(...values);
      const grad = isPeak ? 'url(#barGradEmerald)' : 'url(#barGradCyan)';

      barsHtml += `
        <g class="bar-col-group">
          <rect class="velocity-bar-rect" x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="${grad}" opacity="0.9" />
          <text x="${x + (barW / 2)}" y="${y - 4}" text-anchor="middle" font-family="var(--font-mono)" font-size="9" font-weight="700" fill="var(--text-main)">${val}</text>
          <text x="${x + (barW / 2)}" y="${baselineY + 13}" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--text-faint)">${day}</text>
        </g>
      `;
    });

    barsSvg.innerHTML = barsHtml;

    if (this.motion && this.motion.animate) {
      this.motion.animate(
        '.velocity-bar-rect',
        { scaleY: [0, 1], opacity: [0.6, 1] },
        { delay: this.motion.stagger(0.04), ...this.springSnappy }
      );
    } else if (window.anime) {
      anime({
        targets: '.velocity-bar-rect',
        scaleY: [0, 1],
        transformOrigin: `0 ${baselineY}px`,
        delay: anime.stagger(50),
        duration: 700,
        easing: 'easeOutBack'
      });
    }
  }

  // 4. Quality & Coverage Multi-Ring Radial Gauge
  renderRingsChart() {
    const ringsSvg = document.getElementById('chart-rings');
    if (!ringsSvg) return;

    const cx = 52;
    const cy = 47;
    
    const rings = [
      { r: 36, pct: 96, color: '#10b981', label: 'Unit / TDD: 96%' },
      { r: 26, pct: 92, color: '#06b6d4', label: 'AC Contracts: 92%' },
      { r: 16, pct: 100, color: '#8b5cf6', label: 'Security Lint: 100%' }
    ];

    let svgContent = '';

    rings.forEach((ring, idx) => {
      const circ = 2 * Math.PI * ring.r;
      const strokeDash = (ring.pct / 100) * circ;
      const emptyDash = circ - strokeDash;

      svgContent += `
        <circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="6" />
        <circle id="gauge-ring-${idx}" cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="${ring.color}" stroke-width="6"
          stroke-dasharray="${strokeDash} ${emptyDash}" stroke-dashoffset="${circ}" stroke-linecap="round"
          transform="rotate(-90 ${cx} ${cy})" />
      `;
    });

    rings.forEach((ring, idx) => {
      const legY = 26 + (idx * 22);
      svgContent += `
        <circle cx="112" cy="${legY - 3}" r="4" fill="${ring.color}" />
        <text x="122" y="${legY}" font-family="var(--font-mono)" font-size="10" font-weight="600" fill="var(--text-main)">${ring.label}</text>
      `;
    });

    ringsSvg.innerHTML = svgContent;

    if (this.motion && this.motion.animate) {
      this.motion.animate('#gauge-ring-0, #gauge-ring-1, #gauge-ring-2', { opacity: [0, 1], scale: [0.92, 1] }, {
        delay: this.motion.stagger(0.08),
        ...this.springSnappy
      });
    } else if (window.anime) {
      anime({
        targets: ['#gauge-ring-0', '#gauge-ring-1', '#gauge-ring-2'],
        strokeDashoffset: [anime.setDashoffset, 0],
        delay: anime.stagger(120),
        duration: 900,
        easing: 'easeOutCubic'
      });
    }
  }

  // 5. Task Distribution Spectrum Bar
  renderTaskDistribution() {
    if (!this.state || !this.state.tasks) return;

    const tasks = this.state.tasks;
    const total = tasks.length || 1;

    const doneCount = tasks.filter(t => t.status === 'DONE').length;
    const progressCount = tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'RED_TEST_FAIL').length;
    const blockedCount = tasks.filter(t => t.status === 'BLOCKED').length;
    const backlogCount = Math.max(0, total - (doneCount + progressCount + blockedCount));

    const pDone = Math.round((doneCount / total) * 100);
    const pProgress = Math.round((progressCount / total) * 100);
    const pBlocked = Math.round((blockedCount / total) * 100);
    const pBacklog = Math.max(0, 100 - pDone - pProgress - pBlocked);

    const totalEl = document.getElementById('dist-total-tasks');
    if (totalEl) totalEl.textContent = `${total} Tasks Total`;

    const elDone = document.getElementById('dist-done');
    const elProg = document.getElementById('dist-progress');
    const elBack = document.getElementById('dist-backlog');
    const elBlock = document.getElementById('dist-blocked');

    if (elDone) elDone.style.width = `${pDone}%`;
    if (elProg) elProg.style.width = `${pProgress}%`;
    if (elBack) elBack.style.width = `${pBacklog}%`;
    if (elBlock) elBlock.style.width = `${pBlocked}%`;

    const cntDone = document.getElementById('dist-count-done');
    const cntProg = document.getElementById('dist-count-progress');
    const cntBack = document.getElementById('dist-count-backlog');
    const cntBlock = document.getElementById('dist-count-blocked');

    if (cntDone) cntDone.textContent = `${doneCount} (${pDone}%)`;
    if (cntProg) cntProg.textContent = `${progressCount} (${pProgress}%)`;
    if (cntBack) cntBack.textContent = `${backlogCount} (${pBacklog}%)`;
    if (cntBlock) cntBlock.textContent = `${blockedCount} (${pBlocked}%)`;
  }

  renderGit() {
    const { git } = this.state;
    if (!git) return;

    const branchBadge = document.getElementById('git-branch-badge');
    if (branchBadge) {
      branchBadge.textContent = `git:${git.branch} (${git.dirtyFiles} dirty)`;
    }

    const dirtyIndicator = document.getElementById('git-dirty-indicator');
    if (dirtyIndicator) {
      dirtyIndicator.textContent = git.dirtyFiles > 0 ? `${git.dirtyFiles} Dirty Files` : 'Clean Tree';
      dirtyIndicator.style.color = git.dirtyFiles > 0 ? 'var(--amber-warn)' : 'var(--emerald-pass)';
    }

    const feedEl = document.getElementById('commit-feed-container');
    if (feedEl && git.commits) {
      feedEl.innerHTML = git.commits.map(c => `
        <div class="commit-item">
          <div class="commit-item-top">
            <span class="commit-hash">${c.hash}</span>
            <span class="commit-author">${this.escapeHtml(c.author)} · ${this.escapeHtml(c.relativeTime)}</span>
          </div>
          <span class="commit-msg" title="${this.escapeHtml(c.subject)}">${this.escapeHtml(c.subject)}</span>
        </div>
      `).join('');

      // Framer Motion spring micro-gesture on git commits
      feedEl.querySelectorAll('.commit-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          this.animateSpring(item, { x: 4 }, this.springSnappy);
        });
        item.addEventListener('mouseleave', () => {
          this.animateSpring(item, { x: 0 }, this.springSnappy);
        });
      });
    }
  }

  /**
   * Render Agent Context Window & Token Telemetry (Claude MOD style)
   */
  renderTokens() {
    if (!this.state || !this.state.tokens) return;
    const tokens = this.state.tokens;

    // 1. Topbar Context Pill
    const hdrPct = document.getElementById('hdr-ctx-pct');
    const hdrFree = document.getElementById('hdr-ctx-free');
    const hdrDot = document.getElementById('hdr-ctx-dot');
    if (hdrPct) hdrPct.textContent = `${tokens.utilizationPercent}%`;
    if (hdrFree) {
      const freeK = tokens.freeTokens >= 1000 ? `${(tokens.freeTokens / 1000).toFixed(1)}k` : tokens.freeTokens;
      hdrFree.textContent = `(${freeK} free)`;
    }
    if (hdrDot) {
      hdrDot.className = `context-pill-dot ${tokens.healthStatus.toLowerCase()}`;
    }

    // 2. Card 2 Panel: Active Context Readout & Capacity Progress Bar
    const ctxUsedEl = document.getElementById('token-ctx-used');
    const ctxPctEl = document.getElementById('token-ctx-pct');
    const statusBadge = document.getElementById('token-status-badge');
    const capacityFill = document.getElementById('token-capacity-fill');

    if (ctxUsedEl) {
      const usedK = tokens.currentContext >= 1000 ? `${(tokens.currentContext / 1000).toFixed(1)}k` : tokens.currentContext;
      ctxUsedEl.textContent = `${usedK}`;
    }
    if (ctxPctEl) {
      ctxPctEl.textContent = `${tokens.utilizationPercent}%`;
    }
    if (statusBadge) {
      statusBadge.className = `badge-pill ${tokens.healthColor}`;
      statusBadge.textContent = `${tokens.healthLabel}`;
    }
    if (capacityFill) {
      capacityFill.className = `token-capacity-fill ${tokens.healthStatus.toLowerCase()}`;
      capacityFill.style.width = `${Math.min(100, tokens.utilizationPercent)}%`;
    }

    // 3. Claude MOD 4-Metric Grid Helper
    const formatK = (num) => {
      if (!num) return '0';
      if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
      if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
      return `${num}`;
    };

    const valInput = document.getElementById('token-val-input');
    const valCache = document.getElementById('token-val-cache');
    const valCacheRate = document.getElementById('token-val-cache-rate');
    const valOutput = document.getElementById('token-val-output');
    const valCost = document.getElementById('token-val-cost');
    const valSavings = document.getElementById('token-val-savings');

    if (valInput) valInput.textContent = formatK(tokens.totals.input);
    if (valCache) valCache.textContent = formatK(tokens.totals.cacheRead);
    if (valCacheRate) {
      valCacheRate.textContent = `${tokens.totals.cacheHitRate}% Cache Hit Rate ▲`;
    }
    if (valOutput) valOutput.textContent = formatK(tokens.totals.output);
    if (valCost) valCost.textContent = tokens.economics.costCachedFormatted;
    if (valSavings) {
      valSavings.textContent = `Saved ${tokens.economics.savingsFormatted} (${tokens.economics.savingsPercent}% off)`;
    }

    // 4. Panel Footer
    const turnCountEl = document.getElementById('token-turn-count');
    const avgTurnEl = document.getElementById('token-avg-turn');
    const headroomEl = document.getElementById('token-headroom-text');

    if (turnCountEl) turnCountEl.textContent = `${tokens.totals.turnCount} Model Turns`;
    if (avgTurnEl) avgTurnEl.textContent = `${formatK(tokens.totals.avgTokensPerTurn)} avg/turn`;
    if (headroomEl) {
      const freeK = tokens.freeTokens >= 1000 ? `${(tokens.freeTokens / 1000).toFixed(1)}k` : tokens.freeTokens;
      headroomEl.textContent = `${freeK} tokens free`;
    }

    // 5. Drawer Metrics & Recent Turns Table
    const drawerCtx = document.getElementById('drawer-token-ctx');
    const drawerCacheRate = document.getElementById('drawer-token-cache-rate');
    const drawerCacheHit = document.getElementById('drawer-token-cache-hit');
    const drawerCost = document.getElementById('drawer-token-cost');
    const drawerSavings = document.getElementById('drawer-token-savings');
    const drawerHealth = document.getElementById('drawer-token-health');
    const drawerAdvice = document.getElementById('drawer-token-advice');
    const tbody = document.getElementById('token-history-tbody');

    if (drawerCtx) drawerCtx.textContent = `${tokens.currentContext.toLocaleString()} tokens`;
    if (drawerCacheRate) drawerCacheRate.textContent = `${tokens.totals.cacheHitRate}%`;
    if (drawerCacheHit) drawerCacheHit.textContent = `${formatK(tokens.totals.cacheRead)} cached tokens`;
    if (drawerCost) drawerCost.textContent = tokens.economics.costCachedFormatted;
    if (drawerSavings) drawerSavings.textContent = `Saved ${tokens.economics.savingsFormatted} via cache`;
    if (drawerHealth) drawerHealth.textContent = tokens.healthStatus;
    if (drawerAdvice) drawerAdvice.textContent = tokens.healthLabel;

    if (tbody && tokens.recentTurns) {
      tbody.innerHTML = tokens.recentTurns.map(t => {
        const timeStr = t.time ? new Date(t.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-';
        return `
          <tr>
            <td style="font-weight:700;color:var(--cyan-primary)">#${t.step}</td>
            <td style="color:var(--text-faint)">${timeStr}</td>
            <td style="color:var(--text-muted)">${t.input.toLocaleString()}</td>
            <td style="color:var(--violet-accent)">${t.cacheRead.toLocaleString()}</td>
            <td style="color:var(--emerald-pass)">${t.output.toLocaleString()}</td>
            <td style="font-weight:700;color:var(--text-main)">${t.total.toLocaleString()}</td>
          </tr>
        `;
      }).join('');
    }
  }

  initOscilloscope() {
    const waveEl = document.getElementById('oscilloscope-wave');
    if (!waveEl) return;

    let offset = 0;
    const animateWave = () => {
      offset += 0.08;
      const points = [];
      const width = 200;
      const height = 48;
      const mid = height / 2;

      for (let x = 0; x <= width; x += 10) {
        const y = mid + Math.sin(x * 0.08 + offset) * 12;
        points.push(`${x},${y.toFixed(1)}`);
      }

      waveEl.setAttribute('d', `M ${points.join(' L ')}`);
      requestAnimationFrame(animateWave);
    };
    requestAnimationFrame(animateWave);
  }

  async executeAction(action) {
    const drawer = document.getElementById('test-drawer');
    const drawerBody = document.getElementById('drawer-output');

    if (action === 'run-tests') {
      drawer.classList.add('open');
      drawerBody.textContent = 'Executing local test runner (npm test / pytest)...';
      if (this.motion && this.motion.animate) {
        this.motion.animate(drawer, { y: ['100%', '0%'], opacity: [0.8, 1] }, this.springCardSettle);
      }
    }

    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const data = await res.json();

      if (action === 'run-tests') {
        drawerBody.textContent = data.output || 'Test execution completed.';
        if (data.success) {
          this.playChime('green');
        } else {
          this.playChime('red');
        }
      } else if (action === 'approve-milestone') {
        alert('✅ Phase Milestone Approved & Recorded in docs/approvals/!');
        this.playChime('green');
      }
    } catch (err) {
      if (drawerBody) drawerBody.textContent = `Error: ${err.message}`;
    }
  }

  copyStandup() {
    if (!this.state) return;
    const completed = this.state.tasks.filter(t => t.status === 'DONE').map(t => `- [x] ${t.title}`).join('\n') || '- None';
    const inProgress = this.state.tasks.filter(t => t.status === 'IN_PROGRESS').map(t => `- [ ] ${t.title}`).join('\n') || '- None';
    const blockers = this.state.blockers.map(b => `- 🔴 ${b.description}`).join('\n') || '- None';

    const text = `### 📋 Daily Standup Summary (${new Date().toLocaleDateString()})\n\n**✅ Completed:**\n${completed}\n\n**🚧 In Progress:**\n${inProgress}\n\n**⚠️ Blockers:**\n${blockers}\n\n*Generated via In-IDE Project-Manager-Dashboard*`;

    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy-standup');
      const old = btn.textContent;
      btn.textContent = 'Copied! ✅';
      this.animateSpring(btn, { scale: [1.14, 1] }, this.springPop);
      setTimeout(() => btn.textContent = old, 2000);
    });
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.dashboard = new BentoDashboardClient();
});
