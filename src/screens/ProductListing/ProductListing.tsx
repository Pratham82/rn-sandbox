import { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  // const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    limit: 15,
  });

  // Dynamic color values
  const isDark = colorScheme === 'dark';
  const colors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    cardBackground: isDark ? '#1a1a1a' : '#f5f5f5',
    priceText: isDark ? '#ffffff' : '#000000',
  };

  const fetchProducts = async ({ search = '', limit = 10 }) => {
    try {
      const searchParams = new URLSearchParams({ search, limit });
      const res = await fetch(`${PRODUCTS_URL}?${searchParams}`);
      const data = await res.json();
      setProducts(data.products);
    } catch (e) {
      console.log(e);
    }
  };

  const onFilterChange = (value: string, type: 'search') => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  console.log(products);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Product Listing
      </Text>
      {/* <View>
        <Text style={{ color: colors.text }}>Current View: {currentView} </Text>
      </View> */}
      <TextInput
        value={filters.search}
        style={[
          styles.inputStyles,
          { backgroundColor: colors.cardBackground, color: colors.text },
        ]}
        placeholder="Search by product..."
        onChangeText={value => onFilterChange(value, 'search')}
      />
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
  inputStyles: {
    paddingVertical: 10,
    paddingHorizontal: 10,
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
    justifyContent: 'space-between',
    // padding: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  productCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    // width: 120,
    // width: '100%',
    // width: '50%',
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
