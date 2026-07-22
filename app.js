const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const authRoute = require("./routes/authRoutes");
const mainRoute = require("./routes/mainRoutes");

const connectDB = require("./db");
connectDB();

app.use(
  session({
    secret: "mySecretkey123@",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  }),
);

app.use(authRoute);
app.use(mainRoute);
app.use((req, res) => {
  res.status(404).render("errorPage", {
    pageTitle: "404 Page Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
