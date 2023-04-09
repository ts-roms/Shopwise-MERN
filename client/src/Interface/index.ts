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

export interface IUserState {
  isAuthenticate: boolean;
  isLoading?: boolean;
  error?: null | string;
  user: IUser;
}

export interface IAppState {
  user: IUserState;
}

export interface IQuestion {
  question: string;
  answer: string;
}
