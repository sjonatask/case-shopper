import React from "react";
import { ProductList, RowList } from "./styles";

const ProductsRow = (props) => {
    const handleAddCart = () => {
        const item = {
            id: props.id,
            price: props.price,
            name: props.name
        }
        props.addProductToCart(item)
    }

    return(
        <ProductList>
            <RowList>
                <p>{props.name.toLowerCase()}</p>
                <br></br>
                <p>R${props.price}</p>    
                <p>Disponivel: {props.qtyStock}</p>
                <button onClick={handleAddCart}>
                    Adcionar
                </button>
            </RowList>
        </ProductList>
    )
}

export default ProductsRow