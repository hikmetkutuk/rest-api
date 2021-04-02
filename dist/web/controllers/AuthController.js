"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../model/User"));
const config_1 = __importDefault(require("../../config/config"));
// @desc    Register user
// @route   POST /api/auth/register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (user)
            return res.status(400).json({ success: false, message: 'User already exist' });
        const body = req.body;
        const hash_password = bcrypt_1.default.hashSync(body.password, 10);
        const _user = new User_1.default({
            name: body.name,
            email: body.email,
            password: hash_password
        });
        const newUser = yield _user.save();
        res.status(201).json({ success: true, user: newUser });
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.register = register;
// @desc    Login user
// @route   POST /api/auth/login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (user) {
            console.log('name:' + user.name);
            console.log('email:' + user.email);
            console.log('pass:' + user.password);
            const validPassword = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (validPassword) {
                const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, config_1.default.server.secret, { expiresIn: config_1.default.server.expire });
                const { _id, name, email, role } = user;
                res.status(200).json({ success: true, token, user: { _id, name, email, role } });
            }
            else {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        }
        else {
            return res.status(401).json({ success: false, message: 'Something went wrong' });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});
exports.login = login;
