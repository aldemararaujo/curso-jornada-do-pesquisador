# Fontes do curso "A Jornada do Pesquisador"

O arquivo final do curso é `..\index.html` (autossuficiente, basta abrir no navegador ou hospedar em qualquer servidor estático).

Esta pasta contém as fontes usadas para gerá-lo:

| Arquivo/pasta | O que é |
|---|---|
| `site/style.css` | Design system completo (landing + área do curso + certificado + impressão) |
| `site/app.js` | Engine do SPA: roteamento por hash, progresso em localStorage, quiz, checklist, certificado |
| `site/shell.html` | Markup estático: landing persuasiva + casca do app |
| `lessons/*.js` | Uma lição por arquivo (dados estruturados: cenário, seções, passos, erros, checklist, quiz) |
| `fl.json` | Capítulos do FiatLux convertidos em HTML (blocos de aprofundamento) |
| `extract.py` | Extrai o texto limpo dos PDFs dos livros (requer `pypdf`) |
| `parse_fl.py` | Regenera o `fl.json` a partir dos textos extraídos |
| `build.py` | Monta tudo em um único `index.html` |
| `validate.js` | Valida a integridade dos dados das lições (rode com `node validate.js`) |

## Como editar o curso

1. Edite a lição desejada em `lessons/` (ou o CSS/JS em `site/`).
2. Ajuste o caminho `OUT` no `build.py` se necessário (aponta para `C:\Users\aldem\livros\curso\index.html`) e os caminhos de leitura (o script original lia da pasta da sessão; nesta pasta, troque `ROOT`/`SITE`/`LESSONS` para os caminhos locais).
3. Rode: `python -X utf8 build.py`
4. Abra o `index.html` e confira.

## Estado do conteúdo

- 19 lições: boas-vindas + 17 módulos + encerramento, com 75 questões de quiz.
- O capítulo 9 do livro JDP não existia nos PDFs ("Guardando o Tesouro", armazenamento de dados); o módulo 9 do curso foi construído a partir do capítulo 12 do FiatLux, no mesmo formato dos demais.
- Progresso, respostas de quiz, checklists e nome do aluno ficam no `localStorage` do navegador (chave `jdp-curso-v1`).
