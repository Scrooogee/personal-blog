import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';


import { registerValidation, postValidation } from './validations/index.js';
import { checkAuth } from './utils/index.js';
import { Register, Login, AuthMe } from './controllers/UserController.js';
import { Create, GetAll, GetOne, Remove, Update, GetLastTags } from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';


mongoose.connect('mongodb+srv://admin:admin@cluster0.texvksr.mongodb.net/blog?retryWrites=true&w=majority').then(() => console.log('DB is OK')).catch((err) => console.log(err))

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)

    }
});


app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))


const upload = multer({ storage })


app.post('/auth/login', handleValidationErrors, Login);
app.post('/auth/register',registerValidation, handleValidationErrors, Register);
app.get('/auth/me', checkAuth, AuthMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    try {
        res.json(req.file.path)
    } catch (error) {
        console.log(error)
    }
    
});

app.get('/tags',  GetLastTags);

app.post('/posts', checkAuth, postValidation, Create);
app.get('/posts', GetAll);
app.get('/posts/tags',  GetLastTags);
app.get('/posts/:id', GetOne);
app.delete('/posts/:id', checkAuth, Remove);
app.patch('/posts/:id', checkAuth, postValidation, Update);



app.listen(4000, (err) => err ? console.log(err) : console.log('Server is working'))