import express from "express";
import {kafka} from './client.js';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post('/orders', async (req, res) => {
    const { orderId, customer, totalAmount } = req.body;
  
    if (!orderId || !customer || !totalAmount) {
      return res.status(400).json({ message: 'Missing order details' });
    }

    const producer = kafka.producer();

    const startKafkaProducer = async () => {
    await producer.connect();
    console.log('Kafka Producer connected');
    };
    await startKafkaProducer();
  
    const order = { orderId, customer, totalAmount, status: 'created' };
  
    try {
      await producer.send({
        topic: 'order-events',
        messages: [{ key: String(orderId), value: JSON.stringify(order) }],
      });
  
      console.log('Order sent to Kafka:', order);
      await producer.disconnect();
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (err) {
      console.error('Error producing message:', err);
      res.status(500).json({ message: 'Failed to create order' });
    }
  });

app.listen(4000, () => {
    console.log("Server is listening on http://localhost:4000");
});