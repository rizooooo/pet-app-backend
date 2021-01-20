import mongoose from 'mongoose';


const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Pet Name is required!']
    },
    age: {
        type: Number,
        required: [true, 'Age is required']
    },
    breed: {
        type: String,
        enum : ['Dog','Cat'],
        required: [true, 'Breed is required']
    },
    gender: {
        type: String,
        enum : ['Male','Female'],
        required: [true, 'Gender is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Pet', PetSchema);



