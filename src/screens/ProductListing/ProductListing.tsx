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

  /*
  {
    "products": [],
    "total": 30,
    "page": 2,
    "limit": 8,
    "totalPages": 4
}
  */

  const [products, setProducts] = useState<{
    total: number;
    products: ProductType[];
    page: number;
    limit: number;
    totalPages: number;
  }>({
    limit: 8,
    page: 1,
    products: [],
    total: 0,
    totalPages: 1,
  });
  // const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    limit: 8,
    page: 1,
  });

  // Dynamic color values
  const isDark = colorScheme === 'dark';
  const colors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    cardBackground: isDark ? '#1a1a1a' : '#f5f5f5',
    priceText: isDark ? '#ffffff' : '#000000',
  };

  const fetchProducts = async ({ search = '', limit = 8, page = 1 }) => {
    try {
      const searchParams = new URLSearchParams({ search, limit, page });
      const res = await fetch(`${PRODUCTS_URL}?${searchParams}`);
      const data = await res.json();
      console.log('🚀 ~ fetchProducts ~ data:', data);
      setProducts(data);
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

  const onUpdateChange = (type: 'prev' | 'next') => {
    setFilters(prev => ({
      ...prev,
      page: type === 'next' ? prev.page + 1 : prev.page - 1,
    }));
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

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
        {products.products?.map((product, index) => {
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
      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => onUpdateChange('prev')}
          disabled={filters.page === 1}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text>{filters.page}</Text>
        {/* <TextInput value={filters.page} placeholder="page" /> */}
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => onUpdateChange('next')}
          disabled={products.totalPages === filters.page}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  productCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,

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
  paginationContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  paginationButton: {
    padding: 8,
    backgroundColor: 'black',
    borderRadius: 6,
    color: 'white',
  },
  paginationButtonText: {
    color: 'white',
  },
});
