export interface IHashManager {
    hash: (text: string) => Promise<string>;
    compare: (text: string, hash: string) => Promise<boolean>;
}

export interface IAuthenticator {
    generateToken: (args: any) => string
    getData: (token: string) => any
}

export interface IGenerateId {
    generate: () => string
}

export interface ICheckDatas {
    checkProductId: (productId: string) => Promise<boolean>
    checkUserId: (productId: string) => Promise<boolean>
}