const {AuthenticationError} = require('apollo-server-express');
// import models here
const {signToken, authMiddleware} = require('../utils/auth') ;

const resolvers = {
    Query: {

    },

    Mutation: {

    }
};

module.exports = resolvers;