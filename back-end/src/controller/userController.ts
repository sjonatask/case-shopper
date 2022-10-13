import { Request, Response } from "express";
import { UserBusiness } from './../business/userBusiness';
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hashManager';
import { GeneratorID } from '../services/generatorID';
import {
    IAuthenticator,
    IHashManager,
    IGenerateId,
    ICheckDatas
} from './../business/ports';
import { EmptyFields, NoLog } from '../error/customError';
import { UserInput, UserLogin } from '../model/user';
import { CheckData } from '../services/checkDatas';

const authenticator:IAuthenticator = new Authenticator 
const hashManager:IHashManager = new HashManager
const generateID:IGenerateId = new GeneratorID
const checkData: ICheckDatas = new CheckData
const userBusiness = new UserBusiness(generateID, authenticator, hashManager, checkData)

export class UserController{
    public async signup(req:Request, res:Response){
        try {
            const { name, email, password, role } = req.body
            if(!name || !email || !password) throw new EmptyFields
            
            const input:UserInput = {
                email,
                password,
                name,
                role
            }
            
            await userBusiness.signup(input)
            res.status(201).send({message: "signup with sucess"})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }

    public async login(req:Request, res:Response){
        try {
            const { email, password } = req.body
            if(!email || !password) throw new EmptyFields
            
            const input:UserLogin = {
                email,
                password
            }

            const token = await userBusiness.login(input)

            res.status(200).send({message: "login with sucess", token})
        } catch (error:any) {
            res.status(error.code).send({error: error.message || error.sqlMessage})
        }
    }
    
    public async getShoppingList(req:Request, res:Response){
        try {
            const token = req.headers.authorization

            if(!token) throw new NoLog

            const list = await userBusiness.getShoppingList(token)
            res.status(200).send({list})
        } catch (error:any) {
            res.status(500).send({error: error.message || error.sqlMessage})
        }
    }
}