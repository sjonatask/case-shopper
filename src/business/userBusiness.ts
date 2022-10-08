import { InvalidEmail, InvalidPassword } from './../error/customError';
import { UserDataBase } from "../data/userDataBase";
import { 
    UserInput,
    User
} from "../model/user";
import {
    IAuthenticator,
    IGenerateId,
    IHashManager
} from "./ports";

const userDB = new UserDataBase()

export class UserBusiness {
    constructor(
        private generatorID: IGenerateId,
        private authenticator: IAuthenticator,
        private hashManager: IHashManager
    ){ }
    
    public async signup(user:UserInput):Promise<void>{
        if(!user.email.includes("@")) throw new InvalidEmail
        if(user.password.length < 8) throw new InvalidPassword
        
        const role = User.stringToUserRole(user.role)
        const toModel = {
            id: this.generatorID.generate(),
            name: user.name, 
            email: user.email,
            password: this.hashManager.hash(user.password),
            role
        }
        const input = User.toUserModel(toModel)
        
        await userDB.signup(input)
    }
}