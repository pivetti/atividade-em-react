export const RENDIMENTO_FARELO = 0.78;
export const RENDIMENTO_OLEO = 0.18;

export function converterNumero(texto) {
  const valor = texto.trim();

  // Valida o texto inteiro: evita aceitar parcialmente entradas como "2100abc".
  if (!/^\d+([.,]\d+)?$/.test(valor)) {
    return NaN;
  }

  return Number(valor.replace(',', '.'));
}

export function calcularMargem({ soja, farelo, oleo, custoIndustrial }) {
  // Cada receita corresponde ao rendimento obtido de uma tonelada de soja.
  const receitaFarelo = farelo * RENDIMENTO_FARELO;
  const receitaOleo = oleo * RENDIMENTO_OLEO;
  const receitaTotal = receitaFarelo + receitaOleo;
  const margemBruta = receitaTotal - soja;
  const margemAposCusto = margemBruta - custoIndustrial;

  return { receitaFarelo, receitaOleo, receitaTotal, margemBruta, margemAposCusto };
}
