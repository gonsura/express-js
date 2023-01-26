const express = require('express')

const app = express()
const port = 3333

app.use(express.json())

const books = [
    {id:1, tittle: 'node js', description: 'learning node for beginner'},
    {id:2, tittle: 'pyton', description: 'learning pyton for beginner'},
    {id:3, tittle: 'ruby', description: 'learning ruby for beginner'},
    {id:4, tittle: 'js', description: 'learning js for beginner'}
]

app.get('/', (req, res) =>{
    res.json({message: "hello ini respons menggunakan json"})
    // res.send('hello ini guys')
}) 

app.get('/books', (req, res) => {
    const data = books
    const result = {
        status: 'ok',
        data: data,
    }
    res.json(result)
})

app.get('/books/:id', (req, res) => {
    const { id } = req.params
    const book = books.filter(book => book.id === Number(id))
    if(book.length === 0) {
       return res.status(404).json({status: 'failed', message: `data book with id ${id} not found`})
    }
    res.json({status: 'ok', data: book})
})

app.post('/books', (req, res) => {
    const { tittle, description } = req.body
    const lastItemBookId = books[books.length -1].id
    const newIdBook = lastItemBookId + 1
    const newBookData = { id: newIdBook, tittle: tittle, description: description}
    books.push(newBookData)
    res.status(201).json({status: 'ok', message: 'succes creat new book', data: newBookData})
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params
    res.send(`ini merupakan users dengan id ${id}`)
})

app.listen(port, () => console.log(`server running on port ${port}`))