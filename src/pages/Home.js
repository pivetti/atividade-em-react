import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import BotaoCalcular from '../components/BotaoCalcular';
import Cabecalho from '../components/Cabecalho';
import CampoNumerico from '../components/CampoNumerico';
import ResultadoMargem from '../components/ResultadoMargem';
import { calcularMargem, converterNumero } from '../utils/margem';

const valoresIniciais = {
  soja: '2200,00',
  farelo: '2100,00',
  oleo: '6000,00',
  custoIndustrial: '120,00',
};

/** @type {Record<string, string>} */
const errosIniciais = {};

export default function Home() {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState(errosIniciais);
  const [resultado, setResultado] = useState(null);

  function alterarCampo(campo, texto) {
    setValores({ ...valores, [campo]: texto });
    setErros({ ...erros, [campo]: '' });
    // Um resultado só é válido para os valores usados no último cálculo.
    setResultado(null);
  }

  function calcular() {
    /** @type {Record<string, string>} */
    const novosErros = {};
    const numeros = {};

    for (const campo of Object.keys(valores)) {
      const numero = converterNumero(valores[campo]);

      if (valores[campo].trim() === '') {
        novosErros[campo] = 'Preencha este campo.';
      } else if (!Number.isFinite(numero) || numero < 0) {
        novosErros[campo] = 'Informe um número válido, igual ou maior que zero.';
      } else if (numero > Number.MAX_SAFE_INTEGER) {
        novosErros[campo] = 'Valor muito alto. Informe um valor menor.';
      }

      numeros[campo] = numero;
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) {
      setResultado(null);
      return;
    }

    setResultado(calcularMargem({
      soja: numeros.soja,
      farelo: numeros.farelo,
      oleo: numeros.oleo,
      custoIndustrial: numeros.custoIndustrial,
    }));
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.rolagem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.conteudo}>
          <Cabecalho />
          <CampoNumerico
            label="Preço de compra da soja"
            unidade="R$/t de soja"
            value={valores.soja}
            onChangeText={(texto) => alterarCampo('soja', texto)}
            erro={erros.soja}
          />
          <CampoNumerico
            label="Preço de venda do farelo"
            unidade="R$/t de farelo"
            value={valores.farelo}
            onChangeText={(texto) => alterarCampo('farelo', texto)}
            erro={erros.farelo}
          />
          <CampoNumerico
            label="Preço de venda do óleo"
            unidade="R$/t de óleo"
            value={valores.oleo}
            onChangeText={(texto) => alterarCampo('oleo', texto)}
            erro={erros.oleo}
          />
          <CampoNumerico
            label="Custo industrial"
            unidade="R$/t de soja processada"
            value={valores.custoIndustrial}
            onChangeText={(texto) => alterarCampo('custoIndustrial', texto)}
            erro={erros.custoIndustrial}
          />
          <BotaoCalcular onPress={calcular} />
          <ResultadoMargem resultado={resultado} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  rolagem: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  conteudo: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    gap: 16,
  },
});
