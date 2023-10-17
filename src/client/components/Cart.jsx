// Cart.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthHoc from './AuthHOC';

const Cart = () => {
  const [cartId, setCartId] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch the user's cart data from the backend when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      console.log("fetcing cart data")
      try {
        // Fetch the user's cart using the '/api/cart' endpoint
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

  async function addToCart(productId) {
    try {
      // Add a product to the cart using the '/api/cart/add' endpoint
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
        setCart(cartData.products);
        setTotalPrice(cartData.totalPrice);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const editCartQuantity = async (productId, newQuantity) => {
    try {
      // Edit the cart quantity using the '/api/cart/edit' endpoint
      const response = await fetch('http://localhost:3000/api/cart/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      if (response.ok) {
        // Refresh the cart data after editing the quantity
        const cartData = await response.json();
        console.log(cartData)
        setCart(cartData.data);
        let tPrice = 0;
        await cartData.data.map(item => {
          tPrice += item.price * item.quantity
        })
        setTotalPrice(tPrice);
      }
    } catch (error) {
      console.error('Error editing cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      // Remove a product from the cart using the '/api/cart/remove' endpoint
      console.log("maling remove request ",id)
      const response = await fetch('http://localhost:3000/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({ id }),
      });
      console.log("maling remove repsonse",response)

      if (response.ok) {
        // Refresh the cart data after removing a product
        const cartData = await response.json();
        console.log(cartData)
        setCart(cartData.data);
        let tPrice = 0;
        await cartData.data.map(item => {
          tPrice += item.price * item.quantity
        })
        setTotalPrice(tPrice);
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <div>
      <h2 className='goldfont'>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className='Product'>
            {item.name} - Quantity: {item.quantity}
            <button className='sleekbutton slightmargin' onClick={() => editCartQuantity(item.product_id, item.quantity + 1)}>+</button>
            <button className='sleekbutton slightmargin' onClick={() => editCartQuantity(item.product_id, item.quantity - 1)}>-</button>
            <button className='sleekbutton slightmargin' onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2 className='goldfont'>Total Price: ${totalPrice}</h2>
      {
        totalPrice !== 0 ?
          <Link to="/checkout">Checkout</Link>
          : null
      }
    </div>
  );
};

export default AuthHoc(Cart);
