"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_URL = "mongodb+srv://hikmetis:PvzZNBt2bFxefiEK@cluster0.ug2kl.mongodb.net/<dbname>?retryWrites=true&w=majority";
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    uri: MONGO_URL
};
const config = {
    server: SERVER
};
exports.default = config;
