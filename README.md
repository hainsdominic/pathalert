# PathAlert

## _A mobile app to make journeys safer._

If you are going on an adventure or simply going out and you don't feel safe, simply press the "I don't feel safe" button on the app and your position will be sent every minute to the guardians that you selected.

## Features

- Add guardians by scanning the QR code displayed on their app with the QR Code scanner included in the app.
- Automatically sends your position to your guardians when you do not feel safe using a Google Maps link.

## Tech

| Packages | Description             |
| -------- | ----------------------- |
| Server   | Express API             |
| App      | React-Native mobile app |

## Development

PathAlert requires [Node.js](https://nodejs.org/) V10+ to run.

Go to package/server/config/ and create a new file named config.env

> Replace "production" by "development" depending on your environment

```
NODE_ENV=production
PORT=5000
MONGO_URI=<YOUR MONGODB URI>
```

Install the dependencies and dev dependencies and start the metro server and the server.

```sh
yarn install
yarn dev
```

## Team

Dominic Hains - Developer
