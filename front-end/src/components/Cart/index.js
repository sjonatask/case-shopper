import React from "react";
import { CartContainer, ButtonContainer } from './styles'
import ItemCart from '../ItemCart'
import axios from "axios";
import { BASE_URL } from "../../constants/urls";

const Cart = (props) => {
    const executeRequest = () => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: token
            }
        }
        props.productCart.map((e) => {
            const body = {
                productId: e.id,
                quantity: e.qty
            }
            axios
                .post(`${BASE_URL}/product/purchase`, body, config)
                .then((res) => {alert("compra realizada")})
                .catch((error) => {alert(error.response.data.error)})
        })

        props.clearCart()
    }


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
            <ButtonContainer>
                <button onClick={props.clearCart}>Limpar Carrinho</button>
                <button onClick={executeRequest}>Finalizar Compra</button>
            </ButtonContainer>
        </CartContainer>
    )
}

export default Cart