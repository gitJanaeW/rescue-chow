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
    thoughts: Thought
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
    username: String
    email: String
    orders: [Order]
    thoughts: [Thought]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Rescue {
    _id: ID
    name: String
    website: String
    amountOwed: Int
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
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

  type Checkout {
    session: ID

  }

  type Query {
    categories: [Category]
    products(category: ID, name: String, thoughts: ID): [Product]
    product(_id: ID!): Product
    user(username: String!): User    
    users: [User]
    order(_id: ID!): Order
    checkout(products: [LineItem]!): Checkout
    rescues: [Rescue]
    thoughts(username: String, Product: ID): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String, email: String!, password: String!): Auth
    addNewOrder(products: [LineItem] ):NewOrder
    checkout(products: [ID]!): Checkout
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!, thoughts: String): Product
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    login(email: String!, password: String!): Auth
    addRescue(name: String!, website: String, amountOwed: Int!): Rescue
  }
`;


module.exports = typeDefs;