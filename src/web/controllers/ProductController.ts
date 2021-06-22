import { RequestHandler } from 'express';

import Product, { IProduct } from '../../model/Product';
import BaseController from './base/BaseController';
import applicationStatus from '../../app/status/applicationStatus';

export class ProductController extends BaseController {
    // @desc    List products
    // @route   GET /api/products
    static index: RequestHandler = async (req, res) => {
        try {
            const products: IProduct[] = await Product.find();
            res.status(applicationStatus.SUCCESS).json({ success: true, products });
        } catch (err) {
            res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
        }
    };

    // @desc    Get product
    // @route   GET /api/product/:id
    static show: RequestHandler = async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(applicationStatus.SUCCESS).json({ success: true, product });
        } catch (err) {
            res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
        }
    };

    // @desc    Create new product
    // @route   POST /api/add-product
    static store: RequestHandler = async (req, res) => {
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

    // @desc    Edit product
    // @route   POST /api/edit-product/:id
    static update: RequestHandler = async (req, res) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(applicationStatus.SUCCESS).json({ success: true, message: 'Succesfully updated the product', updatedProduct });
        } catch (err) {
            res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
        }
    };

    // @desc    Delete product
    // @route   POST /api/delete-product/:id
    static destroy: RequestHandler = async (req, res) => {
        try {
            await Product.deleteOne({ _id: req.params.id });
            res.status(applicationStatus.SUCCESS).json({ success: true, message: 'Succesfully deleted the product' });
        } catch (err) {
            res.status(applicationStatus.INVALID_INPUT).json({ success: false, error: err.message });
        }
    };
}
