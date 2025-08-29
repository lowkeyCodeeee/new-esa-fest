import { connectDB } from "../lib/db.js";
import { getAllStudents } from "../lib/middleware.js";
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const db = await connectDB();
    const students = await getAllStudents(db);
    res.status(200).json({ studentList: students });
  } catch (err) {
    console.error("❌ Error in getstudents:", err); // 🔹 log full error
    res.status(500).json({ message: err.message }); // 🔹 return real error message
  }
}



// to do
// 500 internal server error 