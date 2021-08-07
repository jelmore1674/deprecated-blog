import mongoose, { connect } from 'mongoose';

const connection = {};

export default async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}