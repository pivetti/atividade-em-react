import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#256B45',
    onPrimary: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#222222',
    onSurfaceVariant: '#666666',
    outline: '#BBBBBB',
    error: '#B3261E',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false, contentStyle: styles.container }} />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
