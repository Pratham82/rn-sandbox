import { useEffect, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
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

export default function ProductListingInfinite() {
  const colorScheme = useColorScheme();

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
    limit: 10,
    page: 1,
  });

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Dynamic color values
  const isDark = colorScheme === 'dark';
  const colors = {
    background: isDark ? '#000000' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    cardBackground: isDark ? '#1a1a1a' : '#f5f5f5',
    priceText: isDark ? '#ffffff' : '#000000',
  };

  const fetchProducts = async ({ search = '', limit = 8, page = 1 }) => {
    if (loading) return;
    setLoading(true);
    try {
      const searchParams = new URLSearchParams({ search, limit, page });
      const res = await fetch(`${PRODUCTS_URL}?${searchParams}`);
      const data = await res.json();

      setProducts(prev => ({
        ...data,
        products:
          page === 1 ? data.products : [...prev.products, ...data.products],
      }));
      setHasMore(page < data.totalPages);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isBottom && !loading && hasMore) {
      setFilters(prev => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
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
        contentContainerStyle={styles.productGrid}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
        {loading && (
          <View style={{ padding: 16, alignItems: 'center', width: '100%' }}>
            <Text style={{ color: colors.text }}>Loading more...</Text>
          </View>
        )}
      </ScrollView>

      {/* Pagination */}
      {/* <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => onUpdateChange('prev')}
          disabled={filters.page === 1}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text>{filters.page}</Text>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => onUpdateChange('next')}
          disabled={products.totalPages === filters.page}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View> */}
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
