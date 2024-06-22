const {Sequelize} = require("sequelize")
const env = require('dotenv');
env.config();
const sequelize=new Sequelize(process.env.DATABASE_NAME,process.env.USER,process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
  });
  ( async function authenticateDatabase(){
    try{
        await sequelize.authenticate();
        console.log('database connected successfully');
    }
    catch(err){
        console.log(err);
    }
  })();

  module.exports=sequelize;