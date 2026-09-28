import { StyleSheet, View } from 'react-native';
import { HelperText, Text, TextInput } from 'react-native-paper';

export default function CampoNumerico({ label, unidade, value, onChangeText, erro }) {
  return (
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.label}>{label}</Text>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        inputMode="decimal"
        autoCorrect={false}
        autoCapitalize="none"
        accessibilityLabel={`${label}, ${unidade}`}
        error={Boolean(erro)}
        left={<TextInput.Affix text="R$" />}
        style={styles.input}
      />
      <Text variant="bodySmall" style={styles.unidade}>{unidade}</Text>
      {Boolean(erro) && (
        <HelperText type="error" padding="none" accessibilityLiveRegion="polite">
          {erro}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  unidade: {
    color: '#666666',
  },
});
