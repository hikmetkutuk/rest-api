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
        if (user) return res.status(400).json({ success: false, message: 'User already exist' });

        const body = req.body as Pick<IUser, 'name' | 'email' | 'password'>;
        const hash_password = bcrypt.hashSync(body.password, 10);

        const _user: IUser = new User({
            name: body.name,
            email: body.email,
            password: hash_password
        });
        const newUser: IUser = await _user.save();
        res.status(201).json({ success: true, user: newUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log('name:' + user.name);
            console.log('email:' + user.email);
            console.log('pass:' + user.password);
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if (validPassword) {
                const token = jwt.sign({ _id: user._id, role: user.role }, config.server.secret, { expiresIn: config.server.expire });
                const { _id, name, email, role } = user;

                res.status(200).json({ success: true, token, user: { _id, name, email, role } });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Something went wrong' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
