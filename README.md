# pratica-scrum

Aplicação simples para registrar, visualizar e organizar tarefas. Desenvolvida como prática de Scrum (Sprint 1).

## Status

- **US01 — Adicionar tarefa:** concluída.

## US01 — Adicionar tarefa com título

### Critério de aceitação

- Campo de texto + botão "Adicionar".
- A tarefa aparece na lista.

### Implementação

| Arquivo      | Descrição                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------- |
| `index.html` | Estrutura semântica: `<form>` com `<label>`, input de título e botão "Adicionar"; `<ul>` para a lista e mensagem de lista vazia. |
| `script.js`  | Lógica de adição: evento `submit` (botão ou Enter), validação de título vazio, criação de `<li>` com `textContent`, limpeza e foco no campo. |
| `style.css`  | Visual: layout responsivo, estados de foco, hover e erro (campo inválido).                    |

### Boas práticas aplicadas

- Separação de responsabilidades: HTML (estrutura), CSS (estilo), JS (comportamento).
- HTML semântico e acessível (`label` vinculado ao campo, `aria-label` na lista).
- Envio do formulário via evento `submit`, permitindo adicionar com Enter.
- Validação de entrada vazia (título em branco não é adicionado).
- Prevenção de XSS: inserção do título com `textContent` em vez de `innerHTML`.
- Nomes descritivos e funções pequenas (uma responsabilidade cada).

### Como testar (manual)

1. Abra `index.html` no navegador.
2. Digite um título no campo e clique em "Adicionar" (ou pressione Enter).
3. A tarefa deve aparecer na lista e o campo deve ser limpo, pronto para a próxima.

## Próximas US

- US02 — Marcar tarefa como concluída
- US03 — Remover tarefa
- US04 — Editar tarefa
- US05 — Filtrar tarefas

(Ordem sujeita à priorização do Product Owner.)