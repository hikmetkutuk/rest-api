import { model, Schema, Document, Types } from 'mongoose';

export interface IOrder extends Document {
    product_id: Types.ObjectId;
    quantity: number;
}

const OrderSchema: Schema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

export default model<IOrder>('Order', OrderSchema);
