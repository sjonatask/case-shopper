import { ICheckDatas } from '../business/ports';
import { UserDataBase } from '../data/userDataBase';
import { ChangeStock, Products } from '../model/product';
import { ProductDataBase } from './../data/productDataBase';

export class CheckData implements ICheckDatas {
    public async checkProductId(id:string):Promise<boolean>{       
        const idFromData = await new ProductDataBase().getProductById(id)
        
        if(!idFromData) return false
        
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

    public async changeQtyWhenBuy(id: string, quantityBuy:number):Promise<void>{
        const productDB = new ProductDataBase()

        const allProduct = await productDB.getAllProducts()
        let output = allProduct.map(e => Products.toProductModelOutput(e))

        const product = output.find(e => e.getId() === id)
        
        let inputToModel

        if(product?.getQuantityStock()){
            inputToModel = {
                id: id,
                qty: product?.getQuantityStock() - quantityBuy
            }
        }

        console.log(inputToModel);
        

        const model = ChangeStock.toChangeStockModel(inputToModel)

        await productDB.changeQty(model)
    }
}
  