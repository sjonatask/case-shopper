import React, { useState } from "react";
import { CartContainer } from './styles'
import ItemCart from '../ItemCart'

const Cart = (props) => {
    
    return(
        <CartContainer>
            <h2>Carrinho</h2>
            {props.productCart &&
                props.productCart.map(e => 
                    <ItemCart
                        id={e.id}
                        qty={e.qty}
                        name={e.name}
                        removeProductToCart={props.removeProductToCart}
                    />
                )
            }
            <p>Valor Total: R$ {props.totalValue}</p>
        </CartContainer>
    )
}

export default Cart