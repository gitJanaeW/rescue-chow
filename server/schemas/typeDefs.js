const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    reviews: [Review]
  }

  type Review {
    _id: ID
    reviewText: String
    createdAt: String
    firstName: String
  }

  type Rescue {
    _id: ID
    name: String
    website: String
    amountOwed: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    rescues: [Rescue]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addReview(reviewText: String!): Review
    login(email: String!, password: String!): Auth
    addRescue(name: String!, website: String, amountOwed: Int!): Rescue
  }

  type Checkout {
    session: ID
  }
`;


module.exports = typeDefs;