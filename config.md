# Resumo sobre Hooks do React

## O que são Hooks?

- Funções especiais do React que permitem usar recursos como
**estado**, **ciclo de vida**, **referências** e **contexto** dentro de
componentes funcionais --- sem precisar de classes.
- Tornam o código mais simples, organizado e reutilizável, permitindo
que a lógica seja separada em funções independentes.
- Exemplos de Hooks nativos: `useState`, `useEffect`, `useRef`,
`useContext`.
- Também é possível criar *custom hooks* para reaproveitar lógicas
específicas.

## 1. useState --- Estado do Componente

`useState` cria um estado interno no componente e retorna um **array com
dois valores**:

``` js
const [valor, setValor] = useState(estadoInicial);
```

-   **valor** → o estado atual\
-   **setValor** → função que altera esse estado\
-   **estadoInicial** → valor que o estado terá na primeira renderização

Cada vez que `setValor()` é chamado, o componente **re-renderiza**
automaticamente.

------------------------------------------------------------------------

### Exemplo --- Contador

``` jsx
import { useState } from "react";

function Contador() {
  const [numero, setNumero] = useState(0);
```

#### O que está acontecendo?

-   O React cria uma variável interna chamada `numero`
-   Define que o valor inicial dela é **0**
-   Cria uma função `setNumero` que, quando chamada, pede ao React para
    redesenhar o componente com o novo valor do estado

``` jsx
  return (
    <div>
      <p>Valor: {numero}</p>
      <button onClick={() => setNumero(numero + 1)}>Adicionar</button>
    </div>
  );
}
```

Quando o botão é clicado:

-   `setNumero(numero + 1)` atualiza o estado
-   O componente é renderizado novamente
-   O novo valor aparece na tela

------------------------------------------------------------------------

## 2. useEffect --- Ciclo de Vida

O `useEffect` permite rodar funções **sempre que algo mudar**, como:

-   quando o componente **monta**
-   quando o componente **é atualizado**
-   quando o componente **desmonta**

Estrutura geral:

``` js
useEffect(() => {
  // ação executada

  return () => {
    // limpeza (opcional)
  };
}, [dependencias]);
```

-   **dependencias** → define quando o efeito será executado\
-   array vazio `[]` → executa somente ao montar\
-   nenhuma dependência → executa em TODO render

------------------------------------------------------------------------

### Exemplo --- Relógio

``` jsx
import { useEffect, useState } from "react";

function Relogio() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());
```

#### O que está acontecendo?

-   Estado **hora** guarda a hora atual
-   O estado será atualizado a cada segundo

``` jsx
  useEffect(() => {
    const timer = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
```

#### Explicação:

1.  Quando o componente é montado, o `useEffect` roda\
2.  Ele cria um intervalo (`setInterval`)\
3.  A cada 1 segundo, chama `setHora`, que re-renderiza o componente com
    a nova hora

``` jsx
    return () => clearInterval(timer);
  }, []);
```

#### Por que esse `return`?

-   Antes do componente ser removido da tela, o React executa essa
    função de limpeza\
-   Evita que o setInterval continue rodando em segundo plano

------------------------------------------------------------------------

## 3. useRef --- Acessando elementos e valores mutáveis

`useRef` cria um objeto mutável que:

-   **não** causa re-renderização quando alterado
-   pode armazenar valores entre renderizações
-   pode referenciar elementos do DOM

Estrutura:

``` js
const referencia = useRef(valorInicial);
```

------------------------------------------------------------------------

### Exemplo detalhado --- Formulário não controlado

``` jsx
function Formulario() {
  const inputRef = useRef();
```

#### O que está acontecendo?

-   `inputRef.current` começa como `undefined`
-   Quando o input é renderizado, o React coloca **o elemento real do
    DOM** dentro de `inputRef.current`

``` jsx
  function enviar() {
    alert("Valor enviado: " + inputRef.current.value);
  }
```

Aqui:

-   Acessamos o valor digitado diretamente no DOM\
-   Sem armazenar nada no estado

``` jsx
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Digite algo" />
      <button onClick={enviar}>Enviar</button>
    </div>
  );
}
```

Isso é um **formulário não controlado**, porque o valor não está salvo
no estado.

------------------------------------------------------------------------

## 4. useContext --- Estado Global sem Prop Drilling

`useContext` consome valores fornecidos por um **context provider**, sem prop drilling (processo de passar props através de múltiplos componentes intermediários até chegar no componente que realmente precisa delas).

Estrutura:

#### Criando o contexto

``` js
const MeuContexto = createContext(valorPadrao);
```

#### Fornecendo valores

``` jsx
<MeuContexto.Provider value={dados}>
  {children}
</MeuContexto.Provider>
```

#### Consumindo valores

``` jsx
const dados = useContext(MeuContexto);
```

------------------------------------------------------------------------

### Exemplo detalhado --- Tema claro/escuro

#### Criando o contexto:

``` jsx
const TemaContext = createContext();
```

#### Provider:

``` jsx
function ProvedorTema({ children }) {
  const [tema, setTema] = useState("claro");
```

-   Estado global `tema`
-   Todos os componentes dentro de `<ProvedorTema>` terão acesso a ele

``` jsx
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      {children}
    </TemaContext.Provider>
  );
}
```

#### Consumindo:

``` jsx
function BotaoTema() {
  const { tema, setTema } = useContext(TemaContext);
```

-   Aqui transformamos o contexto em variáveis locais
-   Sem passar props manualmente!

``` jsx
  return (
    <button onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}>
      Mudar tema (atual: {tema})
    </button>
  );
}
```

------------------------------------------------------------------------

## Arquitetura Ideal de Projeto React com Hooks + Vite

    📁 src
     ┣ 📁 assets/          → imagens, ícones, CSS global
     ┣ 📁 components/      → componentes reutilizáveis
     ┣ 📁 hooks/           → hooks personalizados
     ┣ 📁 pages/           → páginas da aplicação
     ┣ 📁 context/         → provedores e contextos
     ┣ 📁 services/        → API, axios, etc.
     ┣ 📁 utils/           → funções auxiliares
     ┣ 📁 routes/          → configuração de rotas
     ┣ App.jsx             → estrutura principal da interface
     ┣ main.jsx            → ponto de entrada do React

### Por que essa arquitetura é ideal?

-   Código modular\
-   Reutilização de lógica com Hooks\
-   Componentes limpos\
-   Maior escalabilidade\
-   Separação clara entre interface, regras e serviços