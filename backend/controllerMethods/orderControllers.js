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
      orderItems, 
      user: req.user._id,
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

  if (order) {
    res.json(order) 
  } else {
    res.status(404)
    throw new Error('Order was not found. Please try again')
  } 
});

//update our order to paid once paid:
// get/db/orders/:id/pay
// private

const orderPaidUpdate = asyncHandler(async(req,res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedOrder = await order.save()

    res.json(updatedOrder)

  } else {
    res.status(404);
    throw new Error('Error in getting payment details. Please and try again');
  }

})

//get user specific orders
// get/db/orders/userorders
// private
  
const getUserOrders = asyncHandler(async(req,res) => {
  const orders = await Order.find({ user: req.user._id});
  res.json(orders)
})

// GET all orders for admin list:
// get/db/orders
// privata/admin

const adminOrdersList = asyncHandler(async(req,res) => {
  const orders = await Order.find({}).populate('user', 'id name')

  res.json(orders)
})

export {
  orderDetails,
  getOrderDetailsId,
  orderPaidUpdate, 
  getUserOrders,
  adminOrdersList
}