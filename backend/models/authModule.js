import { Schema, model } from "mongoose";

const AuthSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 
export default model("Auth", AuthSchema);