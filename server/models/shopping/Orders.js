const mongoose = require('mongoose');
const ItemLine = require('./ItemLine');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [ItemLine.schema]
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
