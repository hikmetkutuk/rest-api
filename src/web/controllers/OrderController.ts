import { RequestHandler } from 'express';

import Order, { IOrder } from '../../model/Order';

export const index: RequestHandler = async (req, res, next) => {
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const show: RequestHandler = async (req, res, next) => {
    try {
        await Order.findById(req.params.id, (order: any) => {
            res.status(200).json({ order });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const store: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const body = req.body as Pick<IOrder, 'product_id' | 'quantity'>;

        const order: IOrder = new Order({
            product_id: body.product_id,
            quantity: body.quantity
        });

        const newOrder: IOrder = await order.save();
        res.status(201).json({ order: newOrder });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const update: RequestHandler = async (req, res, next) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body, () => {
            res.status(200).send('Succesfully updated the order');
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const destroy: RequestHandler = async (req, res, next) => {
    try {
        await Order.deleteOne({ _id: req.params.id }, () => {
            res.status(200).send('Succesfully deleted the order');
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
