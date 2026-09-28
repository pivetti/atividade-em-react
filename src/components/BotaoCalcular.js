import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function BotaoCalcular({ onPress }) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={styles.botao}
      contentStyle={styles.conteudo}
      labelStyle={styles.label}
    >
      Calcular margem
    </Button>
  );
}

const styles = StyleSheet.create({
  botao: {
    borderRadius: 4,
  },
  conteudo: {
    minHeight: 48,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});
