import dotenv from 'dotenv';
dotenv.config({path: '/Users/salarsmac/nodejs/myNewExpressApp/.env'});

import amqp from 'amqplib/callback_api';

export const connectRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        amqp.connect(`${process.env.RABBITMQ_URI}`, (error0, connection) => {
            if (error0) reject(error0);
            resolve(connection);
        });
    });
};

export const createChannel = (connection: any) => {
    return new Promise((resolve, reject) => {
        connection.createChannel((error1: any, channel: any) => {
            if (error1) reject(error1);
            resolve(channel);
        });
    });
};

export const publishToExchange = (channel: any, exchange: any, msg: any) => {
    channel.assertExchange(exchange, 'fanout', {
        durable: false
    });
    channel.publish(exchange, '', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
};
