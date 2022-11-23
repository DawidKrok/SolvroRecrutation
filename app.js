const app = require("./loaders/express")
const mainRouter = require("./routers/mainRoutes")
const dataRouter = require("./routers/dataRoutes")
const userRouter = require("./routers/userRoutes")


app.use(mainRouter)
app.use(dataRouter)
app.use(userRouter)

// When nothing else handled request
app.use((req, res) => {
    res.status(404).render("errors/404", {title: "Status 404"})
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).render('errors/500', {})
})