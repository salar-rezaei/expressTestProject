import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: {
        type: Number,
        default: 18
    },
    roll: {
        type: String,
        default: "user"
    }
}, { versionKey: false })

export default mongoose.model("users", userSchema)