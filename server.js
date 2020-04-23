const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const router = express.Router();

// Connect to mongoDB database
const uri = "mongodb+srv://admin:wordpass@mycluster-jo4p5.mongodb.net/work?retryWrites=true&w=majority";

// Configure port
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/addselect", (req, res) => {
    console.log('Insert Request', req.body.status, req.body.activity)
    
    //DB Connection
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    client.connect(err => {
        if (err) {
            console.error('Unable to connect to database', err.message);
        }
        console.log('Successfully connected to database');
        const collection = client.db("work").collection("quarantine");
        
        // perform actions on the collection object
        collection.insertOne(req.body, () => {
            console.log('Successfully Inserted to DB Collection');
        });
        
        client.close();
    });
});

app.use("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
    console.log(`Index is running on server succesfully`);
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
