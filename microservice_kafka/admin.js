import { kafka } from "./client.js";

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [order-events]");
  await admin.createTopics({
    topics: [
      {
        topic: "order-events",
      },
    ],
  });
  console.log("Topic Created Success [order-events]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();