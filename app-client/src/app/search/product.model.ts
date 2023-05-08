export interface Product {
  name: string;
  description: string;
  creationDate: Date;
  quantity:number;
  colors: string[];
  image: string;
  price: number;
  sellersShop: Object;//todo: add seller object
}
