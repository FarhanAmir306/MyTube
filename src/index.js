	
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import {app} from './app.js'


dotenv.config({
    path: './env'
});


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
    
}).catch(()=>{
    console.error('Failed to connect to MongoDB');
    process.exit(1);  // exit the app with error code 1
})













// 1st approach 
// import express from 'express';
// const app = express();
// // Connect to MongoDB
// // before semicolon for cleanCode 
// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         console.log('Connected to MongoDB');
//         app.listen(process.env.PORT,()=>{
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error('Failed to connect to MongoDB', error);
//     }

// })()