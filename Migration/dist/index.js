"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
app.listen(8000, () => console.log("Server is listening on port 8000"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Database connected successfully...✅");
})
    .then(() => {
    app.listen(8080, () => console.log("Server is listening on port 8080..."));
});
