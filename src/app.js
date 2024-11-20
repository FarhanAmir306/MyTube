
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'})); //extended use for  object er vitorew object jeno thakte pare..

app.use(cookieParser());
app.use(express.static('public')) // Nijer server e image pdf ext. egula rakhar jonno..



// import routes 

import userRouter from './routes/user.route.js';

app.use('/api/v1/user',userRouter);


// import database connection


export {
    app
}