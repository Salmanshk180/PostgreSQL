"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const Database_Configuration = require("./database_config");
require("dotenv").config();
const app = (0, express_1.default)();
const port = 8000;
app.get("/", (req, res) => {
    res.send("Hello from server!!!");
});
const createConnection = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
});
createConnection
    .initialize()
    .then(() => {
    console.log("Database connected successfully...✅");
})
    .catch((err) => {
    console.log("Error connecting to database: " + err.message);
});
app.listen(port, () => console.log("Server is listening on port", port));
