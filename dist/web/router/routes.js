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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController = __importStar(require("../controllers/ProductController"));
const orderController = __importStar(require("../controllers/OrderController"));
const routes = express_1.Router();
routes.get('/api/products', productController.index);
routes.get('/api/product/:id', productController.show);
routes.post('/api/add-product', productController.store);
routes.put('/api/edit-product/:id', productController.update);
routes.delete('/api/delete-product/:id', productController.destroy);
routes.get('/api/orders', orderController.index);
routes.get('/api/order/:id', orderController.show);
routes.post('/api/add-order', orderController.store);
routes.put('/api/edit-order/:id', orderController.update);
routes.delete('/api/delete-order/:id', orderController.destroy);
exports.default = routes;
