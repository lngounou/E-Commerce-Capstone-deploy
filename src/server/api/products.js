const express = require('express');
const productsRouter = express.Router();
const { requireAdmin } = require('.//utils.js')

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../db');

// GET all products
productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET a single product by ID
productsRouter.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});


productsRouter.post('/', requireAdmin, async (req, res, next) => {
  const { name, description, price, img_url } = req.body;
  try {
    const newProduct = await createProduct({ name, description, price, img_url });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});


productsRouter.put('/:productId', requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, price, img_url } = req.body;
  try {
    const updatedProduct = await updateProduct(productId, { name, description, price, img_url });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// DELETE a product by ID
productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;