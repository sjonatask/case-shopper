import { ChangeStock} from './../model/product';
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
        
        return result[0]
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

    public async deleteProduct(id: string):Promise<void>{        
        await this.getConnection()
            .delete()
            .from(this.TABLE_NAME)
            .where({id})
    }

    public async deleteProductForeignKey(id: string):Promise<void>{        
        await this.getConnection()
            .delete()
            .from(this.TABLE_SHOPPING_NAME)
            .where({id_product: id})
    }

    public async changeQty(product:ChangeStock):Promise<void>{                      
        await this.getConnection()
            .update({
                quantity_stock: product.getQuantity()
            })
            .where({id: product.getProductID()})
            .from(this.TABLE_NAME)
    }
}