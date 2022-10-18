const {Schema, model, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address.']
        },
        password: {
            type: String,
            required: true,
            minLenght: 8
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
        address: {},
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

// before saving new User, bcrypt the password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// check if the password is correct
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password)
};

userSchema.virtual('cartCount').get(function() {
    return this.cart.length;
});

const User = model('User', userSchema);

module.exports = User;