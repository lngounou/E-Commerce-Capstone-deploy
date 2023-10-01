
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const auth = sessionStorage.getItem('token');
    const navigate = useNavigate();

//UPDATE URL BELOW where it says URL/products

    useEffect(() => {
        async function fetchAllProducts() {
            try {
                const response = await fetch('http://localhost:3000/api/products/')
                const result = await response.json();
                console.log(result);
                setProducts(result);
                return result
            } catch (error) {
                console.error(error)
              }
            }
            fetchAllProducts();
        }, [])

        return (
            <>
        {products ? 
        products.map((product) => { 
            return ( <div key={product.id} style={{ cursor:"pointer" }}>
                <h2>Product: {product.name}</h2>
                <h2>Description: {product.description}</h2>
                <h2>Price: {product.price}</h2>
                <button onClick={() => {navigate(`/products/${product.id}`)}}></button>
            </div> )
        }) : null}
        </>
        )
}

//Incorporate the ID passing in the useNavigate