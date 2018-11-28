import mongoose from "mongoose";
import log from "./logger";

mongoose.connect('mongodb://mongo:27017/nocker', { useNewUrlParser: true });

mongoose.connection.on('error', err => log.error('Database connection error:', err));

export default mongoose;