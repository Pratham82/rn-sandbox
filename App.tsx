import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Platform,
} from 'react-native';
// import Todo from './src/screens/TodoScreen/Todo';
import ProductListing from './src/screens/ProductListing/ProductListing';

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.statusBarStyle}
        backgroundColor={
          Platform.OS === 'android' ? colors.statusBarBackground : undefined
        }
        translucent={false}
      />
      {/* <Todo /> */}
      <ProductListing />
    </View>
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
});

export default App;
