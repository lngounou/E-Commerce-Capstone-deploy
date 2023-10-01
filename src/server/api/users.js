const express = require('express');
const usersRouter = express.Router();
const { authenticateToken } = require('./utils.js');

const {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers
} = require('../db');

const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.header('Authorization');
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: Missing token' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Forbidden: Invalid token' });
//         }

//         req.user = user;
//         next();
//     });
// }

usersRouter.get('/protected', authenticateToken, (req, res) => {
    const user = req.user;
    res.json({ message: 'This is a protected route', user });
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({ email, password });
        if (user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        const _user = await getUserByEmail(email);

        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = usersRouter;