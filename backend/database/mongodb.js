const { MongoClient } = require("mongodb");

// MongoDB connection parameters
const uri = "mongodb+srv://elearningapp:SokUkJnDkrJG6Sgy@elearning.tu8ctow.mongodb.net/?retryWrites=true&w=majority";
const dbName = "eLearning";

// MongoDB client instance
let client;
let db;

// Connect to MongoDB
async function connect() {
  try {
    client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

function getDB() {
  return db;
}

// Insert a document into a collection
// async function insertDocument(collectionName, document) {
//   try {
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);
//     const result = await collection.insertOne(document);
//     console.log("Inserted document:", result.insertedId);
//   } catch (error) {
//     console.error("Error inserting document", error);
//   }
// }

// Close the MongoDB connection
function closeConnection() {
  if (client) {
    client.close().then(() => {
      console.log("MongoDB connection closed");
    });
  }
}

module.exports = {
  connect,
  getDB,
  closeConnection,
};
