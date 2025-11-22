declare global {
  interface Category {
    creationAt: string;
    id: number;
    image: string;
    name: string;
    slug: string;
    updateAt: string;
  }

  interface ProductData {
    category: Category;
    creationAt: string;
    description: string;
    id: number;
    images: SVGProps<SVGImageElement> | string[];
    price: number;
    slug: string;
    title: string;
    updateAt: string;
  }

  interface ProductListData {
    products: ProductData[];
  }

  interface CartItemType {
    cartItemId: string;
    id: string;
    stripeId: string;
    name: string;
    image: string;
    price: number;
    currency: string;
    quantity: number;
  }
}

export {};
