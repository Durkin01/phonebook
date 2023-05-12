const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    id: 1,
    name: "HTML is easy",
    number: "2139123"
  },
  {
    id: 2,
    name: "David",
    number: "adsf"
  },
  {
    id: 3,
    name: "alex",
    number: "1231"
  },
]

app.get("/persons", (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})

app.delete('/persons/:id'), (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
}

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)