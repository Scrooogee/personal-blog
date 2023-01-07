import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secretToken');

            req.userId = decoded._id;

            next()
        } catch (error) {
            res.status(403).json({
                massage: 'Not permission'
            })
        }
    } else {
        return res.status(403).json({
            massage: 'Not permission'
        })
    }

}