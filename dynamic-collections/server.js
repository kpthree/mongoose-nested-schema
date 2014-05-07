    //Creating server
	var express = require('express')
      , app = express.createServer()
      , mongoose = require('mongoose')
      , Category = require('./schema');
	  
	//Connecting to MongoDB
    mongoose.connect('mongodb://localhost/ProductDB');
	
	
    var ProductCatalog = mongoose.model('Category', Category);
     //Get all product catalog 
    app.get('/:collection', function(req,res){	
        console.log(req.params.collection);
        var ProductCatalog = mongoose.model('Category_' + req.params.collection, Category);
        ProductCatalog.find({}, function(error, data){
			if(error){
			 res.json(error);
			}
			else if(data == null){
			 res.json('Data not found!')
			}
			else{
			  res.json(data);
			}
            
        });
    });
	//Get a specified category
	app.get('/:collection/:name', function(req,res){	
        var ProductCatalog = mongoose.model('Category_' + req.params.collection, Category);
        ProductCatalog.findOne({ name: req.params.name }, function(error, category){
            if(error){
                res.json(error);
            }
            else if(category == null){
                res.json('Category not found!')
            }
            else{
				res.json(category);	
			}
		});	
    });
	
	//Add category
	app.get('/addcategory/:collection/:name/:description', function(req, res){
		var categoryData = {
			name: req.params.name
		  , description: req.params.description         
		};
        var ProductCatalog = mongoose.model('Category_' + req.params.collection, Category);

		var category = new ProductCatalog(categoryData);

		category.save( function(error, data){
			if(error){
				res.json(error);
			}
			else{
				res.json(data);
			}
		});
	});
	//Add product to a category
    app.get('/addproduct/:collection/:category/:name/:unitPrice/:itemsInStock', function(req, res){
        var ProductCatalog = mongoose.model('Category_' + req.params.collection, Category);
        ProductCatalog.findOne({ name: req.params.category }, function(error, category){
            if(error){
                res.json(error);
            }
            else if(category == null){
                res.json('Category not found!')
            }
            else{
                category.products.push({ name: req.params.name, unitPrice: req.params.unitPrice,itemsInStock: req.params.itemsInStock });
                category.save( function(error, data){
                    if(error){
                        res.json(error);
                    }
                    else{
                        res.json(data);
                    }
                });
            }
        });
    });

    app.listen(8000);
    console.log("listening on port %d", app.address().port);
