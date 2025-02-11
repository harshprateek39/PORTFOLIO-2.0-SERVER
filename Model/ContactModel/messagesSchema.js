import mongoose from 'mongoose';
import validator from 'validator';
// Define schema for messages
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [50, "Name must be at most 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        maxlength: [50, "Email must be at most 50 characters"]
    },
    message: {
        type: String,
        required: true,
        trim: true
      
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create model from schema
export const MessageModel = mongoose.model('message', messageSchema);


