require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const app = express();
const requireAuth = require("./middlewares/requireAuth");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI =
  "mongodb+srv://admin:passwordpassword@cluster0-ewwbr.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", error => {
  console.error("Error connecting to mongoose instance", error);
});

app.get("/", requireAuth, (req, res, next) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
