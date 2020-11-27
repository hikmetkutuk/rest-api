import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Product from '../../domain/Product';

const NAMESPACE = 'Product Controller';

export const index = async (req: Request, res: Response) => {
    const products = await Product.find((err: any, products: any) => {
        if (err) {
            logging.error(NAMESPACE, `${res.send(err)}`);
        } else {
            res.send(products);
        }
    });
};

export const show = async (req: Request, res: Response) => {
    await Product.findById(req.params.id, (err: any, product: any) => {
        if (err) {
            logging.error(NAMESPACE, `${res.send(err)}`);
        } else {
            res.send(product);
        }
    });
};

export const store = async (req: Request, res: Response) => {
    const product = new Product(req.body);

    await product.save((err: any) => {
        if (err) {
            logging.error(NAMESPACE, `${res.send(err)}`);
        } else {
            res.send(product);
        }
    });
};

export const update = async (req: Request, res: Response) => {
    await Product.findByIdAndUpdate(req.params.id, req.body, (err: any, product: any) => {
        if (err) {
            logging.error(NAMESPACE, `${res.send(err)}`);
        } else {
            res.send('Succesfully updated the product');
        }
    });
};

export const destroy = async (req: Request, res: Response) => {
    await Product.deleteOne({ _id: req.params.id }, (err: any) => {
        if (err) {
            logging.error(NAMESPACE, `${res.send(err)}`);
        } else {
            res.send('Succesfully deleted the product');
        }
    });
};
