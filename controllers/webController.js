const { getUserWebHookCollection } = require("../models/webhookModel");
const { Webhook } = require("svix")

const getwebHook = async (req, res) => {
  // Retrieve the webhooks from the database
  const db = req.app.locals.db;
  const webhookCollection = getUserWebHookCollection(db);

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const headers = req.headers;
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Error occurred -- no svix headers" });
  }

  const payload = req.body;
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ error: "Error occurred" });
  }

  if (evt.type === "user.created") {
    const userId = evt.data.id;
    console.log("User created with ID:", userId);

    // Save the user data to MongoDB
    try {
      const result = await webhookCollection.insertOne({
        clerkId: userId,
        createdAt: new Date(),
      });
      console.log("User saved to MongoDB successfully", result);
    } catch (error) {
      console.error("Error saving user to MongoDB:", error);
    }
  }

  res.status(200).json({ message: "Webhook received successfully" });
};

module.exports = { getwebHook };
