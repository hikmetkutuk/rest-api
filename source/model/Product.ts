import { model, Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    price: number;
}

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default model<IProduct>('Product', ProductSchema);
