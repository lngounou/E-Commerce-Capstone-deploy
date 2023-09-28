
import { useEffect, useState } from 'react'


export default function SingleProduct() {

    const [products, setProducts] = useState([]);
    const auth = sessionStorage.getItem('token');

//UPDATE URL BELOW where it says URL/products

    useEffect(() => {
        async function fetchSingleProduct() {
            try {
                const response = await fetch(`URL/products`)
                const result = await response.json();
                console.log(result);
                setProducts(result);
                return result
            } catch (error) {
                console.error(error);
              }
            }
            fetchSingleProduct();
        }, [])

//UPDATE PRODUCT KEYS BELOW BASED ON AVAILABLE FAKE DATA

        return (
            <>
        {products ? 
        products.map((product) => { 
            return ( <div key={product._id}>
                <h2>Title: {product.title}</h2>
                <h2>Description: {product.description}</h2>
                <h2>Price: {product.price}</h2>
                <h3>Location: {product.location}</h3>
                <h3>Delivery: {product.willDeliver}</h3>
            </div> )
        }) : null}
        </>
        )
}

//Incorporate the ID passing in the useNavigate