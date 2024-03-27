"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Salman@90",
    database: "typeorm_db",
    schema: "migrationdb",
    entities: [Post_1.Post],
    // synchronize: true,
    migrations: ["src/migrations/*.ts"],
    logging: ["query", "error"],
});
