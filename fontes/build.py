"""Monta o curso/index.html final a partir das partes em site/ e lessons/."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SITE = ROOT / "site"
LESSONS = ROOT / "lessons"
OUT = Path(r"C:\Users\aldem\livros\curso\index.html")

FAVICON = ("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>"
           "<text y='.9em' font-size='90'>🧭</text></svg>")


def main() -> None:
    css = (SITE / "style.css").read_text(encoding="utf-8")
    js = (SITE / "app.js").read_text(encoding="utf-8")
    shell = (SITE / "shell.html").read_text(encoding="utf-8")
    fl = json.loads((ROOT / "fl.json").read_text(encoding="utf-8"))

    lesson_files = sorted(LESSONS.glob("*.js"), key=lambda p: p.name)
    if not lesson_files:
        sys.exit("Nenhuma lição em lessons/")
    lessons_js = "\n".join(p.read_text(encoding="utf-8") for p in lesson_files)

    # FL: só título + html; chave numérica
    fl_slim = {int(k): {"title": v["title"], "html": v["html"]} for k, v in fl.items()}
    fl_json = json.dumps(fl_slim, ensure_ascii=False).replace("</", "<\\/")
    lessons_js = lessons_js.replace("</script", "<\\/script")

    html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Curso online A Jornada do Pesquisador: da dúvida à publicação científica. Baseado nos livros JDP e FiatLux de Aldemar Araujo Castro.">
<title>A Jornada do Pesquisador — Curso Online</title>
<link rel="icon" href="{FAVICON}">
<style>
{css}
</style>
</head>
<body>
{shell}
<script>
const FL = {fl_json};
const LESSONS = [];
{lessons_js}
{js}
</script>
</body>
</html>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, encoding="utf-8")
    n_lessons = len(re.findall(r"LESSONS\.push", lessons_js))
    print(f"OK → {OUT}  ({OUT.stat().st_size/1024:.0f} KB, {n_lessons} lições, {len(lesson_files)} arquivos)")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
