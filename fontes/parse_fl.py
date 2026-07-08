"""Converte os .txt do FiatLux em HTML estruturado (fl.json) para o bloco
de aprofundamento de cada módulo do curso."""
import html
import json
import re
import sys
from pathlib import Path

TXT = Path(__file__).parent / "txt"
OUT = Path(__file__).parent / "fl.json"

# Rodapés/artefatos que sobraram da extração
NOISE = [
    re.compile(r"^Compartilhe isso:"),
    re.compile(r"^Curtir isso:"),
    re.compile(r"^Curtir\b"),
    re.compile(r"^Carregando"),
    re.compile(r"^Publicado por"),
    re.compile(r"^Ver todos os posts"),
    re.compile(r"^\d+ de \w+ de \d{4}$"),
    re.compile(r"^usinadepesquisa\b"),
    re.compile(r"^Blog no WordPress"),
    re.compile(r"^WhatsApp$"),
    re.compile(r"^Imprimir$"),
    re.compile(r"^Facebook$"),
    re.compile(r"^X$"),
    re.compile(r"^Mais$"),
    re.compile(r"^As etapas e fases do processo de fazer uma pesquisa$"),
]

SENT_END = tuple(".!?:;)")


def esc(s: str) -> str:
    return html.escape(s, quote=False)


def flow(lines: list[str]) -> str:
    """Transforma linhas com quebra dura em <p>/<ul>/<ol> plausíveis."""
    blocks: list[tuple[str, str]] = []  # (tipo, texto)
    buf = ""
    mode = "p"

    def push():
        nonlocal buf, mode
        text = buf.strip()
        if text:
            blocks.append((mode, text))
        buf = ""
        mode = "p"

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            push()
            i += 1
            continue
        step = re.match(r"^(\d+)\.\s+(.*)", line)
        if step and not buf:
            # item numerado (passo a passo) — acumula até próximo número/fim
            mode = "step"
            buf = step.group(2)
            i += 1
            while i < len(lines):
                nxt = lines[i].strip()
                if not nxt or re.match(r"^\d+\.\s+", nxt) or _is_bullet(nxt, lines, i):
                    break
                buf += " " + nxt
                i += 1
            push()
            continue
        if _is_bullet(line, lines, i) and not buf:
            mode = "li"
            buf = line
            i += 1
            while i < len(lines):
                nxt = lines[i].strip()
                if not nxt or re.match(r"^\d+\.\s+", nxt) or _is_bullet(nxt, lines, i) \
                        or (buf.endswith(SENT_END) and nxt[:1].isupper()):
                    break
                buf += " " + nxt
                i += 1
            push()
            continue
        buf = (buf + " " + line).strip()
        if line.endswith(SENT_END):
            push()
        i += 1
    push()

    # Junta parágrafos-sentença consecutivos em parágrafos maiores
    merged: list[tuple[str, str]] = []
    for kind, text in blocks:
        if kind == "p" and merged and merged[-1][0] == "p" and len(merged[-1][1]) < 500:
            merged[-1] = ("p", merged[-1][1] + " " + text)
        else:
            merged.append((kind, text))

    out: list[str] = []
    j = 0
    while j < len(merged):
        kind, text = merged[j]
        if kind in ("li", "step"):
            tag = "ul" if kind == "li" else "ol"
            items = []
            while j < len(merged) and merged[j][0] == kind:
                items.append(f"<li>{fmt(merged[j][1])}</li>")
                j += 1
            out.append(f"<{tag}>" + "".join(items) + f"</{tag}>")
            continue
        out.append(f"<p>{fmt(text)}</p>")
        j += 1
    return "".join(out)


def _is_bullet(line: str, lines: list[str], i: int) -> bool:
    """Heurística para item de lista sem marcador: linha curta, inicia com
    maiúscula, sem pontuação final de sentença ou com padrão 'X (…):'."""
    if re.match(r"^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]\s?\(", line):  # "P (População...)"
        return True
    if len(line) < 65 and line[:1].isupper() and not line.endswith(SENT_END):
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
        if nxt[:1].isupper() or not nxt:
            return True
    return False


def fmt(text: str) -> str:
    text = esc(re.sub(r"\s+", " ", text).strip())
    # sub-rótulos "1.1. Contexto:" viram negrito
    text = re.sub(r"^(\d+\.\d+\.?\s*[^:]{2,60}:)", r"<strong>\1</strong>", text)
    # rótulo "Palavra:" no início vira negrito
    text = re.sub(r"^([A-ZÁÉÍÓÚÂÊÔÃÕÇ][^:.]{1,45}:)", r"<strong>\1</strong>", text)
    # URLs viram links
    text = re.sub(r"(https?://[^\s<)]+)", r'<a href="\1" target="_blank" rel="noopener">\1</a>', text)
    return text


def parse_chapter(path: Path, num: int) -> dict:
    # cabeçalho de página = título do capítulo repetido (vem do nome do arquivo)
    fname_title = re.sub(r"^FL - \d+\.\s*", "", path.stem)
    fname_title = re.sub(r"\s*–\s*FiatLux$", "", fname_title).strip().lower()
    lines = []
    for ln in path.read_text(encoding="utf-8").splitlines():
        s = ln.strip()
        if any(p.search(s) for p in NOISE):
            continue
        core = re.sub(rf"^{num}\.\s*", "", s).strip().lower()
        if core == fname_title or _similar(core, fname_title):
            continue
        lines.append(ln)
    # título = primeira(s) linha(s) não vazias; para no máximo 2
    title_lines: list[str] = []
    body_start = len(lines)
    for k, ln in enumerate(lines):
        if not ln.strip():
            if title_lines:
                body_start = k
                break
            continue
        title_lines.append(ln.strip())
        if len(title_lines) == 2:
            body_start = k + 1
            break
    title = re.sub(r"\s+", " ", " ".join(title_lines))
    body = lines[body_start:]

    sec_re = re.compile(rf"^{num}\.(\d+)\.?\s+(.+)")
    sections: list[dict] = []
    intro: list[str] = []
    cur: dict | None = None
    for ln in body:
        m = sec_re.match(ln.strip())
        # não confundir sub-itens (ex.: 1.1 dentro do cap. 9) com seções do capítulo
        if m and (cur is None or int(m.group(1)) > int(cur["n"])):
            cur = {"n": m.group(1), "title": m.group(2).strip(), "lines": []}
            sections.append(cur)
            continue
        (cur["lines"] if cur else intro).append(ln)

    html_parts = []
    intro_html = flow(intro)
    if intro_html:
        html_parts.append(intro_html)
    for sec in sections:
        html_parts.append(f"<h4>{num}.{sec['n']}. {esc(sec['title'])}</h4>")
        html_parts.append(flow(sec["lines"]))
    return {"title": title, "html": "".join(html_parts)}


def _similar(a: str, b: str) -> bool:
    """Título quebrado em duas linhas: aceita prefixo do título (>=10 chars)."""
    return len(a) >= 10 and (b.startswith(a) or a.startswith(b))


def main() -> None:
    result = {}
    for path in TXT.glob("FL - *.txt"):
        m = re.match(r"FL - (\d+)\.", path.name)
        if not m:
            continue
        num = int(m.group(1))
        result[num] = parse_chapter(path, num)
        print(f"cap {num:2d}: {result[num]['title'][:60]} — {len(result[num]['html'])} chars html")
    OUT.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nOK → {OUT}")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
