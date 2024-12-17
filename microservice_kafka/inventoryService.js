import {kafka} from './client.js';

const runConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'old-inventory-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

    console.log('Inventory Service is listening for order events...');

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
        const order = JSON.parse(message.value.toString());
        console.log(`Received order event: Order ID ${order.orderId}, for user: ${order.customer} for amount: ${order.totalAmount}`);
    },
    });
};

runConsumer().catch(console.error);
