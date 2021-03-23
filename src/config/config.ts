import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const MONGO_URL = 'mongodb+srv://hikmetis:PvzZNBt2bFxefiEK@cluster0.ug2kl.mongodb.net/<dbname>?retryWrites=true&w=majority';
const JWT_SECRET = 'APISECRET';
const JWT_EXPIRE = '1h';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    uri: MONGO_URL,
    secret: JWT_SECRET,
    expire: JWT_EXPIRE
};

const config = {
    server: SERVER
};

export default config;
