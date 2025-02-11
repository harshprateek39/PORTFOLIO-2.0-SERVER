import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true, // Remove whitespace from beginning and end
        lowercase: true, // Convert to lowercase
        unique: true, // Ensure uniqueness
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: [true, 'Phone number is required']
    },
    github: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    whatsapp: {
        type: String,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    resumeLink: {
        type: String,
        trim: true
    }
});

export const DetailModel = mongoose.model('detail', contactSchema);


