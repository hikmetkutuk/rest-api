import {NextFunction, Request, Response} from "express";
import logging from "../config/logging";
import Product from "../../domain/Product";

const NAMESPACE = "Product Controller";

export const index = async (req : Request, res : Response, next : NextFunction) => {
    const products = await Product.find((err : any, products : any) => {
        if (err) {
            logging.error(NAMESPACE, `${
                res.send(err)
            }`)
        }
        else {
            res.send(products);
        }
    })
}