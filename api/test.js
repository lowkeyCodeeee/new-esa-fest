import { connectDB } from "../lib/db.js";

export default async function test(req, res) {
  if (req.method === "GET") {
    try {
      const db = await connectDB();
      const students = await db.collection("attendance").find().toArray();

      res.status(200).json({ studentList: students });
    } catch (err) {
      console.error("❌ DB error:", err);
      res.status(500).json({ error: "Database connection failed", details: err.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
