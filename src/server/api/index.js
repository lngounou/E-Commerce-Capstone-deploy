const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');

const volleyball = require('volleyball')
apiRouter.use(volleyball)
var cors = require('cors')
apiRouter.use(cors());

apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } 
  else if (auth.startsWith('Bearer ')) {
    const token = auth.substring(7);
    
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      next(error);
    }
  } 
  else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer '`
    });
  }
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
  });

module.exports = apiRouter;