import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// Get request to get all products
// this uses /api/products/ route
// public route

router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
}));


// GET request to get a Prodcut by ID
// this uses /api/products/:id route
// public route

router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }

  })
);


export default router