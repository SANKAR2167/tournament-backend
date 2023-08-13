// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import usersRouter from "./routes/users.route.js";
import tournamentlistRouter from "./routes/tournament.route.js";
import participantRouter from "./routes/participant.route.js";
import cors from "cors";

dotenv.config()
const app = express();

const PORT = process.env.PORT;

// Connection
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect(); // top level await 
console.log("Mongo is connected !!!");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", function (request, response) {
    response.send(`Hello World !!!, Welcome to my tournamnent application`);
});

app.use("/tournamentlist", tournamentlistRouter)
app.use("/participant", participantRouter)
app.use("/users", usersRouter)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client }