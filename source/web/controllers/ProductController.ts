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
    await Product.findById(req.params.id, (err: any, product: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send(product);
        }
    });
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
    await Product.findByIdAndUpdate(req.params.id, req.body, (err: any, product: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Succesfully updated the product');
        }
    });
};

export const destroy = async (req: Request, res: Response) => {
    await Product.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Succesfully deleted the product');
        }
    });
};
