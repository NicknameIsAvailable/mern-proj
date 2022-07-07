import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

mongoose
    .connect('mongodb+srv://admin:12345@cluster0.dj8vu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/auth/login', (req, res) => {

    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
        fullName: "Василий Пупкин"
    }, 'OqvDM42wYbwSlfpO')

    res.json({
        success: true,
        token
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})

