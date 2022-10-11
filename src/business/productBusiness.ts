import { ProductDataBase } from '../data/productDataBase';
import { CustomError, InvalidToken, UnauthorizedUser } from '../error/customError';
import { ShoppingListDTO, ShoppingListInput } from '../model/shoppingList';
import {
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
        if(!checkProductId) throw new CustomError("this id product not exist", 404)

        const user = this.authenticator.getData(input.token)
        const checkUserId = this.checkData.checkUserId(user.id)
        if(!checkUserId) throw new InvalidToken()

        const inputToData:ShoppingListDTO = {
            productId: input.productId,
            userId: user.id,
            quantity: input.quantity
        }

        await productDB.purchaseShoppingList(inputToData)
    }
}