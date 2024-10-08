const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const userRoute = require("./routes/user");
const etablisRoute = require("./routes/etablis");
const agentRoute = require("./routes/agent");
const agenteesRoute = require("./routes//agentees");
const fronttabRoute = require("./routes/front-tab");
const evalRoute = require("./routes/eval-grid");
const condRoute = require("./routes/candidny");
const admisRoute = require("./routes/admission");
const staticRoute = require("./routes/statistics");

const userfile = require("./routes/user-file");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", userRoute);
app.use("/etablis", etablisRoute);
app.use("/agent", agentRoute);
app.use("/agentees", agenteesRoute);
app.use("/fronttab", fronttabRoute);
app.use("/eval", evalRoute);
app.use("/cond", condRoute);
app.use("/userfile", userfile);
app.use("/admis", admisRoute);
app.use("/static", staticRoute);

module.exports = app;
