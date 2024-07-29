import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: String,
    code: Number,
    description: {
        type: String,
        default: "its made by admin"
    }
}, { versionKey: false })

export default mongoose.model("products", productSchema)