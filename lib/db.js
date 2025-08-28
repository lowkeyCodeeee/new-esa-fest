import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;

if (!uri) {
  throw new Error(" Missing MONGO_CONNECTION_STRING in environment variables");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global cached connection in dev mode (hot reloads)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for each invocation
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect();
}

export async function connectDB() {
  const client = await clientPromise;
  return client.db("testmongoDB");
}
