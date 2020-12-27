import { Request, Response } from 'express';

import Product, { IProduct } from '../../model/Product';

export const index = async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = await Product.find();
        res.status(200).json({ products });
    } catch (err) {
        res.send(err);
    }
};

export const show = async (req: Request, res: Response) => {
    try {
        await Product.findById(req.params.id, (err: any, product: any) => {
            res.status(200).json({ product });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const store = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IProduct, 'name' | 'price'>;

        const product: IProduct = new Product({
            name: body.name,
            price: body.price
        });

        const newProduct: IProduct = await product.save();
        res.status(201).json({ product: newProduct });
    } catch (err) {
        res.send(err);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body, () => {
            res.status(200).send('Succesfully updated the product');
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export const destroy = async (req: Request, res: Response) => {
    try {
        await Product.deleteOne({ _id: req.params.id }, () => {
            res.status(200).send('Succesfully deleted the product');
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
