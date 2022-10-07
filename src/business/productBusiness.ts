import { ProductDataBase } from '../data/productDataBase';
import { CustomError, UnauthorizedUser } from '../error/customError';
import {
    Products,
    productsInput
} from './../model/product';
import {
    IAuthenticator,
    IGenerateId,
    IHashManager
} from './ports';

const productDB = new ProductDataBase()

export class ProductBusiness {
    constructor(
        private generatorID: IGenerateId,
        private authenticator: IAuthenticator,
        private hashManager: IHashManager
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
}