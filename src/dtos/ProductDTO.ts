export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  product_images: ImagesDTO[];
  payment_methods: PaymentMethod[];
  user: User;
};

export type ImagesDTO = {
  id: string;
  path: string;
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
