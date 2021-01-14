// require("dotenv").config()

// const usersRouter = require("./users/users-router")


// const server = require("./api/server")

// const port = process.env.PORT || 5000

// server.listen(port, () => {
//     console.log(`Running at http://localhost:${port}`)
// })



//another in package.json
require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const cors = require("cors")


const usersRouter = require("./users/users-router")

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())


server.use(usersRouter)
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})