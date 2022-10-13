import { ShoppingListInput } from './../model/shoppingList';
import { deleteProductInput, productsInput, editProductInput } from './../model/product';
import { IAuthenticator, IHashManager, IGenerateId, ICheckDatas } from './../business/ports';
import { ProductBusiness } from "../business/productBusiness";
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hashManager';
import { GeneratorID } from '../services/generatorID';
import { Response, Request } from 'express';
import { EmptyFields, NoLog } from '../error/customError';
import { CheckData } from '../services/checkDatas';

const authenticator:IAuthenticator = new Authenticator 
const hashManager:IHashManager = new HashManager
const generateID:IGenerateId = new GeneratorID
const checkData: ICheckDatas = new CheckData
const productBusiness = new ProductBusiness(generateID, authenticator, hashManager, checkData)

export class ProductController {
    public async insertProduct(req:Request, res:Response):Promise<void>{
        try {
            const { id, name, price, qtyStock } = req.body
            const token = req.headers.authorization 

            if( !id || !name || !price || !qtyStock ) throw new EmptyFields
            if(!token) throw new NoLog
            
            const input:productsInput = {
                idProduct: id,
                name,
                price,
                quantityStock: qtyStock,
                token: token as string
            }

            await productBusiness.insertProduct(input)

            res.status(200).send({message: "product inserted"})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }
    public async getAllProducts(req:Request, res:Response):Promise<void>{
        try {
            const products = await productBusiness.getAllProducts()

            res.status(200).send({products})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }

    public async purchaseShoppingList(req:Request, res:Response){
        try {
            const { productId, quantity } = req.body
            const token = req.headers.authorization 

            if( !productId || !quantity ) throw new EmptyFields
            if(!token) throw new NoLog
            
            const input:ShoppingListInput = {
                productId,
                quantity,
                token: token as string
            }

            await productBusiness.purchaseShoppingList(input)

            res.status(200).send({message: "purchase made"})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }
    
    public async changeQty(req:Request, res:Response){
        try {
            const { quantityStock, id } = req.body
            const token = req.headers.authorization

            if(!token) throw new NoLog
            if(!id || !quantityStock) throw new EmptyFields

            const input:editProductInput = {
                id,
                qty: quantityStock,
                token
            }

            await productBusiness.changeQty(input)

            res.status(200).send({message: "edit with sucess"})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }

    public async deleteProduct(req:Request, res:Response){
        try {
            const id  = req.params.id
            const token = req.headers.authorization

            if(!id) throw new EmptyFields
            if(!token) throw new NoLog

            const input:deleteProductInput = {
                id,
                token
            }

            await productBusiness.deleteProduct(input)

            res.status(200).send({message: "product deleted"})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }



}