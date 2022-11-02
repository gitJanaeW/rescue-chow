import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      thoughts {
        _id
        thoughtText
        createdAt
        username
      }
      category {
        _id
        name
      }
    }
  }
`;


export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [LineItem]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
      thoughts {
        _id
        thoughtText
        createdAt
        username
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username)  {
      firstName
      lastName
      username
      _id
      thoughts {
        _id
        thoughtText
        createdAt
        username
      }
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;



export const QUERY_RESCUES = gql`
  {
    rescues {
      _id
      name
      website
      amountOwed
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

