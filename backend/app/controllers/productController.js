const Product = require('../models/Product')

const productController ={}

productController.list = (req, res) =>{
    Product.find()
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            res.json(err)
        })
}

productController.create = (req, res) => {
    const body = req.body

    if (!req.file) {
        return res.status(400).json({ errors: 'Only jpg, jpeg, png, and pdf files are supported!' })
    }
    
    body.image = req.file.path.replace(/\\/g, '/')

    
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const product = new Product(body)
    product.save()
       .then((products) => {
           res.json(products)
       })
       .catch((err) => {
            res.json(err)
        })
}

productController.show = (req, res) => {
    const id = req.params.id 
    Product.findById(id)
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            res.json(err)
        })
}

productController.update = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Product.findByIdAndUpdate(id, body, {new : true, runValidation: true})
    .then((products) => {
        res.json(products)
    })
    .catch((err) => {
        res.json(err)
    })
}

productController.destroy = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
    .then((products) => {
        res.json(products)
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports = productController