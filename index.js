/* const http = require('http') */
const express = require('express')
const app = express()
let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can excute only javascript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most imprtant methods of HTTP protocol",
        important: true
    }
]
/* const app = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(notes))
}) */
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end('Not Found')
    }
})
app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.filter(note => note.id !== id)

    res.status(204).end('deleted successfully')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})