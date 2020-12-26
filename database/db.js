const mongoose = require('mongoose');

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  };

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Approved-Quiz', dbOptions);
        console.log('Connection to database was successful');
    } catch (error) {
        console.log('Connection to MongoDB Failed');
    }
}

module.exports = connectDB;