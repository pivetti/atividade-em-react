import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RENDIMENTO_FARELO, RENDIMENTO_OLEO } from '../utils/margem';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" accessibilityRole="header" style={styles.titulo}>
        Crush Margin
      </Text>
      <Text variant="bodyMedium" style={styles.texto}>
        Margem de esmagamento da soja
      </Text>

      <Text variant="bodySmall" style={[styles.texto, styles.premissas]}>
        Para cada tonelada de soja: {RENDIMENTO_FARELO * 100}% de farelo e{' '}
        {RENDIMENTO_OLEO * 100}% de óleo. São premissas didáticas; os 4% restantes não geram receita.
      </Text>

      <Text variant="titleMedium" accessibilityRole="header">
        Preços e custo industrial
      </Text>
      <Text variant="bodySmall" style={styles.texto}>
        Valores iniciais fictícios. Digite sem separador de milhar, por exemplo: 2200,00.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  titulo: {
    fontWeight: '600',
  },
  texto: {
    color: '#666666',
    lineHeight: 20,
  },
  premissas: {
    marginVertical: 8,
  },
});
