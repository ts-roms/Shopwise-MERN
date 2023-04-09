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
