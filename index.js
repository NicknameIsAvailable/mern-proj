import express from 'express'
import mongoose from 'mongoose'
import {registerValidation} from "./validations/auth.js"
import checkAuth from "./utils/checkAuth.js";

import * as userController from "./controllers/userController.js";

mongoose
    .connect('mongodb+srv://admin:12345@cluster0.dj8vu.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/register', userController.register)
app.post('/auth/login', userController.login)
app.get('/auth/me', checkAuth, userController.getMe)

// app.get('/', (req, res) => {
//     res.send('hello world')
// })



app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})

