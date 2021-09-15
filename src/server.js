import express from "express"

import authorRoute from "./services/authors/authors.js"

import cors from "cors"

import listEndpoints from "express-list-endpoints"


const server = express()
const port = 3001
//localhost:3001/authors

server.use(cors())

server.use(express.json())




server.use("/authors", authorRoute)

server.listen(port, () => {
    console.log(`Server is running on port:`, port)
})

server.on("error", (error) => {
    console.log(`Server is not working because of : ${error}`)
})