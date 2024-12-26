import { kafka } from "./client.js";

const TOPIC = "test-topic";

const produceMessages = async () => {
  const producer = kafka.producer();

  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer connected!");

  for (let i = 0; i < 10; i++) {
    const partition = i % 3;
    const message = `Message ${i} to partition ${partition}`;
    console.log(`Producing: ${message}`);

    await producer.send({
      topic: TOPIC,
      messages: [
        {
          value: message,
          partition,
        },
      ],
    });
  }

  await producer.disconnect();
  console.log("Producer disconnected!");
};

export default produceMessages;