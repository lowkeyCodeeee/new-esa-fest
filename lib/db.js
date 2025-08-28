import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;

if (!uri) {
  throw new Error("Missing MONGO_CONNECTION_STRING in environment variables");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse client across hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Always create a new client in prod
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectDB() {
  const client = await clientPromise;
  return client.db("testmongoDB"); // make sure this db name exists
}
