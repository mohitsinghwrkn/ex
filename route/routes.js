const express = require("express");
const path = require("path");
const multer = require("multer");
var fs = require("fs");
const bcrypt = require("bcrypt");
const json = require("../json/json");
const register_model = require("../database/model/registerModel");
const create_model = require("../database/model/createModel");
const uploadModel = require("../database/model/uploadModel");
const employeeModel = require("../database/model/employeeModel");
const subscribeModel = require("../database/model/subscribeModel");
const admin_create_model = require("../database/model/adminCreateModel");
const likeModel = require("../database/model/likeModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { EX_URL: process.env.EX_URL });
});

router.get("/object", (req, res) => {
  res.render("object");
});

router.get("/json", (req, res) => {
  res.send(json);
});

router.get("/html", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/html.html"));
});

router.get("/form", (req, res) => {
  res.render("form");
});

router.get("/something", (req, res) => {
  res.render("something");
});

router.get("/multer", (req, res) => {
  res.render("multer");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/refreshExpress", (req, res) => {
  res.render("refreshExpress");
});

router.post("/like/", async (req, res) => {
  let id = req.params.id;
  likeModel.findOne().then((doc) => {
    if (!doc) {
      let like = new likeModel(req.body);
      like.save().then(()=>console.log("like created successfully"))
    } else {
      doc.like = req.body.like;
      doc.save().then((doc) => res.send("liked"));
    }
  });
});

router.route("/showLike").get(function (req, res) {
  likeModel.findOne().then((data) => {
    res.send(data);
  });
});

// testing
router.get("/find/:name", async (req, res) => {
  const name = req.params.name;
  const existingUser = await signup_model.findOne({ name: name });
  res.send(existingUser);
});

// testing again
router.get("/findAgain/:email", async (req, res) => {
  const email = req.params.email;
  const existingUser = await signup_model.findOne({ email: email });
  res.send(existingUser);
});

// To Add New Employee
router.route("/cEmployee").post(function (req, res) {
  let employee = new employeeModel(req.body);
  employee
    .save()
    .then((game) => {
      res.status(200).json({ employee: "Employee Added Successfully" });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
});

// To Get List Of Employees
router.route("/rEmployee").get(function (req, res) {
  employeeModel.find().then((data) => {
    res.send(data);
  });
});

// To Get Employee Details By Employee ID
router.route("/rEmployee/:id").get(function (req, res) {
  let id = req.params.id;
  employeeModel.findById(id).then((data) => {
    res.send(data);
  });
});

// To Update The Employee Details
router.route("/uEmployee/:id").post(function (req, res) {
  let id = req.params.id;
  employeeModel.findById(id).then((employee) => {
    if (!employee) res.send("Unable To Find Employee With This Id");
    else {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      employee
        .save()
        .then((emp) => {
          res.json("Employee Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable To Update Employee");
        });
    }
  });
});

// To Delete The Employee
router.route("/dEmployee/:id").get(function (req, res) {
  employeeModel
    .findByIdAndRemove({ _id: req.params.id })
    .then((employee) => {
      res.json("Employee Deleted Successfully");
    })
    .catch((err) => {
      res.send("Something Went Wrong");
    });
});

// register endpoint
router.post("/register", (request, response) => {
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const register_data = new register_model({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      register_data
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully from express",
        e,
      });
    });
});

router.post("/login", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const existingUser = await register_model.findOne({ email: email });
  if (!existingUser)
    return res.json({ msg: `No account with this email found` });
  const doesPasswordMatch = bcrypt.compareSync(password, existingUser.password);
  if (!doesPasswordMatch) return res.json({ msg: `Passwords did not match` });
  res.send("login successful");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toLocaleDateString("de-DE").replaceAll(".", "-") +
      " " +
      new Date().toLocaleTimeString().replaceAll(":", ".") +
      ".png";
    cb(null, file.fieldname + " " + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.single("poster"), (req, res, next) => {
  const title = req.body.title;
  const blog = req.body.blog;
  const author = req.body.author;
  create_data = new create_model({
    title: title,
    blog: blog,
    author: author,
    poster: {
      data: fs.readFileSync(
        path.join(__dirname, "../upload/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  });
  create_data.save();
  // res.send(`your form is submitted your successfully :) testing ${create_data}`)
  res.jsonp({ success: true });
});

router.post("/adminCreate", upload.single("poster"), (req, res, next) => {
  const title = req.body.title;
  const blog = req.body.blog;
  const author = req.body.author;
  const bid = req.body.bid;
  admin_create_data = new admin_create_model({
    title: title,
    blog: blog,
    author: author,
    bid: bid,
    poster: {
      data: fs.readFileSync(
        path.join(__dirname, "../upload/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  });
  admin_create_data.save();
  // res.send(`your form is submitted your successfully :) testing ${create_data}`)
  res.jsonp({ success: true });
});

router.post("/upload", upload.single("image"), (req, res) => {
  const name = req.body.name;
  const desc = req.body.desc;
  data = new uploadModel({
    name: name,
    desc: desc,
    image: {
      data: fs.readFileSync(
        path.join(__dirname, "../upload/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  });
  data.save();
  res.send(data);
});

router.post("/subscribe", async (req, res) => {
  subscribe = req.body.subscribe;
  const existingUser = await subscribeModel.findOne({ subscribe: subscribe });
  // if (existingUser) return (res.send('Already Subscribed 😀'))
  if (existingUser) return res.send(existingUser);
  data = new subscribeModel({
    subscribe: subscribe,
  });
  data.save();
  res.send("Subscription Added Successfully 😊");
});

router.get("/userBlogs", (req, res) => {
  create_model.find().then((data) => {
    res.send(data);
  });
});

router.get("/adminBlogs", (req, res) => {
  admin_create_model.find().then((data) => {
    res.send(data);
  });
});

// testing
router.get("/adminBlogs/:name", async (req, res) => {
  const bid = req.params.bid;
  const data = await admin_create_model.findOne({ bid: bid });
  res.send(data);
});

console.log(__dirname);
module.exports = router;
