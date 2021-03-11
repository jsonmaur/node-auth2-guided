const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const usersRouter = require("./users/users-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoid recreating sessions that have not changed
	saveUninitialized: false, // comply with GDPR laws for setting cookies automatically
	secret: "keep it secret, keep it safe", // cryptographically sign the cookie
}))

server.use(usersRouter)
server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server
