const db = require('./client');
const { createUser } = require('./users');
const { createProduct } = require('./products');
const bcrypt = require('bcrypt');
// import { faker } from '@faker-js/faker';
const { faker } = require('@faker-js/faker');

const SALT_COUNT = 10;

const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    users.push(user);
  }
  return users;
};

const users = generateUsers(50);

const generateProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    const product = {
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
    };
    products.push(product);
  }
  return products
};

const products = generateProducts(30);

const dropTables = async () => {
    try {
        await db.query('DROP TABLE IF EXISTS users, products CASCADE');
    } catch(err) {
        console.error('Error dropping tables:', err);
    }
};

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          description TEXT,
          price DECIMAL(10, 2)
        );

        CREATE TABLE IF NOT EXISTS shopping_carts (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id),
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW(),
        );
      `);
    }
    catch(err) {
        console.log('Error creating tables:', err);
    }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, SALT_COUNT);
      await createUser({ name: user.name, email: user.email, password: hashedPassword });
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data for users:', error);
  }
};

const insertProducts = async () => {
  try {
    for (const product of products) {
      await createProduct(product);
    }
    console.log('Seed data for products inserted successfully. ');
  } catch (error) {
    console.error('Error inserting seed data for products:', error);
  }
};

const createShoppingCart = async (userId) => {
  try {
    const { rows: [cart] } = await db.query(`
      INSERT INTO shopping_carts(user_id)
      VALUES($1)
      RETURNING *`, [userId]);
    return cart;
  } catch (err) {
    console.error('Error creating shopping cart:', err);
    throw err;
  }
};

const createCartItems = async (cartId, productId, quantity) => {
  try {
    await db.query(`
      INSERT INTO cart_items(cart_id, product_id, quantity)
      VALUES($1, $2, $3)`, [cartId, productId, quantity]);
  } catch (err) {
    console.error('Error creating cart item:', err);
    throw err;
  }
};

const getRandomProductId = () => {
  return faker.commerce.productName();
};

const getRandomQuantity = () => {
  return faker.number.binary({ min: 1, max: 10 });
};

const seedDatabase = async () => {
  try {
      db.connect();
      await dropTables();
      await createTables();
      await insertUsers();
      await insertProducts();

  for (const user of users) {
    const cart = await createShoppingCart(user.id);
    for (let i = 0; i < 5; i++) {
      const randomProduct = getRandomProductId();
      const quantity = getRandomQuantity();
      await createCartItems(cart.id, randomProduct, quantity);
    }
  }

  console.log('Seed data inserted successfully.');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        db.end()
    }
};

seedDatabase();