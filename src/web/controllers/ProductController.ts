import { RequestHandler } from 'express';

import Product, { IProduct } from '../../model/Product';
import applicationStatus from '../../app/status/applicationStatus';

export const index: RequestHandler = async (req, res) => {
    try {
        const products: IProduct[] = await Product.find();
        res.status(applicationStatus.SUCCESS).json({ success: true, products });
    } catch (err) {
        res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
    }
};

export const show: RequestHandler = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(applicationStatus.SUCCESS).json({ success: true, product });
    } catch (err) {
        res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
    }
};

export const store: RequestHandler = async (req, res) => {
    try {
        const body = req.body as Pick<IProduct, 'name' | 'price'>;
        const product: IProduct = new Product({
            name: body.name,
            price: body.price
        });
        const newProduct: IProduct = await product.save();
        res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
    }
};

export const update: RequestHandler = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(applicationStatus.SUCCESS).json({ success: true, message: 'Succesfully updated the product', updatedProduct });
    } catch (err) {
        res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
    }
};

export const destroy: RequestHandler = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.status(applicationStatus.SUCCESS).json({ success: true, message: 'Succesfully deleted the product' });
    } catch (err) {
        res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
    }
};
