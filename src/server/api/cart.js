const express = require('express');
const cartRouter = express.Router();


const {
  createCart,
  getCart,
  addToCart,
  removeFromCart,
} = require('../db');

// POST a new cart for the authenticated user
cartRouter.post('/', authenticateToken, async (req, res, next) => {
  try {
    const newCart = await createCart(req.user.id);
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

// GET the cart for the authenticated user
cartRouter.get('/', authenticateToken, async (req, res, next) => {
  try {
    const cart = await getCart(req.user.id); 
  } catch (error) {
    next(error);
  }
});


cartRouter.post('/add', authenticateToken, async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    await addToCart(req.user.id, productId, quantity); 
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    next(error);
  }
});


cartRouter.post('/remove', authenticateToken, async (req, res, next) => {
  const { productId } = req.body;
  try {
    await removeFromCart(req.user.id, productId); 
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;