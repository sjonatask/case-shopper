export class Products{
    constructor(
    private id: string,
    private name: string,
    private price: number,
    private quantityStock: number
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

    getQuantityStock(){
        return this.quantityStock;
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

    setQuantityStock(quantityStock: number){
        this.quantityStock = quantityStock;
    }

    static toProductModel(product: any): Products {
        return new Products(product.id, product.name, product.price ,product.qtyStock);
    }

    static toProductModelOutput(product: any): Products {
        return new Products(product.id, product.name, product.price ,product.quantity_stock);
    }
}

export class ChangeStock{
    constructor(
        private productID: string,
        private quantity: number
    ){ }

    getProductID(){
        return this.productID
    }
    
    getQuantity(){
        return this.quantity
    }

    setProdudctID(productID: string){
        this.productID = productID
    }

    setQuantity(quantityBuy: number){
        this.quantity = quantityBuy
    }

    static toChangeStockModel(product: any): ChangeStock{
        return new ChangeStock(product.id, product.qty)
    }
}


export interface productsInput {
    idProduct: string
    name: string
    price: number
    quantityStock: number
    token: string
}


export interface editProductInput {
    id: string,
    qty: number,
    token: string
}

export interface deleteProductInput{
    id: string;
    token: string;
}