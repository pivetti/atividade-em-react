# Crush Margin

Calculadora didática da margem de esmagamento da soja, feita em React Native,
Expo 57 e JavaScript a partir do template blank existente. A Aula Prática 1 traz
o cálculo local com `useState`; a Aula Prática 2 acrescenta uma página de usuários
fictícios consultados na DummyJSON. O visual continua simples.

## Executar com Expo Go

Na pasta do projeto, instale as dependências registradas no lockfile:

```sh
npm ci
npx expo start --clear
```

Use uma versão do Expo Go compatível com o SDK 57 e leia o QR code exibido no
terminal. Computador e celular devem estar na mesma rede. Se a rede impedir a
conexão, encerre o servidor com `Ctrl+C` e execute:

```sh
npx expo start --tunnel
```

Se o Expo solicitar a instalação do suporte ao túnel, aceite. Em um iPhone físico,
o Expo Go e a CLI precisam estar conectados à mesma conta Expo (`npx expo login`).
Veja o [guia oficial de execução do Expo](https://docs.expo.dev/get-started/start-developing/).

Para abrir a versão web, use `npm run web`.

## Organização e componentes

- `App.js`: tema claro, `PaperProvider`, área segura, barra de status e navegação com `Stack`.
- `index.js`: entrada do Expo Router.
- `src/app/`: layout e duas rotas que reutilizam as páginas de `src/pages/`.
- `src/pages/Home.js`: campos, validação e controle do resultado com `useState`.
- `src/pages/Usuarios.js`: consulta à API, estados de carregamento/erro e `FlatList`.
- `src/components/CartaoUsuario.js`: `Card`, `Avatar.Image`, `Avatar.Text` e `Text` do Paper.
- `src/components/BotaoNavegacao.js`: botão do Paper reutilizado para abrir usuários e voltar.
- `src/components/Cabecalho.js`: título, subtítulo e premissas, usando `Text` do Paper.
- `src/components/CampoNumerico.js`: `TextInput`, `Text` e `HelperText`, reutilizado nos quatro campos.
- `src/components/BotaoCalcular.js`: botão do Paper que recebe a ação de cálculo.
- `src/components/ResultadoMargem.js`: `Card` e `Text`, com uma linha de resultado reutilizada cinco vezes.
- `src/utils/margem.js`: conversão numérica, rendimentos fixos e fórmulas.

Os componentes próprios encapsulam `Text`, `TextInput`, `HelperText`, `Button`,
`Card` e os avatares do React Native Paper. A página de usuários também usa
`ActivityIndicator`. A estilização usa `StyleSheet.create`. A calculadora tem
rolagem e tratamento básico do teclado; a lista de usuários tem sua própria rolagem.

O PDF não está incluído no repositório. A implementação segue os requisitos
transcritos no pedido da atividade.

## Aula Prática 2: usuários

Na calculadora, toque em **Usuários**. Use **Voltar à calculadora** para retornar
com os campos e o resultado preservados. A navegação usa Expo Router, conforme
o `AGENTS.md`, mantendo as páginas em JavaScript.

A chamada real é `fetch('https://dummyjson.com/users')`, conforme a
[documentação da DummyJSON](https://dummyjson.com/docs/users). A resposta é um
objeto com `users`, `total`, `skip` e `limit`. A página mostra a lista padrão do
endpoint (30 usuários na resposta conferida), sem paginação adicional.

Cada cartão mostra foto, nome completo, e-mail e empresa. Fotos ausentes ou com
falha são substituídas pelas iniciais. O ID é usado como chave da `FlatList`,
que não está dentro de uma `ScrollView` vertical.

O `useEffect` executa a consulta na montagem e quando o usuário solicita uma
nova busca. `useState` guarda a lista, os estados de carregamento e a mensagem de
erro. A resposta passa pela verificação de `response.ok`, do JSON, da lista e dos
campos necessários, incluindo IDs sem repetição.

Durante a primeira busca aparece o `ActivityIndicator`. Uma falha mostra uma
mensagem e **Tentar novamente**; uma resposta vazia mostra **Nenhum usuário
encontrado**. O `finally` encerra os indicadores tanto no sucesso quanto no erro.

No celular, puxe a lista para atualizar usando `RefreshControl`. Se a atualização
falhar, a lista anterior continua visível e é identificada como a última consulta
bem-sucedida. No navegador, o React Native Web não implementa esse gesto.

O `AbortController` cancela a consulta ao desmontar a página ou após 15 segundos
de espera. Uma variável local impede atualizações de estado após a desmontagem.
Não há cadastro, edição, exclusão, autenticação ou backend próprio.

As dependências de navegação foram instaladas com `npx expo install`, preservando
o SDK 57. Reanimated e Worklets, trazidos pela árvore do Router, foram alinhados
às versões compatíveis com esse SDK.

## Cálculo e preenchimento

Base: uma tonelada de soja. Os rendimentos didáticos são 78% de farelo e 18% de
óleo. Os 4% restantes não geram receita.

```text
Receita do farelo = preço do farelo × 0,78
Receita do óleo = preço do óleo × 0,18
Receita total = receita do farelo + receita do óleo
Margem bruta = receita total − preço da soja
Margem após custo industrial = margem bruta − custo industrial
```

Com os valores fictícios iniciais (soja 2200, farelo 2100, óleo 6000 e custo 120):

| Resultado | R$/t de soja processada |
| --- | ---: |
| Receita do farelo | 1.638,00 |
| Receita do óleo | 1.080,00 |
| Receita total | 2.718,00 |
| Margem bruta de esmagamento | 518,00 |
| Margem após o custo industrial | 398,00 |

Digite números sem separador de milhar, usando vírgula ou ponto decimal
(`2200,50` ou `2200.50`). Campos vazios, textos inválidos e números negativos são
recusados. Zero é permitido. Margens negativas são exibidas normalmente, em vermelho.
Ao alterar qualquer campo, o resultado anterior é ocultado até clicar novamente
em **Calcular margem**. Nada é salvo ao fechar o aplicativo.

A simulação considera somente os custos inseridos e não representa lucro líquido.

## Verificação

```sh
npm run lint
npm run typecheck
npx expo install --check
npx expo-doctor
npx expo export --platform all
```

O código da aplicação continua em JavaScript. O TypeScript é usado somente como
ferramenta de verificação dos arquivos `.js`, com `checkJs` e sem gerar arquivos.

Verificado neste ambiente:

- Cálculos do exemplo, decimais, zeros e margens negativas com as funções reais.
- Interação no Chromium com a versão web: preenchimento, cálculo, validação,
  correção dos erros e ocultação do resultado ao editar.
- Tela web com largura de 320 px, sem transbordamento horizontal dos campos e botão.
- Lint, verificação estática do JavaScript e compatibilidade das dependências.
- Expo Doctor: 21 de 21 verificações aprovadas.
- Exportação dos bundles para Android, iOS e web.
- Aula 2 no Chromium: consulta real à API, indicador inicial, dados dos cartões,
  navegação e preservação do cálculo, sem consultas em loop.
- Com respostas controladas apenas durante o teste: HTTP 503, erro de rede, JSON
  e estrutura inválidos, lista vazia, nova tentativa e iniciais no lugar da foto.
- Callback do `RefreshControl`: nova consulta, erro com preservação da lista e
  recuperação. Cancelamento da requisição ao voltar durante uma busca.

Não foi executado em aparelho físico ou emulador Android/iOS. O teclado nativo e
a área segura ainda precisam de conferência no celular, assim como o gesto nativo
de puxar para atualizar. A conexão por túnel não foi testada.
