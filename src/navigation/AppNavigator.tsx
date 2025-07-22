import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../components/pages/HomeScreen';
import HomeScreen from '../screens/HomeScree/HomeScreen';
import ProductListing from '../screens/ProductListing/ProductListing';
import ProductListingInfinite from '../screens/ProductListing/ProductListingInfinite';
import Todo from '../screens/TodoScreen/Todo';
import ProductDetails from '../screens/ProductDetails/ProductDetails';

export type RootStackParamList = {
  Home: undefined;
  ProductDetails: { productId: string }; // or pass whole product object
  ProductListing: undefined;
  ProductListingInfinite: undefined;
  TodoList: undefined;
  // [key: string]: any;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TodoList" component={Todo} />
        <Stack.Screen name="ProductListing" component={ProductListing} />
        <Stack.Screen
          name="ProductListingInfinite"
          component={ProductListingInfinite}
        />
        <Stack.Screen name="ProductDetails">
          {props => <ProductDetails {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
