const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  database: 'commerce',
  port: 5432,
});


const createCart = async (userId) => {
  const query = {
    text: 'INSERT INTO shopping_carts(user_id) VALUES($1) RETURNING *',
    values: [userId],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const createCartItems = async (cartId, productId, quantity) => {
    try {
      await pool.query(`
        INSERT INTO cart_items(cart_id, product_id, quantity)
        VALUES($1, $2, $3)`, [cartId, productId, quantity]);
    } catch (err) {
      console.error('Error creating cart item:', err);
      throw err;
    }
  };


const getCart = async (userId) => {
  const query = {
    text: 'SELECT * FROM carts WHERE user_id = $1',
    values: [userId],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


const addToCart = async (userId, productId, quantity) => {
  const query = {
    text: 'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES((SELECT id FROM carts WHERE user_id = $1), $2, $3)',
    values: [userId, productId, quantity],
  };

  try {
    await pool.query(query);
  } catch (error) {
    throw error;
  }
};


const removeFromCart = async (userId, productId) => {
  const query = {
    text: 'DELETE FROM cart_items WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1) AND product_id = $2',
    values: [userId, productId],
  };

  try {
    await pool.query(query);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCart,
  createCartItems,
  getCart,
  addToCart,
  removeFromCart,
};