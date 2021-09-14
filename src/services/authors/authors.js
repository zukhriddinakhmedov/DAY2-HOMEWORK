// GET /authors => returns the list of authors
// GET /authors/123 => returns a single author
// POST /authors => create a new author
// PUT /authors/123 => edit the author with the given id
// DELETE /authors/123 => delete the author with the given id

import express from 'express'
import fs from "fs"
import uniqid from "uniqid"
import path from "path"

const cwd = process.cwd()

const authorJsonPath = path.join(cwd, '/src/services/authors/authors.json')

const authorRoute = Router()

authorRoute.get("/", (req, res) => {
    const authorsBuffer = fs.readFileSync(authorJsonPath)
    const authorsAsString = authorsBuffer.toString()
    res.send(authorsBuffer)
})

authorRoute.get("/:id", (req, res) => {

})

authorRoute.post("/", (req, res) => {

})

authorRoute.put("/:id", (req, res) => {

})
authorRoute.delete("/:id", (req, res) => {

})

export default authorRoute