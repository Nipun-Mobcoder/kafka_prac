import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

export const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER],
});

// docker run -p 9092:9092 \
// -e KAFKA_ZOOKEEPER_CONNECT=192.168.8.107:2181 \
// -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.8.107:9092 \
// -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
// confluentinc/cp-kafka