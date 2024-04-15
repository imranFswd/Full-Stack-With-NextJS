

import mongoose, { Schema, Document } from "mongoose"


export interface Messages extends Document{
    content: string;
    createdAt: Date
}


const MessagesSchema: Schema<Messages> = new Schema({
    
    content: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyOtpCode: string;
    verifyOtpCodeExpiry: Date;
    isVerified:boolean;
    isAcceptingMessage: boolean;
    messages: Messages[]
}


const UserSchema: Schema<User> = new Schema({
    
    username: {
        type: String,
        required: [true, "Username is required !!!"],
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required !!!"],
        unique: true,
        trim: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "Please uae a valid email address !!!"]
    },

    password: {
        type: String,
        required: [true, "Password is required !!!"],
        trim: true,
    },

    verifyOtpCode: {
        type: String,
        required: [true, "Verify code is required !!!"],
        unique: true,
        trim: true,
    },

    verifyOtpCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required !!!"],
        trim: true,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAcceptingMessage: {
        type: Boolean,
        default: true
    },

    messages: [MessagesSchema]

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))


export default UserModel

