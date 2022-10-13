import { ProductDataBase } from '../data/productDataBase';
import { CustomError, EmptyFields, InvalidProductId, InvalidToken, UnauthorizedUser } from '../error/customError';
import { ShoppingListDTO, ShoppingListInput } from '../model/shoppingList';
import {
    ChangeStock,
    deleteProductInput,
    editProductInput,
    Products,
    productsInput
} from './../model/product';
import {
    IAuthenticator,
    ICheckDatas,
    IGenerateId,
    IHashManager
} from './ports';

const productDB = new ProductDataBase()

export class ProductBusiness {
    constructor(
        private generatorID: IGenerateId,
        private authenticator: IAuthenticator,
        private hashManager: IHashManager,
        private checkData: ICheckDatas
    ){ }

    public async insertProduct(product:productsInput):Promise<void>{
        if(product.price < 0) throw new CustomError("invalid price", 400)
        if(product.quantityStock < 0) throw new CustomError("invalid quantity stock", 400)
        
        const token = this.authenticator.getData(product.token)
        if(token.role !== "ADMIN") throw new UnauthorizedUser

        const toModel = {
            id: product.idProduct,
            name: product.name,
            price: product.price,
            qtyStock: product.quantityStock
        }       

        const input = Products.toProductModel(toModel)
        await productDB.insertProduct(input)
    }

    public async getAllProducts():Promise<Products[]>{
        const result = await productDB.getAllProducts()
        if(!result) throw new CustomError("Products not found", 404)
        
        let output = result.map(e => Products.toProductModelOutput(e))
        return output
    }

    public async purchaseShoppingList(input:ShoppingListInput):Promise<void>{
        const checkProductId = this.checkData.checkProductId(input.productId)
        if(!checkProductId) throw new InvalidProductId

        const user = this.authenticator.getData(input.token)
        const checkUserId = this.checkData.checkUserId(user.id)

        if(!checkUserId) throw new InvalidToken()

        const inputToData:ShoppingListDTO = {
            productId: input.productId,
            userId: user.id,
            quantity: input.quantity
        }

        await productDB.purchaseShoppingList(inputToData)
        // await this.checkData.changeQtyWhenBuy(input.productId, input.quantity)
    }
    
    public async changeQty(input:editProductInput):Promise<void>{
        const user = this.authenticator.getData(input.token)
        if(user.role !== "ADMIN") throw new UnauthorizedUser
    
        // const checkProductId = await this.checkData.checkProductId(input.id)
        // if(!checkProductId) throw new InvalidProductId
    
        const inputToModel = {
            id: input.id,
            qty: input.qty
        }
        
        const inputToData = ChangeStock.toChangeStockModel(inputToModel)
            
        const result = await productDB.changeQty(inputToData)
    }

    public async deleteProduct(input:deleteProductInput):Promise<void>{
        const { id, token } = input

        const user = this.authenticator.getData(token)
        if(user.role !== "ADMIN") throw new UnauthorizedUser

        // const checkProductId = await this.checkData.checkProductId(id)            
        // if(!checkProductId) throw new InvalidProductId()

        await productDB.deleteProductForeignKey(input.id)
        await productDB.deleteProduct(input.id)
    }
}