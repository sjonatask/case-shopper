import { ICheckDatas } from '../business/ports';
import { UserDataBase } from '../data/userDataBase';
import { ProductDataBase } from './../data/productDataBase';

export class CheckData implements ICheckDatas {
    public async checkProductId(id:string):Promise<boolean>{       
        const idFromData = await new ProductDataBase().getProductById(id)
        
        if(idFromData.length === 0) return false
        
        return true
    }

    public async checkUserId(userId:string):Promise<boolean>{
        const idFromData = await new UserDataBase().getUserById(userId)

        if(!idFromData) return false
        
        return true
    }

    public async checkEmail(email: string):Promise<boolean>{
        const emailFromData = await new UserDataBase().getUserByEmail(email)

        if(!emailFromData) return false

        return true
    }
}
  