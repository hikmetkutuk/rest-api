import { RequestHandler } from 'express';

import Product, { IProduct } from '../../model/Product';

export const index: RequestHandler = async (req, res, next) => {
    try {
        const products: IProduct[] = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (err) {
        res.json({ success: false, err });
    }
};

export const show: RequestHandler = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

export const store: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Pick<IProduct, 'name' | 'price'>;
        const product: IProduct = new Product({
            name: body.name,
            price: body.price
        });
        console.log(body.name);
        const newProduct: IProduct = await product.save();
        res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
        res.json({ success: false, err });
    }
};

export const update: RequestHandler = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Succesfully updated the product', updatedProduct });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};

export const destroy: RequestHandler = async (req, res, next) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Succesfully deleted the product' });
    } catch (err) {
        res.status(400).json({ success: false, err });
    }
};
