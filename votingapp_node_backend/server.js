import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/voterRoutes.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,{}).then(()=>{
    console.log("MongoDb connected");
}).catch((err)=>{
    console.error("Error connecting to MongoDb",err);
});



app.get('/', (req, res) => {
    res.send('Voting App Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use('/api/voter', router); // add new user
app.use('/infromation',router); // get infomation of the voter


