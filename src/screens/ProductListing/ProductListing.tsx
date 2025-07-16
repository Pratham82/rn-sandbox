import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { ProductType } from '../../types';

const PRODUCTS_URL =
  'https://mock-api.mali-prathamesh82.workers.dev/api/products';

export default function ProductListing() {
  const colorScheme = useColorScheme();
  console.log('🚀 ~ ProductListing ~ colorScheme:', colorScheme);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');

  // Dynamic color values
  const isDark = colorScheme === 'dark';
  const colors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    cardBackground: isDark ? '#1a1a1a' : '#f5f5f5',
    priceText: isDark ? '#ffffff' : '#000000',
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(PRODUCTS_URL);
      const data = await res.json();
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Product Listing
      </Text>
      <View>
        <Text style={{ color: colors.text }}>Current View: </Text>
        {/* <TouchableOpacity
          onPress={() =>
            setCurrentView(currentView === 'grid' ? 'list' : 'grid')
          }
        >
          <Icon
            name={currentView === 'grid' ? 'list' : 'grid'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity> */}
      </View>
      <ScrollView
        // style={styles.productGrid}
        contentContainerStyle={styles.productGrid}
      >
        {products.map((product, index) => {
          return (
            <View
              key={product.id}
              style={[
                styles.productCard,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <Image
                source={{
                  uri: product.thumbnail,
                }}
                style={styles.productImage}
              />
              <Text
                style={[styles.productText, { color: colors.text }]}
                numberOfLines={1}
              >
                {product.title}
              </Text>
              <Text style={[styles.productPrice, { color: colors.priceText }]}>
                {product.price}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // paddingHorizontal: 10,
    gap: 8,
    // borderColor: 'red',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
  },
  productGrid: {
    // display: 'flex',
    // flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // gap: 8,
    // justifyContent: 'flex-start',

    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    padding: 10,
  },
  productCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 110,
    borderRadius: 8,
    flexBasis: '48%',
  },
  productImage: {
    height: '70%',
    width: '70%',
    resizeMode: 'contain',
  },
  productText: {
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  productPrice: {
    fontWeight: '700',
  },
});
