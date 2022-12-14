const { ObjectId } = require('mongodb');
const db = require('../config/mongodb');
const fs = require('fs');
const path = require('path');

const index = (req, res) => {
  db.collection('products').find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error))
}


const view = (req, res) => {
  const { id } = req.params;
  db.collection('products').findOne({ _id: ObjectId(id) })
    .then(result => res.send(result))
    .catch(error => res.send(error))
}

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) { //merubah nama image ketika di upload
    const target = path.join(__dirname, '../uploads', image.originalname)// direktory, nama direktory, nama imagenya
    fs.renameSync(image.path, target)// rubah nama image sesuai nama aslinya
    db.collection('products').insertOne({ name, price, stock, status, image_url: `https://backend-crud-m.herokuapp.com/public/${image.originalname}` })
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
    db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          price: price,
          stock: stock,
          status: status,
          image_url: `https://backend-crud-m.herokuapp.com/public/${image.originalname}`
        }
      })
      .then(result => res.send(result))
      .catch(error => res.send(error))
  } else {
    db.collection('products').updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          price: price,
          stock: stock,
          status: status,
        }
      })
      .then(result => res.send(result))
      .catch(error => res.send(error))
  }
}

const destroy = (req, res) => {
  const { id } = req.params;
  db.collection('products').deleteOne({ _id: ObjectId(id) })
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
