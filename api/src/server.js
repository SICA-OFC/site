const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const limiter = require('./middlewares/rateLimit.js')
const errorHandler = require("./middlewares/errorHandler.js");
const userRoutes = require("./routes/userRoutes.js");
const teamRoutes = require("./routes/teamRoutes.js");
const challongeRoutes = require("./routes/challongeRoutes.js");
const path = require("path");

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(limiter);

app.use("/usuario", userRoutes);
app.use("/time", teamRoutes);
app.use("/campeonato", challongeRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});