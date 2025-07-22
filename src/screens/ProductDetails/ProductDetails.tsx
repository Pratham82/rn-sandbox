import { Image, StyleSheet, Text, View } from 'react-native';
import { PRODUCTS_URL } from '../ProductListing/ProductListing';
import { useEffect, useState } from 'react';
import { ProductType } from '../../types';

export type ProductDetails = {
  productId: number;
};

const fetchProduct = async (productId: number) => {
  try {
    const res = await fetch(`${PRODUCTS_URL}/${productId}`);
    const data = await res.json();
    return data;
  } catch (error) {}
};

/*
{
    "product": {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        "category": "beauty",
        "price": 9.99,
        "discount_percentage": 10.48,
        "rating": 2.56,
        "stock": 99,
        "tags": [
            "beauty",
            "mascara"
        ],
        "brand": "Essence",
        "sku": "BEA-ESS-ESS-001",
        "weight": 4,
        "dimensions": {
            "depth": 22.99,
            "width": 15.14,
            "height": 13.08
        },
        "warranty_information": "1 week warranty",
        "shipping_information": "Ships in 3-5 business days",
        "availability_status": "In Stock",
        "return_policy": "No return policy",
        "minimum_order_quantity": 48,
        "meta": {
            "qrCode": "https://cdn.dummyjson.com/public/qr-code.png",
            "barcode": "5784719087687",
            "createdAt": "2025-04-30T09:41:02.053Z",
            "updatedAt": "2025-04-30T09:41:02.053Z"
        },
        "images": [
            "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
        ],
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    }
}
*/

const ProductDetails = ({ route, navigation }) => {
  const { productId, category } = route.params || {};

  const [productData, setProductData] = useState<ProductType>();

  useEffect(() => {
    (async () => {
      const data = await fetchProduct(productId);
      setProductData(data.product);
    })();
  }, [productId]);

  console.log({ productData });

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: productData?.thumbnail,
        }}
        style={styles.productImage}
      />
      <Text style={styles.title}>{productData?.title}</Text>
      <View style={styles.pricingContainer}>
        {/* <Text>{productData?.discount_percentage}</Text> */}
        <Text style={styles.pricingText}>{productData?.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  productImage: {
    height: '50%',
    width: '100%',
    resizeMode: 'contain',

    // borderWidth: 1,
    // borderColor: 'black',
    marginVertical: 10,
  },
  pricingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  pricingText: {
    fontSize: 18,
    fontWeight: 600,
  },
});

export default ProductDetails;
