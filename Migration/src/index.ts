import express from "express";
import { AppDataSource } from "./data-source";

const app = express();

app.listen(8000, () => console.log("Server is listening on port 8000"));

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully...✅");
  })
  .then(() => {
    app.listen(8080, () => console.log("Server is listening on port 8080..."));
  });
