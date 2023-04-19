export interface Product {
  name: string;
  description: string;
  creationDate: Date;
  quantity:number;
  colors: string[];
  image: string;
  sellersShop: Object;//todo: add seller object
}
