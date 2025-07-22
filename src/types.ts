type TodoType = { id: number; isDone: boolean; title: string };

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warranty_information: string;
  shipping_information: string;
  availability_status: string;
  return_policy: string;
  minimum_order_quantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  depth: number;
  width: number;
  height: number;
}

export interface Meta {
  qrCode: string;
  barcode: string;
  createdAt: string;
  updatedAt: string;
}

export type Colors = {
  background: string;
  text: string;
  cardBackground: string;
  priceText: string;
};

export type { TodoType };
