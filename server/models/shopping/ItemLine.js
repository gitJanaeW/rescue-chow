const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemLineSchema = new Schema({
    prodId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    qnty: {
        type: Number,
        required: true
    }
    
});

const ItemLine = mongoose.model('ItemLine', itemLineSchema);

 module.exports = ItemLine;
