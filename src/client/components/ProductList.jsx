import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import ProductsAuth from './ProductsAuth'



export default function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const auth = sessionStorage.getItem('token');
    const { productId } = useParams();


    useEffect(() => {
        // Fetch products and set state
        async function fetchProducts() {
            try {
                const response = await fetch("http://localhost:3000/api/products/");
                const result = await response.json();
                setProducts(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchProducts();
    }, []);

    async function handleDelete(id) {
        try {
            await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
            }});
            setProducts(products.filter(product => product.id !== id));
            toast("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            toast("An error occurred while deleting the product.");
        }
    }

    function handleEdit(id) {
        navigate(`/edit-product/${id}`);
    }

    return (
        <div>
            <h1>Product List</h1>
            {products.map(product => (
                <div key={product.id}>
                    <img src={product.img_url} alt="product image" width="300rem" />
                    <h2>{product.name}</h2>
                    <h2>{product.description}</h2>
                    <h2>{product.price}</h2>
                    <button onClick={() => handleEdit(product.id)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
