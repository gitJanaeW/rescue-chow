const {Schema, model} = require('mongoose');
const {dateFormat} = require('../utils/helpers');

const orderSchema = new Schema(
    {
        // an array of all the orders a User has made
        history: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// add a orderCount virtual to order object
orderSchema.virtual('orderCount').get(function() {
    return this.history.length;
});

const Orders = model('Orders', ordersSchema);

module.exports = Orders;