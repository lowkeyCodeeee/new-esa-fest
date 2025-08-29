
import { connectDB } from "../lib/db.js";

// import { getAllStudents } from "../lib/middleware";
const uri = process.env.MONGO_CONNECTION_STRING;


export default async function test(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ status: 'ok', message: 'hello world', uri });
        // try {
        //     const db = await connectDB();
        //     // const students = await getAllStudents(db);

        //     const studentInstance = db.collection('attendance');
        //     const students = await studentInstance.find().toArray();

        //     res.status(200).json({ studentList: students });
        // } catch (err) {
        //     console.error("❌ Error in studentIns:", err); // 🔹 log full error
        //     res.status(500).json({ db: 'Error in connecting database mongodb', message: err.message }); // 🔹 return real error message
        // }
    }

    // res.status(400).json({msg : 'Bad request'});

}