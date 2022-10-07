import * as bcrypt from "bcryptjs";
import { IHashManager } from "../business/ports";

export class HashManager implements IHashManager{
    public async hash(text: string): Promise<string> {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    public async compare(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }
}