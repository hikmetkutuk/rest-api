import { Request, Response } from 'express';

import Order, { IOrder } from '../../model/Order';

export const index = async (req: Request, res: Response) => {
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        await Order.findById(req.params.id, (order: any) => {
            res.status(200).json({ order });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const store = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IOrder, 'product_id' | 'quantity'>;

        const order: IOrder = new Order({
            product_id: body.product_id,
            quantity: body.quantity
        });

        const newOrder: IOrder = await order.save();
        res.status(200).json({ order: newOrder });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body, () => {
            res.status(200).send('Succesfully updated the order');
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const destroy = async (req: Request, res: Response) => {
    try {
        await Order.deleteOne({ _id: req.params.id }, () => {
            res.status(200).send('Succesfully deleted the order');
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
