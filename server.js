console.log("Har Har MahaDev")
const express = require("express");
const cors = require('cors');
const exp_hbs = require("express-handlebars");
const b_parser = require("body-parser");
const router = require('./route/routes.js');
const todo = require("./todo/routes/todo.routes.js");
const blogs = require('./Blogs/blogsRoutes.js');

// require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5555;
const app = express()

app.use(cors());
// app.use(cors({ origin: true, credentials: true }));

// app.use(express.json());
app.use(express.json({ extended: false }));
app.use(b_parser.urlencoded({ extended: true }));

// add the middleware
app.get("/", (req, res) =>
  res.send("Hello there!! Cheers !! The server is up and running")
);

// using our routes
app.use('/ex', router);
app.use("/api/todo", todo);
app.use("/blog", blogs);

const handlebars = exp_hbs.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

// listen
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
