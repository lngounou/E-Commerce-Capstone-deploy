import React, { useState } from 'react';
import AuthHoc from './AuthHOC';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        console.log('Product added successfully');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AuthHoc(AddProduct);
