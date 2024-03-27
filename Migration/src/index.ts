import express from "express";
import { AppDataSource } from "./data-source";
import { Post } from "./entities/Post";
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json())
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully...✅");
  })
  .then(() => {
    app.listen(8000, () => console.log("Server is listening on port 8000..."));
  });

// const postRepo = AppDataSource.getRepository(Post);

app.get("/", async (req, res) => {
  // const posts = await postRepo.find();
  const posts = await AppDataSource.getRepository(Post).createQueryBuilder('posts').getMany();
  res.json(posts);
})

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  const post = await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(Post)
    .values([
      { title: title, content: content }])
    .execute()
  res.json(post.raw);
})

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await AppDataSource.getRepository(Post).createQueryBuilder("post").where("post.id = :id", { id: id }).getOne();
  res.json(post);

})

app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const updatePost = AppDataSource.getRepository(Post).createQueryBuilder().update(Post).set({ title: title, content: content }).where("post.id=:id", { id: id }).execute();
  res.json((await updatePost).raw);
})


app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletePost = await AppDataSource
    .createQueryBuilder()
    .delete()
    .from(Post)
    .where("id = :id", { id: id })
    .execute()
  res.json((await deletePost).affected);
})
