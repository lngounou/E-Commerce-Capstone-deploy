
import { useEffect, useState } from 'react'


export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const auth = sessionStorage.getItem('token');

//UPDATE URL BELOW where it says URL/products

    useEffect(() => {
        async function fetchAllProducts() {
            try {
                const response = await fetch('http://localhost:3000/api/products/')
                const result = await response.json();
                setProducts(result);
                return result
            } catch (error) {
                console.error(error)
              }
            }
            fetchAllProducts();
        }, [])

//UPDATE PRODUCT KEYS BELOW BASED ON AVAILABLE FAKE DATA

        return (
            <>
        {products ? 
        products.map((product) => { 
            return ( <div key={product._id}>
                <h2>Title: {product.name}</h2>
                <h2>Description: {product.description}</h2>
                <h2>Price: {product.price}</h2>
            </div> )
        }) : null}
        </>
        )
}

//Incorporate the ID passing in the useNavigate