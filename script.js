const formulario = document.getElementById("formulario-tarefa");
const campoTitulo = document.getElementById("titulo-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");

const TEXTO_VAZIO_OBRIGATORIO = "Digite um título para a tarefa.";

function criarElementoTarefa(titulo) {
  const item = document.createElement("li");
  item.className = "tarefa";
  item.textContent = titulo;
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
  mensagemVazia.classList.toggle("oculto", listaTarefas.children.length > 0);
}

function adicionarTarefa(titulo) {
  const item = criarElementoTarefa(titulo);
  listaTarefas.appendChild(item);
  campoTitulo.value = "";
  campoTitulo.focus();
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

formulario.addEventListener("submit", lidarComSubmit);
campoTitulo.addEventListener("input", () => {
  limparErro();
  marcarCampoComoInvalido(true);
});