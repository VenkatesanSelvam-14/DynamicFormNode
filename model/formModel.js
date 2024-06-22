const {DataTypes} = require('sequelize');
const dbconnection = require('../DBConnection/connectivity');

const Form = dbconnection.define('form', {
  
id:{
  type:DataTypes.INTEGER,
  autoIncrement:true,
  primaryKey:true
},
formName:{
  type:DataTypes.STRING,
  unique:true,
  allowNull:false
},
form:{
  type:DataTypes.JSON,
  allowNull:false
},
createdBy:{
  type:DataTypes.STRING,
  defaultValue:'Admin',
  allowNull:true
},
updatedBy:{
  type:DataTypes.STRING,
  defaultValue:'Admin',
  allowNull:true
}
}, {
    tableName: 'jsonform',
    timestamps: true,
    allowNull:true
});


  module.exports=Form;