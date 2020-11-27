import {
    Document,
    Model,
    model,
    Types,
    Schema,
    Query
} from "mongoose"

interface IProduct extends Document {
    name: string;
    price: number;
};


const ProductSchema = new Schema({name: String, price: Number})


export default model("Product", ProductSchema)
