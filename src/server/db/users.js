const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name='first last', email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user ] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        return user;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        throw new Error('Email and password are required.');
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) {
            throw new Error('User not found.');
        }
        const passwordsMatch = await bcrypt.compare(password, user.password);
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
        const { rows: [ user ] } = await db.query(`
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
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers
};