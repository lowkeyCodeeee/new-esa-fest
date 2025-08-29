// lib/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;

if (!uri) {
  throw new Error("❌ Missing MONGO_CONNECTION_STRING in environment variables");
}

let client;
let clientPromise;

// Cache connection in global object for re-use across hot reloads & serverless invocations
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production (Vercel), still cache to avoid reconnecting on every invocation
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export async function connectDB() {
  const client = await clientPromise;
  return client.db("testmongoDB"); // use your DB name
}
