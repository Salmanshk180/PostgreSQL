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
const Category_1 = require("./entities/Category");
const Questions_1 = require("./entities/Questions");
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
    app.listen(port, () => console.log("Server is listening on port", port, "...👂"));
})
    .catch((err) => {
    console.log("Error connecting to database: " + err.message);
});
// const userRepo = createConnection.getRepository(User);
// const profileRepo = createConnection.getRepository(Profile);
// const profile = new Profile();
// profile.profile_id = "1";
// profile.gender = "male";
// profile.photo = "one";
// app.get("/", async (req: express.Request, res: express.Response) => {
//   const users = await userRepo.find();
//   res.json(users);
// });
// app.post("/", async (req: express.Request, res: express.Response) => {
//   const { id, name, email, password } = req.body;
//   const user = new User();
//   user.id = id;
//   user.name = name;
//   user.email = email;
//   user.password = password;
//   user.profile = profile;
//   const userRes = await userRepo.save(user);
//   res.json(userRes);
// });
// app.patch("/:id", async (req: express.Request, res: express.Response) => {
//   const id = req.params.id;
//   const { name, email, password, photo, gender } = req.body;
//   const userFound = await userRepo.findOne({ where: { id: id } });
//   if (userFound) {
//     userFound.name = name;
//     userFound.email = email;
//     userFound.password = password;
//     userFound.profile.gender = gender;
//     userFound.profile.photo = photo;
//     const updatedRecord = await userRepo.save(userFound);
//     return res.json(updatedRecord);
//   } else {
//     return res.json({ error: "No Record Found 🚫" });
//   }
// });
// app.delete("/:id", async (req: express.Request, res: express.Response) => {
//   const id = req.params.id;
//   const user = await userRepo.delete(id);
//   res.json(user);
// });
// const productRepo = createConnection.getRepository(Product);
// const companyRepo = createConnection.getRepository(Company);
// app.post("/product", async (req: express.Request, res: express.Response) => {
//   const { name, price, companyid } = req.body;
//   try {
//     const findCompany: Company | null = await companyRepo.findOne({
//       where: { id: companyid },
//     });
//     if (!findCompany) {
//       return res.status(404).send("Company not found");
//     }
//     const product = new Product();
//     product.name = name;
//     product.price = price;
//     product.company = findCompany!; // Using non-null assertion operator
//     const savedProduct = await productRepo.save(product);
//     res.json(savedProduct);
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.post("/company", async (req: express.Request, res: express.Response) => {
//   const { name, description } = req.body;
//   const company = new Company();
//   company.name = name;
//   company.description = description;
//   const comoanyAdded = await companyRepo.save(company);
//   res.send(comoanyAdded);
// });
// app.get("/companies", async (req: express.Request, res: express.Response) => {
//   const company = await companyRepo.find();
//   res.json(company);
// });
// app.get("/products", async (req: express.Request, res: express.Response) => {
//   const product = await productRepo.find({ relations: { company: true } });
//   res.json(product);
// });
// app.patch(
//   "/company/:id",
//   async (req: express.Request, res: express.Response) => {
//     const id = Number(req.params.id);
//     const findCompany: Company | null = await companyRepo.findOne({
//       where: { id: id },
//     });
//     if (findCompany === null) {
//       res.json({ error: "Company not found!!! 🚫" });
//     } else {
//       const { name, description } = req.body;
//       findCompany.name = name;
//       findCompany.description = description;
//       const updateCompany = await companyRepo.save(findCompany);
//       res.json(updateCompany);
//     }
//   }
// );
// app.patch(
//   "/product/:id",
//   async (req: express.Request, res: express.Response) => {
//     const id = req.params.id;
//     const findProduct: Product | null = await productRepo.findOne({
//       where: { id: id },
//     });
//     if (findProduct === null) {
//       res.json({ error: "Product not found!!! 🚫" });
//     } else {
//       const { name, price } = req.body;
//       findProduct.name = name;
//       findProduct.price = price;
//       const updateProduct = await productRepo.save(findProduct);
//       res.json(updateProduct);
//     }
//   }
// );
// app.delete("/company/:id", async (req: express.Request, res: express.Response) =>{
//   const id = Number(req.params.id);
//   const findCompany: Company | null = await companyRepo.findOne({where:{ id: id}})
//   if(findCompany === null) {
//     res.json({ error: "Company not found!!!"});
//   }
//   else{
//     const deletedCompany = await companyRepo.delete(id);
//     res.json(deletedCompany);
//   }
// })
// app.delete("/product/:id", async (req: express.Request, res: express.Response) =>{
//   const id = req.params.id;
//   const findProduct: Product | null = await productRepo.findOne({where:{ id: id}})
//   if(findProduct === null) {
//     res.json({ error: "Prodcut not found!!!"});
//   }
//   else{
//     const deletedProduct = await productRepo.delete(id);
//     res.json(deletedProduct);
//   }
// })
const categoryRepo = createConnection.getRepository(Category_1.Category);
const questionRepo = createConnection.getRepository(Questions_1.Question);
app.post("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const category = new Category_1.Category();
    category.title = title;
    const addCategory = yield categoryRepo.save(category);
    res.json(addCategory);
}));
app.post("/question", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, categories } = req.body;
    const question = new Questions_1.Question();
    question.title = title;
    let category = yield categoryRepo.findOne({ where: { title: categories[0].title } });
    if (!category) {
        category = new Category_1.Category();
        category.title = categories[0].title;
        category = yield categoryRepo.save(category);
    }
    question.categories = [category];
    const addQuestion = yield questionRepo.save(question);
    res.json(addQuestion);
}));
app.get("/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryRepo.find();
    res.json(category);
}));
app.delete("/category/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleteCategory = yield categoryRepo.delete(id);
    res.json(deleteCategory);
}));
