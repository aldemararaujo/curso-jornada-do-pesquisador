"""Extrai texto limpo de todos os PDFs dos livros JDP e FiatLux."""
import re
import sys
from pathlib import Path

from pypdf import PdfReader

SRC = Path(r"C:\Users\aldem\livros")
OUT = Path(__file__).parent / "txt"
OUT.mkdir(exist_ok=True)

# Linhas de cabeçalho/rodapé dos prints de página que devem sumir
DROP_PATTERNS = [
    re.compile(r"^Livro JDP\s+In[ií]cio\s+Introdu"),          # nav do Google Sites
    re.compile(r"^Cap[ií]tulos finalizados, ajustes finais"),
    re.compile(r"^\d{2}/\d{2}/\d{4}, \d{2}:\d{2}"),            # carimbo de data do print
    re.compile(r"https?://sites\.google\.com/"),
    re.compile(r"https?://usinadepesquisa\.com/"),
    re.compile(r"^FIATLUX$"),
    re.compile(r"^\d+[–-]\d+ minutos$"),                        # "4–7 minutos" (tempo de leitura)
    re.compile(r"^\d+/\d+$"),                                   # paginação "1/8"
]

LIGATURES = {"ﬁ": "fi", "ﬂ": "fl", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl"}


def clean(text: str) -> str:
    for lig, rep in LIGATURES.items():
        text = text.replace(lig, rep)
    lines = []
    for line in text.splitlines():
        stripped = line.strip()
        if any(p.search(stripped) for p in DROP_PATTERNS):
            continue
        lines.append(line.rstrip())
    out = "\n".join(lines)
    out = re.sub(r"\n{3,}", "\n\n", out)
    return out.strip()


def main() -> None:
    for pdf in sorted(SRC.rglob("*.pdf")):
        reader = PdfReader(pdf)
        raw = "\n".join(page.extract_text() or "" for page in reader.pages)
        cleaned = clean(raw)
        dest = OUT / f"{pdf.parent.name} - {pdf.stem}.txt"
        dest.write_text(cleaned, encoding="utf-8")
        print(f"{dest.name}: {len(reader.pages)} pág., {len(cleaned)} chars")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
