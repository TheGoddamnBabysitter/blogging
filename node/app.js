const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 
const port = process.env.PORT || 5000;

// Replace with your BulkSMSBD API credentials
// const username = 'CodeEmpire';
// const password = 'T6KKHVG6';
// const apiKey  = 'xj0JpFmqYSZ02nAapFQW';
// const senderId = '8809617614194';





app.use(cors());
app.use(express.json())



const uri = "mongodb+srv://Tashrif:tashrif55@cluster1.o8vqz8p.mongodb.net/?retryWrites=true&w=majority";
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
    await client.connect();

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  try {
    const database = client.db("post_collection");
    const post = database.collection("post");
    // Query for a movie that has the title 'The Room'
    const query = { _id: new ObjectId(`${id}`) };
  
    // Execute query
    const data = await post.findOne(query);
    // Print the document returned by findOne()
    res.send(data)
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
  });
  app.put('/update/:id', async (req, res) => {
    const database = client.db("post_collection");
    const post = database.collection("post");
    const id = req.params.id
    const data = req.body
    const filter = { _id: new ObjectId(`${id}`)};
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        title: `${data.title}`,
        post : `${data.paragraph}`,
        edit : data.edit
      },
     
    };
    const result = await post.updateOne(filter, updateDoc, options)
    console.log(data);

    });


    app.post("/delete", async (req, res) => {
    
      console.log(req.body);
      // console.log(req.body);
     const id = req.body.value
      
      const database = client.db("post_collection");
      const post = database.collection("post");
  
      
  
    
  
  
      // const query = { "_id": {"id": `${date}-${month}-${year}`} }; // Example query to find a specific item
      try {
        await post.deleteOne(
          { _id: new ObjectId(`${id}`)}
      );
        res.json({ message: 'Post deleted successfully',
      id: id
      });
      } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Failed to delete post' });
      }
  })



  // app.get('/posts/:id', async (req, res) => {
  //   try {
  //     const { query = {}, projection = {} } = req.query; // Allow optional query and projection parameters
  
  //     const db = client.db('post_collection');
  //     const collection = db.collection('post');
  
  //     const data = await collection.findOne(query, projection);
  
  //     if (!data) {
  //       return res.status(404).json({ message: 'Data not found' });
  //     }
  
  //     res.json(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });
    app.get("/posts", async(req, res)=>{
      
      const posts = client.db(`post_collection`).collection(`post`)

      const cursor = posts.find({})
      const result = await cursor.toArray()
      res.send(result);
  })
  

    app.post("/data", async (req, res) => {
    
      console.log("called");
      // console.log(req.body);

      const post = {title : req.body.title,
                    post : req.body.paragraph,
                    edit : 0
                    };
  
   
      // const main_department = doc.main_department;
      //   const standard = doc.cls;
      //   const version = doc.version;
      //   const category = doc.category;
      //   const sec = doc.form;
        
      const myDB = client.db("post_collection");
      const myColl = myDB.collection("post");
     
      const result = await myColl.insertOne(post);
    
      console.log(
         `A document was inserted with the _id: ${result.insertedId}`,
      );
  });




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" }); // Send error response
  }
   finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




 
app.get("/", (req, res)=>{
    res.send("the server is running")
} );

app.listen(port, ()=>{
    console.log(`listenning to ${port}`);
})













