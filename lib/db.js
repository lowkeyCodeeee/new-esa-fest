// lib/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;

if (!uri) {
  throw new Error("❌ Missing MONGO_CONNECTION_STRING in environment variables");
}

// Create a new client for production
const client = new MongoClient(uri);
const clientPromise = client.connect();

export async function connectDB() {
  const connectedClient = await clientPromise;
  return connectedClient.db("testmongoDB"); // Replace with your DB name
}
