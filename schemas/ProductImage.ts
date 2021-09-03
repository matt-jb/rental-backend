import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import 'dotenv/config';

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: 'rental'
}

export const ProductImage = list({
    fields: {
        image: cloudinaryImage({
            cloudinary,
            label: 'Source'
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' })
    },
    ui: {
        listView: {
            initialColumns: [ 'image', 'altText', 'product' ]
        }
    }
});