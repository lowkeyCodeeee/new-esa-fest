
import { connectDB } from "../lib/db";
import { getAllStudents } from "../lib/middleware";
const uri = process.env.MONGO_CONNECTION_STRING;


export default async function test(req, res) {
    if(req.method === 'GET'){
        res.status(200).json({status : 'ok', message : 'hello world', uri});
    }

    try {
        const db = await connectDB();
        const students = await getAllStudents(db);
        res.status(200).json({ studentList: students });
      } catch (err) {
        console.error("❌ Error in getstudents:", err); // 🔹 log full error
        res.status(500).json({db :'Error in connecting database mongodb',  message: err.message }); // 🔹 return real error message
      }
}