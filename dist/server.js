"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./web/router/routes"));
const NAMESPACE = 'Server';
const db = config_1.default.server.uri;
const app = express_1.default();
// Logging the request
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
// Cookie Parser
app.use(cookie_parser_1.default());
// Parse the request
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rules of API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
// Routes
app.use(routes_1.default);
// Error Handling
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({ message: error.message });
});
// Create the server
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running on ${config_1.default.server.hostname}:${config_1.default.server.port}`));
// Connect db
database_1.default(db);
