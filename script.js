const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector("#reiniciar");
const etapaInicial = document.querySelector("#inicio");
const formularioJogador = document.querySelector("#formulario-jogador");
const areaDiversidade = document.querySelector("#area-diversidade");
const areaQuiz = document.querySelector("#area-quiz");
const campoNome = document.querySelector("#nome-jogador");
const campoIdade = document.querySelector("#idade-jogador");
const botaoIniciar = document.querySelector("#iniciar-jogo");
const botaoVoltarInicio = document.querySelector("#voltar-inicio");
const botaoIrQuiz = document.querySelector("#ir-quiz");
const botaoVoltarOpcoes = document.querySelector("#voltar-opcoes");
const moedasTexto = document.querySelector("#moedas");
const badgeAdministrador = document.querySelector("#badge-administrador");
const faseTexto = document.querySelector("#fase-jogo");
const botoesTipoJogo = document.querySelectorAll(".opcao-jogo");
const lojaBoneco = document.querySelector("#loja-boneco");
const botaoAbrirLoja = document.querySelector("#abrir-loja");
const botaoFecharLoja = document.querySelector("#fechar-loja");
const saldoLojaTexto = document.querySelector("#saldo-loja");
const listaRoupas = document.querySelector("#lista-roupas");
const listaCategorias = document.querySelector("#categorias-loja");
const tituloCategoria = document.querySelector("#titulo-categoria");
const contagemItens = document.querySelector("#contagem-itens");
const mensagemLoja = document.querySelector("#mensagem-loja");
const boneco = document.querySelector("#boneco");
const falaBoneco = document.querySelector("#fala-boneco");

const catalogoRoupas = [
  { id: "cabelo-castanho", nome: "Cabelo castanho", preco: 15, tipo: "cabelo", visual: "castanho", categoria: "cabelo" },
  { id: "cabelo-azul", nome: "Mechas azuis", preco: 20, tipo: "cabelo", visual: "azul", categoria: "cabelo" },
  { id: "cabelo-ondulado", nome: "Cabelo ondulado", preco: 28, tipo: "cabelo", visual: "ondulado", categoria: "cabelo" },
  { id: "cabelo-afro", nome: "Cachos crespos", preco: 32, tipo: "cabelo", visual: "afro", categoria: "cabelo" },
  { id: "cabelo-coque", nome: "Coque alto", preco: 25, tipo: "cabelo", visual: "coque", categoria: "cabelo" },
  { id: "bone", nome: "Boné amarelo", preco: 20, tipo: "chapeu", visual: "bone", categoria: "cabeca" },
  { id: "gorro-vermelho", nome: "Gorro vermelho", preco: 25, tipo: "chapeu", visual: "gorro", categoria: "cabeca" },
  { id: "camisa-azul", nome: "Camiseta azul", preco: 15, tipo: "camisa", visual: "azul", categoria: "roupas" },
  { id: "camisa-coral", nome: "Camiseta coral", preco: 20, tipo: "camisa", visual: "coral", categoria: "roupas" },
  { id: "jaqueta-verde", nome: "Jaqueta verde", preco: 30, tipo: "camisa", visual: "verde", categoria: "roupas" },
  { id: "camisa-amarela", nome: "Camiseta amarela", preco: 18, tipo: "camisa", visual: "amarela", categoria: "roupas" },
  { id: "moletom-roxo", nome: "Moletom roxo", preco: 35, tipo: "camisa", visual: "roxo", categoria: "roupas" },
  { id: "calca-jeans", nome: "Calça jeans", preco: 25, tipo: "calca", visual: "jeans", categoria: "calcas" },
  { id: "calca-cargo", nome: "Calça cargo", preco: 30, tipo: "calca", visual: "cargo", categoria: "calcas" },
  { id: "tenis-branco", nome: "Tênis branco", preco: 30, tipo: "calcado", visual: "branco", categoria: "calcados" },
  { id: "tenis-vermelho", nome: "Tênis vermelho", preco: 35, tipo: "calcado", visual: "vermelho", categoria: "calcados" },
  { id: "botas-pretas", nome: "Botas pretas", preco: 40, tipo: "calcado", visual: "preto", categoria: "calcados" },
  { id: "oculos", nome: "Óculos modernos", preco: 20, tipo: "acessorio", visual: "oculos", categoria: "acessorios" },
  { id: "oculos-redondos", nome: "Óculos redondos", preco: 25, tipo: "acessorio", visual: "oculos-redondos", categoria: "acessorios" },
  { id: "fones", nome: "Fones coloridos", preco: 30, tipo: "acessorio", visual: "fones", categoria: "acessorios" },
  { id: "gravata", nome: "Gravata coral", preco: 15, tipo: "acessorio", visual: "gravata", categoria: "acessorios" }
];

const categoriasLoja = [
  { id: "cabelo", nome: "Cabelo" },
  { id: "cabeca", nome: "Chapéus" },
  { id: "roupas", nome: "Parte de cima" },
  { id: "calcas", nome: "Parte de baixo" },
  { id: "calcados", nome: "Calçados" },
  { id: "acessorios", nome: "Acessórios" }
];

let categoriaLojaAtiva = "roupas";

function carregarProgresso() {
  try {
    const progresso = JSON.parse(localStorage.getItem("quiziz-progresso") || "{}");
    state.moedas = Number.isFinite(progresso.moedas) ? Math.max(0, progresso.moedas) : 0;
    state.roupasCompradas = Array.isArray(progresso.roupasCompradas) ? progresso.roupasCompradas : [];
    state.roupaEquipada = {
      cabelo: progresso.roupaEquipada?.cabelo || "padrao",
      camisa: progresso.roupaEquipada?.camisa || "padrao",
      acessorio: progresso.roupaEquipada?.acessorio || "nenhum",
      chapeu: progresso.roupaEquipada?.chapeu || "nenhum",
      calca: progresso.roupaEquipada?.calca || "padrao",
      calcado: progresso.roupaEquipada?.calcado || "padrao"
    };
  } catch {
    state.moedas = 0;
    state.administrador = false;
    state.roupasCompradas = [];
    state.roupaEquipada = { cabelo: "padrao", camisa: "padrao", acessorio: "nenhum", chapeu: "nenhum", calca: "padrao", calcado: "padrao" };
  }
}

const state = {
  nome: "",
  idade: "",
  tipoJogo: "diversidade",
  perguntas: [],
  perguntaAtual: null,
  indiceAtual: 0,
  moedas: 0,
  administrador: false,
  roupasCompradas: [],
  roupaEquipada: { cabelo: "padrao", camisa: "padrao", acessorio: "nenhum", chapeu: "nenhum", calca: "padrao", calcado: "padrao" },
  perguntasErradas: [],
  modoExtra: false
};

function salvarProgresso() {
  try {
    localStorage.setItem("quiziz-progresso", JSON.stringify({
      moedas: state.moedas,
      roupasCompradas: state.roupasCompradas,
      roupaEquipada: state.roupaEquipada
    }));
  } catch {
    mensagemLoja.textContent = "Não foi possível salvar o progresso neste navegador.";
  }
}

function embaralharLista(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function premioAleatorio() {
  const premios = [5, 10, 15, 20];
  return premios[Math.floor(Math.random() * premios.length)];
}

function atualizarMoedas() {
  const saldoFormatado = new Intl.NumberFormat("pt-BR").format(state.moedas);
  moedasTexto.textContent = saldoFormatado;
  saldoLojaTexto.textContent = saldoFormatado;
  badgeAdministrador.classList.toggle("hidden", !state.administrador);
  renderizarLoja();
}

function atualizarBoneco() {
  boneco.dataset.cabelo = state.roupaEquipada.cabelo;
  boneco.dataset.camisa = state.roupaEquipada.camisa;
  boneco.dataset.acessorio = state.roupaEquipada.acessorio;
  boneco.dataset.chapeu = state.roupaEquipada.chapeu;
  boneco.dataset.calca = state.roupaEquipada.calca;
  boneco.dataset.calcado = state.roupaEquipada.calcado;
  const roupas = catalogoRoupas
    .filter((item) => state.roupaEquipada[item.tipo] === item.visual)
    .map((item) => item.nome);
  boneco.setAttribute("aria-label", `Boneco usando ${roupas.length ? roupas.join(" e ") : "roupa padrão"}`);
}

function comprarOuEquipar(item) {
  const jaComprada = state.roupasCompradas.includes(item.id);
  if (!jaComprada && state.moedas < item.preco) {
    mensagemLoja.textContent = `Você precisa de mais ${item.preco - state.moedas} moedas para comprar ${item.nome}.`;
    return;
  }

  if (!jaComprada) {
    state.moedas -= item.preco;
    state.roupasCompradas.push(item.id);
    mensagemLoja.textContent = `${item.nome} comprado e equipado!`;
  } else {
    mensagemLoja.textContent = `${item.nome} equipado!`;
  }

  state.roupaEquipada[item.tipo] = item.visual;
  salvarProgresso();
  atualizarMoedas();
  atualizarBoneco();
}

function renderizarLoja() {
  if (!listaRoupas || !listaCategorias) return;
  listaCategorias.textContent = "";
  listaRoupas.textContent = "";

  categoriasLoja.forEach((categoria) => {
    const botaoCategoria = document.createElement("button");
    botaoCategoria.type = "button";
    botaoCategoria.className = "categoria-loja";
    botaoCategoria.textContent = categoria.nome;
    botaoCategoria.setAttribute("aria-pressed", String(categoriaLojaAtiva === categoria.id));
    botaoCategoria.classList.toggle("active", categoriaLojaAtiva === categoria.id);
    botaoCategoria.addEventListener("click", () => {
      categoriaLojaAtiva = categoria.id;
      renderizarLoja();
    });
    listaCategorias.appendChild(botaoCategoria);
  });

  const itensVisiveis = catalogoRoupas.filter((item) => item.categoria === categoriaLojaAtiva);
  tituloCategoria.textContent = categoriasLoja.find((categoria) => categoria.id === categoriaLojaAtiva)?.nome || "Itens";
  contagemItens.textContent = `${itensVisiveis.length} ${itensVisiveis.length === 1 ? "item" : "itens"}`;

  itensVisiveis.forEach((item) => {
    const comprada = state.roupasCompradas.includes(item.id);
    const equipada = state.roupaEquipada[item.tipo] === item.visual;
    const artigo = document.createElement("article");
    artigo.className = "item-loja";

    const informacoes = document.createElement("div");
    informacoes.className = "informacoes-item-loja";
    const amostra = document.createElement("span");
    amostra.className = `amostra-roupa amostra-${item.visual} amostra-categoria-${item.categoria}`;
    amostra.setAttribute("aria-hidden", "true");
    const nome = document.createElement("h3");
    nome.textContent = item.nome;
    const preco = document.createElement("p");
    preco.textContent = equipada ? "Comprada e equipada" : comprada ? "Já comprada" : `${item.preco} moedas`;
    informacoes.append(amostra, nome, preco);

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = equipada ? "Equipada" : comprada ? "Vestir" : state.moedas < item.preco ? `Faltam ${item.preco - state.moedas}` : "Comprar";
    botao.disabled = equipada || (!comprada && state.moedas < item.preco);
    botao.addEventListener("click", () => comprarOuEquipar(item));

    artigo.append(informacoes, botao);
    listaRoupas.appendChild(artigo);
  });
}

function abrirLoja() {
  lojaBoneco.classList.remove("hidden");
  mensagemLoja.textContent = "";
  falaBoneco.textContent = "Oi! Que bom te ver!";
  boneco.classList.remove("acenando");
  falaBoneco.classList.remove("aparecendo");
  void boneco.offsetWidth;
  boneco.classList.add("acenando");
  falaBoneco.classList.add("aparecendo");
  botaoFecharLoja.focus();
}

function fecharLoja() {
  lojaBoneco.classList.add("hidden");
  botaoAbrirLoja.focus();
}

function atualizarFase() {
  faseTexto.textContent = state.modoExtra ? "Tentativa extra" : "Rodada principal";
}

function mostrarInicio() {
  etapaInicial.classList.remove("hidden");
  formularioJogador.classList.add("hidden");
  areaDiversidade.classList.add("hidden");
  areaQuiz.classList.add("hidden");
}

function abrirDiversidade() {
  etapaInicial.classList.add("hidden");
  formularioJogador.classList.add("hidden");
  areaQuiz.classList.add("hidden");
  areaDiversidade.classList.remove("hidden");
}

function abrirQuiziz() {
  etapaInicial.classList.add("hidden");
  areaDiversidade.classList.add("hidden");
  formularioJogador.classList.remove("hidden");
}

function mostrarPergunta() {
  if (state.indiceAtual >= state.perguntas.length) {
    if (state.perguntasErradas.length > 0) {
      state.modoExtra = true;
      state.perguntas = embaralharLista(state.perguntasErradas);
      state.perguntasErradas = [];
      state.indiceAtual = 0;
      atualizarFase();
    } else {
      finalizarQuiz();
      return;
    }
  }

  state.perguntaAtual = state.perguntas[state.indiceAtual];
  caixaPerguntas.textContent = state.perguntaAtual.enunciado;
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "none";
  textoResultado.textContent = "";

  state.perguntaAtual.alternativas.forEach((alternativa) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = alternativa.texto;
    botao.addEventListener("click", () => responderPergunta(alternativa));
    caixaAlternativas.appendChild(botao);
  });
}

function responderPergunta(alternativaSelecionada) {
  const respostaCorreta = alternativaSelecionada.correta;

  if (respostaCorreta) {
    const premio = premioAleatorio();
    state.moedas += premio;
    textoResultado.textContent = `Resposta correta! +${premio} moedas.`;
    atualizarMoedas();
    salvarProgresso();
  } else {
    state.perguntasErradas.push(state.perguntaAtual);
    textoResultado.textContent = "Resposta errada. Essa pergunta volta na tentativa extra.";
  }

  caixaResultado.style.display = "block";
  state.indiceAtual += 1;

  setTimeout(() => {
    if (state.indiceAtual >= state.perguntas.length && state.perguntasErradas.length === 0) {
      finalizarQuiz();
      return;
    }

    mostrarPergunta();
  }, 900);
}

function finalizarQuiz() {
  caixaPerguntas.textContent = `Fim do quiz, ${state.nome}!`;
  textoResultado.textContent = `Seu saldo total é de ${state.moedas} moedas. ${state.perguntasErradas.length > 0 ? "Ainda há perguntas para revisar." : "Parabéns!"}`;
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "block";
  botaoReiniciar.style.display = "inline-block";
  faseTexto.textContent = "Resultado final";
}

function reiniciarQuiz() {
  state.nome = "";
  state.idade = "";
  state.perguntas = [];
  state.perguntaAtual = null;
  state.indiceAtual = 0;
  state.perguntasErradas = [];
  state.modoExtra = false;

  caixaPerguntas.textContent = "";
  caixaAlternativas.textContent = "";
  caixaResultado.style.display = "none";
  textoResultado.textContent = "";
  botaoReiniciar.style.display = "none";
  areaQuiz.classList.add("hidden");
  mostrarInicio();
  campoNome.value = "";
  campoIdade.value = "";
  atualizarMoedas();
  atualizarFase();
}

function iniciarQuiz() {
  const nomeDigitado = campoNome.value.trim();
  const idadeDigitada = campoIdade.value.trim();

  if (!nomeDigitado || !idadeDigitada) {
    alert("Digite seu nome e idade antes de começar!");
    return;
  }

  state.nome = nomeDigitado;
  state.idade = idadeDigitada;
  state.tipoJogo = state.tipoJogo || "diversidade";
  state.perguntasErradas = [];
  state.modoExtra = false;
  state.perguntas = embaralharLista(window.perguntasBase || []).slice(0, 6);
  state.indiceAtual = 0;

  atualizarMoedas();
  atualizarFase();
  formularioJogador.classList.add("hidden");
  areaQuiz.classList.remove("hidden");
  caixaResultado.style.display = "none";
  botaoReiniciar.style.display = "none";
  mostrarPergunta();
}

botoesTipoJogo.forEach((botao) => {
  botao.addEventListener("click", () => {
    state.tipoJogo = botao.dataset.tipo;
    botoesTipoJogo.forEach((opcao) => {
      opcao.classList.toggle("active", opcao === botao);
    });

    if (state.tipoJogo === "diversidade") {
      abrirDiversidade();
    } else {
      abrirQuiziz();
    }
  });
});

botaoVoltarInicio.addEventListener("click", mostrarInicio);
botaoIrQuiz.addEventListener("click", abrirQuiziz);
botaoVoltarOpcoes.addEventListener("click", mostrarInicio);
botaoAbrirLoja.addEventListener("click", abrirLoja);
botaoFecharLoja.addEventListener("click", fecharLoja);
lojaBoneco.addEventListener("click", (evento) => {
  if (evento.target === lojaBoneco) fecharLoja();
});
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !lojaBoneco.classList.contains("hidden")) {
    fecharLoja();
  }
});

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

botaoReiniciar.addEventListener("click", reiniciarQuiz);
botaoIniciar.addEventListener("click", iniciarQuiz);
window.addEventListener("quiziz-admin-state", (evento) => {
  state.administrador = evento.detail?.isAdmin === true;
  if (state.administrador) {
    state.moedas = 9000;
    salvarProgresso();
  }
  atualizarMoedas();
});
caixaResultado.style.display = "none";
botaoReiniciar.style.display = "none";
areaQuiz.classList.add("hidden");
caixaPerguntas.textContent = "";
caixaAlternativas.textContent = "";
etapaInicial.classList.remove("hidden");
formularioJogador.classList.add("hidden");
areaDiversidade.classList.add("hidden");
carregarProgresso();
atualizarMoedas();
atualizarFase();
atualizarBoneco();