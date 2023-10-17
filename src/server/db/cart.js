const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER || 'localhost',
  password: process.env.PASSWORD || 'password',
  host: 'localhost',
  database: 'commerce',
  port: 5432,
});


const createCart = async (userId) => {
  console.log("user : ",process.env.USER)
  console.log("PASSWORD : ",process.env.PASSWORD)
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
    text: 'SELECT * FROM shopping_carts WHERE user_id = $1',
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
  console.log("making connection...")
  const client = await pool.connect();
  console.log("Into adding product to cart item...")

  try {
    // Check if a cart exists for the user
    const checkCartQuery = {
      text: 'SELECT id FROM shopping_carts WHERE user_id = $1',
      values: [userId],
    };
    const cartResult = await client.query(checkCartQuery);
    console.log("user carts: ", cartResult.rows)
    if (cartResult.rows.length === 0) {
      // If no cart exists, create a new one for the user
      const createCartQuery = {
        text: 'INSERT INTO shopping_carts(user_id) VALUES($1) RETURNING id',
        values: [userId],
      };
      const cartInsertResult = await client.query(createCartQuery);
      const cartId = cartInsertResult.rows[0].id;

      // Add the product to the newly created cart


      //check if the cart item already exists 

      const checkCartItem = {
        text: 'select * from cart_items where product_id = $1 and cart_id = $2',
        values: [productId, cartId]
      }

      let cartItemMatchResult = await client.query(checkCartItem);
      console.log("cart Item by product ID result ", cartItemMatchResult.rows)
      if (cartItemMatchResult.rows.length !== 0) {
        let quantity = cartItemMatchResult.rows[0].quantity
        console.log("Product already exists in cart items ")
        await client.query({ text: 'update cart_items set quantity = $1 where product_id = $2', values: [quantity+1, productId] })
      }
      else {
        console.log("Product doesnt exists  in cart items")

        const insertCartItemQuery = {
          text: 'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1, $2, $3)',
          values: [cartId, productId, quantity],
        };
        await client.query(insertCartItemQuery);
      }



    } else {
      // If a cart exists, add the product to it

      const cartId = cartResult.rows[0].id;

      const checkCartItem = {
        text: 'select * from cart_items where product_id = $1 and cart_id = $2',
        values: [productId, cartId]
      }

      let cartItemMatchResult = await client.query(checkCartItem);
      console.log("cart Item by product ID result ", cartItemMatchResult.rows)
      if (cartItemMatchResult.rows.length !== 0) {
        let quantity = cartItemMatchResult.rows[0].quantity

        console.log("Product already exists in cart items ")
        await client.query({ text: 'update cart_items set quantity = $1 where product_id = $2', values: [quantity+1, productId] })
      }


      else {
        const insertCartItemQuery = {
          text: 'INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1, $2, $3)',
          values: [cartId, productId, quantity],
        };
        await client.query(insertCartItemQuery);
      }

    }

    // Commit the transaction
    await client.query('COMMIT');
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query('ROLLBACK');
    throw error;
  } finally {
    // Release the client back to the pool
    client.release();
  }
};

// Function to get cart items for a specific cart
const getCartItemsForCart = async (cartId) => {
  try {
    console.log("into getcartitems")
    // const client = await pool.connect();
    const query = {
      text: 'SELECT ci.id, ci.product_id, ci.quantity, p.name, p.description, p.price FROM cart_items ci INNER JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
      values: [cartId],
    };
    console.log("getting items...")
    const result = await pool.query(query);
    const cartItems = result.rows;
    // client.release(); // Release the client back to the pool
    return cartItems;
  } catch (error) {
    throw error;
  }
};


const removeFromCart = async (productId) => {
  console.log("removinf from cart")
  const query = {
    text: 'DELETE FROM cart_items WHERE id=$1',
    values: [productId],
  };

  try {
    console.log(query)
    await pool.query(query);
  } catch (error) {
    throw error;
  }
};

const editCartQuantity = async (cartId, productId, newQuantity) => {
  console.log({ cartId, productId, newQuantity })
  const query = {
    text: 'UPDATE cart_items SET quantity = $1 WHERE cart_id =  $2 AND product_id = $3',
    values: [newQuantity, cartId, productId],
  };
  try {
    console.log(query)
    await pool.query(query);
    console.log("edited successfully...")
  } catch (error) {
    throw error;
  }
};

const checkOut = async (userId) => {
  const query = {
    text: 'DELETE FROM cart_items WHERE cart_id = (SELECT id FROM shopping_carts WHERE user_id = $1)',
    values: [userId],
  };
  try {
    await pool.query(query);
    return true;
  } catch (error) {
    return false
  }
}

module.exports = {
  createCart,
  createCartItems,
  getCart,
  addToCart,
  removeFromCart,
  getCartItemsForCart,
  editCartQuantity,
  checkOut
};