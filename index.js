import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import {validationResult} from "express-validator";
import bcrypt from 'bcrypt'
import {registerValidator} from "./validations/auth.js"
import User from "./models/User.js"

mongoose
    .connect('mongodb+srv://admin:12345@cluster0.dj8vu.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

app.use(express.json())

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if (!user) {
            return req.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, use._doc.passwordHash)

        if(!isValidPass) {
            return req.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }
    } catch (err) {

    }
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/auth/register', async (req, res) => {

    try {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors, array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: req.body.password,
            avatarUrl: req.body.avatarUrl
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id,
        }, '~A|1Q5m5ki7Gg4za',
            {
                expiresIn: '30d'
            })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData, token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось зарегистрироваться",
        })
    }
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})

