"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkRole = exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const User_1 = __importDefault(require("../model/User"));
const checkJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        //Get the jwt token from the head
        const token = authHeader.split(' ')[1];
        let jwtPayload;
        //Try to validate the token and get data
        try {
            jwtPayload = jwt.verify(token, config_1.default.server.secret);
            res.locals.jwtPayload = jwtPayload;
        }
        catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send(error);
            return;
        }
        //The token is valid for 1 hour
        //We want to send a new token on every request
        const { _id, role } = jwtPayload;
        const newToken = jwt.sign({ _id, role }, config_1.default.server.secret, {
            expiresIn: config_1.default.server.expire
        });
        res.setHeader('token', newToken);
        //Call the next middleware or controller
        next();
    }
    else {
        return res.status(401).json({ success: false, message: 'Authorization required!' });
    }
};
exports.checkJwt = checkJwt;
const checkRole = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = res.locals.jwtPayload._id;
        const user = yield User_1.default.findById(id);
        if (roles.indexOf(user.role) > -1) {
            next();
        }
        else {
            return res.status(401).json({ success: false, message: 'User role authorization failed!' });
        }
    });
};
exports.checkRole = checkRole;
