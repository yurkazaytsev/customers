const mongoose = require('mongoose'),
      Customer = require('./models/Customer'),
      customersData = require('./data/customers-sample.json'),
      config = require('./config/DB');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  )

var conn = mongoose.connection;
var promises = customersData.map( data => {
    const customer = new Customer(data);
    customer.lastContact = new Date(customer.lastContact);
    promise = customer.save();
    promise
      .then(x => {console.log(x.customerID)})
      .catch(err => {console.log(err.message)})
    return promise;
  });

Promise.all(promises)
  .then(() => { console.log('Done');
      conn.close()})
  .catch(error => { conn.close() })
