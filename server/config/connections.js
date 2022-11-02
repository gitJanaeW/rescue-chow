const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rescue-chow',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }
);

module.exports = mongoose.connection;

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
  