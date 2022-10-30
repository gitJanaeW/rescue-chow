
const {AuthenticationError} = require('apollo-server-express');
const { User, Product, Category, Orders, Rescues, ItemLine, Thought} = require('../models');



// import models here
const { signToken } = require('../utils/auth');
//stripe sk secret key
const stripe = require('stripe')('sk_test_51LwAJXFZoRYZwQnKrB1KDnIQTimvYiaK2LxWeGS58kKJYCsj1MTns20e5GJsZJW5cLSM248C2PrsIJau71yxEYhi00CsrFsfQo');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },

    rescues: async () => {
      return await Rescues.find();
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin; // https://localhost:3001 or new URL(context.headers.referer).origin;
      
      const line_items = [];
      const prodLines = [];
      
      for (let i = 0; i < args.products.length; i++) {
        let newLine = new ItemLine(args.products[i]);
        const {prodId} = await newLine.populate('prodId');
        prodId.quantity = args.products[i].qnty;
        prodLines.push(prodId);
      };   

      for (let i = 0; i < prodLines.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: prodLines[i].name,
          description: prodLines[i].description,
          images: [`${url}/images/${prodLines[i].image}`]
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: prodLines[i].price * 100,
          currency: 'usd',
        });  
        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: prodLines[i].quantity
        });
        
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd',
              },
              display_name: 'Free shipping',
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              }
            }
          },
        ],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },

    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {

      if (context.user) { //context.user
        const user = await User.findById(context.user).populate({ //context.user
          path: 'orders.products',
          populate: 'prodId'
        });


      if (context.user) {
        const user = await User.findById(context.user._id)
          .populate('thoughts')
          .populate({
            path: 'orders.products',
            populate: 'category'
          })

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addNewOrder: async (parent, {products}, context) => {
      const productsArray = [];
      products.forEach(item => {
        const newLine = new ItemLine(item);
        productsArray.push(newLine);
      });
      let order = new Orders();
      order.products = productsArray;
      // console.log(order.products);
      await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
      return order;
    },

    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Orders({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addThought: async (parent, args, context) => {
      if (context.user) {
        const thought = await Thought.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { thoughts: thought._id } },
          { new: true }
        );

        return thought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addReaction: async (parent, { thoughtId, reactionBody }, context) => {
      if (context.user) {
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $push: { reactions: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedThought;
      }

      throw new AuthenticationError('You need to be logged in!');
    },



  }
};

      
module.exports = resolvers;

