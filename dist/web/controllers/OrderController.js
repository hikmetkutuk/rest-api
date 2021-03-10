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
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const Order_1 = __importDefault(require("../../model/Order"));
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json({ success: true, orders });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.index = index;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findById(req.params.id);
        res.status(200).json({ success: true, order });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.show = show;
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const order = new Order_1.default({
            product_id: body.product_id,
            quantity: body.quantity
        });
        const newOrder = yield order.save();
        res.status(201).json({ success: true, order: newOrder });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.store = store;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield Order_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Succesfully updated the order', updatedOrder });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.update = update;
const destroy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Order_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Succesfully deleted the order' });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.destroy = destroy;
