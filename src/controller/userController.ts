import { UserBusiness } from './../business/userBusiness';
import { Request, Response } from "express";
import { Authenticator } from '../services/authenticator';
import { HashManager } from '../services/hashManager';
import { GeneratorID } from '../services/generatorID';
import {
    IAuthenticator,
    IHashManager,
    IGenerateId
} from './../business/ports';
import {
    EmptyFields
} from '../error/customError';
import { UserInput } from '../model/user';

const authenticator:IAuthenticator = new Authenticator 
const hashManager:IHashManager = new HashManager
const generateID:IGenerateId = new GeneratorID
const userBusiness = new UserBusiness(generateID, authenticator, hashManager)

export class UserController{
    public async signup(req:Request, res:Response){
        try {
            const { name, email, password, role } = req.body
            if(!name || !email || !password || !role) throw new EmptyFields
            
            const input:UserInput = {
                email,
                password,
                name,
                role
            }
            
            userBusiness.signup(input)

            res.status(200).send({message: "signup with sucess"})
        } catch (error:any) {
            res.status(error.code).send({error: error.message || error.sqlMessage})
        }
    }
}