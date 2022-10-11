import { Products } from "../model/product";
import { ShoppingListDTO } from "../model/shoppingList";
import { BaseDatabase } from "./baseDataBase";

export class ProductDataBase extends BaseDatabase{
    private TABLE_NAME = "products_shopper"
    private TABLE_SHOPPING_NAME = "user_shopping_list"

    public async insertProduct(product:Products):Promise<void>{       
        await this.getConnection()
            .insert({
                id: product.getId(),
                name: product.getName(),
                price: product.getPrice(),
                quantity_stock: product.getQuantityStock()
            })
            .into(this.TABLE_NAME)

        BaseDatabase.destroyConnection()
    }

    public async getAllProducts():Promise<Products[]>{
        const result = await this.getConnection()
            .select("*")
            .from(this.TABLE_NAME)
        BaseDatabase.destroyConnection()
            
        return result
    }

    public async getProductById(id:string):Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .where({id})
            .from(this.TABLE_NAME)
        BaseDatabase.destroyConnection()
        
        return result
    }

    public async purchaseShoppingList(list:ShoppingListDTO):Promise<void>{
        await this.getConnection()
            .insert({
                id_product: list.productId,
                id_user: list.userId,
                quantity: list.quantity             
            })
            .into(this.TABLE_SHOPPING_NAME)
        BaseDatabase.destroyConnection()
    }
}