import mongoose from "mongoose";
import log from "../utils/logger";

mongoose.connect('mongodb://localhost:27017/nocker', { useNewUrlParser: true });

mongoose.connection.on('error', err => log.error('Database connection error:', err));

export default mongoose;