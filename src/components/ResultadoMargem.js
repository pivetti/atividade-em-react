import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function LinhaResultado({ titulo, valor }) {
  return (
    <View style={styles.linha}>
      <Text variant="bodyMedium">{titulo}</Text>
      <Text
        variant="titleMedium"
        style={[styles.valor, valor < 0 && styles.negativo]}
      >
        {moeda.format(valor)} /t
      </Text>
    </View>
  );
}

export default function ResultadoMargem({ resultado }) {
  return (
    <Card mode="outlined" style={styles.cartao}>
      <Card.Content style={styles.conteudo}>
        <Text variant="titleMedium" accessibilityRole="header">Resultado</Text>
        <Text variant="bodySmall" style={styles.observacao}>
          Todos os valores em R$/t de soja processada.
        </Text>
        <View accessibilityLiveRegion="polite">
          {resultado ? (
            <>
              <LinhaResultado titulo="Receita do farelo" valor={resultado.receitaFarelo} />
              <LinhaResultado titulo="Receita do óleo" valor={resultado.receitaOleo} />
              <LinhaResultado titulo="Receita total" valor={resultado.receitaTotal} />
              <LinhaResultado titulo="Margem bruta de esmagamento" valor={resultado.margemBruta} />
              <LinhaResultado
                titulo="Margem após o custo industrial"
                valor={resultado.margemAposCusto}
              />
            </>
          ) : (
            <Text variant="bodyMedium" style={styles.vazio}>
              Toque em “Calcular margem” para ver o resultado. Se alterar os campos, calcule novamente.
            </Text>
          )}
        </View>
        <Text variant="bodySmall" style={styles.observacao}>
          A simulação considera apenas os custos inseridos e não representa lucro líquido.
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderRadius: 4,
  },
  conteudo: {
    gap: 8,
  },
  linha: {
    paddingVertical: 10,
    gap: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EEEEEE',
  },
  valor: {
    color: '#222222',
    fontWeight: '600',
  },
  negativo: {
    color: '#B3261E',
  },
  vazio: {
    color: '#666666',
    paddingVertical: 16,
    lineHeight: 22,
  },
  observacao: {
    color: '#666666',
    lineHeight: 19,
  },
});
