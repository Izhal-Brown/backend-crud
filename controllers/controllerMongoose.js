const Product = require('../models/modelMongoose')
const fs = require('fs');
const path = require('path');

const index = (req, res) => {
  Product.find()
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const view = (req, res) => {
  const { id } = req.params;
  Product.findOne({ _id: id })
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) { //merubah nama image ketika di upload
    const target = path.join(__dirname, '../uploads', image.originalname)// direktory, nama direktory, nama imagenya
    fs.renameSync(image.path, target)// rubah nama image sesuai nama aslinya
   Product.create({ name, price, stock, status, image_url: `http://localhost:3306/public/${image.originalname}` })
      .then(result => res.send(result))
      .catch(error => res.send(error))
  }
}


const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) { //merubah nama image ketika di upload
    const target = path.join(__dirname, '../uploads', image.originalname)// direktory, nama direktory, nama imagenya
    fs.renameSync(image.path, target)// rubah nama image sesuai nama aslinya
    Product.updateOne(
      { _id: id},
      {
        $set: {
          name: name,
          price: price,
          stock: stock,
          status: status,
          image_url: `http://localhost:3306/public/${image.originalname}`
        }
      })
      .then(result => res.send(result))
      .catch(error => res.send(error))
  } else {
    Product.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          price: price,
          stock: stock,
          status: status,
          image_url:image
        }
      })
      .then(result => res.send(result))
      .catch(error => res.send(error))
  }
}

const destroy = (req, res) => {
  const { id } = req.params;
  Product.deleteOne({ _id: id })
    .then(result => res.send(result))
    .catch(error => res.send(error))
}


module.exports = {
  index,
  view,
  store,
  update,
  destroy,
}
