const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

app.use((req, res) => {
  res.send("route not found");
});
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({ message: err.message });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server running at port:${PORT} `.bgCyan.bold);
    });
  } catch (error) {
    console.log(`server starting error ${error}`.bgRed);
  }
}
startServer();
