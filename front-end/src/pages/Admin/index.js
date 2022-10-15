import {React, useState, useEffect} from "react";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { ContainerComponents, ProductCards } from "../Home/styles";
import ProductsRowAdmin from "../../components/ProductsRowAdmin";
import EditProductInput from "../../components/EditProductInput";


const Admin = () => {
    const [products, setProducts] = useState([])
    const [editProductStock, setEditProductStock] = useState(undefined)

    useEffect(() => {
        executeRequestGetAllProducts()
    }, [])

    const editProduct = (product) => {
        const productWhoEdit = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        setEditProductStock(productWhoEdit)
    }

    const executeRequestGetAllProducts = async () => {
        await axios
            .get(`${BASE_URL}/product`)
            .then((response) => {
                setProducts(response.data.products)
            })
            .catch((error) => console.log(error.message))
    }

    const executeRequestDeleteProduct = (productID) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: token
            }
        }
        axios
            .delete(`${BASE_URL}/product/delete/${productID}`,config)
            .then((res) => {alert("produto deletado do banco dados")})
            .catch((error) => {alert(error.response.data.error)})
    }

    const executeRequestEditProduct = (product) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: token
            }
        }
        const body = {
            id: product.id,
            quantityStock: product.newQuantity
        }

        axios
            .put(`${BASE_URL}/product/edit`,body,config)
            .then((res) => {alert("Estoque atualizado")})
            .catch((error) => {alert(error.response.data.error)})

        setEditProductStock(undefined)
    }

    return(<>
        <ContainerComponents>
            <ProductCards>
                {products &&
                    products.map(e => 
                        <ProductsRowAdmin
                            id={e.id}
                            name={e.name}
                            price={e.price}
                            qtyStock={e.quantityStock}
                            key={e.id}
                            deleteProduct={executeRequestDeleteProduct}
                            editProduct={editProduct}
                        />
                    )
                }
            </ProductCards>
            {editProductStock &&
                <EditProductInput
                    product={editProductStock}
                    editProductStock={executeRequestEditProduct}
                />
            }
        </ContainerComponents>
    </>
    )
}

export default Admin