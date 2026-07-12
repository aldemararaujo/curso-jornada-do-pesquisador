/* ============ A Jornada do Pesquisador, engine ============ */
"use strict";

const PHASES = [
  { id: 0, label: "Comece aqui", icon: "🧭" },
  { id: 1, label: "Fase 1 · Planejar", icon: "🗺️" },
  { id: 2, label: "Fase 2 · Executar", icon: "⚙️" },
  { id: 3, label: "Fase 3 · Divulgar", icon: "📣" },
  { id: 4, label: "Além da jornada", icon: "🌅" },
];

/* ---------- gamificação: configuração ---------- */
const GAME = { modulo: 100, primeira: 25, retentativa: 10, checklist: 20, medalha: 50 };

const LEVELS = [
  { xp: 0, icon: "🌱", name: "Curioso" },
  { xp: 200, icon: "🧭", name: "Chamado pela Dúvida" },
  { xp: 500, icon: "💡", name: "Formulador de Perguntas" },
  { xp: 900, icon: "📚", name: "Explorador da Literatura" },
  { xp: 1400, icon: "📐", name: "Projetista Científico" },
  { xp: 2000, icon: "🔬", name: "Coletor de Dados" },
  { xp: 2700, icon: "📊", name: "Analista de Evidências" },
  { xp: 3400, icon: "📣", name: "Comunicador Científico" },
  { xp: 4100, icon: "🏆", name: "Cientista Publicado" },
];

const BADGES = [
  { id: "primeiro-passo", icon: "🧭", name: "Primeiro Passo", desc: "Conclua o módulo de boas-vindas", when: s => !!s.done["boas-vindas"] },
  { id: "ideia-brilhante", icon: "💡", name: "Ideia Brilhante", desc: "Conclua o módulo Lapidando a Ideia Brilhante", when: s => !!s.done["lapidando-a-ideia"] },
  { id: "planejador", icon: "🗺️", name: "Planejador", desc: "Complete todos os módulos da Fase 1, Planejar", when: s => faseDone(s, 1) },
  { id: "executor", icon: "⚙️", name: "Executor", desc: "Complete todos os módulos da Fase 2, Executar", when: s => faseDone(s, 2) },
  { id: "divulgador", icon: "📣", name: "Divulgador", desc: "Complete todos os módulos da Fase 3, Divulgar", when: s => faseDone(s, 3) },
  { id: "quiz-perfeito", icon: "🎯", name: "Quiz Perfeito", desc: "Acerte todas as questões de um quiz na primeira tentativa", when: s => LESSONS.some(l => l.quiz && l.quiz.length && l.quiz.every((_, i) => (s.quiz[l.id] || {})[i] === "p")) },
  { id: "mente-afiada", icon: "🧠", name: "Mente Afiada", desc: "Acerte 20 questões na primeira tentativa", when: s => countFirstTry(s) >= 20 },
  { id: "metodico", icon: "✅", name: "Metódico", desc: "Complete 5 checklists práticos inteiros", when: s => LESSONS.filter(l => checklistDone(s, l)).length >= 5 },
  { id: "constancia", icon: "🔥", name: "Constância", desc: "Estude 3 dias seguidos", when: s => s.streak.best >= 3 },
  { id: "disciplina", icon: "⚡", name: "Disciplina", desc: "Estude 7 dias seguidos", when: s => s.streak.best >= 7 },
  { id: "jornada-completa", icon: "🏔️", name: "Jornada Completa", desc: "Conclua todos os módulos do curso", when: s => LESSONS.every(l => s.done[l.id]) },
  { id: "legado", icon: "📜", name: "Legado", desc: "Gere seu certificado de conclusão com nome", when: s => !!s.certGen },
];

/* ---------- estado ---------- */
const KEY = "jdp-curso-v1";
const state = load();
function load() {
  let raw = {};
  try { raw = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch {}
  const s = Object.assign({
    done: {}, quiz: {}, check: {}, fl: {}, name: "", last: "",
    badges: {}, streak: { last: "", days: 0, best: 0 }, free: false, certGen: false,
  }, raw);
  s.streak = Object.assign({ last: "", days: 0, best: 0 }, s.streak || {});
  // migração: quizzes antigos gravavam true/false → 'ok' (não dá para saber se foi de primeira) / 'x'
  Object.values(s.quiz).forEach(qz => {
    Object.keys(qz).forEach(k => {
      if (qz[k] === true) qz[k] = "ok";
      else if (qz[k] === false) qz[k] = "x";
    });
  });
  return s;
}
function save() {
  const fresh = evalBadges();
  fresh.forEach(b => toast("Medalha conquistada: <b>" + esc(b.name) + "</b> · +" + GAME.medalha + " XP", b.icon));
  const cur = level().cur;
  if (state.lvSeen == null) state.lvSeen = cur.name;
  else if (state.lvSeen !== cur.name) {
    const subiu = LEVELS.findIndex(l => l.name === cur.name) > LEVELS.findIndex(l => l.name === state.lvSeen);
    state.lvSeen = cur.name;
    if (subiu) toast("Nova patente: <b>" + esc(cur.name) + "</b>", cur.icon);
  }
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

const $ = (sel, el) => (el || document).querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- copiar para a área de transferência ---------- */
function copyText(txt, btn) {
  const feito = () => {
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = "✓ Copiado!";
    btn.classList.add("copied");
    btn.disabled = true;
    setTimeout(() => { btn.innerHTML = orig; btn.classList.remove("copied"); btn.disabled = false; }, 2000);
  };
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = txt;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); feito(); } catch {}
    ta.remove();
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(feito).catch(fallback);
  } else fallback();
}

/* ---------- toasts (feedback imediato) ---------- */
function toast(msg, icon) {
  const box = $("#toasts");
  if (!box) return;
  while (box.children.length >= 3) box.firstChild.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = '<span class="t-ico" aria-hidden="true">' + (icon || "✨") + "</span><span>" + msg + "</span>";
  box.appendChild(t);
  setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 350); }, 4500);
}

const doneCount = () => LESSONS.filter(l => state.done[l.id]).length;
const pct = () => Math.round(doneCount() / LESSONS.length * 100);

/* ---------- gamificação: derivações ---------- */
function faseDone(s, fase) {
  const mods = LESSONS.filter(l => l.fase === fase);
  return mods.length > 0 && mods.every(l => s.done[l.id]);
}
function checklistDone(s, l) {
  if (!l.checklist || !l.checklist.length) return false;
  const arr = s.check[l.id] || [];
  return l.checklist.every((_, i) => arr[i]);
}
function countFirstTry(s) {
  let n = 0;
  Object.values(s.quiz).forEach(qz => { Object.values(qz).forEach(v => { if (v === "p") n++; }); });
  return n;
}
function countCorrect(s) {
  let n = 0;
  Object.values(s.quiz).forEach(qz => { Object.values(qz).forEach(v => { if (v === "p" || v === "ok") n++; }); });
  return n;
}
function xp() {
  let x = 0;
  LESSONS.forEach(l => {
    if (state.done[l.id]) x += GAME.modulo;
    const qz = state.quiz[l.id] || {};
    Object.values(qz).forEach(v => { if (v === "p") x += GAME.primeira; else if (v === "ok") x += GAME.retentativa; });
    if (checklistDone(state, l)) x += GAME.checklist;
  });
  x += Object.keys(state.badges).length * GAME.medalha;
  return x;
}
function level() {
  const x = xp();
  let cur = LEVELS[0], next = null;
  for (const lv of LEVELS) { if (x >= lv.xp) cur = lv; else { next = lv; break; } }
  return { cur, next, x };
}
function evalBadges() {
  const fresh = [];
  BADGES.forEach(b => {
    if (!state.badges[b.id] && b.when(state)) { state.badges[b.id] = hoje(); fresh.push(b); }
  });
  return fresh;
}
function hoje() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function touchStreak() {
  const t = hoje();
  const st = state.streak;
  if (st.last === t) return;
  const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
  const y = ontem.getFullYear() + "-" + String(ontem.getMonth() + 1).padStart(2, "0") + "-" + String(ontem.getDate()).padStart(2, "0");
  st.days = st.last === y ? st.days + 1 : 1;
  st.best = Math.max(st.best, st.days);
  st.last = t;
  if (st.days >= 2) toast(st.days + " dias seguidos de estudo, continue assim!", "🔥");
}
function unlocked(l) {
  if (state.free) return true;
  const i = LESSONS.indexOf(l);
  return i === 0 || !!state.done[LESSONS[i - 1].id];
}
function firstOpenLesson() {
  return LESSONS.find(l => !state.done[l.id] && unlocked(l)) || LESSONS[LESSONS.length - 1];
}
function lockedToast(l) {
  const i = LESSONS.indexOf(l);
  const antes = i > 0 ? LESSONS[i - 1].title : "";
  toast("Módulo bloqueado, conclua <b>" + esc(antes) + "</b> primeiro. Em <b>Minha Jornada</b> você pode destravar todos.", "🔒");
}

/* ---------- requisitos para concluir o módulo ---------- */
function flRefsOf(l) {
  const refs = l.fl == null ? [] : (Array.isArray(l.fl) ? l.fl : [{ n: l.fl, label: l.flLabel }]);
  return refs.filter(ref => FL[typeof ref === "object" ? ref.n : ref]);
}
function reqsOf(l) {
  const r = [];
  if (l.quiz && l.quiz.length) {
    const qz = state.quiz[l.id] || {};
    const ok = l.quiz.filter((_, i) => qz[i] === "p" || qz[i] === "ok").length;
    r.push({ done: ok === l.quiz.length, label: "Responder o quiz do módulo", info: ok + "/" + l.quiz.length + " certas" });
  }
  if (l.checklist && l.checklist.length) {
    const arr = state.check[l.id] || [];
    const n = l.checklist.filter((_, i) => arr[i]).length;
    r.push({ done: n === l.checklist.length, label: "Completar o checklist prático", info: n + "/" + l.checklist.length });
  }
  const refs = flRefsOf(l);
  if (refs.length) {
    const seen = state.fl[l.id] || {};
    const n = refs.filter((_, i) => seen[i]).length;
    r.push({
      done: n === refs.length,
      label: refs.length > 1 ? "Abrir os aprofundamentos FiatLux" : "Abrir o aprofundamento FiatLux",
      info: refs.length > 1 ? n + "/" + refs.length : null,
    });
  }
  return r;
}
function reqsHTML(l) {
  const r = reqsOf(l);
  if (!r.length) return "";
  return '<div class="reqs" id="reqs-box"><b><span aria-hidden="true">🔓</span> Para concluir este módulo e liberar o próximo:</b><ul>' +
    r.map(q => '<li class="' + (q.done ? "ok" : "pend") + '">' + esc(q.label) +
      (q.info ? ' <span class="ri">' + q.info + "</span>" : "") + "</li>").join("") + "</ul></div>";
}

/* ---------- roteador ---------- */
function route() {
  const h = location.hash;
  const landing = $("#landing"), app = $("#app");
  let m;
  if ((m = h.match(/^#\/licao\/([\w-]+)/))) {
    const lesson = LESSONS.find(l => l.id === m[1]);
    if (!lesson) { location.hash = "#/curso"; return; }
    if (!unlocked(lesson)) { lockedToast(lesson); location.hash = "#/licao/" + firstOpenLesson().id; return; }
    landing.hidden = true; app.hidden = false;
    state.last = lesson.id; save();
    renderSidebar(lesson.id);
    renderLesson(lesson);
  } else if (h.startsWith("#/jornada")) {
    landing.hidden = true; app.hidden = false;
    renderSidebar("jornada");
    renderJornada();
  } else if (h.startsWith("#/certificado")) {
    landing.hidden = true; app.hidden = false;
    renderSidebar("cert");
    renderCert();
  } else if (h.startsWith("#/curso")) {
    const last = LESSONS.find(l => l.id === state.last);
    location.hash = "#/licao/" + (last && unlocked(last) ? last.id : firstOpenLesson().id);
    return;
  } else {
    app.hidden = true; landing.hidden = false;
    renderLandingState();
  }
  updateHud();
  closeSidebar();
  window.scrollTo(0, 0);
}

/* ---------- landing ---------- */
function renderLandingState() {
  const n = doneCount();
  const btn = $("#resume-btn");
  if (n > 0 && n < LESSONS.length) {
    btn.hidden = false;
    btn.innerHTML = "▶ Continuar de onde parei <small style='opacity:.75'>(" + pct() + "% concluído)</small>";
  } else if (n === LESSONS.length) {
    btn.hidden = false;
    btn.textContent = "🎓 Curso concluído, ver certificado";
    btn.onclick = () => { location.hash = "#/certificado"; };
  } else btn.hidden = true;

  const trail = $("#trail");
  if (trail.dataset.built) return;
  trail.dataset.built = "1";
  PHASES.forEach(ph => {
    const mods = LESSONS.filter(l => l.fase === ph.id);
    if (!mods.length) return;
    const el = document.createElement("div");
    el.className = "phase";
    el.innerHTML =
      '<div class="ph-head"><div class="ph-n">' + ph.icon + "</div><h3>" + esc(ph.label) +
      "</h3><span>" + mods.length + (mods.length > 1 ? " etapas" : " etapa") + "</span></div><ol>" +
      mods.map(l => "<li><b>" + (l.num != null ? String(l.num).padStart(2, "0") : "★") + "</b> " + esc(l.title) + "</li>").join("") +
      "</ol>";
    trail.appendChild(el);
  });
}

/* ---------- sidebar ---------- */
function renderSidebar(activeId) {
  const sb = $("#sb-nav");
  sb.innerHTML = "";
  const jor = document.createElement("button");
  jor.className = "sb-item sb-jornada" + (activeId === "jornada" ? " active" : "");
  jor.innerHTML = '<span class="dot" aria-hidden="true" style="border-color:var(--amber);color:var(--amber)">★</span><span class="t">Minha Jornada</span>';
  jor.onclick = () => { location.hash = "#/jornada"; };
  sb.appendChild(jor);
  PHASES.forEach(ph => {
    const mods = LESSONS.filter(l => l.fase === ph.id);
    if (!mods.length) return;
    const h = document.createElement("div");
    h.className = "sb-phase";
    h.textContent = ph.icon + " " + ph.label;
    sb.appendChild(h);
    mods.forEach(l => {
      const open = unlocked(l);
      const b = document.createElement("button");
      b.className = "sb-item" + (state.done[l.id] ? " done" : "") + (l.id === activeId ? " active" : "") + (open ? "" : " locked");
      b.innerHTML = '<span class="dot" aria-hidden="true" data-n="' + (open ? (l.num != null ? l.num : "★") : "🔒") + '"></span><span class="t">' + esc(l.title) + "</span>";
      if (open) b.onclick = () => { location.hash = "#/licao/" + l.id; };
      else {
        b.setAttribute("aria-disabled", "true");
        b.title = "Conclua o módulo anterior para desbloquear";
        b.onclick = () => { lockedToast(l); };
      }
      sb.appendChild(b);
    });
  });
  const certBtn = document.createElement("div");
  certBtn.className = "sb-cert";
  certBtn.innerHTML = '<button class="btn ' + (pct() === 100 ? "btn-primary" : "btn-ghost") + '" style="font-size:.85rem;padding:.6em 1.4em">🎓 Certificado</button>';
  certBtn.firstChild.onclick = () => { location.hash = "#/certificado"; };
  sb.appendChild(certBtn);
}

function updateHud() {
  document.querySelectorAll(".bar>i").forEach(i => { i.style.width = pct() + "%"; });
  document.querySelectorAll(".bar[role=progressbar]").forEach(b => { b.setAttribute("aria-valuenow", pct()); });
  document.querySelectorAll(".tb-pct").forEach(e => { e.textContent = pct() + "%"; });
  const lv = level();
  const chip = $("#lvl-chip");
  if (chip) {
    chip.innerHTML = '<span class="lv-ico">' + lv.cur.icon + '</span><span class="lv-name">' + esc(lv.cur.name) + '</span><span class="lv-xp">' + lv.x + " XP</span>";
    chip.title = lv.next ? ("Próximo nível: " + lv.next.name + " (" + lv.next.xp + " XP)") : "Nível máximo!";
  }
  const fl = $("#streak-chip");
  if (fl) {
    const d = state.streak.last === hoje() ? state.streak.days : 0;
    fl.textContent = "🔥 " + d;
    fl.title = d ? (d + (d > 1 ? " dias seguidos" : " dia") + " de estudo · recorde: " + state.streak.best) : "Estude hoje para acender a chama · recorde: " + state.streak.best;
    fl.classList.toggle("off", d === 0);
  }
}

/* ---------- lição ---------- */
function renderLesson(l) {
  const idx = LESSONS.indexOf(l);
  const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
  const ph = PHASES.find(p => p.id === l.fase);
  let h = "";

  h += '<div class="crumb">' + esc(ph.label) + (l.num != null ? " · Módulo " + l.num : "") + "</div>";
  h += "<h1>" + esc(l.title) + "</h1>";
  if (l.tagline) h += '<p class="tagline">' + l.tagline + "</p>";
  if (l.quote) h += '<blockquote class="quote">“' + esc(l.quote.text) + "”<footer>" + esc(l.quote.author) + "</footer></blockquote>";
  if (l.why) h += '<div class="box box-why"><span class="box-tag">🎯 Por que estudar este módulo?</span>' + l.why + "</div>";
  if (l.cenario) h += '<div class="box box-cenario"><span class="box-tag">📖 Cenário</span>' + l.cenario + "</div>";

  (l.sections || []).forEach(s => {
    h += '<h2><span class="ico" aria-hidden="true">' + (s.icon || "📌") + "</span>" + esc(s.title) + "</h2>" + s.html;
  });

  if (l.steps && l.steps.length) {
    h += '<h2><span class="ico" aria-hidden="true">🛠️</span>Como fazer: passo a passo</h2><ol class="steps">' +
      l.steps.map((s, i) => '<li data-n="' + (i + 1) + '"><div>' + s + "</div></li>").join("") + "</ol>";
  }
  if (l.errors && l.errors.length) {
    h += '<h2><span class="ico" aria-hidden="true">⚠️</span>Erros comuns (e como evitá-los)</h2><div class="errs">' +
      l.errors.map(e => '<div class="err"><div class="e">' + e.e + '</div><div class="s">' + e.s + "</div></div>").join("") + "</div>";
  }
  if (l.licao) h += '<div class="box box-licao"><span class="box-tag">💡 Lição para a jornada</span>' + l.licao + "</div>";

  if (l.checklist && l.checklist.length) {
    const saved = state.check[l.id] || [];
    h += '<h2><span class="ico" aria-hidden="true">✅</span>Checklist prático <span class="xp-hint">+' + GAME.checklist + ' XP ao completar</span><button class="copy-btn" id="ck-copy" title="Copiar o checklist como texto">📋 Copiar</button></h2><ul class="check">' +
      l.checklist.map((c, i) =>
        '<li><label><input type="checkbox" data-ck="' + i + '"' + (saved[i] ? " checked" : "") + "><span>" + c + "</span></label></li>").join("") + "</ul>";
  }
  if (l.dica) h += '<h2><span class="ico" aria-hidden="true">🔦</span>Dica extra</h2>' + l.dica;

  flRefsOf(l).forEach(ref => {
    const n = typeof ref === "object" ? ref.n : ref;
    const label = (typeof ref === "object" && ref.label) || FL[n].title;
    h += '<details class="fl"><summary><div class="fl-ico" aria-hidden="true">📚</div><div><b>Aprofundamento · FiatLux</b><div>' +
      esc(label) + '</div></div><span class="arrow" aria-hidden="true">▼</span></summary><div class="fl-body">' +
      FL[n].html + "</div></details>";
  });

  if (l.quiz && l.quiz.length) h += quizHTML(l);
  if (l.cta) h += '<h2><span class="ico" aria-hidden="true">🚀</span>Chamada para ação</h2>' + l.cta;

  const isDone = !!state.done[l.id];
  if (!isDone) h += reqsHTML(l);
  h += '<div class="lesson-nav">';
  if (prev) h += '<button class="btn btn-ghost" style="color:var(--ptxt-dim);border-color:var(--paper-line)" data-go="' + prev.id + '">← Anterior</button>';
  h += '<span class="spacer"></span>';
  if (isDone) h += '<span class="done-flag">✓ Módulo concluído · +' + GAME.modulo + ' XP</span>';
  else {
    const pode = reqsOf(l).every(q => q.done);
    h += '<button class="btn btn-primary" id="complete-btn"' + (pode ? "" : ' disabled title="Complete os itens pendentes acima para concluir"') +
      '>Concluir módulo ✓ <small style="opacity:.7">+' + GAME.modulo + ' XP</small></button>';
  }
  if (next) {
    if (isDone || state.free) h += '<button class="btn btn-paper" data-go="' + next.id + '">Próximo →</button>';
    else h += '<button class="btn btn-paper" disabled title="Conclua este módulo para desbloquear o próximo">🔒 Próximo</button>';
  }
  h += "</div>";

  const main = $("#view");
  main.innerHTML = '<article class="lesson">' + h + "</article>";

  main.querySelectorAll("[data-go]").forEach(b => { b.onclick = () => { location.hash = "#/licao/" + b.dataset.go; }; });

  const refreshReqs = () => {
    const box = $("#reqs-box", main);
    if (box) box.outerHTML = reqsHTML(l);
    const btn = $("#complete-btn", main);
    if (btn) {
      const pode = reqsOf(l).every(q => q.done);
      if (pode && btn.disabled) toast("Tudo pronto! Você já pode concluir o módulo.", "🔓");
      btn.disabled = !pode;
      btn.title = pode ? "" : "Complete os itens pendentes acima para concluir";
    }
  };
  main.querySelectorAll("details.fl").forEach((d, i) => {
    d.addEventListener("toggle", () => {
      if (!d.open) return;
      const rec = state.fl[l.id] || (state.fl[l.id] = {});
      if (!rec[i]) { rec[i] = true; touchStreak(); save(); refreshReqs(); }
    });
  });

  const cbtn = $("#complete-btn", main);
  if (cbtn) cbtn.onclick = () => {
    state.done[l.id] = true; touchStreak();
    toast("Módulo concluído · +" + GAME.modulo + " XP", "✅");
    save();
    renderSidebar(l.id); updateHud();
    if (pct() === 100) { toast("Jornada concluída! Seu certificado está pronto.", "🎓"); location.hash = "#/certificado"; return; }
    renderLesson(l);
  };
  main.querySelectorAll("[data-ck]").forEach(ck => {
    ck.onchange = () => {
      const arr = state.check[l.id] || (state.check[l.id] = []);
      arr[+ck.dataset.ck] = ck.checked; touchStreak(); save(); updateHud();
      refreshReqs();
    };
  });

  const ckCopy = $("#ck-copy", main);
  if (ckCopy) ckCopy.onclick = () => {
    const tmp = document.createElement("div");
    const linhas = (l.checklist || []).map(c => { tmp.innerHTML = c; return "☐ " + tmp.textContent.trim(); });
    copyText("Checklist, " + l.title + "\n" + linhas.join("\n"), ckCopy);
  };
  main.querySelectorAll(".pbox").forEach(p => {
    const t = $(".pbox-t", p);
    if (!t) return;
    const b = document.createElement("button");
    b.className = "copy-btn pbox-copy";
    b.title = "Copiar este texto";
    b.innerHTML = "📋 Copiar";
    b.onclick = () => copyText(t.textContent.trim(), b);
    p.appendChild(b);
  });

  wireQuiz(l, main, refreshReqs);
}

/* ---------- quiz ---------- */
function quizHTML(l) {
  let h = '<div class="quiz"><div class="quiz-head"><span style="font-size:1.4rem" aria-hidden="true">🧪</span><div class="qh-t"><b>Quiz do módulo</b><span>Acerto de primeira: +' + GAME.primeira + " XP · após retentar: +" + GAME.retentativa + ' XP</span></div><span class="qh-score" id="quiz-score"></span></div>';
  l.quiz.forEach((q, qi) => {
    h += '<div class="qq" data-q="' + qi + '"><div class="qq-q">' + (qi + 1) + ". " + esc(q.q) + '</div><div class="opts">';
    q.opts.forEach((o, oi) => {
      h += '<button class="opt" data-o="' + oi + '"><span class="k">' + "ABCD"[oi] + "</span><span>" + esc(o) + "</span></button>";
    });
    h += '</div><div class="fb" role="status"></div></div>';
  });
  h += "</div>";
  return h;
}

function wireQuiz(l, root, onChange) {
  if (!l.quiz || !l.quiz.length) return;
  const saved = state.quiz[l.id] || (state.quiz[l.id] = {});
  const scoreEl = $("#quiz-score", root);
  const updateScore = () => {
    const ok = Object.values(saved).filter(v => v === "p" || v === "ok").length;
    scoreEl.textContent = ok + "/" + l.quiz.length;
  };
  root.querySelectorAll(".qq").forEach(qq => {
    const qi = +qq.dataset.q, q = l.quiz[qi];
    const fb = $(".fb", qq);
    const lock = (chosen, res) => {
      const correct = res === "p" || res === "ok";
      qq.querySelectorAll(".opt").forEach(b => {
        b.disabled = true;
        const oi = +b.dataset.o;
        if (oi === q.a) b.classList.add("sel-ok");
        else if (oi === chosen && !correct) b.classList.add("sel-err");
      });
      fb.className = "fb on " + (correct ? "ok" : "err");
      fb.innerHTML = (res === "p" ? '<b>Correto de primeira! 🎯 +' + GAME.primeira + " XP</b> " :
        res === "ok" ? '<b>Correto! +' + GAME.retentativa + " XP</b> " : "<b>Não é essa.</b> ") + q.fb +
        (correct ? "" : ' <button class="retry">Tentar novamente</button>');
      const r = $(".retry", fb);
      if (r) r.onclick = () => {
        saved[qi] = "r"; save();
        qq.querySelectorAll(".opt").forEach(b => { b.disabled = false; b.classList.remove("sel-ok", "sel-err"); });
        fb.className = "fb"; fb.innerHTML = "";
        updateScore();
      };
    };
    const cur = saved[qi];
    if (cur === "p" || cur === "ok") lock(q.a, cur);
    else if (cur === "x") lock(-1, "x");
    qq.querySelectorAll(".opt").forEach(b => {
      b.onclick = () => {
        const correct = +b.dataset.o === q.a;
        const wasRetry = saved[qi] === "r";
        saved[qi] = correct ? (wasRetry ? "ok" : "p") : "x";
        touchStreak(); save();
        lock(+b.dataset.o, saved[qi]);
        updateScore(); updateHud();
        if (onChange) onChange();
      };
    });
  });
  updateScore();
}

/* ---------- painel Minha Jornada ---------- */
function renderJornada() {
  const lv = level();
  const base = lv.cur.xp, teto = lv.next ? lv.next.xp : lv.x || 1;
  const frac = lv.next ? Math.min(100, Math.round((lv.x - base) / (teto - base) * 100)) : 100;
  const d = state.streak.last === hoje() ? state.streak.days : 0;
  const nBadges = Object.keys(state.badges).length;
  const perfeitas = countFirstTry(state), certas = countCorrect(state);
  const checks = LESSONS.filter(l => checklistDone(state, l)).length;

  let h = '<div class="jornada"><div class="crumb">Gamificação</div><h1 style="font-size:2rem;font-weight:800;color:var(--ink);margin-top:10px">Minha Jornada</h1>';

  h += '<div class="lv-card"><div class="lv-big" aria-hidden="true">' + lv.cur.icon + '</div><div class="lv-info"><div class="lv-title">' + esc(lv.cur.name) + '</div>' +
    '<div class="lv-sub">' + lv.x + " XP" + (lv.next ? " · faltam " + (lv.next.xp - lv.x) + " XP para <b>" + esc(lv.next.name) + " " + lv.next.icon + "</b>" : " · patente máxima alcançada!") + "</div>" +
    '<div class="lv-bar"><i style="width:' + frac + '%"></i></div></div></div>';

  h += '<div class="stats-grid">' +
    '<div class="st"><b>' + doneCount() + "/" + LESSONS.length + "</b><span>módulos concluídos</span></div>" +
    '<div class="st"><b>🔥 ' + d + "</b><span>dias seguidos (recorde " + state.streak.best + ")</span></div>" +
    '<div class="st"><b>' + certas + "</b><span>questões certas</span></div>" +
    '<div class="st"><b>' + (certas ? Math.round(perfeitas / certas * 100) : 0) + "%</b><span>de acerto de primeira</span></div>" +
    '<div class="st"><b>' + checks + "</b><span>checklists completos</span></div>" +
    '<div class="st"><b>' + nBadges + "/" + BADGES.length + "</b><span>medalhas</span></div></div>";

  h += '<h2 style="font-size:1.3rem;font-weight:800;color:var(--ink);margin:40px 0 8px">🏅 Medalhas</h2><p style="color:var(--ptxt-dim);margin-bottom:16px">Cada medalha vale +' + GAME.medalha + ' XP.</p><div class="badges">';
  BADGES.forEach(b => {
    const won = state.badges[b.id];
    h += '<div class="badge' + (won ? " won" : "") + '"><span class="bd-ico" aria-hidden="true">' + b.icon + '</span><b>' + esc(b.name) + "</b><span class=\"bd-desc\">" + esc(b.desc) + "</span>" +
      (won ? '<span class="bd-date">conquistada em ' + won.split("-").reverse().join("/") + "</span>" : '<span class="bd-date">🔒 bloqueada</span>') + "</div>";
  });
  h += "</div>";

  h += '<div class="free-box"><label><input type="checkbox" id="free-toggle"' + (state.free ? " checked" : "") + "> <b>Destravar todos os módulos</b>, desative o desbloqueio sequencial e navegue livremente.</label></div>";
  h += '<p style="margin-top:26px"><button class="btn btn-paper" id="jr-back">Continuar o curso →</button></p></div>';

  $("#view").innerHTML = h;
  $("#jr-back").onclick = () => { location.hash = "#/curso"; };
  $("#free-toggle").onchange = e => {
    state.free = e.target.checked; save();
    renderSidebar("jornada");
  };
}

/* ---------- certificado ---------- */
function renderCert() {
  const full = pct() === 100;
  let h = '<div class="cert-page"><div class="crumb">Reconhecimento</div><h1 style="font-size:2rem;font-weight:800;color:var(--ink);margin-top:10px">Certificado de conclusão</h1>';
  if (!full) {
    h += '<div class="cert-locked" style="margin-top:26px"><p style="font-size:2.2rem">🔒</p><p style="margin-top:10px"><b>' + pct() + "% concluído.</b> Complete todos os " + LESSONS.length + " módulos para desbloquear seu certificado.</p>" +
      '<p style="margin-top:16px"><button class="btn btn-paper" id="back-course">Voltar ao curso</button></p></div></div>';
    $("#view").innerHTML = h;
    $("#back-course").onclick = () => { location.hash = "#/curso"; };
    return;
  }
  h += '<div class="cert-form"><label style="font-weight:700;color:var(--ink)">Seu nome completo:</label>' +
    '<input id="cert-name" type="text" placeholder="Como deve aparecer no certificado" value="' + esc(state.name || "") + '">' +
    '<button class="btn btn-primary" id="cert-apply">Aplicar</button>' +
    '<span class="cert-actions"><button class="btn btn-ghost" style="color:var(--ptxt-dim);border-color:var(--paper-line)" id="cert-print">🖨️ Imprimir / salvar PDF</button></span></div>';
  const today = new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  h += '<div class="cert"><div class="c-kicker">Certificado de Conclusão</div><h2>A Jornada do Pesquisador</h2>' +
    '<div class="c-sub">Curso online, da dúvida à publicação científica</div>' +
    '<div class="c-name" id="c-name">' + esc(state.name || "________________") + '</div><div class="c-line"></div>' +
    '<p class="c-body">concluiu com êxito o curso <strong>A Jornada do Pesquisador</strong>, percorrendo os ' + LESSONS.length +
    " módulos das fases de planejamento, execução e divulgação de uma pesquisa científica na área da saúde, com carga horária de 8 horas e aproveitamento verificado por questionários de fixação.</p>" +
    '<div class="c-meta"><div><b>' + LESSONS.length + ' módulos · 8 horas</b>carga horária</div><div><b>' + today + "</b>data de conclusão</div>" +
    '<div><b>Aldemar Araujo Castro</b>autor e instrutor</div></div><div class="c-seal">Fiat ✦ Lux</div></div></div>';
  $("#view").innerHTML = h;
  const apply = () => {
    state.name = $("#cert-name").value.trim();
    if (state.name) state.certGen = true;
    save(); updateHud();
    $("#c-name").textContent = state.name || "________________";
  };
  $("#cert-apply").onclick = apply;
  $("#cert-name").onkeydown = e => { if (e.key === "Enter") apply(); };
  $("#cert-print").onclick = () => { apply(); window.print(); };
}

/* ---------- menu mobile ---------- */
function closeSidebar() {
  $("#sidebar").classList.remove("open");
  const s = $(".sb-scrim"); if (s) s.remove();
}
function toggleSidebar() {
  const sb = $("#sidebar");
  if (sb.classList.contains("open")) { closeSidebar(); return; }
  sb.classList.add("open");
  const scrim = document.createElement("div");
  scrim.className = "sb-scrim";
  scrim.onclick = closeSidebar;
  document.body.appendChild(scrim);
}

/* ---------- boot ---------- */
window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", () => {
  $("#menu-btn").onclick = toggleSidebar;
  const skip = $("#skip-link");
  if (skip) skip.onclick = e => {
    e.preventDefault();
    const m = $("#main");
    if (m) { m.focus(); m.scrollIntoView(); }
  };
  const chip = $("#lvl-chip");
  if (chip) chip.onclick = () => { location.hash = "#/jornada"; };
  document.querySelectorAll("[data-start]").forEach(b => {
    b.onclick = () => { location.hash = "#/curso"; };
  });
  save();
  route();
});
