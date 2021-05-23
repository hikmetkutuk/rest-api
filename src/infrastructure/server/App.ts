import cookieParser from 'cookie-parser';

import logging from '../../infrastructure/config/logging';
import config from '../../infrastructure/config';
import connect from '../../infrastructure/config/database';
import routes from '../../web/router/routes';
import { Application, Server, BodyParser, Encoded } from './core/Modules';

const NAMESPACE = 'Server';
const db: string = config.server.uri;

export default class App {
    public app: Application;
    constructor() {
        this.app = Server();
        this.loadMiddleware();
        this.loadLogging();
        this.loadRules();
        this.loadRoutes();
        this.loadHandleError();
        this.loadDatabase(db);
    }

    public loadMiddleware(): void {
        // Cookie Parser
        this.app.use(cookieParser());

        // Parse the request
        this.app.use(BodyParser);
        this.app.use(Encoded({ extended: true }));
    }

    private loadLogging(): void {
        // Logging the request
        this.app.use((req, res, next) => {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}]`);

            res.on('finish', () => {
                logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP -[${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
            });

            next();
        });
    }

    private loadRules(): void {
        // Rules of API
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method == 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
                return res.status(200).json({});
            }

            next();
        });
    }

    private loadRoutes(): void {
        // Routes
        this.app.use(routes);
    }

    private loadHandleError(): void {
        // Error Handling
        this.app.use((req, res, next) => {
            const error = new Error('not found');

            return res.status(404).json({ message: error.message });
        });
    }

    private loadDatabase(db: string): void {
        // Connect db
        connect(db);
    }

    public listen(): void {
        this.app.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`));
    }

    private runServices(): void {
        // Initialize db and other services here and once started run Listen
        this.listen();
    }

    public start(): void {
        this.runServices();
    }
}
