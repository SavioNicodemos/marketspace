export type PaymentMethodsTypes =
  | 'pix'
  | 'card'
  | 'boleto'
  | 'cash'
  | 'deposit';

export type IImageUpload = {
  name: string;
  uri: string;
  path: string;
  isExternal: boolean;
  type: string;
};

export type CreateProductDTO = {
  name: string;
  description: string;
  is_new: boolean;
  price: string;
  accept_trade: boolean;
  payment_methods: PaymentMethodsTypes[];
  product_images: IImageUpload[];
};

export type ShowAdDetailsDTO = Omit<CreateProductDTO, 'price'> & {
  price: number;
  user: User;
  payment_methods: IPaymentMethodObject[] | PaymentMethodsTypes[];
  product_images: ImagesDTO[] | IImageUpload[];
};

export type ProductDTO = ShowAdDetailsDTO & {
  id: string;
  user_id: string;
  is_active: boolean;
  payment_methods: IPaymentMethodObject[];
};

export type IProductId = string;

export type ImagesDTO = {
  id: string;
  path: string;
  isExternal: boolean;
};

export type IPaymentMethodObject = {
  key: PaymentMethodsTypes;
  name: string;
};

type User = {
  avatar: string;
  name: string;
  tel: string;
};
