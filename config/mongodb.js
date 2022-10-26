const {MongoClient, Db} = require ('mongodb');
const url = 'mongodb+srv://izhal:291292@cluster0.eb3tzub.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

(async () =>{
  try{
    await client.connect();
    console.log('Koneksi Ke MongoDB Berhasil')
  }catch(e){
    console.log(e)
  }
})();

const dbName = client.db('Product-mongodb')// nama database

module.exports = dbName;