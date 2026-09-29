const perguntasBase = [
  {
    enunciado: "Você descobre uma IA que responde quase tudo. O que você faz primeiro?",
    alternativas: [
      { texto: "Testo para ver o que ela sabe e como responde.", correta: true },
      { texto: "Evito usar porque acho que ela vai substituir tudo.", correta: false },
      { texto: "Pediria para ela fazer tudo por mim sem questionar.", correta: false }
    ]
  },
  {
    enunciado: "Em sala de aula, a professora pede um trabalho sobre IA. Qual atitude é mais responsável?",
    alternativas: [
      { texto: "Pesquiso em fontes confiáveis e reviso o texto com meu próprio entendimento.", correta: true },
      { texto: "Copio o texto pronto do chat sem verificar nada.", correta: false },
      { texto: "Pego apenas uma frase e coloco como se fosse meu trabalho.", correta: false }
    ]
  },
  {
    enunciado: "Se a IA gerar uma imagem muito realista, qual é a atitude correta?",
    alternativas: [
      { texto: "Usar a imagem com consciência e verificar se a fonte é confiável.", correta: true },
      { texto: "Acreditar que tudo o que aparece é verdade sem revisar.", correta: false },
      { texto: "Usar qualquer imagem mesmo sem saber de onde veio.", correta: false }
    ]
  },
  {
    enunciado: "Qual melhor uso da IA no futuro do trabalho?",
    alternativas: [
      { texto: "Ajudar no processo, mas com critério humano e revisão final.", correta: true },
      { texto: "Substituir todas as pessoas do trabalho.", correta: false },
      { texto: "Fazer tudo automaticamente sem supervisão.", correta: false }
    ]
  },
  {
    enunciado: "Em uma tarefa de grupo, você vê que alguém usou IA para escrever tudo. O que você faz?",
    alternativas: [
      { texto: "Conversa com o grupo e revisa o material para manter a qualidade e a honestidade.", correta: true },
      { texto: "Aceita sem falar nada, porque o resultado foi rápido.", correta: false },
      { texto: "Elogia sem questionar e entrega igual ao chat.", correta: false }
    ]
  },
  {
    enunciado: "Qual das opções mostra um uso ético da IA?",
    alternativas: [
      { texto: "Usar como ferramenta para aprender, criar e melhorar ideias humanas.", correta: true },
      { texto: "Usar para enganar ou espalhar informação falsa.", correta: false },
      { texto: "Usar sem qualquer cuidado, porque a máquina sempre está certa.", correta: false }
    ]
  },
  {
    enunciado: "Quando a IA ajudou a encontrar dados, o que é mais importante?",
    alternativas: [
      { texto: "Entender os dados e validar a informação antes de usar.", correta: true },
      { texto: "Salvar tudo sem verificar a origem.", correta: false },
      { texto: "Usar somente a resposta final, sem entender como chegou lá.", correta: false }
    ]
  },
  {
    enunciado: "Qual visão sobre IA é mais equilibrada?",
    alternativas: [
      { texto: "Ela pode acelerar muito, mas precisa de responsabilidade, revisão e pensamento crítico.", correta: true },
      { texto: "Ela é inútil e não deve ser usada em lugar nenhum.", correta: false },
      { texto: "Ela é perfeita e nunca erra.", correta: false }
    ]
  }
];

window.perguntasBase = perguntasBase;
window.embaralharLista = function (lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
};
