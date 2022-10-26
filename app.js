require ('./config/mongoose') // koneksi ke mongoose

const express = require ('express');
const path = require ('path');
const app = express();
const cors = require ("cors");
const productRouterV1 = require('./routes/routeMongodb')
const productRouterV2 = require('./routes/routeMongoose')


app.use(express.urlencoded({extended: true})); // menangani request body dengan middleware, metode POST
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads'))) //menangani static & download
app.use('/api/v1',productRouterV1)
app.use('/api/v2',productRouterV2)
app.use((req, res, next) => { //membuat halaman jika halaman yang dituju ngga ada
  res.status(404)
  res.send({
    status: 'failed',
    message:`Resource ${req.originalUrl} Not Found` 
  })
})

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running at the port http://localhost:${port}/api/v/product`)
})

