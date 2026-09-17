const formulario = document.getElementById("formulario-tarefa");
const campoTitulo = document.getElementById("titulo-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemVazia = document.getElementById("mensagem-vazia");

const TEXTO_VAZIO_OBRIGATORIO = "Digite um título para a tarefa.";
const TAREFAS_INICIAIS = [
  "Estudar Scrum",
  "Comprar mantimentos",
  "Responder e-mails",
  "Fazer exercícios",
];

function criarCheckboxStatus() {
  const rotulo = document.createElement("label");
  rotulo.className = "rotulo-status";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "status-tarefa";
  checkbox.setAttribute("aria-label", "Marcar tarefa como concluída");

  const texto = document.createElement("span");
  texto.textContent = "Concluída";

  rotulo.appendChild(checkbox);
  rotulo.appendChild(texto);

  return rotulo;
}

function criarElementoTarefa(titulo) {
  const item = document.createElement("li");
  item.className = "tarefa";

  const tituloTarefa = document.createElement("span");
  tituloTarefa.className = "titulo-tarefa";
  tituloTarefa.textContent = titulo;

  item.appendChild(tituloTarefa);
  item.appendChild(criarCheckboxStatus());

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

function exibirTarefa(titulo) {
  const item = criarElementoTarefa(titulo);
  listaTarefas.appendChild(item);
  atualizarMensagemVazia();
}

function adicionarTarefa(titulo) {
  exibirTarefa(titulo);
  campoTitulo.value = "";
  campoTitulo.focus();
}

function carregarTarefasIniciais() {
  TAREFAS_INICIAIS.forEach(exibirTarefa);
}

function atualizarConclusao(item, concluida) {
  item.classList.toggle("concluida", concluida);
}

function lidarComMudancaDeStatus(evento) {
  const checkbox = evento.target;

  if (!checkbox.matches('input[type="checkbox"].status-tarefa')) {
    return;
  }

  const item = checkbox.closest(".tarefa");
  atualizarConclusao(item, checkbox.checked);
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
listaTarefas.addEventListener("change", lidarComMudancaDeStatus);
campoTitulo.addEventListener("input", () => {
  limparErro();
  marcarCampoComoInvalido(true);
});

carregarTarefasIniciais();