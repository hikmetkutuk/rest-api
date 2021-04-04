import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../../model/User';
import config from '../../config/config';

// @desc    Register user
// @route   POST /api/auth/register
export const register: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ success: false, message: 'User already exist' });

        const body = req.body as Pick<IUser, 'name' | 'email' | 'password' | 'role'>;
        const hash_password = bcrypt.hashSync(body.password, 10);

        const _user: IUser = new User({
            name: body.name,
            email: body.email,
            password: hash_password
        });

        if (body.role) {
            _user.role = body.role;
        }

        const newUser: IUser = await _user.save();
        res.status(201).json({ success: true, user: newUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if (validPassword) {
                const token = jwt.sign({ _id: user._id, role: user.role }, config.server.secret, { expiresIn: config.server.expire });
                const { _id, name, email, role } = user;

                return res.status(200).cookie('token', token, { maxAge: 900000, httpOnly: true }).json({ success: true, token, user: { _id, name, email, role } });
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
