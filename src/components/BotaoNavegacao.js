import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function BotaoNavegacao({ titulo, onPress }) {
  return (
    <Button mode="outlined" onPress={onPress} style={styles.botao} contentStyle={styles.conteudo}>
      {titulo}
    </Button>
  );
}

const styles = StyleSheet.create({
  botao: {
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  conteudo: {
    minHeight: 44,
  },
});
