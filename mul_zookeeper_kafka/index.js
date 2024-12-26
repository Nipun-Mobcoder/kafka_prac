import { kafka } from "./client.js";
import produceMessages from "./producer.js";

const TOPIC = "test-topic";

const consumeMessages = async () => {
  const consumer = kafka.consumer({ groupId: "example-group-2" });

  console.log("Connecting consumer...");
  await consumer.connect();
  console.log("Consumer connected!");

  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Received message from topic: ${topic}, partition: ${partition}, value: ${message.value.toString()}`
      );
    },
  });
};

const main = async () => {
  try {
    console.log("Starting Kafka example...");
    // await produceMessages();
    await consumeMessages();
  } catch (err) {
    console.error("Error in Kafka example:", err);
  }
};

main();