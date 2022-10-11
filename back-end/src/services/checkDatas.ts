import { ICheckDatas } from '../business/ports';
import { UserDataBase } from '../data/userDataBase';
import { ProductDataBase } from './../data/productDataBase';

export class CheckData implements ICheckDatas {
    public async checkProductId(productId:string):Promise<boolean>{
        const idFromData = await new ProductDataBase().getProductById(productId)
        
        if(!idFromData) return false
        
        return true
    }

    public async checkUserId(userId:string):Promise<boolean>{
        const idFromData = await new UserDataBase().getUserById(userId)

        if(!idFromData) return false
        
        return true
    }
}
  