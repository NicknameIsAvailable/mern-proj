import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js"
import {userController, postController} from "./controllers/index.js";
import {handleValidationErrors, checkAuth} from "./utils/index.js";

mongoose
    .connect('mongodb+srv://admin:12345@cluster0.dj8vu.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, userController.register)
app.post('/auth/login', loginValidation, userController.login)
app.get('/auth/me', checkAuth, userController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.get('/posts/', postController.getAll)
app.get('/posts/:id', postController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, postController.create)
app.delete('/posts/:id', checkAuth, postController.remove)
app.patch('/posts/:id', postCreateValidation, checkAuth, handleValidationErrors, postController.update)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')
})

