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

// Create new product from admin page
// POST/db/products
// private/admin
const adminCreateProduct = asyncHandler(async(req, res) => {
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: '/images/',
    brand: 'Sample Brand',
    unitsAvailable: 0,
    numReviews: 0,
    description: 'Sample Details'
  })

  const adminCreatedProduct = await product.save()
  res.status(201).json(adminCreatedProduct)
});

// Update a prodoct from admin page
// PUT/db/products/:id
// private/admin
const adminUpdateProduct = asyncHandler(async(req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    unitsAvailable,
  } = req.body;

  const product = await Product.findById(req.params.id)

  if(product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.unitsAvailable = unitsAvailable

    const adminUpdatedProduct = await product.save();
    res.status(201).json(adminUpdatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not updated. Please try again');
  }
})

export { 
  getAllProducts, 
  getProductById,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct
}