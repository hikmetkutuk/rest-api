import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        //Get the jwt token from the head
        const token = authHeader.split(' ')[1];
        let jwtPayload;

        //Try to validate the token and get data
        try {
            jwtPayload = <any>jwt.verify(token, config.server.secret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send(error);
            return;
        }

        //The token is valid for 1 hour
        //We want to send a new token on every request
        const { _id, role } = jwtPayload;
        const newToken = jwt.sign({ _id, role }, config.server.secret, {
            expiresIn: config.server.expire
        });
        res.setHeader('token', newToken);

        //Call the next middleware or controller
        next();
    } else {
        return res.status(401).json({ success: false, message: 'Authorization required!' });
    }
};
