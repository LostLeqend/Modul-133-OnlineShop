import {Product} from "./product.ts";

export type ShoppingCart = {
    products: Product[]
    //key: productId, value: productAmount
    productAmount: Map<string, number>
}