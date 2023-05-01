
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let notes = [
    {
        id: 1,
        content: "Briseida esta bien hermosa",
        important: true
    },
    {
        id: 2,
        content: "Me gusta la programación",
        important: true
    },
    {
        id: 3,
        content: "Soy SIMP",
        important: false
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)

    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const genereteId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0 
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(!body.content) {
        return response.status(404).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: genereteId(),
    }

    notes = notes.concat(note)
    response.json(notes)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})