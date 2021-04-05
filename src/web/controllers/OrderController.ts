import { RequestHandler } from 'express';

import Order, { IOrder } from '../../model/Order';

// @desc    List orders
// @route   GET /api/orders
export const index: RequestHandler = async (req, res) => {
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

// @desc    Get order
// @route   GET /api/order/:id
export const show: RequestHandler = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

// @desc    Create new order
// @route   POST /api/add-order
export const store: RequestHandler = async (req, res) => {
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

// @desc    Edit order
// @route   POST /api/edit-order/:id
export const update: RequestHandler = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Succesfully updated the order', updatedOrder });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

// @desc    Delete order
// @route   POST /api/delete-order/:id
export const destroy: RequestHandler = async (req, res) => {
    try {
        await Order.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Succesfully deleted the order' });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};
