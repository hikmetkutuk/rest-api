import { RequestHandler, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import config from '../config';
import User from '../../model/User';

export const checkJwt: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        //Get the jwt token from the head
        const token = authHeader.split(' ')[1];
        let jwtPayload;

        //Try to validate the token and get data
        try {
            jwtPayload = <any>jwt.verify(token, config.security.jwt.secretKey);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send(error);
            return;
        }

        //The token is valid for 1 hour
        //We want to send a new token on every request
        const { _id, role } = jwtPayload;
        const newToken = jwt.sign({ _id, role }, config.security.jwt.secretKey, {
            expiresIn: config.security.jwt.expireInSeconds
        });
        res.setHeader('token', newToken);

        //Call the next middleware or controller
        next();
    } else {
        return res.status(401).json({ success: false, message: 'Authorization required!' });
    }
};

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload._id;

        const user = await User.findById(id);

        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            return res.status(401).json({ success: false, message: 'User is not authorized to access this!' });
        }
    };
};
