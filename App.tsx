import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Platform,
} from 'react-native';
// import Todo from './src/screens/TodoScreen/Todo';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // Define consistent colors for both platforms
  const colors = {
    background: isDarkMode ? '#121212' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#000000',
    statusBarStyle: isDarkMode ? 'light-content' : 'dark-content',
    statusBarBackground: isDarkMode ? '#000000' : '#ffffff',
  };

  console.log({ name: 'Prathamesh' });

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar
          barStyle={isDarkMode ? 'dark-content' : 'light-content'}
          backgroundColor={
            Platform.OS === 'android' ? colors.statusBarBackground : undefined
          }
          translucent={false}
        />
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  statusBarStyles: {},
});

export default App;
