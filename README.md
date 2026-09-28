# Crush Margin

Calculadora didática da margem de esmagamento da soja, feita em React Native,
Expo 57 e JavaScript a partir do template blank existente. Uma única tela, com
cálculo local e estado mantido com `useState`.

## Executar com Expo Go

Na pasta do projeto, instale as dependências registradas no lockfile:

```sh
npm ci
npx expo start
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

- `App.js`: tema claro com `PaperProvider`, `SafeAreaProvider`, `SafeAreaView` e barra de status.
- `src/pages/Home.js`: campos, validação e controle do resultado com `useState`.
- `src/components/Cabecalho.js`: título, subtítulo e premissas, usando `Text` do Paper.
- `src/components/CampoNumerico.js`: `TextInput`, `Text` e `HelperText`, reutilizado nos quatro campos.
- `src/components/BotaoCalcular.js`: botão do Paper que recebe a ação de cálculo.
- `src/components/ResultadoMargem.js`: `Card` e `Text`, com uma linha de resultado reutilizada cinco vezes.
- `src/utils/margem.js`: conversão numérica, rendimentos fixos e fórmulas.

Os componentes próprios encapsulam cinco tipos de componentes do React Native
Paper: `Text`, `TextInput`, `HelperText`, `Button` e `Card`. A estilização usa
`StyleSheet.create`. A tela tem rolagem e tratamento básico do teclado.

O PDF não está incluído no repositório. A implementação segue os requisitos
transcritos no pedido da atividade.

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

Não foi executado em aparelho físico ou emulador Android/iOS. O teclado nativo e
a área segura ainda precisam de conferência no celular. A conexão por túnel não
foi testada.
