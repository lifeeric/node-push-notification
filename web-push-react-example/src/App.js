import React, { useState } from "react";

const Subscribe = () => {
  const [subscription, setSubscription] = useState(null);

  const subscribe = async () => {
    try {
      const serviceWorker = await navigator.serviceWorker.register(
        "service-worker.js"
      );
      const pushSubscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        // Replace with your VAPID public key
        applicationServerKey:
          process.env.VAPID_PUBLIC_KEY ||
          "BOOXfe-39t-e1xSxcQv7_TA6z8WgMTpC7Sz03_ZOk-KRkL3C5wK0nunZDVGBjTrrWQZ50JcQvGTMeZFSs834d28"
      });

      // Send the subscription to your server for storage
      await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        body: JSON.stringify(pushSubscription),
        headers: {
          "Content-Type": "application/json"
        }
      });

      setSubscription(pushSubscription);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <div>
      {!subscription ? (
        <button onClick={subscribe}>Subscribe to Push Notifications</button>
      ) : (
        <p>You are subscribed to push notifications!</p>
      )}
    </div>
  );
};

export default Subscribe;
