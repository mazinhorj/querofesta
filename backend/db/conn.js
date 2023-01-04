const mongoose = require('mongoose');

async function main() {

  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect("mongodb+srv://mazinho:GzepSNH8SCoZPwR1@cluster0.floaotj.mongodb.net/?retryWrites=true&w=majority");
    
    console.log('Db está conectado!');
  }
  
  catch (error) {
    
    console.log(`Oops! Deu ruim: ${error}`)
  
  }

};

module.exports = main;