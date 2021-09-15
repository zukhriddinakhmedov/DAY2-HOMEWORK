// GET /authors => returns the list of authors
// GET /authors/123 => returns a single author
// POST /authors => create a new author
// PUT /authors/123 => edit the author with the given id
// DELETE /authors/123 => delete the author with the given id

import express from "express"



import fs from "fs"

import uniqid from "uniqid"

import path, { dirname } from "path"

import { fileURLToPath } from "url"

const _filename = fileURLToPath(import.meta.url)

const _dirname = dirname(_filename)

const authorJsonPath = path.join(_dirname, "authors.json")

const cwd = process.cwd()



const authorRoute = express.Router()

authorRoute.get("/", (req, res) => {
    try {
        const authorsBuffer = fs.readFileSync(authorJsonPath)
        const authorsAsString = authorsBuffer.toString()
        const authorsAsJson = JSON.parse(authorsAsString)
        res.send(authorsAsJson)
    } catch (error) {

    }
})

authorRoute.get("/:id", (req, res) => {
    const authorsBuffer = fs.readFileSync(authorJsonPath)
    const authorsAsString = authorsBuffer.toString()
    const authorsAsJson = JSON.parse(authorsAsString)
    const author = authorsAsJson.find(author => author.id === req.params.id)
    if (!author) {
        res
            .status(404)
            .send({ message: `Author with ${req.params.id} is not found` })
    }
    res.send(author)
})

authorRoute.post("/", (req, res) => {
    try {
        const { name, surname, email, dateOfBirth } = req.body
        const author = {
            id: uniqid(), name,
            surname,
            email,
            dateOfBirth,
            avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const authorsBuffer = fs.readFileSync(authorJsonPath)

        const authorsAsString = authorsBuffer.toString()

        const authorsArray = JSON.parse(authorsAsString)
        authorsArray.push(author)

        fs.writeFileSync(authorJsonPath, JSON.stringify(authorsArray))
        res.send(author)
    } catch (error) {
        res.send(500).send({ message: error.message })
    }

})

authorRoute.put("/:id", (req, res) => {
    const authorsBuffer = fs.readFileSync(authorJsonPath)
    let authorsArray = JSON.parse(authorsBuffer.toString())
    const authorIndex = authorsArray.findIndex(author => author.id === req.params.id)
    authorsArray.findIndex(author => author.id === req.params.id)
    if (authorIndex !== -1) {//if it is found
        let author = authorsArray[authorIndex]
        author = { ...author, ...req.body, updatedAt: new Date() }
        authorsArray[authorIndex] = author
        fs.writeFileSync(authorJsonPath, JSON.stringify(authorsArray))
        res.send(author)
    }
    else {
        res.status(404).send("Author is not found!")
    }
})
authorRoute.delete("/:id", (req, res) => {
    const authorsBuffer = fs.readFileSync(authorJsonPath)
    let authorsArray = JSON.parse(authorsBuffer.toString())
    const author = authorsArray.find(author => author.id === req.params.id)
    if (author) {
        authorsArray = authorsArray.filter(author => author.id !== req.params.id)
        fs.writeFileSync(authorJsonPath, JSON.stringify(authorsArray))
        res.send("THE AUTHOR DELETED ")
    }
    else {
        res.status(404).send("Author is not found!")
    }
})

export default authorRoute