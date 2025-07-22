import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProductType, Colors } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({
  product,
  colors,
}: {
  product: ProductType;
  colors: Colors;
}) {
  const navigation = useNavigation();

  const navigate = (productId: number) => {
    navigation.navigate('ProductDetails', { productId });
  };

  return (
    <TouchableOpacity
      key={product.id}
      style={[styles.productCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => navigate(product.id)}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
