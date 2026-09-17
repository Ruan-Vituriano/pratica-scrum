# pratica-scrum

Aplicação simples para registrar, visualizar e organizar tarefas. Desenvolvida como prática de Scrum (Sprint 1).

## Status

- **US01 — Adicionar tarefa com título:** concluída.
- **US02 — Visualizar tarefas:** concluída.
- **US03 — Marcar tarefa como concluída:** concluída.

## Estrutura do projeto

| Arquivo      | Descrição                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `index.html` | Estrutura semântica: `<form>` com `<label>` (campo de título + botão "Adicionar"), `<ul>` para a lista e mensagem de lista vazia. |
| `script.js`  | Comportamento: carregar tarefas iniciais, adicionar tarefa, validar campo vazio e alternar status (concluída/pendente). |
| `style.css`  | Visual: layout responsivo, estados de foco/hover/erro e coloração verde para tarefas concluídas.    |

## US01 — Adicionar tarefa com título

### Critério de aceitação

- Campo de texto + botão "Adicionar".
- A tarefa aparece na lista.

### Funcionamento

1. O usuário digita o título no campo e clica em **Adicionar** (ou pressiona Enter).
2. Se o campo estiver vazio, a tarefa não é adicionada e o campo é destacado em vermelho com dica de erro.
3. A tarefa aparece no fim da lista, o campo é limpo e o foco retorna a ele.
4. A mensagem "Nenhuma tarefa cadastrada." é exibida apenas enquanto a lista estiver vazia.

## US02 — Visualizar tarefas

### Critério de aceitação

- Área que mostra as tarefas que o usuário adicionou.
- A tela apresenta pelo menos quatro tarefas.

### Funcionamento

1. A lista começa preenchida com quatro tarefas de exemplo (seed), garantindo que a tela já apresente ao menos quatro tarefas ao abrir.
2. As tarefas adicionadas pelo usuário passam a integrar a mesma lista.
3. A mensagem "Nenhuma tarefa cadastrada." só aparece se não houver nenhuma tarefa na lista.

## US03 — Marcar tarefa como concluída

### Critério de aceitação

- O usuário marca a tarefa como concluída através de um checkbox.
- A tarefa concluída muda para a cor verde.
- Enquanto não estiver concluída, a tarefa mantém a coloração padrão do projeto.

### Funcionamento

1. Cada tarefa possui um checkbox com o rótulo **Concluída**.
2. Ao marcar, o item fica verde (fundo claro, borda esquerda e título esverdeados) e o checkbox assume o tom verde.
3. Ao desmarcar, o item retorna à coloração padrão.

## Boas práticas aplicadas

- Separação de responsabilidades: HTML (estrutura), CSS (estilo), JS (comportamento).
- HTML semântico e acessível: `<label>` vinculado ao campo, `aria-label` na lista e no checkbox, rótulo clicável junto ao checkbox.
- Envio do formulário via evento `submit`, permitindo adicionar com Enter.
- Validação de entrada vazia (título em branco não é adicionado).
- Prevenção de XSS: inserção do título com `textContent` em vez de `innerHTML`.
- **Event delegation**: um único listener de `change` na lista cuida de todos os checkboxes (sem listener por item).
- Nomes descritivos e funções pequenas (uma responsabilidade cada).

## Como testar (manual)

1. Abra `index.html` no navegador.
2. Verifique que a tela já apresenta as quatro tarefas de exemplo.
3. Digite um título no campo e clique em "Adicionar" (ou pressione Enter).
4. A tarefa deve aparecer na lista e o campo deve ser limpo, pronto para a próxima.
5. Marque/desmarque o checkbox **Concluída** da tarefa e confira a mudança de cor.

## Próximas US

- US04 — Remover tarefa
- US05 — Editar tarefa
- US06 — Filtrar tarefas

(Ordem sujeita à priorização do Product Owner.)