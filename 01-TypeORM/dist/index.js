"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8000;
const createConnection = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASENAME,
    schema: process.env.DATABASE_SCHEMA,
    entities: ["src/entities/*{.ts,.js}"],
    synchronize: true,
    logging: true,
});
createConnection
    .initialize()
    .then(() => {
    console.log("Database connected successfully...✅");
})
    .then(() => {
    app.listen(port, () => console.log("Server is listening on port", port));
})
    .catch((err) => {
    console.log("Error connecting to database: " + err.message);
});
const userRepo = createConnection.getRepository(User_1.User);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userRepo.find();
    res.json(users);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, password } = req.body;
    const user = yield userRepo.insert({ id, name, email, password });
    res.json(user);
}));
app.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const user = yield userRepo.update(id, { name, email, password });
    res.json(user);
}));
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield userRepo.delete(id);
    res.json(user);
}));
