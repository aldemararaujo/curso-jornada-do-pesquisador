LESSONS.push({
  id: "onde-os-dados-vivem", fase: 2, num: 8,
  title: "A Coleta: Onde os Dados Vivem",
  tagline: "Da aprovação ética ao campo: como coletar dados com qualidade, segurança e eficiência.",
  quote: { text: "Coletar dados é mais do que preencher formulários; é registrar, com precisão e ética, a realidade que dará vida às respostas da pesquisa.", author: "A Jornada do Pesquisador" },
  why: "<p>Você recebeu a aprovação do CEP e agora se pergunta: <strong>como começar de verdade?</strong> Este módulo é para você. Aqui você aprenderá a estrutura do formulário de coleta de dados, como treinar sua equipe, como garantir o preenchimento correto e como proteger as informações dos participantes. Em minutos, você terá um roteiro claro para ir a campo com segurança científica e ética. <strong>A qualidade da sua análise depende da qualidade do que você coletar agora.</strong></p>",
  cenario: "<p>Ana Vitória olhou para o parecer do CEP na tela e sorriu. <strong>Aprovado.</strong> Depois de meses planejando, chegara finalmente a hora de ir ao campo. Mas ao abrir a pasta com os formulários, uma dúvida surgiu: como garantir que cada dado fosse registrado exatamente da forma correta? Como proteger as informações dos pacientes? Como organizar a equipe de coleta? <strong>“Não posso errar agora”</strong>, pensou ela. Era chegada a hora de aprender onde, afinal, os dados vivem.</p>",
  sections: [
    { icon: "🔍", title: "O que é?", html: "<p>A coleta de dados é o <strong>processo sistemático</strong> pelo qual se registram, de maneira fiel e padronizada, as informações necessárias para responder à pergunta de pesquisa. Esse processo é operacionalizado pelo <strong>formulário de coleta de dados</strong>, o principal instrumento técnico da fase de execução. A coleta inicia no recrutamento dos sujeitos e se estende até o encerramento do seguimento de cada participante, conforme o projeto aprovado pelo CEP.</p><p>A qualidade da coleta depende de três fatores: <strong>clareza dos campos do formulário, capacitação da equipe e padronização dos procedimentos</strong>. Qualquer improvisação ou alteração não autorizada pode comprometer a validade interna do estudo.</p><p>💡 Use o ChatGPT para revisar o formulário antes de ir a campo: peça que identifique campos ambíguos, perguntas duplas ou termos técnicos que possam confundir os coletadores.</p>" },
    { icon: "⭐", title: "Por que isso é importante?", html: "<p>A qualidade dos dados coletados determina a qualidade de tudo o que vem depois:</p><ul><li><strong>Dados mal registrados</strong> levam a análises distorcidas, interpretações equivocadas e conclusões errôneas, podendo invalidar toda a pesquisa;</li><li>A <strong>validade interna</strong> do estudo depende diretamente da precisão com que os dados são registrados;</li><li>Em pesquisas com seres humanos, o registro inadequado pode comprometer a <strong>segurança dos participantes</strong> e gerar violações éticas;</li><li>A <strong>rastreabilidade</strong> dos dados (verificar a origem e o contexto de cada informação) é exigida por agências de fomento e comitês de ética;</li><li><strong>A qualidade dos resultados será sempre tão boa quanto a qualidade dos dados que os originaram.</strong></li></ul><p>A IA pode ajudar na revisão periódica dos formulários preenchidos, identificando inconsistências, campos em branco e padrões incomuns.</p>" }
  ],
  steps: [
    "<strong>Confirme a aprovação do CEP e o período de coleta:</strong> nenhuma coleta começa sem aprovação formal. Verifique se o cronograma ainda é viável e notifique alterações significativas via emenda ao projeto.",
    "<strong>Treine toda a equipe de coleta:</strong> todos devem conhecer o projeto, entender cada campo do formulário, praticar com exemplos e receber orientações éticas (confidencialidade, sigilo, postura profissional).",
    "<strong>Identifique cada formulário com um código único:</strong> numeração sequencial (F001, F002…) ou QR codes para grande escala. Nunca deixe formulários sem identificação.",
    "<strong>Preencha com clareza e precisão:</strong> dados legíveis e sem rasuras. Prefira campos de múltipla escolha ou codificados. Regra de ouro: se outro pesquisador ler o formulário, deve entender sem dúvida.",
    "<strong>Separe os dados em duas tabelas:</strong> Tabela 1 (identificadora: nome, CPF, contato) armazenada separadamente com máxima proteção; Tabela 2 (dados da pesquisa) vinculada à primeira por um código identificador único.",
    "<strong>Faça backup ao final de cada sessão:</strong> pelo menos três cópias, computador de trabalho, mídia física externa e nuvem segura.",
    "<strong>Revise os formulários por amostragem:</strong> confira periodicamente parte dos formulários preenchidos para detectar erros antes que se acumulem."
  ],
  errors: [
    { e: "Iniciar a coleta antes da aprovação do CEP.", s: "Nunca colete dados sem o parecer formal, isso invalida a pesquisa e viola a lei." },
    { e: "Formulário com campos ambíguos ou em duplicidade.", s: "Revise o formulário com a equipe e use o ChatGPT para identificar inconsistências antes de ir a campo." },
    { e: "Não treinar a equipe de coleta.", s: "Realize treinamento documentado com simulações práticas e critérios claros de inclusão/exclusão." },
    { e: "Não fazer backup dos dados coletados.", s: "Estabeleça rotina diária: computador + HD externo + nuvem." },
    { e: "Misturar dados identificadores com dados de pesquisa.", s: "Use sempre duas tabelas separadas, vinculadas por código único. Nunca coloque nome ou CPF na planilha das variáveis." }
  ],
  licao: "<p>A coleta de dados não é uma etapa mecânica: é um <strong>ato científico</strong> que exige precisão, preparo e responsabilidade. O campo é imprevisível, participantes atrasam, formulários se molham, computadores travam. O que protege a pesquisa nesses momentos é o planejamento prévio, o treinamento da equipe e a cultura de rigor. <strong>A qualidade do dado coletado hoje determinará a força da conclusão de amanhã.</strong></p>",
  checklist: [
    "Aprovação do CEP obtida e número do protocolo registrado",
    "Formulário de coleta de dados revisado e aprovado pelo orientador",
    "Equipe de coleta treinada, com documentação do treinamento",
    "Sistema de identificação única de formulários definido e aplicado",
    "Duas tabelas separadas criadas (identificadora + dados da pesquisa)",
    "Rotina de backup estabelecida: computador + externo + nuvem",
    "Processo de revisão por amostragem definido",
    "Cronograma de coleta alinhado com o projeto aprovado pelo CEP"
  ],
  dica: "<p>Use o <strong>Google Forms vinculado a uma planilha Google Sheets</strong> para coleta eletrônica, elimina a digitação manual e os dados vão direto para a planilha (mas sempre revise e faça backups).</p><p>Para pesquisas de maior porte, considere o <strong>REDCap</strong>, plataforma gratuita para pesquisas clínicas com validação avançada de dados.</p><p>Use o ChatGPT para criar um <strong>manual de preenchimento do formulário</strong>: 1 a 2 páginas com as dúvidas mais comuns da equipe de coleta.</p>",
  cta: "<p>Com os dados coletados, a próxima missão é garantir que eles não se percam: <strong>é hora de armazená-los com segurança</strong>. No próximo módulo, você aprenderá como guardar o tesouro que acabou de coletar, organizando, protegendo e preservando os dados para que nada se perca entre o campo e a análise. Avance com propósito!</p>",
  fl: [{ n: 3, label: "Capítulo 3, Executar a Pesquisa (visão da fase)" }, { n: 11, label: "Capítulo 11, Coletar os Dados" }],
  quiz: [
    { q: "Quais são os três fatores que determinam a qualidade da coleta de dados?", opts: ["Velocidade, quantidade e custo", "Clareza dos campos do formulário, capacitação da equipe e padronização dos procedimentos", "Software, hardware e internet", "Amostra grande, hospital renomado e verba"], a: 1, fb: "Formulário claro, equipe treinada e procedimentos padronizados, qualquer improvisação pode comprometer a validade interna do estudo." },
    { q: "Como devem ser organizados os dados identificadores e os dados da pesquisa?", opts: ["Na mesma planilha, para facilitar", "Em duas tabelas separadas, vinculadas por código único, nome e CPF nunca ficam com as variáveis", "Apenas em papel", "Somente na nuvem"], a: 1, fb: "Tabela 1 (identificadora) fica separada e protegida; Tabela 2 (dados da pesquisa) vincula-se a ela apenas pelo código, protegendo a confidencialidade." },
    { q: "Qual é a rotina de backup recomendada?", opts: ["Uma cópia no pendrive por semana", "Três cópias ao final de cada sessão: computador, mídia externa e nuvem segura", "Backup apenas ao final da pesquisa", "Imprimir todos os formulários"], a: 1, fb: "Backup triplo ao final de cada sessão de coleta: computador de trabalho + mídia física externa + nuvem (Google Drive, OneDrive etc.)." },
    { q: "Qual é a 'regra de ouro' do preenchimento do formulário?", opts: ["Preencher o mais rápido possível", "Usar abreviações para economizar espaço", "Se outro pesquisador ler o formulário, deve entender sem dúvida", "Deixar campos em branco quando houver incerteza"], a: 2, fb: "Dados claros, legíveis e sem rasuras, preferindo campos de múltipla escolha ou codificados para reduzir erros de escrita livre." }
  ]
});
