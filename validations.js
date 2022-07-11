import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'неверный формат пароля').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'неверный формат пароля').isLength({min: 5}),
    body('fullName', 'укажите имя').isLength({min: 3}),
    body('avatarUrl', 'неверная ссылка на аватарку').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 3}).isString(),
    body('tags', 'Неверный формат тегов (укажите массив)').optional().isArray(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]