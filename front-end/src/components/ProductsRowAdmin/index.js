import React from "react";
import { ProductList, RowList } from "./styles";

const ProductsRowAdmin = (props) => {
    const handleDeleteProduct = () => {
        const productID = props.id
        props.deleteProduct(productID)
    }
    const handleEditProduct = () => {
        const product = {
            id: props.id,
            name: props.name,
            price: props.price
        }
        props.editProduct(product)
    }

    return(
        <ProductList>
            <RowList>
                <p>{props.name.toLowerCase()}</p>
                <br></br>
                <p>R${props.price}</p>    
                <p>Disponivel: {props.qtyStock}</p>
                <button onClick={handleDeleteProduct}>
                    Deletar Produto
                </button>
                <button onClick={handleEditProduct}>
                    Editar Estoque
                </button>
            </RowList>
        </ProductList>
    )
}

export default ProductsRowAdmin