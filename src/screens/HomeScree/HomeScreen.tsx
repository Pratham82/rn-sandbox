import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigatorProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigatorProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Screens:</Text>
      <View>
        <Button
          title="TodoList"
          onPress={() => navigation.navigate('TodoList')}
        />
        <Button
          title="ProductListing"
          onPress={() => navigation.navigate('ProductListing')}
        />
        <Button
          title="ProductListingInfinite"
          onPress={() => navigation.navigate('ProductListingInfinite')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  subTitle: {
    fontSize: 18,
  },
  buttonStyles: {
    fontSize: 14,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
});
