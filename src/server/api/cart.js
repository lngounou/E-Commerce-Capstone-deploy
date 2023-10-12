const express = require('express');
const cartRouter = express.Router();
const { authenticateToken } = require('./utils');

const {
  createCart,
  getCart,
  addToCart,
  removeFromCart,
  getCartItemsForCart,
  editCartQuantity,
  checkOut
} = require('../db');

// POST a new cart for the authenticated user
cartRouter.post('/', authenticateToken, async (req, res, next) => {
  try {
    console.log("creating a cart...", req.user)
    const newCart = await createCart(req.user.id);
    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
});

// GET the cart for the authenticated user
cartRouter.get('/', authenticateToken, async (req, res, next) => {
  console.log("fetching car for user: ", req.user)
  try {
    const cart = await getCart(req.user.id);
    console.log("cart: ", cart)
    const cartItems = await getCartItemsForCart(cart.id);
    res.status(201).json({ cart: cart, data: cartItems });
  } catch (error) {
    next(error);
  }
});


cartRouter.post('/add', authenticateToken, async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    console.log("Addning to cart...", req.user)
    await addToCart(req.user.id, productId, quantity);
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    next(error);
  }
});


cartRouter.post('/remove', authenticateToken, async (req, res, next) => {
  const { id } = req.body;
  try {
    console.log("removing...", id)
    await removeFromCart(id);
    const cart = await getCart(req.user.id);
    console.log("cart: ", cart)
    console.log("fetching new cart...")

    const cartItems = await getCartItemsForCart(cart.id);
    res.status(201).json({ message: 'Item removed from cart', cart: cart, data: cartItems });
  } catch (error) {
    next(error);
  }
});


cartRouter.post('/checkout', authenticateToken, async (req, res, next) => {

  let result = checkOut(req.user.id)
  if (result)
    res.status(200).send({ message: 'Removed from cart', removed: true })
  else{

    res.status(200).send({ message: 'error removing from cart', removed: false })
    // next(error);
  }

});

cartRouter.post('/edit', authenticateToken, async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const userCart = await getCart(req.user.id);
    if (!userCart) {
      res.status(404).json({ message: 'User does not have a cart' });
      return;
    }

    await editCartQuantity(userCart.id, productId, quantity);

    const cartItems = await getCartItemsForCart(userCart.id);
    res.status(200).json({ message: 'Cart item quantity updated', data: cartItems });
  } catch (error) {
    next(error);
  }
});


module.exports = cartRouter;