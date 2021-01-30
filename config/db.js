const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDB');

const connectDB = async () => { 
   try { 
      mongoose.connect(db, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      });
      console.log('MongoDB Connected...');
   } catch(err) { 
      console.log(err);
   }
};

module.exports = connectDB;