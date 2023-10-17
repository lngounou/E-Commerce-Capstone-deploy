
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHoc from './AuthHOC';

export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const auth = sessionStorage.getItem('token');
    const navigate = useNavigate();

const sortProducts = () => {
    const sortedProducts = [...products];
    if (sortCriteria === 'name' && sortDirection === 'asc') {
        sortedProducts.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase(); 
            return sortDirection === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
    } else if (sortCriteria === 'price') {
        sortedProducts.sort((a, b) => {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        });
    }
    setProducts(sortedProducts);
};

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
        }, [sortCriteria, sortDirection])

        return (
                <div className='goldfont'>
                    <br></br>
                    <label>Sort by:</label>
                    
                    <select onChange={(e) => setSortCriteria(e.target.value)}>
                        <option value = "name">Name</option>
                        <option value = "price">Price</option>
                    </select>
                    
                    <label>Sort direction:</label>
                    
                    <select onChange={(e) => setSortCriteria(e.target.value)}>
                        <option value = "asc">Ascending</option>
                        <option value = "desc">Descending</option>
                    </select>
                    
                    <button className='sleekbutton' onClick={sortProducts}>Sort</button>

                <div className = 'all-products-container homecontainer'>
                {products.map((product) => {
                    return ( <div key={product.id} style={{ cursor: 'pointer' }} className='productcard'>
                        <img src={product.img_url} alt="product image" width="300rem" />
                        <h2>Product: {product.name}</h2>
                        <h2>Description: {product.description}</h2>
                        <h2>Price: {product.price}</h2>
                        <button class='sleekbutton productbutton' onClick={() => {navigate(`/products/${product.id}`)}}>Product Details</button>
                    </div> )})}
                    </div>
                </div>
                )
                }

                // return (
                //     <div class='all-products-container homecontainer'>
                // {products ? 
                // products.map((product) => { 
                //     return ( <div key={product.id} style={{ cursor:"pointer" }} class='productcard' onClick={() => {navigate(`/products/${product.id}`)}}>
                //         <img src={product.img_url} alt="product image" width="300rem" />
                //         <h2>Product: {product.name}</h2>
                //         <h2>Description: {product.description}</h2>
                //         <h2>Price: {product.price}</h2>
                //         <button class='sleekbutton productbutton' onClick={() => {navigate(`/products/${product.id}`)}}>Product Details</button>
                //     </div> )
                // }) : null}
                // </div>
                // )

