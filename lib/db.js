import { MongoClient } from "mongodb";

const uri = process.env.MONGO_CONNECTION_STRING;

if (!uri) {
    throw new Error("❌ Missing MONGO_CONNECTION_STRING in environment variables");
}

// Global is used here to maintain cache across hot reloads in dev / Vercel functions
let client = global._mongoClient;

if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    global._mongoClient = client;
}

export async function connectDB() {
    if (!client.topology?.isConnected()) {
        await client.connect();
    }
    return client.db("testmongoDB");
}
