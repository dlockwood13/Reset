/**
 * RESET — main app logic
 * All data persists to localStorage under the key 'reset.v1'.
 */

/* ========================================================
   STORAGE
   ======================================================== */
const KEY = 'reset.v1';

const store = {
  data: {
    name: '',
    onboarded: false,
    journeyTasks: {},
    dailyTasks: {},
    dailyDate: '',
    entries: [],
    streak: 0,
    lastActive: ''
  },

  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        this.data = Object.assign(this.data, JSON.parse(raw));
      }
    } catch (e) {
      console.warn('Storage load failed', e);
    }
    this.checkDailyReset();
    this.updateStreak();
  },

  save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  },

  todayKey() {
    const d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  },

  checkDailyReset() {
    const today = this.todayKey();
    if (this.data.dailyDate !== today) {
      this.data.dailyTasks = {};
      this.data.dailyDate = today;
      this.save();
    }
  },

  updateStreak() {
    const today = this.todayKey();
    if (this.data.lastActive === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.getFullYear() + '-' +
      String(yesterday.getMonth() + 1).padStart(2, '0') + '-' +
      String(yesterday.getDate()).padStart(2, '0');

    if (this.data.lastActive === yKey) {
      this.data.streak += 1;
    } else if (this.data.lastActive !== '') {
      this.data.streak = 1;
    } else {
      this.data.streak = 1;
    }
    this.data.lastActive = today;
    this.save();
  },

  clear() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      console.warn('Storage clear failed', e);
    }
    this.data = {
      name: '',
      onboarded: false,
      journeyTasks: {},
      dailyTasks: {},
      dailyDate: '',
      entries: [],
      streak: 0,
      lastActive: ''
    };
  }
};

/* ========================================================
   NAVIGATION
   ======================================================== */
const nav = {
  stack: ['home'],

  go(page, args) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === page);
    });

    if (this.stack[this.stack.length - 1] !== page) this.stack.push(page);

    if (page === 'detail' && args) renderDetail(args);
    if (page === 'phase' && args) renderPhase(args);
    if (page === 'resources') renderHome();
    if (page === 'home') app.refreshHome();
    if (page === 'checklist') app.refreshChecklist();
    if (page === 'journal') app.refreshJournal();
    if (page === 'settings') app.refreshSettings();

    window.scrollTo(0, 0);
  },

  back() {
    if (this.stack.length > 1) this.stack.pop();
    const prev = this.stack[this.stack.length - 1] || 'home';

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + prev).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === prev);
    });

    if (prev === 'home') app.refreshHome();
    window.scrollTo(0, 0);
  }
};

/* ========================================================
   RENDERING
   ======================================================== */
function totalTasksForJourney(j) {
  return j.groups.reduce((sum, g) => sum + (g.tasks ? g.tasks.length : 0), 0);
}

function doneTasksForJourney(j) {
  const state = store.data.journeyTasks[j.id] || {};
  return Object.values(state).filter(Boolean).length;
}

function renderHome() {
  const phasesEl = document.getElementById('phases-list');
  if (phasesEl) {
    phasesEl.innerHTML = CONTENT.phases.map(p => {
      const journeys = p.journeyIds.map(id => CONTENT.journey.find(j => j.id === id)).filter(Boolean);
      const total = journeys.reduce((s, j) => s + totalTasksForJourney(j), 0);
      const done = journeys.reduce((s, j) => s + doneTasksForJourney(j), 0);
      const pct = total ? Math.round((done / total) * 100) : 0;
      return `<div class="phase-card" onclick="nav.go('phase','${p.id}')">
        <div class="phase-icon ${p.color}"><i class="ti ${p.icon}"></i></div>
        <div class="phase-info">
          <div class="phase-title">${p.title}</div>
          <div class="phase-sub">${p.sub}</div>
          <div class="phase-progress">
            <div class="phase-bar"><div class="phase-fill" style="width:${pct}%"></div></div>
            <div class="phase-count">${done}/${total}</div>
          </div>
        </div>
        <i class="ti ti-chevron-right phase-chev"></i>
      </div>`;
    }).join('');
  }

  // Resources page (rendered into the resources sub-page when present)
  const res = document.getElementById('res-list');
  if (res) {
    res.innerHTML = CONTENT.resources.map(r => `<a class="res-row" href="${r.url}" target="_blank" rel="noopener noreferrer">
      <div class="res-icon ${r.color}"><i class="ti ${r.icon}"></i></div>
      <div class="res-info"><div class="res-name">${r.name}</div><div class="res-sub">${r.sub}</div></div>
      <i class="ti ti-arrow-up-right" style="color:var(--ink-3);font-size:16px"></i>
    </a>`).join('');
  }
}

function renderPhase(phaseId) {
  const p = CONTENT.phases.find(x => x.id === phaseId);
  if (!p) return;

  document.getElementById('phase-title').textContent = p.title;
  document.getElementById('phase-intro').textContent = p.intro || '';

  const list = document.getElementById('phase-items');
  const journeys = p.journeyIds.map(id => CONTENT.journey.find(j => j.id === id)).filter(Boolean);
  list.innerHTML = journeys.map(j => {
    const total = totalTasksForJourney(j);
    const done = doneTasksForJourney(j);
    const pct = total ? Math.round((done / total) * 100) : 0;
    const metaHTML = total
      ? `<span>${j.meta}</span><span class="j-dot"></span><div class="j-mini"><div class="j-mini-bar"><div class="j-mini-fill" style="width:${pct}%"></div></div><span>${done}/${total}</span></div>`
      : `<span>${j.meta}</span>`;
    return `<div class="j-row" onclick="nav.go('detail','${j.id}')">
      <div class="j-icon ${j.color}"><i class="ti ${j.icon}"></i></div>
      <div class="j-info">
        <div class="j-title">${j.title}</div>
        <div class="j-meta">${metaHTML}</div>
      </div>
      <i class="ti ti-chevron-right j-chev"></i>
    </div>`;
  }).join('');
}

function renderDetail(id) {
  const j = CONTENT.journey.find(x => x.id === id);
  if (!j) return;

  document.getElementById('detail-title').textContent = j.title;
  const state = store.data.journeyTasks[j.id] || {};
  let html = '';

  if (j.quote) {
    html += `<div class="quote"><span class="q">"</span>${j.quote}</div>`;
  }

  j.groups.forEach(g => {
    html += `<div class="sub-h">${g.title}</div>`;

    if (g.tasks) {
      g.tasks.forEach((t, i) => {
        const key = `${j.id}_${slug(g.title)}_${i}`;
        const checked = state[key] ? 'checked' : '';
        const done = state[key] ? 'done' : '';
        html += `<div class="task"><div class="cbox ${checked}" data-jid="${j.id}" data-key="${key}" onclick="app.tickJourney(this)"></div><span class="ctext ${done}">${t}</span></div>`;
      });
    }

    if (g.chips) {
      html += `<div class="chip-row">${g.chips.map(c => `<div class="chip"><i class="ti ${c.i}"></i> ${c.t}</div>`).join('')}</div>`;
    }

    if (g.targets) {
      html += `<div class="target-grid">${g.targets.map(t => `<div class="target"><div class="target-num">${t.n}</div><div class="target-label">${t.l}</div></div>`).join('')}</div>`;
    }

    if (g.star) {
      html += `<div class="star-grid">${g.star.map(s => `<div class="star"><div class="star-head"><div class="star-letter">${s.l}</div><div class="star-name">${s.n}</div></div><div class="star-desc">${s.d}</div></div>`).join('')}</div>`;
    }

    if (g.template) {
      html += `<div class="template">${g.template}<br><button class="template-copy" onclick="app.copyTemplate(this,'${escapeAttr(g.template)}')"><i class="ti ti-copy" style="font-size:13px"></i> Copy template</button></div>`;
    }

    if (g.certs) {
      html += g.certs.map(c => `<div class="cert-row"><div class="cert-badge"><i class="ti ${c.i}"></i></div><div><div class="cert-name">${c.n}</div><div class="cert-plat">${c.p}</div></div></div>`).join('');
    }

    if (g.quote) {
      html += `<div class="quote" style="margin-top:8px;margin-bottom:0"><span class="q">"</span>${g.quote}</div>`;
    }
  });

  document.getElementById('detail-body').innerHTML = html;
}

function renderChecklist() {
  const wrap = document.getElementById('checklist-sections');
  const state = store.data.dailyTasks;

  wrap.innerHTML = CONTENT.checklist.map((s, si) => {
    const tasks = s.tasks.map((t, ti) => {
      const key = `${si}_${ti}`;
      const checked = state[key] ? 'checked' : '';
      const done = state[key] ? 'done' : '';
      return `<div class="task"><div class="cbox daily ${checked}" data-key="${key}" onclick="app.tickDaily(this)"></div><span class="ctext ${done}">${t}</span></div>`;
    }).join('');

    const iconColor = s.color === 'amber' ? 'var(--amber-text)' : `var(--${s.color}-deep, var(--${s.color}))`;

    return `<div class="cl-section">
      <div class="cl-sec-head" onclick="app.toggleClSec(this)">
        <div class="cl-sec-icon" style="background:var(--${s.color}-soft);color:${iconColor}"><i class="ti ${s.icon}"></i></div>
        <div class="cl-sec-info"><div class="cl-sec-title">${s.title}</div><div class="cl-sec-sub">${s.sub}</div></div>
        <i class="ti ti-chevron-down cl-chev open"></i>
      </div>
      <div class="cl-sec-body open">${tasks}</div>
    </div>`;
  }).join('');

  app.updateChecklistProgress();
}

function renderJournal() {
  const moodRow = document.getElementById('mood-row');
  moodRow.innerHTML = CONTENT.moods.map(m =>
    `<div class="mb" data-mood="${m.e} ${m.l}" onclick="app.setMood(this)"><div class="mb-emoji">${m.e}</div><div class="mb-label">${m.l}</div></div>`
  ).join('');

  const list = document.getElementById('entries-list');
  if (!store.data.entries.length) {
    list.innerHTML = `<div class="entry-empty">No entries yet — your reflections will appear here.</div>`;
  } else {
    list.innerHTML = store.data.entries.map(e => `<div class="entry">
      <div class="entry-top"><div class="entry-date">${e.date}</div>${e.mood ? `<div class="entry-mood">${e.mood}</div>` : ''}</div>
      <div class="entry-text">${escapeHtml(e.text)}</div>
    </div>`).join('');
  }
}

/* ========================================================
   APP LOGIC
   ======================================================== */
const app = {
  _mood: '',
  _deferredInstall: null,

  totalDaily() {
    return CONTENT.checklist.reduce((s, sec) => s + sec.tasks.length, 0);
  },

  totalJourney() {
    return CONTENT.journey.reduce((s, j) => s + totalTasksForJourney(j), 0);
  },

  doneJourney() {
    return CONTENT.journey.reduce((s, j) => s + doneTasksForJourney(j), 0);
  },

  tickJourney(box) {
    const jid = box.dataset.jid;
    const key = box.dataset.key;
    if (!store.data.journeyTasks[jid]) store.data.journeyTasks[jid] = {};
    const newVal = !store.data.journeyTasks[jid][key];
    store.data.journeyTasks[jid][key] = newVal;
    box.classList.toggle('checked', newVal);
    box.nextElementSibling.classList.toggle('done', newVal);
    store.save();
  },

  tickDaily(box) {
    const key = box.dataset.key;
    const newVal = !store.data.dailyTasks[key];
    store.data.dailyTasks[key] = newVal;
    box.classList.toggle('checked', newVal);
    box.nextElementSibling.classList.toggle('done', newVal);
    store.save();
    this.updateChecklistProgress();
  },

  toggleClSec(hdr) {
    const body = hdr.nextElementSibling;
    const chev = hdr.querySelector('.cl-chev');
    body.classList.toggle('open');
    chev.classList.toggle('open');
  },

  updateChecklistProgress() {
    const total = this.totalDaily();
    const done = Object.values(store.data.dailyTasks).filter(Boolean).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const bar = document.getElementById('cl-bar');
    if (bar) bar.style.width = pct + '%';
    const cc = document.querySelector('.cl-prog-count');
    if (cc) cc.innerHTML = `<strong id="done-count">${done}</strong> / ${total}`;
  },

  resetDaily() {
    if (!confirm("Reset today's checklist? Your progress will be cleared.")) return;
    store.data.dailyTasks = {};
    store.save();
    renderChecklist();
    toast('Checklist reset');
  },

  setMood(el) {
    document.querySelectorAll('.mb').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
    this._mood = el.dataset.mood;
  },

  addEntry() {
    const input = document.getElementById('win-input');
    const text = input.value.trim();
    if (!text) {
      toast('Write something first');
      return;
    }
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    store.data.entries.unshift({
      date: dateStr,
      mood: this._mood || '',
      text,
      ts: Date.now()
    });
    store.save();
    input.value = '';
    this._mood = '';
    document.querySelectorAll('.mb').forEach(b => b.classList.remove('sel'));
    renderJournal();
    toast('Entry saved');
  },

  copyTemplate(btn, text) {
    const decoded = text.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(decoded)
        .then(() => toast('Copied to clipboard'))
        .catch(() => toast('Copy failed'));
    } else {
      toast('Copy not supported');
    }
  },

  refreshHome() {
    renderHome();
    const total = this.totalJourney();
    const done = this.doneJourney();
    const pct = total ? Math.round((done / total) * 100) : 0;

    document.getElementById('hero-pct').textContent = pct + '%';
    const dash = 238.76;
    document.getElementById('hero-ring').style.strokeDashoffset = dash - (dash * pct / 100);

    document.getElementById('stat-tasks').textContent = done;
    const dailyTotal = this.totalDaily();
    const dailyDone = Object.values(store.data.dailyTasks).filter(Boolean).length;
    document.getElementById('stat-today').textContent = dailyDone + '/' + dailyTotal;
    document.getElementById('stat-entries').textContent = store.data.entries.length;

    document.getElementById('streak-count').textContent = store.data.streak;
    document.getElementById('hero-week').textContent =
      pct === 0 ? 'Getting started' :
      pct < 100 ? 'In progress' :
      'Journey complete';

    const greetEl = document.getElementById('greet-text');
    const greetSubEl = document.getElementById('greet-sub');
    if (store.data.name) {
      greetEl.textContent = greetingForTime() + ', ' + store.data.name;
      const initials = store.data.name.trim().split(/\s+/).map(s => s[0]).slice(0, 2).join('').toUpperCase() || 'RE';
      document.getElementById('avatar').textContent = initials;
    } else {
      greetEl.textContent = greetingForTime();
      document.getElementById('avatar').textContent = 'RE';
    }
    if (greetSubEl) {
      greetSubEl.textContent =
        pct === 0 ? "Let's get started" :
        pct < 100 ? "Keep the momentum going" :
        "You've done it. Time to celebrate.";
    }
  },

  refreshChecklist() {
    store.checkDailyReset();
    renderChecklist();
    const d = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById('today-date').textContent =
      days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()];
  },

  refreshJournal() {
    renderJournal();
  },

  refreshSettings() {
    document.getElementById('set-name').textContent = store.data.name || 'Not set';
  },

  editName() {
    const name = prompt('Your name?', store.data.name || '');
    if (name === null) return;
    store.data.name = name.trim().slice(0, 30);
    store.save();
    this.refreshSettings();
    toast('Name updated');
  },

  exportData() {
    const data = JSON.stringify(store.data, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reset-backup-' + store.todayKey() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Backup downloaded');
  },

  clearAllData() {
    if (!confirm('Delete all data? This will clear your progress, journal entries, and settings. This cannot be undone.')) return;
    store.clear();
    location.reload();
  },

  installPrompt() {
    if (this._deferredInstall) {
      this._deferredInstall.prompt();
      this._deferredInstall.userChoice.then(() => {
        this._deferredInstall = null;
      });
    } else {
      toast('Use your browser menu: "Add to Home Screen"');
    }
  },

  completeOnboarding() {
    const name = document.getElementById('onboard-name').value.trim();
    store.data.name = name.slice(0, 30);
    store.data.onboarded = true;
    store.save();
    document.getElementById('onboard').style.display = 'none';
    this.refreshHome();
  },

  /* ===== Mental health tools ===== */
  _breathTimer: null,
  _breathCycle: 0,
  _breathTotal: 4,

  startBreathing() {
    document.getElementById('modal-breathing').style.display = 'flex';
    this._breathCycle = 0;
    this._runBreathStep('inhale');
  },

  _runBreathStep(phase) {
    const stageEl = document.getElementById('breath-stage');
    const circleEl = document.getElementById('breath-circle');
    const cycleEl = document.getElementById('breath-cycle');
    if (!stageEl || !circleEl) return;

    cycleEl.textContent = `Cycle ${Math.min(this._breathCycle + 1, this._breathTotal)} of ${this._breathTotal}`;

    const phases = {
      inhale: { label: 'Breathe in', next: 'hold-in', duration: 4000 },
      'hold-in': { label: 'Hold', next: 'exhale', duration: 4000 },
      exhale: { label: 'Breathe out', next: 'hold-out', duration: 4000 },
      'hold-out': { label: 'Hold', next: 'inhale', duration: 4000 }
    };

    const p = phases[phase];
    stageEl.textContent = p.label;
    circleEl.classList.remove('inhale', 'hold', 'exhale');
    if (phase === 'inhale') circleEl.classList.add('inhale');
    else if (phase === 'exhale') circleEl.classList.add('exhale');
    else circleEl.classList.add('hold');

    this._breathTimer = setTimeout(() => {
      if (phase === 'hold-out') {
        this._breathCycle += 1;
        if (this._breathCycle >= this._breathTotal) {
          stageEl.textContent = 'Well done';
          cycleEl.textContent = 'Complete';
          toast('Breathing complete');
          this._breathTimer = setTimeout(() => this.stopBreathing(), 1600);
          return;
        }
      }
      this._runBreathStep(p.next);
    }, p.duration);
  },

  stopBreathing() {
    clearTimeout(this._breathTimer);
    this._breathTimer = null;
    document.getElementById('modal-breathing').style.display = 'none';
    const circleEl = document.getElementById('breath-circle');
    if (circleEl) circleEl.classList.remove('inhale', 'hold', 'exhale');
  },

  openGrounding() {
    document.getElementById('modal-grounding').style.display = 'flex';
  },

  _affirmations: [
    'You are more than this moment.',
    'Your worth is not defined by your job title.',
    "This is a transition, not a failure.",
    'You have skills, experience and value that this setback cannot take away.',
    'Rest is not falling behind. Rest is part of the work.',
    "It's okay to feel lost. Just don't stay lost.",
    'Every application sent is a sign of your courage.',
    'You have weathered hard days before. You can weather this one too.',
    'Asking for help is a strength, not a weakness.',
    'The right opportunity is still ahead of you.',
    'Your story is far from finished.',
    'Small steps still count. Keep going.'
  ],

  openAffirmation() {
    this.shuffleAffirmation();
    document.getElementById('modal-affirmation').style.display = 'flex';
  },

  shuffleAffirmation() {
    const idx = Math.floor(Math.random() * this._affirmations.length);
    document.getElementById('aff-text').textContent = this._affirmations[idx];
  },

  closeModal(name) {
    const el = document.getElementById('modal-' + name);
    if (el) el.style.display = 'none';
  }
};

/* ========================================================
   UTILITIES
   ======================================================== */
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

function greetingForTime() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function escapeAttr(s) {
  return String(s).replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ========================================================
   PWA INSTALL HOOK
   ======================================================== */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  app._deferredInstall = e;
});

/* ========================================================
   INIT
   ======================================================== */
store.load();

if (!store.data.onboarded) {
  document.getElementById('onboard').style.display = 'flex';
}

renderHome();
renderChecklist();
renderJournal();
app.refreshHome();
app.refreshChecklist();
