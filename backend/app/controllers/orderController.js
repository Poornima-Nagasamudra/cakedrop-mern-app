const Order = require('../models/Order')
const Product = require('../models/Product')

const orderController = {}

//  Get all orders (Admin only)
orderController.list = (req, res) => {
    Order.find().populate('user').populate('items.product')
       .then((orders) => {
          res.json(orders)
       })
       .catch((err) => {
          res.json(err)
       })
}

//  Create a new order
orderController.create = (req, res) => {
    const user = req.user._id;
    const {items} = req.body
      if(!items || items.length === 0){
        return res.status(400).json({error: 'Order must include items'})
      }

      let totalAmount = 0

      const productPromises = items.map(function(ele){ 
       Product.findById(ele.product)
         .then((product)=> {
            if(!product){
                throw new Error (`Product not found : ${ele.product}`)
            }

            const quantity = Number(ele.quantity)
            totalAmount = totalAmount + product.price * quantity
            return product
         })
      })

      Promise.all(productPromises)
        .then(() =>{
            const order = new Order({user, items, totalAmount})
            return order.save()
        })
        .then((savedOrder) => {
            res.status(201).json(savedOrder)
        })
        .catch((err) => {
            console.error('Create Order Error:', err.message);
            res.status(500).json({ error: err.message || 'Failed to create order.' });
        })
}

//  Get orders for logged-in user
orderController.getUserOrders = (req, res) => {
    Order.find({user : req.user._id}).populate('items.product')
      .then((orders) => {
        res.json(orders)
      })
      .catch((err) => {
        console.error('User Orders Error:', err);
        res.status(500).json({ error: 'Failed to fetch user orders.' });
      })
}

//  Update order status (Admin)
orderController.updateStatus = (req, res) => {
     const id = req.params.id 
     const {status} = req.body 

     Order.findByIdAndUpdate(id, {status}, {new : true}) .populate('items.product')
     .then((orders) => {
        res.json(orders)
     })
     .catch((err) => {
        res.json(err)
     })
}

//  Delete order (Admin or user)
orderController.destroy = (req, res) => {
    const id = req.params.id 
    Order.findById(id)
    .then((orders) => {
        if(req.user.role !== 'admin' && req.user._id.toString() !== orders.user.toString()){
            return res.status(403).json({error: 'Access denied'})
        }
        return orders.deleteOne()
        .then(() => {
            res.json({ message: 'Order deleted successfully' });
        })
     })
     .catch((err) => {
        res.json(err)
     })
}



module.exports = orderController