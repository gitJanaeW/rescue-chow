import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_NEW_ORDER = gql`
mutation AddNewOrder($products: [LineItem]) {
  addNewOrder(products: $products) {
    _id
    purchaseDate
    products {
      prodId {
        _id
        name
        description
        website
        image
        quantity
        price
        category {
          _id
          name
        }
      }
      qnty
    }
  }
}
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        website
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_THOUGHT = gql`
  mutation addThought($product: ID, $thoughtText: String!) {
    addThought(product: $product, thoughtText: $thoughtText) {
      _id
      thoughts {
      _id
      thoughtText
      createdAt
      username
    }
    }
  }
`;

