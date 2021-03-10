import { RequestHandler } from 'express';

import Order, { IOrder } from '../../model/Order';

export const index: RequestHandler = async (req, res, next) => {
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

export const show: RequestHandler = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

export const store: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Pick<IOrder, 'product_id' | 'quantity'>;
        const order: IOrder = new Order({
            product_id: body.product_id,
            quantity: body.quantity
        });

        const newOrder: IOrder = await order.save();
        res.status(201).json({ success: true, order: newOrder });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

export const update: RequestHandler = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Succesfully updated the order', updatedOrder });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

export const destroy: RequestHandler = async (req, res, next) => {
    try {
        await Order.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Succesfully deleted the order' });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};
