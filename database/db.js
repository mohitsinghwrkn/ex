const mongoose = require('mongoose');
require("dotenv").config();

const dbURL = process.env.MONGO_DB_URL;

// const db = mongoose.connect('mongodb://127.0.0.1:27017/dev')
const db = mongoose.connect(dbURL)
    .then(
        () => { console.log('Database is connected') },
        err => { console.log('There is problem while connecting database ' + err) }
    );
;

const configDatabase = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// module.exports = configDatabase;

module.exports = db
