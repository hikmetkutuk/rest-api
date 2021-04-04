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
const authController = __importStar(require("../controllers/AuthController"));
const auth_1 = require("../../middleware/auth");
const router = express_1.Router();
router.get('/api/products', productController.index);
router.get('/api/product/:id', productController.show);
router.post('/api/add-product', [auth_1.checkJwt], productController.store);
router.put('/api/edit-product/:id', [auth_1.checkJwt], productController.update);
router.delete('/api/delete-product/:id', [auth_1.checkJwt], productController.destroy);
router.get('/api/orders', orderController.index);
router.get('/api/order/:id', orderController.show);
router.post('/api/add-order', orderController.store);
router.put('/api/edit-order/:id', orderController.update);
router.delete('/api/delete-order/:id', orderController.destroy);
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
exports.default = router;
