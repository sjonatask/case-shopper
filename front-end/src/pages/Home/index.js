import React, { useState, useEffect} from "react";
import ProductsRow from "../../components/ProductsRow";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { ProductCards, ContainerComponents } from "./styles";
import Cart from "../../components/Cart"
import Header from "../../components/Header";


const Home = () => {
    const [products, setProducts] = useState([])
    const [productsCart, setProductsCart] = useState([])
    const [totalValue, setTotalValue] = useState(0)

    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => {
        if(productsCart.length === 0) setTotalValue(0)
    }, [productsCart])

    const getAllProducts = async () => {
        await axios
            .get(`${BASE_URL}/product`)
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => console.log(error.message))
    }

    const addProductToCart = (product) => {
        const copyProductsCart = [...productsCart]

        const item = copyProductsCart.find(e => e.id === product.id);

        if(!item){
            copyProductsCart.push({
                id: product.id,
                qty: 1,
                price: product.price,
                name: product.name
            })
            addTotalValue(product.price)
        }else{
            item.qty += 1
            addTotalValue(item.price)
        }

        setProductsCart(copyProductsCart)
    }

    const removeProductToCart = (id) => {
        const copyProductsCart = [...productsCart]

        const item = copyProductsCart.find(e => e.id === id);

        if(item.qty > 1){
            item.qty -= 1
            setProductsCart(copyProductsCart)
            rmvTotalValue(item.price)
        }else{
            const arrayFiltred = copyProductsCart.filter(e => e.id !== id)
            setProductsCart(arrayFiltred)
            rmvTotalValue(item.price)
        }
       
    }

    const addTotalValue = (value) =>{
        setTotalValue(totalValue + value)
    }

    const rmvTotalValue = (value) =>{
        setTotalValue(totalValue - value)
    }

    const clearCart = () => {
        setProductsCart([])
        setTotalValue(0)
    }


    return(<>
        <Header/>
        <ContainerComponents>
            <ProductCards>
                {products &&
                    products.map(e => 
                        <ProductsRow
                            id={e.id}
                            name={e.name}
                            price={e.price}
                            qtyStock={e.quantityStock}
                            addProductToCart={addProductToCart}
                            key={e.id}
                        />
                    )
                }
            </ProductCards>
            <Cart 
              totalValue={totalValue}
              removeProductToCart={removeProductToCart}
              productCart={productsCart}
              clearCart={clearCart}
            />
        </ContainerComponents>
    </>
    )
}

export default Home