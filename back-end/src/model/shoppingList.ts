export class ShoppingList{
    constructor(
    private id: string,
    private name: string,
    private price: number,
    private quantity: number
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getPrice(){
        return this.price
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
    
    setPrice(price: number){
        this.price = price;
    }
    
    setQuantity(quantity: number){
        this.quantity = quantity;
    }


    static toProductModel(product: any): ShoppingList {
        return new ShoppingList(product.id, product.name, product.price ,product.quantity);
    }
}

export interface ShoppingListDTO {
    productId: string,
    userId: string,
    quantity: number
}

export interface ShoppingListInput {
    productId: string,
    token: string,
    quantity: number
}