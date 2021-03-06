import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is listening http://localhost:${PORT}`);
});
