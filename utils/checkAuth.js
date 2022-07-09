import jwt from 'jsonwebtoken'


export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, '~A|1Q5m5ki7Gg4za')

            req.userId = decoded._id
            next()
        } catch (err) {
            return res.status(403).json({
                message: 'нет доступа'
            })
        }
    } else {
        return res.status(403).json({
            message: 'нет доступа'
        })
    }
}
