// Valida a integridade dos dados das lições (roda em Node)
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const FL = JSON.parse(fs.readFileSync(path.join(ROOT, "fl.json"), "utf8"));
const LESSONS = [];
for (const f of fs.readdirSync(path.join(ROOT, "lessons")).sort()) {
  const code = fs.readFileSync(path.join(ROOT, "lessons", f), "utf8");
  new Function("LESSONS", code)(LESSONS);
}

const errors = [];
const ids = new Set();
const usedFl = new Set();
let quizCount = 0;

for (const l of LESSONS) {
  const tag = l.id || "(sem id)";
  if (!l.id) errors.push(`${tag}: sem id`);
  if (ids.has(l.id)) errors.push(`${tag}: id duplicado`);
  ids.add(l.id);
  if (!l.title) errors.push(`${tag}: sem título`);
  if (l.fase == null) errors.push(`${tag}: sem fase`);
  if (!l.checklist || !l.checklist.length) errors.push(`${tag}: sem checklist`);
  if (!l.quiz || !l.quiz.length) errors.push(`${tag}: sem quiz`);
  quizCount += (l.quiz || []).length;
  for (const [i, q] of (l.quiz || []).entries()) {
    if (!q.opts || q.opts.length < 2) errors.push(`${tag} quiz#${i + 1}: menos de 2 opções`);
    if (typeof q.a !== "number" || q.a < 0 || q.a >= (q.opts || []).length)
      errors.push(`${tag} quiz#${i + 1}: índice de resposta inválido (${q.a})`);
    if (!q.fb) errors.push(`${tag} quiz#${i + 1}: sem feedback`);
  }
  const refs = l.fl == null ? [] : Array.isArray(l.fl) ? l.fl.map(r => (typeof r === "object" ? r.n : r)) : [l.fl];
  for (const n of refs) {
    if (!FL[n]) errors.push(`${tag}: referência FiatLux inexistente (cap ${n})`);
    usedFl.add(n);
  }
}

const order = LESSONS.map(l => l.num).filter(n => n != null);
for (let i = 1; i < order.length; i++)
  if (order[i] !== order[i - 1] + 1) errors.push(`numeração fora de ordem: ${order[i - 1]} → ${order[i]}`);

const unusedFl = Object.keys(FL).filter(k => !usedFl.has(+k));
console.log(`${LESSONS.length} lições, ${quizCount} questões de quiz`);
console.log(`Capítulos FL usados: ${[...usedFl].sort((a, b) => a - b).join(", ")}`);
if (unusedFl.length) console.log(`FL não usados: ${unusedFl.join(", ")}`);
if (errors.length) { console.log("\nERROS:"); errors.forEach(e => console.log(" - " + e)); process.exit(1); }
console.log("VALIDAÇÃO OK");
