import {Tags} from "./tags";

export interface SellingItem {
    name: string;
    description: string;
    creationDate: Date;
    quantity:number;
    colors: string[];
    image: string;
    tags: Tags[];
    sellersShop: Object;//todo: add seller object
}
