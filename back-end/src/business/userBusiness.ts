import { ShoppingListDTO } from './../model/shoppingList';
import { UserDataBase } from "../data/userDataBase";
import { 
    CustomError,
    InvalidEmail,
    InvalidPassword,
    InvalidToken,
    PasswordWrong
} from './../error/customError';
import {
    UserInput,
    User,
    UserLogin
} from "../model/user";
import {
    IAuthenticator,
    ICheckDatas,
    IGenerateId,
    IHashManager
} from "./ports";
import { ShoppingListInput } from "../model/shoppingList";

const userDB = new UserDataBase()

export class UserBusiness {
    constructor(
        private generatorID: IGenerateId,
        private authenticator: IAuthenticator,
        private hashManager: IHashManager,
        private checkData: ICheckDatas
    ) { }

    public async signup(user: UserInput): Promise<void> {
        if (!user.email.includes("@")) throw new InvalidEmail()
        if (user.password.length < 8) throw new InvalidPassword()

        const role = User.stringToUserRole(user.role)
        const toModel = {
            id: this.generatorID.generate(),
            name: user.name,
            email: user.email,
            password: await this.hashManager.hash(user.password),
            role
        }
        const input = User.toUserModel(toModel)      

        await userDB.signup(input)
    }

    public async login(user:UserLogin):Promise<string>{
        if (!user.email.includes("@")) throw new InvalidEmail()

        const checkEmail = await userDB.getUserByEmail(user.email)
        if(!checkEmail) throw new InvalidEmail()

        const checkUser = User.toUserModel(checkEmail)

        const checkPassword = await this.hashManager.compare(user.password, checkUser.getPassword())
        if(!checkPassword) throw new PasswordWrong()

        const token = this.authenticator.generateToken({id: checkUser.getId(), role: checkUser.getRole()})
        
        return token
    }
}