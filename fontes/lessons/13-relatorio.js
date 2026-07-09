LESSONS.push({
  id: "relatorio-final", fase: 2, num: 13,
  title: "Relatório Final: a História Contada por Quem Viveu",
  tagline: "A pesquisa existe. Os dados foram analisados. Os resultados, interpretados. Agora é hora de contar essa história — com clareza, rigor e a sua voz.",
  quote: { text: "Uma pesquisa só se completa quando encontra sua voz no papel. Escrever o relatório final é transformar esforço em legado, dúvida em resposta, silêncio em ciência.", author: "A Jornada do Pesquisador" },
  why: "<p>O relatório final não é apenas um documento burocrático: é o <strong>registro permanente</strong> de tudo o que você fez, pensou e descobriu. Neste módulo você vai entender que <strong>a maior parte do relatório já está escrita</strong> (no seu projeto de pesquisa) e o que exatamente precisa ser ajustado e acrescentado para transformá-lo no documento conclusivo da sua jornada.</p>",
  cenario: "<p>Ana Vitória abriu o computador e encarou o documento em branco. Seu orientador tinha dito: “Agora escreva o relatório”. Mas ela não sabia por onde começar. Então ele sugeriu: <strong>“Abra o seu projeto de pesquisa”</strong>. Ela obedeceu — e descobriu que a introdução, a metodologia e as referências já estavam prontas. O que faltava eram os resultados, a discussão e a conclusão. Três seções. Aquelas que ela tinha vivido. <strong>Ela só precisava contar, com rigor, o que tinha acontecido.</strong></p>",
  sections: [
    { icon: "🔍", title: "O que é o relatório final?", html: "<p>O relatório final, também chamado de relatório de pesquisa, é o <strong>documento conclusivo</strong> que reúne, de maneira sistemática e organizada, todos os elementos essenciais do ciclo da pesquisa. Ele narra o percurso completo da investigação — da ideia brilhante até a conclusão, que deve obrigatoriamente <strong>responder à pergunta inicial</strong>.</p><p>Dependendo do nível de formação acadêmica, recebe nomes diferentes:</p><ul><li><strong>TCC</strong> (Trabalho de Conclusão de Curso), na graduação;</li><li><strong>Monografia</strong>, na especialização;</li><li><strong>Dissertação</strong>, no mestrado;</li><li><strong>Tese</strong>, no doutorado.</li></ul><p>Independentemente do nome, todos compartilham a mesma essência: apresentar o produto de uma investigação científica com clareza, objetividade e precisão, respeitando as normas científicas e os princípios éticos.</p><p>💡 Use Google Docs ou Word com versionamento automático no Drive. O ChatGPT pode revisar parágrafos e melhorar a clareza da escrita científica.</p>" },
    { icon: "⭐", title: "Por que isso é importante?", html: "<ul><li><strong>Documentar a pesquisa:</strong> é o registro oficial de todo o percurso investigativo. Sem ele, a pesquisa corre o risco de se perder no tempo;</li><li><strong>Permitir a avaliação por outros pesquisadores:</strong> serve como ferramenta de validação, permitindo que especialistas analisem a validade científica, a importância teórica e a aplicabilidade dos resultados;</li><li><strong>Funcionar como meio de comunicação institucional:</strong> é enviado formalmente à banca examinadora, órgãos avaliadores ou agências de fomento, demonstrando o encerramento formal da pesquisa.</li></ul>" },
    { icon: "🧱", title: "Estrutura sugerida do relatório", html: "<p>Elementos pré-textuais: capa, folha de rosto, página do orientador, agradecimentos, informações gerais, resumo/abstract, índice e listas (abreviaturas, figuras, gráficos, tabelas). Em seguida:</p><ol><li><strong>Introdução</strong> (contexto, hipótese, objetivo);</li><li><strong>Métodos</strong> (tipo de estudo, local, amostra, procedimentos, variáveis, estatística);</li><li><strong>Resultados</strong> (desvios, características da amostra, variáveis);</li><li><strong>Discussão</strong> (métodos, resultados, implicações clínicas, pesquisas futuras);</li><li><strong>Conclusão</strong>;</li><li><strong>Referências</strong>;</li><li><strong>Anexos</strong> (TCLE/TALE, aprovação do CEP, tabela de dados individuais, conflitos de interesse);</li><li><strong>Apêndices</strong> (se houver).</li></ol>" }
  ],
  steps: [
    "<strong>Abra o projeto de pesquisa:</strong> ele já contém a maior parte do relatório — introdução, hipótese, objetivos, justificativa, métodos e referências.",
    "<strong>Remova os itens exclusivos do CEP:</strong> aspectos éticos e logísticos incluídos apenas para a aprovação do comitê não compõem o corpo do relatório final.",
    "<strong>Revise o tempo verbal:</strong> o projeto foi escrito no futuro (“será realizado”); o relatório deve estar no passado (“foi realizado”). Revise cada parágrafo da metodologia.",
    "<strong>Renumere os itens e ajuste os títulos</strong> das seções para a estrutura final (Introdução, Métodos, Resultados, Discussão, Conclusão).",
    "<strong>Acrescente os Resultados:</strong> dados claros e objetivos, com as tabelas e gráficos mais relevantes. Inclua desvios da pesquisa, características da amostra e variáveis.",
    "<strong>Escreva a Discussão:</strong> interprete os resultados à luz da literatura revisada e da hipótese inicial. Compare com outros estudos. Declare limitações e implicações clínicas.",
    "<strong>Redija a Conclusão:</strong> responda diretamente à pergunta de pesquisa. Uma única frase bem construída pode encerrar toda a jornada.",
    "<strong>Monte os anexos obrigatórios:</strong> modelo de TCLE/TALE, documento de aprovação do CEP, tabela de dados individuais e formulário de conflitos de interesse.",
    "<strong>Imprima, encaderne e salve em PDF:</strong> siga as orientações formais da instituição. Envie obrigatoriamente uma cópia ao CEP para o encerramento ético da pesquisa."
  ],
  errors: [
    { e: "Começar o relatório do zero, ignorando o projeto de pesquisa.", s: "Abra o projeto e use-o como base. A maior parte já está escrita — você só precisa ajustar e acrescentar." },
    { e: "Esquecer de revisar o tempo verbal (futuro em vez de passado).", s: "Revise sistematicamente cada parágrafo da metodologia: “será coletado” → “foi coletado”; “será aplicado” → “foi aplicado”." },
    { e: "Omitir a tabela de dados individuais nos anexos.", s: "A tabela de dados individuais é anexo obrigatório: garante a rastreabilidade e a reprodutibilidade da pesquisa." },
    { e: "Não enviar o relatório final ao CEP após a conclusão.", s: "É obrigatório enviar uma cópia ao CEP. Se o estudo ultrapassou 6 meses desde a aprovação, relatórios parciais devem ter sido enviados a cada 6 meses." },
    { e: "Delegar a redação do relatório a outra pessoa.", s: "A autoria intelectual e textual é pessoal e intransferível. Orientadores orientam, colegas revisam — mas quem escreve é você." }
  ],
  licao: "<p>O relatório final não começa depois da pesquisa: <strong>ele começa com ela</strong>. Cada decisão tomada no planejamento, cada dado coletado, cada análise realizada já era, naquele momento, uma frase do seu relatório sendo escrita. Quando você senta para redigir o documento conclusivo, está apenas unindo os pontos de uma história que já existia. E essa história — a sua — é o maior legado da jornada.</p>",
  checklist: [
    "Projeto de pesquisa usado como base estrutural do relatório",
    "Itens exclusivos do CEP (aspectos éticos/logísticos) removidos",
    "Tempo verbal revisado: futuro → passado em toda a metodologia",
    "Itens renumerados e títulos ajustados conforme a estrutura final",
    "Seção de Resultados escrita com as tabelas e gráficos mais relevantes",
    "Discussão redigida comparando os achados com a literatura",
    "Conclusão responde diretamente à pergunta de pesquisa",
    "Tabela de dados individuais incluída nos anexos",
    "TCLE/TALE e documento de aprovação do CEP nos anexos",
    "Cópia do relatório enviada ao CEP para encerramento ético"
  ],
  dica: "<p>Use o ChatGPT para revisar parágrafos da discussão: cole o trecho e peça:</p><div class='pbox'><span class='pbox-tag'>💬 Prompt para IA — copie e use</span><p class='pbox-t'>Revise este parágrafo para clareza e rigor científico, mantendo meu argumento.</p></div><p>Você mantém a autoria; a IA ajuda na forma.</p><p>Lembre: a conclusão deve ter <strong>uma única frase principal</strong> que responde diretamente à pergunta de pesquisa. Todo o resto é contexto e projeção.</p>",
  cta: "<p>Ana Vitória entregou o relatório encadernado para o orientador. Ele leu, fez alguns ajustes e disse: <strong>“Está pronto para a banca.”</strong> Ela sentiu o coração apertar — de orgulho e de nervosismo. Toda aquela jornada estava ali, em papel, com seu nome na capa. Mas ainda havia um desafio pela frente: defender o trabalho diante dos examinadores. No próximo módulo, você vai aprender a transformar o relatório em uma apresentação memorável.</p>",
  fl: 16, flLabel: "Capítulo 16 — Redigir o Relatório Final",
  quiz: [
    { q: "Por que não se deve começar o relatório final do zero?", opts: ["Porque é proibido pelas normas da ABNT", "Porque o projeto de pesquisa já contém a maior parte: introdução, métodos e referências — faltam resultados, discussão e conclusão", "Porque o orientador escreve a primeira versão", "Porque a IA gera o texto automaticamente"], a: 1, fb: "O projeto é a base estrutural do relatório: basta ajustar (tempo verbal, títulos) e acrescentar as três seções vividas na execução." },
    { q: "Qual ajuste de linguagem é obrigatório ao converter o projeto em relatório?", opts: ["Traduzir para o inglês", "Mudar o tempo verbal do futuro para o passado ('será realizado' → 'foi realizado')", "Usar a primeira pessoa do plural", "Remover os termos técnicos"], a: 1, fb: "O projeto descreve o que será feito; o relatório documenta o que foi feito — cada parágrafo da metodologia precisa dessa revisão." },
    { q: "Como o relatório final é chamado no mestrado?", opts: ["TCC", "Monografia", "Dissertação", "Tese"], a: 2, fb: "Graduação = TCC; especialização = monografia; mestrado = dissertação; doutorado = tese. Todos compartilham a mesma essência científica." },
    { q: "O que caracteriza uma boa conclusão de relatório?", opts: ["Resumir todos os capítulos anteriores", "Uma única frase principal que responde diretamente à pergunta de pesquisa", "Listar todas as referências utilizadas", "Apresentar novos dados não mostrados nos resultados"], a: 1, fb: "A conclusão responde à pergunta que deu origem a tudo — o resto é contexto e projeção para pesquisas futuras." }
  ]
});
