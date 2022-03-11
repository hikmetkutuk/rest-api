import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import express from 'express';
import config from '../../infrastructure/config';
import logging from '../config/logging';

const NAMESPACE = 'Sentry';
const app = express();

export default () => {
    const sentry = () => {
        try{
            Sentry.init({
                dsn: config.sentry.dsn,
                integrations: [
                    // enable HTTP calls tracing
                    new Sentry.Integrations.Http({ tracing: true }),
                    // enable Express.js middleware tracing
                    new Tracing.Integrations.Express({
                    // to trace all requests to the default router
                    app,
                    // alternatively, you can specify the routes you want to trace:
                    // router: someRouter,
                    }),
                ],
                tracesSampleRate: 1.0,
            });
            logging.info(NAMESPACE, `Succesfully connected to ${NAMESPACE}`)
        } catch (e) {
            logging.error(`Error connecting to ${NAMESPACE}:`, Sentry.captureException(e));
        }                
    };
    sentry();
}