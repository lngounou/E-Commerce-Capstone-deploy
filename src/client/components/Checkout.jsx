import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHoc from './AuthHOC';

const Checkout = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [additionalCharges, setAdditionalCharges] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCartData = async () => {
            console.log("fetcing cart data")
            try {
                const response = await fetch('http://localhost:3000/api/cart', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });
                console.log("fetched..")

                if (response.ok) {
                    const cartData = await response.json();
                    console.log("cartData : ", cartData)
                    setCart(cartData.data);
                    let tPrice = 0;
                    await cartData.data.map(item => {
                        tPrice += item.price * item.quantity
                    })
                    setTotalPrice(tPrice);
                }
            } catch (error) {
                console.log("error fetcig cart data")
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartData();
    }, []);

    const handleFinishClick = () => {
        fetch('http://localhost:3000/api/cart/checkout',{
            method:'POST',
            headers:{
          'Content-Type': 'application/json',
            Authorization:`Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.removed){
                alert("checked out successfully")
                navigate('/products');
            }
            else{
                alert("Error checking out try again...")
            }
        })
    };

    return (
        <div>
            <h1>Checkout</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>${item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <div>
                    <strong>Subtotal:</strong> ${totalPrice}
                </div>
                <div>
                    <strong>Additional Charges:</strong> ${additionalCharges}
                </div>
                <div>
                    <strong>Total:</strong> ${additionalCharges+totalPrice}
                </div>
            </div>
            <button onClick={handleFinishClick}>Finish</button>
        </div>
    );
};

export default AuthHoc(Checkout);

