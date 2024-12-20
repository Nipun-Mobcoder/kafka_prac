import { kafka } from "./client.js";

const consumer = kafka.consumer({ groupId: 'reset-offset' });

const topic = 'order-events';
const resetOffsetsAndConsume = async () => {
  try {
    await consumer.connect();

    const admin = kafka.admin();
    await admin.connect();

    await admin.resetOffsets({
      groupId: 'reset-offset',
      topic: topic,
      earliest: true,
    });

    console.log('Offsets reset to the beginning.');

    await admin.disconnect();
    await consumer.subscribe({ topic, fromBeginning: true });

    console.log('Reset Offset Service is listening for older events...');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const order = JSON.parse(message.value.toString());
        console.log(`Received order event: Order ID ${order.orderId}, for user: ${order.customer} for amount: ${order.totalAmount}`);
      },
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

resetOffsetsAndConsume();
