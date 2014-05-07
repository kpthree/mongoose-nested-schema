//Models using Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectID;

var Product = new Schema({
     name          : { type: String, required: true, trim: true }
    ,unitPrice	   : { type: Number, required: true }
    ,itemsInStock  : { type: Number, required: true }
});	

var Category = new Schema({
    name      		: { type: String, required: true, trim: true }
  , description    :  { type: String, required: true, trim: true }  
  , products         : [Product] 	  
});	
module.exports = Category;
