/* const http = require('http') */
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())


app.use(express.json())
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
const generateID = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => Number(n.id))) : 0

    return String(maxId + 1)
}
app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateID()
    }

    notes = notes.concat(note)
    res.json(note)
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
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)

    res.status(204).end('deleted successfully')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})