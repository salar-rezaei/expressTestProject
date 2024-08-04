
import productModel from "../models/productModel";
import Product from "./dtos/productDto";
import productDto from "./dtos/createProductDto";
import redis from '../index';
import { connectRabbitMQ, createChannel, publishToExchange } from "../utils/rabbitmq";
import userModel from "../models/userModel";
import  {sendEmail}  from "../utils/mailer";
import ServerError from "../errors/serverErrors";


export const createProduct = async (data: productDto) => {
        const product = await productModel.findOne({ code: data.code })
        if (product) throw new ServerError(409, "product already exist")
        const newProduct = await productModel.create(data)
        newProduct.save()

        // Connect to RabbitMQ server and publish a message
        const connection = await connectRabbitMQ();
        const channel = await createChannel(connection);
        const msg = JSON.stringify(newProduct);
        publishToExchange(channel, 'products', msg);

        // Query the database to get the email addresses of the admin and users
        const users = await userModel.find({});
        const emails = users.map(user => user.email).join(', ');

        // Send email to all users
        await sendEmail(
            emails,
            'New Product Created',
            `A new product has been created: ${newProduct.name}`,
            `<b>A new product has been created: ${newProduct.name}</b>`
        );

        return newProduct
    }

export const getAllProducts = async () => {
        let products = await redis.get('allProducts');
        if (products) {
            return JSON.parse(products);
        } else {
            let products = await productModel.find();
            await redis.set('allProducts', JSON.stringify(products), 'EX', 3600); // cache for 1 hour
            return products;
        }
    };


export const getOneProduct = async (id: string) => {
    let product = await redis.get(id);
    if (product) {
        return JSON.parse(product);
    } else {
        product = await productModel.findOne({ _id: id });
        if (product) {
            await redis.set(id, JSON.stringify(product), 'EX', 3600); // cache for 1 hour
        }
        return product;
        }
    }


export const updateOneProduct = (id: string, params: Product) => {
    return new Promise((resolve, reject) => {
        productModel.findByIdAndUpdate(id, params).then((product) => {
            resolve(product)
        }).catch((err) => {
            reject(err)
        })
    })
}


export const deleteOneProduct = (id: string) => {
    return new Promise((resolve, reject) => {
        productModel.findByIdAndDelete({_id: id}).then((product)=>{
            resolve(product)
        }).catch((err) => {
            reject(err)
        })
    })
}

