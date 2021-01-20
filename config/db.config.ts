import mongoose from 'mongoose';

const connect = async () => {
    try {
        console.log(process.env.MONGO_URI);
        const res = await mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log(res.connection.host, 'SUCCESS!');
    } catch (error) {
        console.log(error);
    }
}

export default connect;