import { ChangeEvent, ReactNode } from "react";

export interface IProduct {
  id: number;
  category?: string;
  name: string;
  description: string;
  price: number;
  image_Url: { public_id: string; url: string }[];
  shop: {
    name: string;
    shop_avatar: {
      public_id: string;
      url: string;
    };
    ratings: number;
  };
  reviews?: { user: {}; comment: string; rating: number }[];
  rating: number;
  total_sell: number;
  discount_price: number;
}

export interface ICategory {
  id: number;
  subTitle: string;
  title: string;
  image_Url: string;
}

export interface IPasswordInputProps {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ICustomResponse {
  success: boolean;
  message: string;
}

export interface IComponentProp {
  children: ReactNode;
}

export interface IStarsProps {
  stars: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface ISeller {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  phoneNumber: number;
  address: string;
  zipcode: number;
  createdAt: string;
}

export interface IUserState {
  isUserAuthenticate: boolean;
  isUserLoading?: boolean;
  userError?: null | string;
  user: IUser;
}

export interface ISellerState {
  isSellerAuthenticate: boolean;
  isSellerLoading: boolean;
  sellerError?: null | string;
  seller: ISeller;
}

export interface IAppState {
  user: IUserState;
  seller: ISellerState;
}

export interface IQuestion {
  question: string;
  answer: string;
}

export interface IAddProduct {
  productName: string;
  productDescription: string;
  productImages: any[];
  productCategory: string;
  productTags: string;
  productPrice: number;
  productDiscountPrice: number;
  productDiscountPercentage: number;
  productStock: number;
}
