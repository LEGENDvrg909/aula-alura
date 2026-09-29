const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector("#reiniciar");
const etapaInicial = document.querySelector("#inicio");
const campoNome = document.querySelector("#nome-jogador");
const campoIdade = document.querySelector("#idade-jogador");
const botaoIniciar = document.querySelector("#iniciar-jogo");

let nomeJogador = "";

const perguntas = [
  {
    enunciado:
      "Assim que saiu da escola você se depara com uma nova tecnologia, um chat que consegue responder todas as dúvidas que uma pessoa pode ter, ele também gera imagens e áudios hiper-realistas. Qual o primeiro pensamento?",
    alternativas: [
      { texto: "Isso é assustador!", afirmacao: "afirmacao" },
      { texto: "Isso é maravilhoso!", afirmacao: "afirmacao" }
    ]
  },
  {
    enunciado:
      "Com a descoberta desta tecnologia, chamada Inteligência Artificial (IA), uma professora de tecnologia da escola decidiu fazer uma sequência de aulas sobre elaIA. No fim de uma aula ela pede que você escreva um trabalho sobre o uso de tecnologia em sala de aula. Qual atitude você toma?",
    alternativas: [
      {
        texto:
          "Utilizar uma ferramenta de busca na internet que utiliza IA para que ela ajude a encontrar informações relevantes para o trabalho e explique numa linguagem que facilite o entendimento",
        afirmacao: "afirmacao"
      },
      {
        texto:
          "Escrever o trabalho com base nas conversas que teve com colegas, algumas pesquisas na internet e conhecimentos próprios sobre o tema.",
        afirmacao: "afirmacao"
      }
    ]
  },
  {
    enunciado:
      "Após a elaboração do trabalho, a professora realizou um debate entre a turma para entender como foi realizada a pesquisa e escrita. Nessa conversa também foi levantado um ponto muito importante: como a IA impacta o trabalho do futuro. Nesse debate, como você se posiciona?",
    alternativas: [
      {
        texto:
          "Me preocupo com as pessoas que perderão seus empregos para máquinas e defendem a importância de proteger os trabalhadores.",
        afirmacao: "afirmacao"
      },
      {
        texto:
          "Defende a ideia de que a IA pode criar novas oportunidades de emprego e melhorar habilidades humanas.",
        afirmacao: "afirmacao"
      }
    ]
  },
  {
    enunciado:
      "Ao final da discussão, você precisou criar uma imagem no computador que representasse o que pensa sobre IA. E agora?",
    alternativas: [
      { texto: "Criar uma imagem utilizando uma plataforma de design como o Paint.", afirmacao: "afirmacao" },
      { texto: "Criar uma imagem utilizando um gerador de imagem de IA.", afirmacao: "afirmacao" }
    ]
  },
  {
    enunciado:
      "Você tem um trabalho em grupo de biologia para entregar na semana seguinte, o andamento do trabalho está um pouco atrasado e uma pessoa do seu grupo decidiu fazer com ajuda de uma IA. O problema é que o trabalho está totalmente igual ao do chat. O que você faz?",
    alternativas: [
      {
        texto:
          "O chat pode ser uma tecnologia muito avançada, mas é preciso manter a atenção pois toda máquina erra, por isso revisar o trabalho e contribuir com as perspectivas pessoais é essencial.",
        afirmacao: "afirmacao"
      },
      {
        texto:
          "Escrever comandos para o chat é uma forma de contribuir com o trabalho, por isso não é um problema utilizar o texto inteiro.",
        afirmacao: "afirmacao"
      }
    ]
  }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

const textosFinais = [
  "Em 2049, {nome} vive em um mundo em que a IA ajuda as pessoas a aprender, criar e resolver problemas, mas a criatividade humana continua sendo o maior diferencial.",
  "No futuro, {nome} percebe que a tecnologia não substitui as pessoas: ela amplia o que elas podem fazer quando usadas com responsabilidade e ética.",
  "Em 2049, {nome} entende que a IA é uma ferramenta poderosa, mas o verdadeiro valor está na maneira como as pessoas escolhem usá-la.",
  "{nome} cresce em um mundo em que a inteligência artificial acelera a inovação, mas o pensamento crítico e a empatia continuam sendo essenciais."
];

function textoAleatorio(lista, nome) {
  const posicao = Math.floor(Math.random() * lista.length);
  return lista[posicao].replaceAll("{nome}", nome);
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }

  perguntaAtual = perguntas[atual];
  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "none";
  mostraAlternativas();
}

function mostraAlternativas() {
  for (const alternativa of perguntaAtual.alternativas) {
    const botaoAlternativas = document.createElement("button");
    botaoAlternativas.textContent = alternativa.texto;
    botaoAlternativas.type = "button";
    botaoAlternativas.classList.add("opcao");
    botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
    caixaAlternativas.appendChild(botaoAlternativas);
  }
}

function respostaSelecionada(opcaoSelecionada) {
  historiaFinal += opcaoSelecionada.texto + " ";
  atual++;
  mostraPergunta();
}

function mostraResultado() {
  const nomeFinal = nomeJogador || "Bryan";
  caixaPerguntas.textContent = `Em 2049... ${nomeFinal}`;
  textoResultado.textContent = textoAleatorio(textosFinais, nomeFinal);
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "block";
  botaoReiniciar.style.display = "inline-block";
}

function reiniciaQuiz() {
  atual = 0;
  historiaFinal = "";
  botaoReiniciar.style.display = "none";
  caixaPerguntas.textContent = "";
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "none";
  etapaInicial.style.display = "flex";
}

function iniciarQuiz() {
  const nomeDigitado = campoNome.value.trim();
  const idadeDigitada = campoIdade.value.trim();

  if (!nomeDigitado || !idadeDigitada) {
    alert("Preencha seu nome e sua idade antes de começar!");
    return;
  }

  nomeJogador = nomeDigitado;
  etapaInicial.style.display = "none";
  caixaResultado.style.display = "none";
  botaoReiniciar.style.display = "none";
  mostraPergunta();
}

function criarRaio() {
  const container = document.querySelector(".raios-animados");
  const raio = document.createElement("span");

  const tamanho = Math.random() * 18 + 8;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = Math.random() * 2 + 1.5;
  const rotation = Math.random() * 60 - 30;

  raio.className = "raio";
  raio.style.width = `${tamanho}px`;
  raio.style.height = "2px";
  raio.style.left = `${left}%`;
  raio.style.top = `${top}%`;
  raio.style.animationDelay = `${delay}s`;
  raio.style.animationDuration = `${duration}s`;
  raio.style.transform = `rotate(${rotation}deg)`;

  container.appendChild(raio);

  setTimeout(() => {
    raio.remove();
  }, duration * 1000 + 100);
}

for (let i = 0; i < 36; i++) {
  setTimeout(criarRaio, i * 180);
}

setInterval(() => {
  for (let i = 0; i < 6; i++) {
    criarRaio();
  }
}, 1200);

botaoReiniciar.addEventListener("click", reiniciaQuiz);
botaoIniciar.addEventListener("click", iniciarQuiz);
caixaResultado.style.display = "none";
botaoReiniciar.style.display = "none";
caixaPerguntas.textContent = "";
caixaAlternativas.textContent = "";
etapaInicial.style.display = "flex";