import { User } from "../model/user";
import { BaseDatabase } from "./baseDataBase";

export class UserDataBase extends BaseDatabase{
    private TABLE_NAME = "user_shopper"

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
        BaseDatabase.destroyConnection()
    }

    public async getUserByEmail(email:string):Promise<User>{
        const result = await this.getConnection()
            .select("*")
            .from(this.TABLE_NAME)
            .where({email})
        
        return result[0]
    }

    public async getUserById(id:string):Promise<any>{
        const result = await this.getConnection()
            .select("*")
            .from(this.TABLE_NAME)
            .where({id})
        
        return result
    }
}