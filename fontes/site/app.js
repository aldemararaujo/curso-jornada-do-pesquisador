/* ============ A Jornada do Pesquisador — engine ============ */
"use strict";

const PHASES = [
  { id: 0, label: "Comece aqui", icon: "🧭" },
  { id: 1, label: "Fase 1 · Planejar", icon: "🗺️" },
  { id: 2, label: "Fase 2 · Executar", icon: "⚙️" },
  { id: 3, label: "Fase 3 · Divulgar", icon: "📣" },
  { id: 4, label: "Além da jornada", icon: "🌅" },
];

/* ---------- estado ---------- */
const KEY = "jdp-curso-v1";
const state = load();
function load() {
  try { return Object.assign({ done: {}, quiz: {}, check: {}, name: "", last: "" }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
  catch { return { done: {}, quiz: {}, check: {}, name: "", last: "" }; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} }

const $ = (sel, el) => (el || document).querySelector(sel);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const doneCount = () => LESSONS.filter(l => state.done[l.id]).length;
const pct = () => Math.round(doneCount() / LESSONS.length * 100);

/* ---------- roteador ---------- */
function route() {
  const h = location.hash;
  const landing = $("#landing"), app = $("#app");
  let m;
  if ((m = h.match(/^#\/licao\/([\w-]+)/))) {
    const lesson = LESSONS.find(l => l.id === m[1]);
    if (!lesson) { location.hash = "#/curso"; return; }
    landing.hidden = true; app.hidden = false;
    state.last = lesson.id; save();
    renderSidebar(lesson.id);
    renderLesson(lesson);
  } else if (h.startsWith("#/certificado")) {
    landing.hidden = true; app.hidden = false;
    renderSidebar("cert");
    renderCert();
  } else if (h.startsWith("#/curso")) {
    location.hash = "#/licao/" + (state.last && LESSONS.some(l => l.id === state.last) ? state.last : LESSONS[0].id);
    return;
  } else {
    app.hidden = true; landing.hidden = false;
    renderLandingState();
  }
  updateBars();
  closeSidebar();
  $("#main").scrollTop = 0;
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
    btn.textContent = "🎓 Curso concluído — ver certificado";
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
  PHASES.forEach(ph => {
    const mods = LESSONS.filter(l => l.fase === ph.id);
    if (!mods.length) return;
    const h = document.createElement("div");
    h.className = "sb-phase";
    h.textContent = ph.icon + " " + ph.label;
    sb.appendChild(h);
    mods.forEach(l => {
      const b = document.createElement("button");
      b.className = "sb-item" + (state.done[l.id] ? " done" : "") + (l.id === activeId ? " active" : "");
      b.innerHTML = '<span class="dot" data-n="' + (l.num != null ? l.num : "★") + '"></span><span class="t">' + esc(l.title) + "</span>";
      b.onclick = () => { location.hash = "#/licao/" + l.id; };
      sb.appendChild(b);
    });
  });
  const certBtn = document.createElement("div");
  certBtn.className = "sb-cert";
  certBtn.innerHTML = '<button class="btn ' + (pct() === 100 ? "btn-primary" : "btn-ghost") + '" style="font-size:.85rem;padding:.6em 1.4em">🎓 Certificado</button>';
  certBtn.firstChild.onclick = () => { location.hash = "#/certificado"; };
  sb.appendChild(certBtn);
}

function updateBars() {
  document.querySelectorAll(".bar>i").forEach(i => { i.style.width = pct() + "%"; });
  document.querySelectorAll(".tb-pct").forEach(e => { e.textContent = pct() + "%"; });
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
    h += '<h2><span class="ico">' + (s.icon || "📌") + "</span>" + esc(s.title) + "</h2>" + s.html;
  });

  if (l.steps && l.steps.length) {
    h += '<h2><span class="ico">🛠️</span>Como fazer: passo a passo</h2><ol class="steps">' +
      l.steps.map((s, i) => '<li data-n="' + (i + 1) + '"><div>' + s + "</div></li>").join("") + "</ol>";
  }
  if (l.errors && l.errors.length) {
    h += '<h2><span class="ico">⚠️</span>Erros comuns (e como evitá-los)</h2><div class="errs">' +
      l.errors.map(e => '<div class="err"><div class="e">' + e.e + '</div><div class="s">' + e.s + "</div></div>").join("") + "</div>";
  }
  if (l.licao) h += '<div class="box box-licao"><span class="box-tag">💡 Lição para a jornada</span>' + l.licao + "</div>";

  if (l.checklist && l.checklist.length) {
    const saved = state.check[l.id] || [];
    h += '<h2><span class="ico">✅</span>Checklist prático</h2><ul class="check">' +
      l.checklist.map((c, i) =>
        '<li><label><input type="checkbox" data-ck="' + i + '"' + (saved[i] ? " checked" : "") + "><span>" + c + "</span></label></li>").join("") + "</ul>";
  }
  if (l.dica) h += '<h2><span class="ico">🔦</span>Dica extra</h2>' + l.dica;

  const flRefs = l.fl == null ? [] : (Array.isArray(l.fl) ? l.fl : [{ n: l.fl, label: l.flLabel }]);
  flRefs.forEach(ref => {
    const n = typeof ref === "object" ? ref.n : ref;
    if (!FL[n]) return;
    const label = (typeof ref === "object" && ref.label) || FL[n].title;
    h += '<details class="fl"><summary><div class="fl-ico">📚</div><div><b>Aprofundamento · FiatLux</b><div>' +
      esc(label) + '</div></div><span class="arrow">▼</span></summary><div class="fl-body">' +
      FL[n].html + "</div></details>";
  });

  if (l.quiz && l.quiz.length) h += quizHTML(l);
  if (l.cta) h += '<h2><span class="ico">🚀</span>Chamada para ação</h2>' + l.cta;

  const isDone = !!state.done[l.id];
  h += '<div class="lesson-nav">';
  if (prev) h += '<button class="btn btn-ghost" style="color:var(--ptxt-dim);border-color:var(--paper-line)" data-go="' + prev.id + '">← Anterior</button>';
  h += '<span class="spacer"></span>';
  if (isDone) h += '<span class="done-flag">✓ Módulo concluído</span>';
  else h += '<button class="btn btn-primary" id="complete-btn">Concluir módulo ✓</button>';
  if (next) h += '<button class="btn btn-paper" data-go="' + next.id + '">Próximo →</button>';
  h += "</div>";
  if (!isDone && l.quiz && l.quiz.length) h += '<p class="complete-hint" style="text-align:right;margin-top:10px">Responda o quiz antes de concluir — ou conclua direto, você decide.</p>';

  const main = $("#view");
  main.innerHTML = '<article class="lesson">' + h + "</article>";

  main.querySelectorAll("[data-go]").forEach(b => { b.onclick = () => { location.hash = "#/licao/" + b.dataset.go; }; });
  const cbtn = $("#complete-btn", main);
  if (cbtn) cbtn.onclick = () => {
    state.done[l.id] = true; save();
    renderSidebar(l.id); updateBars();
    if (pct() === 100) { location.hash = "#/certificado"; return; }
    renderLesson(l);
  };
  main.querySelectorAll("[data-ck]").forEach(ck => {
    ck.onchange = () => {
      const arr = state.check[l.id] || (state.check[l.id] = []);
      arr[+ck.dataset.ck] = ck.checked; save();
    };
  });
  wireQuiz(l, main);
}

/* ---------- quiz ---------- */
function quizHTML(l) {
  const saved = state.quiz[l.id] || {};
  let h = '<div class="quiz"><div class="quiz-head"><span style="font-size:1.4rem">🧪</span><div class="qh-t"><b>Quiz do módulo</b><span>Teste o que você aprendeu — feedback imediato</span></div><span class="qh-score" id="quiz-score"></span></div>';
  l.quiz.forEach((q, qi) => {
    h += '<div class="qq" data-q="' + qi + '"><div class="qq-q">' + (qi + 1) + ". " + esc(q.q) + '</div><div class="opts">';
    q.opts.forEach((o, oi) => {
      h += '<button class="opt" data-o="' + oi + '"><span class="k">' + "ABCD"[oi] + "</span><span>" + esc(o) + "</span></button>";
    });
    h += '</div><div class="fb"></div></div>';
  });
  h += "</div>";
  return h;
}

function wireQuiz(l, root) {
  if (!l.quiz || !l.quiz.length) return;
  const saved = state.quiz[l.id] || (state.quiz[l.id] = {});
  const scoreEl = $("#quiz-score", root);
  const updateScore = () => {
    const ok = Object.values(saved).filter(v => v === true).length;
    scoreEl.textContent = ok + "/" + l.quiz.length;
  };
  root.querySelectorAll(".qq").forEach(qq => {
    const qi = +qq.dataset.q, q = l.quiz[qi];
    const fb = $(".fb", qq);
    const lock = (chosen, correct) => {
      qq.querySelectorAll(".opt").forEach(b => {
        b.disabled = true;
        const oi = +b.dataset.o;
        if (oi === q.a) b.classList.add("sel-ok");
        else if (oi === chosen && !correct) b.classList.add("sel-err");
      });
      fb.className = "fb on " + (correct ? "ok" : "err");
      fb.innerHTML = (correct ? "<b>Correto!</b> " : "<b>Não é essa.</b> ") + q.fb +
        (correct ? "" : ' <button class="retry">Tentar novamente</button>');
      const r = $(".retry", fb);
      if (r) r.onclick = () => {
        delete saved[qi]; save();
        qq.querySelectorAll(".opt").forEach(b => { b.disabled = false; b.classList.remove("sel-ok", "sel-err"); });
        fb.className = "fb"; fb.innerHTML = "";
        updateScore();
      };
    };
    if (qi in saved) lock(saved[qi] === true ? q.a : -1, saved[qi] === true);
    qq.querySelectorAll(".opt").forEach(b => {
      b.onclick = () => {
        const correct = +b.dataset.o === q.a;
        saved[qi] = correct; save();
        lock(+b.dataset.o, correct);
        updateScore();
      };
    });
  });
  updateScore();
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
    '<div class="c-sub">Curso online — da dúvida à publicação científica</div>' +
    '<div class="c-name" id="c-name">' + esc(state.name || "________________") + '</div><div class="c-line"></div>' +
    '<p class="c-body">concluiu com êxito o curso <strong>A Jornada do Pesquisador</strong>, percorrendo os ' + LESSONS.length +
    " módulos das fases de planejamento, execução e divulgação de uma pesquisa científica na área da saúde, com aproveitamento verificado por questionários de fixação.</p>" +
    '<div class="c-meta"><div><b>' + LESSONS.length + ' módulos</b>carga do percurso</div><div><b>' + today + "</b>data de conclusão</div>" +
    '<div><b>Aldemar Araujo Castro</b>autor e instrutor</div></div><div class="c-seal">Fiat ✦ Lux</div></div></div>';
  $("#view").innerHTML = h;
  const apply = () => {
    state.name = $("#cert-name").value.trim(); save();
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
  document.querySelectorAll("[data-start]").forEach(b => {
    b.onclick = () => { location.hash = "#/curso"; };
  });
  route();
});
