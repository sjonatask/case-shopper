import { User } from "../model/user";
import { BaseDatabase } from "./baseDataBase";

export class UserDataBase extends BaseDatabase{
    private TABLE_NAME = "user_shopper"

    public async signup(user:User):Promise<void>{
        this.getConnection()
            .insert({
                id: user.getId,
                name: user.getName,
                email: user.getEmail,
                password: user.getPassword,
                role: user.setRole
            })
            .into(this.TABLE_NAME)
            
        BaseDatabase.destroyConnection()
    }
}