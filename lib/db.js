// lib/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;




// local
// const uri = 'mongodb://localhost:27017';

// production 
const prod = 'mongodb+srv://rizskplay:QOSRblZXd3IY96Fz@cluster0.z3ss9wr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// test prod


const client = new MongoClient(uri);

export default async function connectDB(){
    try {
        await client.connect();

        console.log('Connected to Mongo DB');

        const db = client.db('testmongoDB');
        return db;
    } catch(err) {
        console.log('DB connection error error :: ', err);
    }
}


