import { connectDB } from "../lib/db.js";
import { getAllStudents } from "../lib/middleware.js";

export default async function handler(req, res) {
  // 🔹 Always set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all, or set your frontend domain
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // preflight request
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await connectDB();
    const students = await getAllStudents(db);
    res.status(200).json({ studentList: students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
