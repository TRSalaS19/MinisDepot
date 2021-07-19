const express = require('express');
const products = require('./productsData/products');
const PORT = 5000; 

const app = express(); 

app.get('/', (req, res) => {
  res.send(`DB connection is up and running on port ${PORT}`)
})

app.get('/db/products', (req, res) => {
  res.json(products)
})

app.get('/db/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})


app.listen(PORT, () => {
  console.log(`Server is runnig on port: ${PORT}`);
})