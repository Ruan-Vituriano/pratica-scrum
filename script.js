const formulario = document.getElementById("formulario-tarefa");
const campoTitulo = document.getElementById("titulo-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");
const contadorTarefas = document.getElementById("contador-tarefas");

const CHAVE_ARMAZENAMENTO = "minhas-tarefas:lista";
const TEXTO_VAZIO_OBRIGATORIO = "Digite um título para a tarefa.";

const TAREFAS_INICIAIS = [
  "Estudar JavaScript por 30 minutos",
  "Responder e-mails pendentes",
  "Fazer compras no supermercado",
  "Ler 10 páginas de um livro"
];

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function carregarTarefas() {
  try {
    const dados = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!dados) return null;
    const lista = JSON.parse(dados);
    if (!Array.isArray(lista)) return null;
    return lista;
  } catch (erro) {
    console.error("Erro ao ler tarefas do localStorage:", erro);
    return null;
  }
}

function salvarTarefas(lista) {
  try {
    localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(lista));
  } catch (erro) {
    console.error("Erro ao salvar tarefas no localStorage:", erro);
  }
}

function obterTarefasDoDOM() {
  return Array.from(listaTarefas.children).map((item) => ({
    id: item.dataset.id,
    titulo: item.querySelector(".tarefa-titulo").textContent
  }));
}

function criarElementoTarefa(id, titulo) {
  const item = document.createElement("li");
  item.className = "tarefa";
  item.dataset.id = id;

  const span = document.createElement("span");
  span.className = "tarefa-titulo";
  span.textContent = titulo;

  const botaoRemover = document.createElement("button");
  botaoRemover.type = "button";
  botaoRemover.className = "tarefa-remover";
  botaoRemover.innerHTML = "&times;";
  botaoRemover.setAttribute("aria-label", `Remover tarefa "${titulo}"`);
  botaoRemover.addEventListener("click", () => removerTarefa(id));

  item.appendChild(span);
  item.appendChild(botaoRemover);
  return item;
}

function exibirErro(mensagem) {
  if (!campoTitulo.dataset.erro) {
    campoTitulo.dataset.erro = campoTitulo.placeholder;
    campoTitulo.placeholder = mensagem;
  }
}

function limparErro() {
  if (campoTitulo.dataset.erro) {
    campoTitulo.placeholder = campoTitulo.dataset.erro;
    delete campoTitulo.dataset.erro;
  }
}

function marcarCampoComoInvalido(valido) {
  campoTitulo.classList.toggle("invalido", !valido);
}

function atualizarMensagemVazia() {
  const total = listaTarefas.children.length;
  mensagemVazia.classList.toggle("oculto", total > 0);
  contadorTarefas.textContent =
    total === 0
      ? ""
      : total === 1
      ? "1 tarefa cadastrada"
      : `${total} tarefas cadastradas`;
}

function removerTarefa(id) {
  const item = listaTarefas.querySelector(`[data-id="${id}"]`);
  if (item) item.remove();
  salvarTarefas(obterTarefasDoDOM());
  atualizarMensagemVazia();
}

function renderizarTarefa(id, titulo) {
  const item = criarElementoTarefa(id, titulo);
  listaTarefas.appendChild(item);
}

function adicionarTarefa(titulo) {
  const id = gerarId();
  renderizarTarefa(id, titulo);
  campoTitulo.value = "";
  campoTitulo.focus();
  salvarTarefas(obterTarefasDoDOM());
  atualizarMensagemVazia();
}

function lidarComSubmit(evento) {
  evento.preventDefault();

  const titulo = campoTitulo.value.trim();

  if (titulo === "") {
    exibirErro(TEXTO_VAZIO_OBRIGATORIO);
    marcarCampoComoInvalido(false);
    campoTitulo.focus();
    return;
  }

  limparErro();
  marcarCampoComoInvalido(true);
  adicionarTarefa(titulo);
}

function inicializar() {
  let tarefasSalvas = carregarTarefas();

  if (tarefasSalvas === null) {
    tarefasSalvas = TAREFAS_INICIAIS.map((titulo) => ({
      id: gerarId(),
      titulo
    }));
    salvarTarefas(tarefasSalvas);
  }

  tarefasSalvas.forEach((tarefa) => renderizarTarefa(tarefa.id, tarefa.titulo));
  atualizarMensagemVazia();
}

formulario.addEventListener("submit", lidarComSubmit);
campoTitulo.addEventListener("input", () => {
  limparErro();
  marcarCampoComoInvalido(true);
});

inicializar();