import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL = process.env.DATABASE || 'mongodb://localhost/keystone-rental';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.SECRET
};

export default config({
    server: {
        cors: {
            origin: [ process.env.FRONTEND_URL ],
            credentials: true,
        },
    },
    db: {
        provider: 'sqlite',
        adapter: 'mongoose',
        url: process.env.FRONTEND_URL,

    },
    lists: createSchema({
        // To fill
    }),
    ui: {
        isAccessAllowed: () => true,
    }
});