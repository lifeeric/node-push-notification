const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json());

// Replace with your own VAPID keys & store
// In Prod, use .env
const vapidKeys = {
  publicKey:
    process.env.VAPID_PUBLIC_KEY ||
    "BOOXfe-39t-e1xSxcQv7_TA6z8WgMTpC7Sz03_ZOk-KRkL3C5wK0nunZDVGBjTrrWQZ50JcQvGTMeZFSs834d28",
  privateKey:
    process.env.VAPID_PRIVATE_KEY ||
    "CDSRkln6ajWzycBwUghQ1jtpcESpA0idopu_6nYrIMM"
};

webPush.setVapidDetails(
  "mailto:youremail@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// store subscriptions
const subscriptions = [];

// Subscribe route
app.post("/subscribe", (req, res) => {
  const subscription = req.body;

  // Store the subscription for later use
  console.log("[subscription]", subscription);
  subscriptions.push(subscription);

  res.status(201).json({});
});

// Send push notification
app.post("/send-notification", async (req, res) => {
  const notificationPayload = {
    data: {
      title: "Push Notification",
      body: "This is a push notification from your server.",
      icon: "icon.png" // Replace with your icon path
    }
  };

  try {
    // Iterate through subscriptions and send notifications
    const promises = subscriptions.map(async (subscription) => {
      try {
        await webPush.sendNotification(
          subscription,
          JSON.stringify(notificationPayload)
        );
      } catch (error) {
        console.error("Error sending push notification:", error);
      }
    });

    // Wait for all notifications to be sent
    await Promise.all(promises);

    res.status(200).json({ message: "Push notifications sent successfully" });
  } catch (error) {
    console.error("Error sending push notifications:", error);
    res.status(500).json({ message: "Failed to send push notifications" });
  }
});

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
