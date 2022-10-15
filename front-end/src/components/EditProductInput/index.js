import React, { useEffect, useState } from "react";
import { EditContainer } from "./styles";

const EditProductInput = (props) => {
    const [product, setProduct] = useState(undefined)
    const [productStock, setProductStock] = useState(undefined)

    useEffect(() => {
        setProduct(props.product)
    }, [props.product])

    const onChangeStock = ({target}) => {
        setProductStock(target.value)
    }

    const handleEditProductStock = () => {
        const productEdit = {
            id: product.id,
            newQuantity: productStock
        }

        props.editProductStock(productEdit)
    }

    return(<>
           {product && 
            <EditContainer>
                <p>{product.name}</p>
                <p>R$ {product.price}</p>
                <p>Estoque: <input type={"number"} onChange={onChangeStock}/></p>
                <button onClick={handleEditProductStock}>Confirmar</button>
            </EditContainer>
            }
        </>
    )
}

export default EditProductInput