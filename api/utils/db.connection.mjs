import mongoose from "mongoose";
import log from "./logger";

const notTesting = process.env.NODE_ENV !== 'test';

const connect = () => {
    mongoose.connect('mongodb://mongo:27017/nocker', { useNewUrlParser: true });
    mongoose.connection.on('error', err => log.error('Database connection error:', err));
}

if (notTesting) connect()

export default mongoose;