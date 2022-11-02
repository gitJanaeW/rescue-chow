
const db = require('./connections');
const { User, Product, Category } = require('../models');



db.once("open", async () => {
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const categories = await Category.insertMany([
    { name: "Cat Treats" },
    { name: "Dog Treats" },
    { name: "Rescues" },
  ]);

  console.log("categories seeded");

  const products = await Product.insertMany([
    {
      name: "Kitty Kisses 60g",
      description:
        "1 calorie Liver Kitty Treats made in Canada with omega 3s and organic catnip, Kitty Kisses will earn you kitty kisses any day!",
      image: "Kitty Kisses.png",
      category: categories[0]._id,
      price: 9.99,
      quantity: 0,

    },
    {
      name: "Beef Chews 100g",
      description:
        "No additives No Preservatives, Beef Chews made in Canada with fresh Canadian Beef, Beef Chews are a longer chew for teeth and activity.",
      image: "Beef Chews.png",
      category: categories[1]._id,
      price: 10.99,
      quantity: 1,
    },
    {
      name: "Chicken Chunks 100g",
      description:
        "No additives No Preservatives, Chicken morsels made in Canada with Canadian Chicken, low fat, pocket friendly, easy treat for a reward or just to say I love you!",
      image: "Chicken Chunks.png",
      category: categories[1]._id,
      price: 9.99,
      quantity: 1,
    },
    {
      name: "Beef Bites 90g",
      category: categories[1]._id,
      description:
        "No additives No Preservatives, Beef Bites made in Canada with fresh Canadian beef, low fat, pocket friendly, breakable for small dogs and training",
      image: "Beef Bites.png",
      price: 9.99,
      quantity: 1,
    },
    {
      name: "All Paws Matter",
      website: "https://www.apmrescue.com/",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Scugog Pet Food Bank",
      website: "https://www.facebook.com/UxScPetFoodBank/",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Rescue Chow Pet Food Bank Durham Region",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Team Chelsea",
      website: "https://www.facebook.com/groups/165123396868018",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Durham Humane Society",
      website: "http://www.hsdr.org/",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Toronto Humane Society",
      website: "https://www.torontohumanesociety.com/",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Jack Russell Terrier Rescue Ontario",
      website: "https://russellrescue.org/",
      category: categories[2]._id,
      price: 0,
    },
    {
      name: "Headwaters Pet Food Bank",
      website:
        "https://www.facebook.com/Headwaters-Pet-Food-Bank-2503362129697849/",
      category: categories[2]._id,
      price: 0,
    },
  ]);

  console.log('seeded');


  var pam = await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    username: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
    ],
  });

  var eli = await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    username: 'Ej',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  await Product.findOneAndUpdate(
    { _id: products[0]._id },
    { $addToSet: { thoughts: { thoughtText: "meow", username: pam.username } } },
    { new: true, runValidators: true }
  );
  process.exit();
});
