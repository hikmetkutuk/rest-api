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
const Product_1 = __importDefault(require("../../model/Product"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.status(200).json({ products });
    }
    catch (err) {
        res.send(err);
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.findById(req.params.id, (err, product) => {
            res.status(200).json({ product });
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.show = show;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const product = new Product_1.default({
            name: body.name,
            price: body.price
        });
        console.log(body.name);
        const newProduct = yield product.save();
        res.status(201).json({ product: newProduct });
    }
    catch (err) {
        res.send(err);
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.findByIdAndUpdate(req.params.id, req.body, () => {
            res.status(200).send('Succesfully updated the product');
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.deleteOne({ _id: req.params.id }, () => {
            res.status(200).send('Succesfully deleted the product');
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.destroy = destroy;
