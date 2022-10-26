const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://izhal:291292@cluster0.eb3tzub.mongodb.net/?retryWrites=true&w=majority');
const dbName = mongoose.connection;
dbName.on('error', console.error.bind(console, 'connection error : '));
dbName.once('open', () => console.log('Koneksi Ke Mongoose Berhasil'));