import { ShoppingList } from "../model/shoppingList";
import { User } from "../model/user";
import { BaseDatabase } from "./baseDataBase";

export class UserDataBase extends BaseDatabase{
    private TABLE_NAME = "user_shopper"
    private LEFT_TABLE = "products_shopper"
    private RIGTH_TABLE = "user_shopping_list"
    

    public async signup(user:User):Promise<void>{        
        await this.getConnection()
            .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            })
            .into(this.TABLE_NAME)
    }

    public async getUserByEmail(email:string):Promise<User>{
        const result = await this.getConnection()
            .select("*")
            .from(this.TABLE_NAME)
            .where({email})
        BaseDatabase.destroyConnection()
        
        return result[0]
    }

    public async getUserById(id:string):Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(this.TABLE_NAME)
            .where({id})
        BaseDatabase.destroyConnection()

        return result
    }

    public async getShoppingList(id:string):Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .leftJoin(`${this.LEFT_TABLE}`,`${this.LEFT_TABLE}.id`,`${this.RIGTH_TABLE}.id_product`)
            .where({id_user: id})
            .from(this.RIGTH_TABLE)
        BaseDatabase.destroyConnection()
        
        return result
    }
}