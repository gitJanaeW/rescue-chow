const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:3000/rescue-chow',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }
);

module.exports = mongoose.connection;