require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");
const headers = require("./middleware/headers")


app.use(Express.json());
app.use(headers)

const controllers = require("./controllers");

app.use("/user", controllers.userController);
app.use("/post", controllers.postController);
app.use("/likes", controllers.likesController)

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server]: App is listening on ${process.env.PORT}`));
})
.catch((err) => console.log(`[Server]: Server crashed due to ${err}.`));


app.use('/test', (req, res) => {
    res.send("First Test")
});

// dbConnection.sync({
//         force: true
//     });