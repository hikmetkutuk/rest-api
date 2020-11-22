import mongoose from "mongoose";

import logging from "./logging";

const NAMESPACE = "mongoDB";

export default(db : string) => {
    const connect = () => {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {

            return logging.info(NAMESPACE, `Succesfully connected to ${NAMESPACE}`)
        }).catch(error => {
            logging.error("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};
