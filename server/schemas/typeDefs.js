const {gql} = require('apollo-server-express');

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
    products: [ItemLine]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
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

  type ItemLine {
    prodId: Product
    qnty: Int
  }

  type NewOrder {
    _id: ID
    purchaseDate: String
    products: [ItemLine]
  }

  input LineItem {
    prodId: ID
    qnty: Int
  }

  input ProductInput {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: CategoryInput
  }

  input CategoryInput {
    _id: ID
    name: String
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [LineItem]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addNewOrder(products: [LineItem] ):NewOrder
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    addRescue(name: String!, website: String, amountOwed: Int!): Rescue
  }

  type Checkout {
    session: ID
  }
`;


module.exports = typeDefs;