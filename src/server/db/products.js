const { Pool } = require('pg');
const db = require('./client')

const pool = new Pool({
  user: process.env.USER || 'localhost',
  password: process.env.PASSWORD || 'password',
  host: 'localhost',
  database: 'commerce',
  port: 5432,
});

const createProduct = async (product) => {
  const { name, description, price, img_url } = product;
  const query = {
    text: 'INSERT INTO products(name, description, price, img_url) VALUES($1, $2, $3, $4) RETURNING *',
    values: [name, description, price, img_url],
  };

  try {
    const result = await db.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getProducts = async () => {
  try {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (productId, updatedProduct) => {
  const { name, description, price, img_url } = updatedProduct;
  const query = {
    text: 'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
    values: [name, description, price, img_url, productId],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};