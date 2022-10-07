import { productsInput } from './../model/product';
import { IAuthenticator, IHashManager, IGenerateId } from './../business/ports';
import { ProductBusiness } from "../business/productBusiness";
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hashManager';
import { GeneratorID } from '../services/generatorID';
import { Response, Request } from 'express';
import { EmptyFields, NoLog } from '../error/customError';

const authenticator:IAuthenticator = new Authenticator 
const hashManager:IHashManager = new HashManager
const generateID:IGenerateId = new GeneratorID
const productBusiness = new ProductBusiness(generateID, authenticator, hashManager)

export class ProductController {
    public async insertProduct(req:Request, res:Response):Promise<void>{
        try {
            const { id, name, price, qtyStock} = req.body
            const role = req.headers.authorization 

            if( !id || !name || !price || !qtyStock) throw new EmptyFields
            if(!role) throw new NoLog
            
            const input:productsInput = {
                idProduct: id,
                name,
                price,
                quantityStock: qtyStock,
                token: role as string
            }

            productBusiness.insertProduct(input)

            res.status(200).send({message: "product inserted"})
        } catch (error:any) {
            res.status(error.code).send({error: error.message || error.sqlMessage})
        }
    }
}