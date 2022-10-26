const db = require('./connections');
const { User } = require('../models');
const { Product, Category, Rescues } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Cat Treats' },
    { name: 'Dog Treats' },
    { name: 'Uncategorized' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Kitty Kisses 60g',
      description:
        'Delicious, semisoft, 100% Canadian, seafood catnip cat treats, your cat will love!',
      image: 'Kitty-Kisses-300x400.jpg',
      category: categories[0]._id,
      price: 9.99,
      quantity: 1
    },
    {
      name: 'Beef Bark Chews 100g',
      description:
        'Healthy, Natural, Human Grade, 100% Canadian Dehydrated Dog Chew. Mouth-watering Lasting chew that can be give as a reward or activity anytime.',
      image: 'Beef-Chews-300x400.jpg',
      category: categories[1]._id,
      price: 10.99,
      quantity: 1
    },
    {
      name: 'Beef Liver Treats 180g',
      description:
        'Healthy, Rich in Iron, Breakable, Human grade, 100% Canadian Dehydrated Dog Treats -Great for training, as small little pieces can be broken off and given as a reward or daily treat.',
      image: 'Dried-Beef-Liver-300x400.jpg',
      category: categories[1]._id,
      price: 9.99,
      quantity: 1
    },
    {
      name: 'Beef Treats 90g',
      category: categories[1]._id,
      description:
        'Healthy, Low Fat, Breakable, Human grade, 100% Canadian Dehydrated Dog Treats -A popular treat that is said to be a dog’s very favourite.',
      image: 'Dried-Beef-Bites-300x400.jpg',
      price: 9.99,
      quantity: 1
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  const rescues = await Rescues.insertMany([
    {
      name: "All Paws Matter",
      website: "https://www.apmrescue.com/",
      amountOwed: 0
    },
    {
      name: "Scugog Pet Food Bank",
      website: "https://www.facebook.com/UxScPetFoodBank/",
      amountOwed: 0
    },
    {
      name: "Rescue Chow Pet Food Bank Durham Region",
      amountOwed: 0
    },
    {
      name: "Team Chelsea",
      website: "https://www.facebook.com/groups/165123396868018",
      amountOwed: 0
    },
    {
      name: "Durham Humane Society",
      website: "http://www.hsdr.org/",
      amountOwed: 0
    },
    {
      name: "Toronto Humane Society",
      website: "https://www.torontohumanesociety.com/",
      amountOwed: 0
    },
    {
      name: "Jack Russell Terrier Rescue Ontario",
      website: "https://russellrescue.org/",
      amountOwed: 0
    },
    {
      name: "Headwaters Pet Food Bank",
      website: "https://www.facebook.com/Headwaters-Pet-Food-Bank-2503362129697849/",
      amountOwed: 0
    },
  ]);

  process.exit();
});
