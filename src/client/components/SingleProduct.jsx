
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default function SingleProduct() {

    const [product, setProduct] = useState([]);
    const auth = sessionStorage.getItem('token');
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSingleProduct() {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`)
                const result = await response.json();
                setProduct(result);
                return result
            } catch (error) {
                console.error(error);
              }
            }
            fetchSingleProduct();
        }, [])

        return (
            <div class='all-products-container'>
            <div key={productId} class='productcard'>
                <img src={product.img_url} alt="product image" width="300rem" />
                <h2>Product: {product.name}</h2>
                <h2>Description: {product.description}</h2>
                <h2>Price: {product.price}</h2>
                <button class='sleekbutton' onClick={() => {navigate(`/products`)}}>Back</button>
            </div>
            </div>
        )
}

// return (
//     <>
// {products ? 
// products.map((product) => { 
//     return ( <div key={product.id}>
//         <h2>Title: {product.name}</h2>
//         <h2>Description: {product.description}</h2>
//         <h2>Price: {product.price}</h2>
//     </div> )
// }) : null}
// </>
// )
