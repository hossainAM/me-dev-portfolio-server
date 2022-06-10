const express = require('express');
const cors = require('cors');
const {
    MongoClient,
    ServerApiVersion,
    ObjectId
} = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
// app.use(cors());
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(cors(corsConfig)));

app.use(express.json());

//Connect to database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lqzpn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try{
        await client.connect();
        // console.log('db connected')
        const projectCollection = client.db('my-dev-portfolio').collection('projects');

        app.get('/item', async (req, res) => {
            const result = await projectCollection.find().toArray();
            res.send(result);
        });

        app.get('/item/:id', async (req, res) => {
            const id = req.params.id;
            // console.log(id)
            const query = {_id: ObjectId(id)};
            const result = await projectCollection.findOne(query);
            // console.log(result)
            res.send(result);
        });
      
    }
    finally {

    }
}
run().catch(console.dir);




//Root API
app.get('/', (req, res) => {
    res.send('Server is running')
})

//Dynamic route
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});