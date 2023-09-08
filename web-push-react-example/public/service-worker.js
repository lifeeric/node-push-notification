self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
    icon: "icon.png" // Replace with your icon path
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
