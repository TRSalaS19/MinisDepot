import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// Get request to get all products
// this uses /db/products/ route
// public route

const getAllProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({})

  res.json(products)
})


// GET request to get a Prodcut by ID
// this uses /db/products/:id route
// public route

const getProductById= asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)
  if(product){
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// DELETE product by id from AdminProductListPage.js
// /db/product/:id/delete
// private/admin

const adminDeleteProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id)

  if(product){
    await product.remove();
    res.json({message: `Product ${product.name} was deleted`});
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { 
  getAllProducts, 
  getProductById,
  adminDeleteProduct
}