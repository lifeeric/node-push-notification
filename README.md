## Getting Started

Example of Push notification using Nodejs & React

#### Install

install all the dependencies for node and React:

```sh
npm install
cd web-push-react-example && npm install
```

### Run

Spin up the server:

```sh
node server.js

# open a new terminal
cd web-push-react-example
npm start
```

### Test

run the following command to see the push notification:

```sh
curl -X POST "http://localhost:5000/send-notification"
```

### Generate VAPID:

```sh
npx web-push generate-vapid-keys

# Or JSON
npx web-push generate-vapid-keys --josn
```

Thanks
