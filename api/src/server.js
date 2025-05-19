const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const limiter = require('./middlewares/rateLimit.js')
const errorHandler = require("./middlewares/errorHandler.js");
const routes = require("./routes.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(limiter);

app.use("/", routes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${ process.env.PORT}`);
});