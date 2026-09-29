import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';

export default function CartaoUsuario({ usuario }) {
  const [fotoComErro, setFotoComErro] = useState('');
  const nomes = [usuario.firstName, usuario.lastName].map((nome) => nome.trim()).filter(Boolean);
  const nomeCompleto = nomes.join(' ') || 'Nome não informado';
  const iniciais = nomes.map((nome) => nome[0]).join('').toUpperCase() || '?';
  const foto = typeof usuario.image === 'string' ? usuario.image.trim() : '';
  const empresa = typeof usuario.company?.name === 'string' ? usuario.company.name.trim() : '';

  return (
    <Card mode="outlined" style={styles.cartao}>
      <Card.Content style={styles.conteudo}>
        <View style={styles.cabecalho}>
          {foto && fotoComErro !== foto ? (
            <Avatar.Image
              size={48}
              source={{ uri: foto }}
              onError={() => setFotoComErro(foto)}
              accessibilityLabel={`Foto de ${nomeCompleto}`}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Text
              size={48}
              label={iniciais}
              accessibilityLabel={`Iniciais de ${nomeCompleto}`}
              style={styles.avatar}
              color="#256B45"
            />
          )}
          <Text variant="titleMedium" style={styles.nome}>{nomeCompleto}</Text>
        </View>
        <Text variant="bodyMedium" selectable>
          {usuario.email.trim() || 'E-mail não informado'}
        </Text>
        <Text variant="bodyMedium" style={styles.empresa}>
          Empresa: {empresa || 'Não informada'}
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
    marginBottom: 12,
  },
  conteudo: {
    gap: 8,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    backgroundColor: '#EEEEEE',
  },
  nome: {
    flex: 1,
  },
  empresa: {
    color: '#666666',
  },
});
