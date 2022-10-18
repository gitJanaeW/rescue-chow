const {Schema, model} = require('mongoose');

const guestSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address.']
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        companyName: {
            type: String,
            trim: true
        },
        billing: [billingSchema],
        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Treats'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// add a cartCount virtual to guest object
guestSchema.virtual('cartCount').get(function() {
    return this.cart.length;
});

const Guest = model('Guest', guestSchema);

module.exports = Guest;