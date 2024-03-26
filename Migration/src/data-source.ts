import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Salman@90",
  database: "typeorm_db",
  schema:"migrationdb",
  entities: [Post],
  // synchronize: true,
  migrations: ["src/migrations/*.ts"],
  logging: ["query", "error"],
});