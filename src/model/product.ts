export class Products{
    constructor(
    private id: string,
    private name: string,
    private quantity: number,
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getQuantity(){
        return this.quantity;
    }


    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setQuantity(quantity: number){
        this.quantity = quantity;
    }

    static toProductModel(product: any): Products {
        return new Products(product.id, product.name, product.quantity);
    }
}

export interface productsInput {
    idProduct: string
    idUser: string
    quantity: number
}