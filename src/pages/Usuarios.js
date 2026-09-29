import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import BotaoNavegacao from '../components/BotaoNavegacao';
import CartaoUsuario from '../components/CartaoUsuario';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState('');
  const [consulta, setConsulta] = useState(0);

  useEffect(() => {
    const controle = new AbortController();
    let ativo = true;
    // Limita a espera e cancela a requisição ao sair da página.
    const limite = setTimeout(() => controle.abort(), 15000);

    async function buscarUsuarios() {
      try {
        const resposta = await fetch('https://dummyjson.com/users', { signal: controle.signal });
        if (!resposta.ok) {
          throw new Error('Falha na consulta de usuários.');
        }

        const dados = await resposta.json();
        // A API retorna um objeto com "users", não um array diretamente.
        if (
          !Array.isArray(dados?.users) ||
          dados.users.some((usuario) =>
            !usuario || !Number.isInteger(usuario.id) ||
            typeof usuario.firstName !== 'string' ||
            typeof usuario.lastName !== 'string' ||
            typeof usuario.email !== 'string'
          ) ||
          new Set(dados.users.map((usuario) => usuario.id)).size !== dados.users.length
        ) {
          throw new Error('Resposta de usuários inválida.');
        }

        if (ativo) setUsuarios(dados.users);
      } catch {
        if (ativo) {
          setErro('Não foi possível carregar os usuários. Verifique sua conexão ou tente novamente em instantes.');
        }
      } finally {
        clearTimeout(limite);
        if (ativo) {
          setCarregando(false);
          setAtualizando(false);
        }
      }
    }

    buscarUsuarios();

    return () => {
      ativo = false;
      clearTimeout(limite);
      controle.abort();
    };
  }, [consulta]);

  function carregar(atualizar = false) {
    if (carregando || atualizando) return;
    setErro('');
    setCarregando(!atualizar);
    setAtualizando(atualizar);
    // O efeito roda na montagem e apenas quando uma nova consulta é solicitada.
    setConsulta((anterior) => anterior + 1);
  }

  function voltar() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <BotaoNavegacao titulo="Voltar à calculadora" onPress={voltar} />
        <Text variant="headlineMedium" accessibilityRole="header" style={styles.titulo}>
          Usuários
        </Text>
        <Text variant="bodyMedium" style={styles.descricao}>
          Dados fictícios da DummyJSON. Puxe a lista para atualizar.
        </Text>
      </View>

      <FlatList
        style={styles.lista}
        contentContainerStyle={styles.conteudo}
        data={usuarios}
        keyExtractor={(usuario) => String(usuario.id)}
        renderItem={({ item }) => <CartaoUsuario usuario={item} />}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={() => carregar(true)}
            colors={['#256B45']}
            tintColor="#256B45"
          />
        }
        ListHeaderComponent={
          <View accessibilityLiveRegion="polite">
            {carregando && (
              <View style={styles.aviso}>
                <ActivityIndicator size="large" accessibilityLabel="Carregando usuários" />
                <Text>Carregando usuários...</Text>
              </View>
            )}
            {erro !== '' && (
              <View style={styles.aviso}>
                <Text style={styles.erro}>{erro}</Text>
                {usuarios.length > 0 && <Text>A lista abaixo é da última consulta bem-sucedida.</Text>}
                <Button mode="outlined" onPress={() => carregar()} style={styles.botao}>
                  Tentar novamente
                </Button>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          !carregando && !atualizando && !erro ? (
            <Text style={styles.aviso}>Nenhum usuário encontrado.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  cabecalho: {
    padding: 16,
    gap: 12,
  },
  titulo: {
    fontWeight: '600',
  },
  descricao: {
    color: '#666666',
    lineHeight: 20,
  },
  lista: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  aviso: {
    paddingVertical: 16,
    gap: 12,
  },
  erro: {
    color: '#B3261E',
    lineHeight: 22,
  },
  botao: {
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
});
