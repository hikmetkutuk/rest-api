import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../../model/User';
import config from '../../config/config';

// @desc    Register user
// @route   POST /api/auth/register
export const register = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: 'User already exist' });

        const body = req.body as Pick<IUser, 'name' | 'email' | 'password'>;
        const hash_password = bcrypt.hashSync(body.password, 10);

        const _user: IUser = new User({
            name: body.name,
            email: body.email,
            password: hash_password
        });
        const newUser: IUser = await _user.save();
        res.status(201).json({ user: newUser });
    } catch (err) {
        res.status(500).send(err);
    }
};
