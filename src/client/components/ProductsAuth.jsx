
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHoc from './AuthHOC';
import Cart from './Cart';

export default function AuthProducts({users}) {

    const [products, setProducts] = useState([]);
    const auth = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'

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
    useEffect (() => {
   
        console.log(users)
    }, [users])
    async function addToCart(productId) {
        try {
            // Add a product to the cart using the '/api/cart/add' endpoint
            console.log("productId" + productId)
            const response = await fetch('http://localhost:3000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({ productId, quantity: 1 }), // You can adjust the quantity as needed
            });

            if (response.ok) {

                // Refresh the cart data after adding a product
                const cartData = await response.json();
                console.log("ImInCart")
                // setCart(cartData.products);
                // setTotalPrice(cartData.totalPrice);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
console.log(users)
    return (
        <div class='all-products-container homecontainer'>
            {products ?
                products.map((product) => {
                    return (
                        <div key={product.id} style={{ cursor: "pointer" }} class='productcard'  >
                            <img src={product.img_url} alt="product image" width="300rem" />
                            <h2>Product: {product.name}</h2>
                            <h2>Description: {product.description}</h2>
                            <h2>Price: {product.price}</h2>
                            <button class='sleekbutton productbutton' onClick={() => { navigate(`/products/${product.id}`) }}>Product Details</button>
                           <button class='sleekbutton productbutton' onClick={() => { addToCart(product.id) }}>Add To Cart</button>
                           {isAdmin ? <button class='sleekbutton productbutton' onClick={() => { handleEdit(product.id) }}>Edit</button>: null}
                         {isAdmin ?  <button class='sleekbutton productbutton' onClick={() => { handleDelete(product.id) }} >Delete</button>: null}
                        </div>)
                }) : (<p>loadingProducts</p>)}
        </div>
    )
}
