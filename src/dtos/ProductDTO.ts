export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  product_images: string[];
  payment_methods: PaymentMethod[];
  user: User;
};

type PaymentMethod = {
  key: string;
  name: string;
};

type User = {
  avatar: string;
  name: string;
  tel: string;
};
