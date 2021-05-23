import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../../model/User';
import config from '../../infrastructure/config';
import BaseController from './base/BaseController';
import applicationStatus from '../../app/status/applicationStatus';

export class AuthController extends BaseController {
    // @desc    Register user
    // @route   POST /api/auth/register
    static register: RequestHandler = async (req, res) => {
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
            res.status(applicationStatus.CREATED).json({ success: true, user: newUser });
        } catch (err) {
            res.status(applicationStatus.INTERNAL_ERROR).json({ success: false, error: err.message });
        }
    };

    // @desc Login user
    // @route   POST /api/auth/login
    static login: RequestHandler = async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const validPassword = bcrypt.compareSync(req.body.password, user.password);
                if (validPassword) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, config.security.jwt.secretKey, { expiresIn: config.security.jwt.expireInSeconds });
                    const { _id, name, email, role } = user;

                    return res.status(applicationStatus.SUCCESS).cookie('token', token, { maxAge: 900000, httpOnly: true }).json({ success: true, token, user: { _id, name, email, role } });
                } else {
                    return res.status(applicationStatus.UNAUTHORIZED).json({ success: false, message: 'Invalid password' });
                }
            } else {
                return res.status(applicationStatus.UNAUTHORIZED).json({ success: false, message: 'Something went wrong' });
            }
        } catch (err) {
            res.status(applicationStatus.INTERNAL_ERROR).json({ success: false, error: err.message });
        }
    };
}
