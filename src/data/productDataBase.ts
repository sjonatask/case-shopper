import { Products } from "../model/product";
import { BaseDatabase } from "./baseDataBase";

export class ProductDataBase extends BaseDatabase{
    private TABLE_NAME = "products_shopper"

    public async insertProduct(product:Products):Promise<void>{
        this.getConnection()
        .insert({
            id: product.getId,
            name: product.getName,
            price: product.getPrice,
            quantity_stock: product.getQuantityStock
        })
        .into(this.TABLE_NAME)

        BaseDatabase.destroyConnection()
    }
}