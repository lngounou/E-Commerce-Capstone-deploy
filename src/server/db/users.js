const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER || 'localhost',
    password: process.env.PASSWORD || 'password',
    host: 'localhost',
    database: 'commerce',
    port: 5432,
  });

const createUser = async({ name='first last', email, password, isAdmin }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await pool.query(`
        INSERT INTO users(name, email, password, isAdmin)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword, isAdmin]);
        console.log("user data from createUser db", user)

        return user;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

const getUser = async({email, password}) => {
    //console.log("username and password:", password)
    if(!email || !password) {
        throw new Error('Email and password are required.');
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
       //user.isAdmin = user.isAdmin
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        console.log (password)
        if(!passwordsMatch) {
            throw new Error('Password does not match.');
        }
        delete user.password;
        return user;
    } catch (err) {
        console.error('Error authenticating user:', err);
        throw err;
    }
};

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await pool.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        return user;
    } catch (err) {
        console.error('Error getting user by email:', err);
        throw err;
    }
};

const getAllUsers = async () => {
    try {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        throw error;
    }
};
async function getUserById(userId) {
    try {
      const {
        rows: [user],
      } = await db.query(`
          SELECT id, name, email, password, isAdmin
          FROM users
          WHERE id=${userId}
        `)
  
      if (!user) {
        throw {
          name: 'UserNotFoundError',
          message: 'A user with that id does not exist',
        }
      }
  
      return user
    } catch (error) {
      throw error
    }
  }

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers,
    getUserById
};