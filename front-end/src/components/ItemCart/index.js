import React from "react";
import { Item } from "./styles";

const ItemCart = (props) => {
    const handleRemoveCart = () => {
        props.removeProductToCart(props.id)
    }

    return(
        <Item>
            <p>
                {props.qty}
            </p>
            <p>
                {props.name}
            </p>
            <button onClick={handleRemoveCart}>Remover</button>
        </Item>
    )
}

export default ItemCart