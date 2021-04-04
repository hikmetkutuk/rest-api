"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = __importDefault(require("./logging"));
const NAMESPACE = 'mongoDB';
exports.default = (db) => {
    const connect = () => {
        mongoose_1.default
            .connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => {
            return logging_1.default.info(NAMESPACE, `Succesfully connected to ${NAMESPACE}`);
        })
            .catch((error) => {
            logging_1.default.error('Error connecting to database: ', error);
            return process.exit(1);
        });
    };
    connect();
    mongoose_1.default.connection.on('disconnected', connect);
};
