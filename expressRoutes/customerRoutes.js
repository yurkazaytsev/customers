var express = require('express');
var app = express();
var customerRoutes = express.Router();

var Customer = require('../models/Customer');

// Defined store route
customerRoutes.route('/add').post(function (req, res) {
  Customer.findOne()
    .sort('-customerID')
    .then( member => {
      customerID = 1
      if (member){
        customerID = member.customerID + 1
      };
      var customer = new Customer(req.body);
      customer.customerID = customerID;
        customer.save()
         .then(item => {
         res.status(200).json({'customer': 'Customer added successfully'});
         })
         .catch(err => {
         res.status(400).send("unable to save to database");
         });
    });
});

// Defined get data(index or listing) route
customerRoutes.route('/').get(function (req, res) {
   Customer.find(function (err, customers){
    if(err){
      console.log(err);
    }
    else {
      res.json(customers);
    }
  });
});

// Defined edit route
customerRoutes.route('/edit/:customerID').get(function (req, res) {
  var customerID = req.params.customerID;
  Customer.findOne({'customerID':customerID}, function (err, customer){
      res.json(customer);
  });
});

//  Defined update route
customerRoutes.route('/update/:customerID').post(function (req, res) {
  Customer.findOne({customerID:req.params.customerID}, function(err, customer) {
    if (!customer)
      return next(new Error('Could not load Document'));
    else {
      customer.name = req.body.name;
      customer.birthday = req.body.birthday;
      customer.gender = req.body.gender;
      customer.lastContact = req.body.lastContact;
      customer.customerLifetimeValue = req.body.customerLifetimeValue;

      customer.save().then(customer => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
customerRoutes.route('/delete/:customerID').get(function (req, res) {
   Customer.findOneAndRemove({customerID: req.params.customerID}, function(err, customer){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = customerRoutes;
