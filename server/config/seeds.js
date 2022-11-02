
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
    website: "https://www.allpawsmatter.ca//",
    description: "All Paws Matter Dog Rescue is a small, Ontario based, non-profit organization that aids in the re-homing and rehabilitation of dogs.", 
    category: categories[2]._id,
    price: 0,
},
{
  name: "Scugog Pet Food Bank",
  website: "https://www.facebook.com/UxScPetFoodBank/",
  description: "Our mission is to keep families together by helping them feed their pets in North Durham Region (Ontario, Canada). When we have extra food & supplies we love helping other animal welfare organizations.",
  category: categories[2]._id,
  price: 0,
},
{
  name: "Team Chelsea",
  website: "https://www.facebook.com/groups/165123396868018",
  description: "Team Chelsea provides assisstance for lost & found pets in Durham Region, Ontario",
  category: categories[2]._id,
  price: 0,
},
{
  name: "Durham Humane Society",
  website: "http://www.hsdr.org/",
  description: "The Humane Society of Durham Region is a non-profit animal rescue organization.  It is dedicated to protecting and providing compassionate care for unwanted and abused animals in Durham Region until they find their forever homes.",
  category: categories[2]._id,
  price: 0,
},
{
  name: "Toronto Humane Society",
  website: "https://www.torontohumanesociety.com/",
  description: "If you love animals as much as we do, you understand why we work so hard to provide the best life possible for the animals in our care and the people who bond with them. It’s our expertise at every step of the journey, combined with the loving homes provided by people in our community that complete the circle. From the very moment an animal comes into our fold, their wellbeing is our priority.",
  category: categories[2]._id,
  price: 0,
},
{
  name: "Jack Russell Terrier Rescue Ontario",
  website: "https://russellrescue.org/",
  description: "Jack Russell Terrier Rescue Ontario (JRTRO) is a registered charity and referral organization dedicated to fostering, finding and placing Jack Russell Terriers (or “almost Jacks” aka Jack mixes) in new homes.",
  category: categories[2]._id,
  price: 0,
},
{
  name: "The Pet Pantry",
  website:
    "https://www.facebook.com/thepetpantryguelph/",
  description: "Guelph’s Pet Food Bank",
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
