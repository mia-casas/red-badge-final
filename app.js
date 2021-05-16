require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
// const middlewares = require("./middleware");


app.use(Express.json());

const controllers = require("./controllers");
app.use("/user", controllers.userController);

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server]: App is listening on ${process.env.PORT}`));
})
.catch((err) => console.log(`[Server]: Server crashed due to ${err}.`));


app.use('/test', (req, res) => {
    res.send("First Test")
});