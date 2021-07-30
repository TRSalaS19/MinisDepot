import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// create new order
// POST/db/orders
// private

const orderDetails = asyncHandler(async(req, res) => {
  const {
    orderItems, 
    shippingAddress, 
    paymentOption, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice
  } = req.body;

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No items in this order.')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems, 
      shippingAddress, 
      paymentOption, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
}) 

// get order by id 
// get/db/orders/:id
// private

const getOrderDetailsId = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  order ? res.json(order) : res.status(404); throw new Error('Order was not found. Please try again')

})

export {
  orderDetails,
  getOrderDetailsId
}