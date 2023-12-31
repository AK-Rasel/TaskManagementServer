// taskmanagement


// ocYd59elS9Tqko7k


const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors");
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.SECRET_USER_NAME}:${process.env.SECRET_PASS}@cluster0.z9hqskk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const TasksCollection = client.db("taskmanagementDB").collection("Tasks");
    // task post
    app.post("/tasks", async (req, res) => {
        const task = req.body;
        const result = await TasksCollection.insertOne(task);
        res.send(result);
      });
  
      // task get
      app.get("/tasks", async (req, res) => {
        const result = await TasksCollection.find().toArray();
        res.send(result);
      });
      // tesk update
      // app.put("/tasks/:id", async (req, res) => {
      //   const id = req.params.id;
      //   const query = { _id: new ObjectId(id) };
      //   const upDateTask = req.body
        
      // });
  
  
      // task delete
      app.delete("/tasks/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = TasksCollection.deleteOne(query);
        res.send(result);
      });
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send("Crud is running...");
});

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`);
});

