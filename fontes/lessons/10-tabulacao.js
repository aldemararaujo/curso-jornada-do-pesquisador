LESSONS.push({
  id: "ordem-no-caos", fase: 2, num: 10,
  title: "Ordem no Caos: Tabulação dos Dados",
  tagline: "Tabular é o momento em que a desordem cede lugar à clareza do conhecimento.",
  quote: { text: "Não se entende o que não se organiza.", author: "A Jornada do Pesquisador" },
  why: "<p>Você terminou a coleta. Os dados estão armazenados. E agora? <strong>Sem tabulação, nenhuma análise é possível</strong> — você teria apenas um monte de números sem sentido. Neste módulo você vai aprender a transformar esses números em uma base organizada, pronta para ser analisada. Ao final, saberá montar tabelas corretas, criar gráficos preliminares e identificar erros antes que eles prejudiquem seus resultados.</p>",
  cenario: "<p>Ana Vitória terminou de armazenar todos os seus formulários no Google Planilhas. Eram 60 pacientes, cada um com 14 variáveis. Ela abriu a planilha e sentiu um frio na barriga: linhas e colunas misturadas, células em branco, datas em formatos diferentes. O orientador perguntou: <strong>“Você já tabulou?”</strong>. Ela não sabia bem o que responder. Passou o fim de semana reorganizando tudo — uma variável por coluna, um paciente por linha, códigos padronizados para cada resposta. Quando terminou, pela primeira vez conseguia enxergar o conjunto: a distribuição de idades, o percentual de cada condição, os valores extremos que precisavam de verificação. <strong>A pesquisa tinha ganhado forma.</strong></p>",
  sections: [
    { icon: "🔍", title: "O que é?", html: "<p>A tabulação dos dados é o processo pelo qual os dados brutos coletados são <strong>organizados de maneira sistemática</strong>, geralmente em formato de tabela, para facilitar sua leitura, análise e interpretação. É o quarto item da fase de execução e marca a <strong>transição entre a coleta e a análise estatística</strong>.</p><p>Tabular não é apenas preencher células numa planilha: é uma atividade intelectual que exige atenção aos detalhes e respeito à estrutura metodológica do projeto. A regra básica é simples: <strong>cada linha corresponde a uma unidade de análise</strong> (um paciente, um participante, um caso) <strong>e cada coluna representa uma variável</strong>.</p><p>💡 Ferramentas: Google Planilhas ou MS Excel para montar a tabela; o ChatGPT pode ajudar a definir a lógica de codificação das variáveis.</p>" },
    { icon: "⭐", title: "Por que isso é importante?", html: "<p>A tabulação é um <strong>ponto de virada</strong> na pesquisa: é quando os dados coletados individualmente começam a assumir forma e revelar seu significado coletivo. Sem uma tabulação precisa, qualquer análise posterior estará comprometida. Ela:</p><ul><li>Permite enxergar o conjunto dos dados de forma estruturada;</li><li>Revela padrões, distribuições e inconsistências antes da análise formal;</li><li>Identifica erros de preenchimento, valores faltantes ou fora dos limites esperados;</li><li>Garante a uniformidade necessária para a análise estatística;</li><li>Funciona como uma ponte segura entre coleta e análise;</li><li>Transforma um conjunto caótico de informações em uma base sólida de evidências científicas.</li></ul>" }
  ],
  steps: [
    "<strong>Abra sua planilha de armazenamento</strong> e crie uma nova aba chamada “Tabulação”, para não misturar com o armazenamento bruto.",
    "<strong>Defina as colunas:</strong> uma para cada variável do projeto, na ordem exata definida no projeto de pesquisa. Comece pelo ID do participante.",
    "<strong>Codifique as variáveis categóricas:</strong> sexo (1=masculino, 2=feminino), sim/não (1/0), graus de escolaridade (1 a 5). Crie um dicionário de códigos em arquivo separado.",
    "<strong>Insira os dados com fidelidade</strong>, copiando diretamente da planilha de armazenamento. Não altere nenhum valor — qualquer correção deve ser registrada e justificada.",
    "<strong>Faça a verificação inicial de consistência:</strong> células vazias, valores fora do intervalo esperado (ex.: idade = 999) e formatos inconsistentes (datas, decimais).",
    "<strong>Crie tabelas de frequência simples</strong> para cada variável categórica (quantos homens, quantas mulheres; distribuição por faixa etária etc.).",
    "<strong>Crie gráficos exploratórios:</strong> barras para variáveis categóricas, histogramas para contínuas, dispersão para correlações — seguindo os tipos já definidos no projeto.",
    "<strong>Salve a planilha tabulada na nuvem</strong> e faça uma cópia local de segurança. Documente a data de finalização da tabulação."
  ],
  errors: [
    { e: "Misturar armazenamento e tabulação na mesma aba.", s: "Crie abas separadas: “Dados brutos” e “Tabulação”. Nunca edite os dados brutos originais." },
    { e: "Usar códigos diferentes para a mesma variável (ex.: “M”, “masc”, “1” para masculino).", s: "Defina os códigos antes de começar e documente-os no dicionário de variáveis." },
    { e: "Deixar células vazias sem marcar como dado ausente.", s: "Use um código padrão para dados ausentes (ex.: 99, NA) ou deixe em branco de forma consciente e registrada." },
    { e: "Esperar acumular todos os dados para só então tabular.", s: "Tabule continuamente, logo após cada rodada de coleta — a tabulação imediata reduz erros e esquecimentos." },
    { e: "Criar gráficos sem critério, sem relação com as perguntas do projeto.", s: "Siga os tipos de apresentação definidos no projeto. Nem todos os gráficos exploratórios vão para o relatório final." }
  ],
  licao: "<p>Tabular é um <strong>ato de responsabilidade científica</strong>. É o pesquisador — e só ele — quem conhece o significado profundo de cada dado, o contexto de cada resposta, a lógica de cada variável. Ao tabular, você não está apenas organizando números: <strong>está construindo o alicerce da sua análise</strong>. Uma tabulação cuidadosa garante que suas conclusões serão tão sólidas quanto os dados que as sustentam.</p>",
  checklist: [
    "Aba separada criada para a tabulação (não misturada com dados brutos)",
    "Uma coluna por variável, seguindo a ordem do projeto de pesquisa",
    "Dicionário de códigos documentado para todas as variáveis categóricas",
    "Código padrão definido e aplicado para dados ausentes",
    "Verificação de consistência realizada (valores fora do limite, células vazias)",
    "Tabelas de frequência criadas para variáveis categóricas",
    "Gráficos exploratórios criados conforme planejado no projeto",
    "Planilha salva na nuvem e cópia local de segurança feita",
    "Data de finalização da tabulação registrada"
  ],
  dica: "<p>Nem todos os gráficos criados na tabulação vão para o relatório final — e isso é normal: a tabulação é uma <strong>análise exploratória inicial</strong>. Você cria múltiplas representações para entender os dados e depois escolhe as mais relevantes.</p><p>Use o ChatGPT ou o Gemini para gerar fórmulas do Excel/Google Planilhas — por exemplo: “Como calcular a frequência relativa de uma variável categórica no Google Planilhas?”.</p><p>Se seu projeto usa software estatístico (JASP, SPSS, R), prepare a planilha tabulada já no formato compatível (geralmente .xls ou .csv).</p>",
  cta: "<p>Ana Vitória fechou o laptop satisfeita. Sua planilha estava organizada, os códigos padronizados, os primeiros gráficos prontos. Ela conseguia ver, pela primeira vez, o retrato completo dos seus dados. <strong>Mas organizar não é o mesmo que entender.</strong> No próximo módulo, ela vai usar esses dados para responder à pergunta que deu início a toda a jornada. É hora de deixar os dados falarem.</p>",
  fl: 13, flLabel: "Capítulo 13 — Tabular os Dados",
  quiz: [
    { q: "Qual é a regra básica da estrutura de uma tabela de tabulação?", opts: ["Cada linha é uma variável e cada coluna um participante", "Cada linha é uma unidade de análise (participante) e cada coluna uma variável", "Uma aba para cada participante", "Colunas em ordem alfabética"], a: 1, fb: "Linha = unidade de análise (paciente, participante, caso); coluna = variável, na ordem definida no projeto de pesquisa." },
    { q: "Como tratar as células vazias na tabulação?", opts: ["Preencher com zero", "Apagar a linha inteira", "Usar um código padrão para dados ausentes (ex.: 99, NA), de forma consciente e registrada", "Ignorar, pois não afetam a análise"], a: 2, fb: "Dados ausentes precisam ser marcados com código padrão documentado — células vazias sem explicação comprometem a análise." },
    { q: "Por que criar um dicionário de códigos?", opts: ["Para traduzir a pesquisa para outros idiomas", "Para garantir que a mesma variável seja sempre codificada da mesma forma (ex.: 1=masculino, 2=feminino)", "Para proteger os dados com senha", "Por exigência do CEP"], a: 1, fb: "Usar códigos diferentes para a mesma variável ('M', 'masc', '1') é um erro comum — o dicionário padroniza e documenta a codificação." },
    { q: "Quando se deve tabular os dados?", opts: ["Somente após encerrar toda a coleta", "Continuamente, logo após cada rodada de coleta", "Apenas na véspera da análise estatística", "Depois da interpretação dos resultados"], a: 1, fb: "A tabulação imediata e contínua reduz erros e esquecimentos — esperar acumular tudo é um dos erros comuns desta etapa." }
  ]
});
