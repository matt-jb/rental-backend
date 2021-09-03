import { createAuth } from '@keystone-next/auth';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { withItemData, statelessSessions} from '@keystone-next/keystone/session';

const databaseURL = process.env.DATABASE || 'mongodb://localhost/keystone-rental';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.SECRET
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password']
    }
});

export default withAuth(config({
    server: {
        cors: {
            origin: [ process.env.FRONTEND_URL ],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: process.env.DATABASE,

    },
    lists: createSchema({ User, Product, ProductImage }),
    ui: {
        isAccessAllowed: ({ session }) => {
            return !!session?.data;
        },
    },
    session: withItemData(statelessSessions(sessionConfig), { User: `id` })
}));