export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  content: string[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "quando-procurar-clinica-geral",
    title: "Quando procurar uma clinica geral para sintomas do dia a dia",
    excerpt:
      "Dor, cansaco, febre, alteracoes digestivas e outros sinais merecem avaliacao medica. Saiba quando buscar atendimento clinico com rapidez.",
    category: "Clinica Geral",
    publishedAt: "2026-02-10",
    readingTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    content: [
      "Nem todo sintoma exige pronto atendimento, mas muitos sinais do dia a dia pedem avaliacao medica para evitar que pequenos problemas avancem. Febre persistente, dores recorrentes, tontura, cansaco excessivo e alteracoes gastrointestinais sao exemplos de que vale procurar uma clinica geral.",
      "Na consulta, o medico analisa seu historico, investiga a causa do desconforto e define se ha necessidade de exames laboratoriais, medicacao ou encaminhamento. Isso torna o cuidado mais seguro e objetivo.",
      "Buscar atendimento cedo ajuda a evitar automedicacao, reduz risco de complicacoes e permite iniciar o tratamento no momento certo.",
      "Na IntegraMed, o foco e oferecer um atendimento humano, claro e resolutivo para quem precisa de acolhimento e praticidade em Santa Maria da Serra e regiao.",
    ],
  },
  {
    slug: "exames-laboratoriais-de-rotina",
    title: "Exames laboratoriais de rotina: o que seu check-up pode mostrar",
    excerpt:
      "Hemograma, glicemia, colesterol, vitaminas e hormonios ajudam a acompanhar sua saude com mais precisao e prevencao.",
    category: "Exames",
    publishedAt: "2026-02-02",
    readingTime: "3 min",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    content: [
      "Os exames laboratoriais de rotina sao grandes aliados na prevencao, porque mostram alteracoes que muitas vezes ainda nao causaram sintomas claros.",
      "Hemograma, glicemia em jejum, colesterol, funcao renal, enzimas hepaticas, vitaminas e hormonios podem ser solicitados conforme sua idade, historico e queixas clinicas.",
      "Quando avaliados junto com a consulta, esses exames ajudam a acompanhar condicoes como diabetes, anemia, dislipidemia, deficiencias nutricionais e outras alteracoes importantes.",
      "Manter seu check-up em dia e uma forma inteligente de cuidar da saude com antecedencia, seguranca e mais tranquilidade.",
    ],
  },
  {
    slug: "home-care-quando-indicado",
    title: "Home care: quando o atendimento em domicilio pode ser a melhor opcao",
    excerpt:
      "O home care pode trazer mais conforto, seguranca e continuidade do cuidado para pacientes que precisam de assistencia mais proxima.",
    category: "Home Care",
    publishedAt: "2026-01-25",
    readingTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80",
    content: [
      "O home care e indicado para situacoes em que o paciente precisa de atendimento mais proximo, mas tem dificuldade de deslocamento, esta em recuperacao ou se beneficia de ser acompanhado no ambiente domiciliar.",
      "Esse modelo pode trazer mais conforto para o paciente e para a familia, sem abrir mao de avaliacao medica, orientacoes e monitoramento conforme cada necessidade.",
      "A indicacao sempre deve ser individualizada, considerando quadro clinico, seguranca e objetivo do acompanhamento.",
      "Na IntegraMed, o home care amplia o cuidado e reforca nosso compromisso de levar saude com mais acesso, acolhimento e responsabilidade.",
    ],
  },
  {
    slug: "check-up-anual-em-dia",
    title: "Check-up anual em dia: por que essa decisao protege sua saude",
    excerpt:
      "Acompanhamento clinico e exames de rotina ajudam a prevenir problemas e garantem mais controle sobre a sua saude ao longo do tempo.",
    category: "Prevencao",
    publishedAt: "2026-01-18",
    readingTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=800&q=80",
    content: [
      "O check-up anual e uma forma eficiente de acompanhar indicadores importantes do organismo e perceber alteracoes antes que elas se tornem um problema maior.",
      "Mesmo quem se sente bem pode apresentar mudancas em glicemia, colesterol, funcao renal, vitaminas ou pressao arterial sem perceber.",
      "Com consulta medica e exames adequados, fica mais facil ajustar habitos, iniciar tratamento quando preciso e manter um plano de acompanhamento mais assertivo.",
      "Prevenir continua sendo uma das melhores escolhas para quem deseja mais qualidade de vida e tranquilidade no presente e no futuro.",
    ],
  },
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
