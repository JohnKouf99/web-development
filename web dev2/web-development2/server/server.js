const express = require ('express')
const cors = require ('cors')
const MongoClient = require('mongodb').MongoClient
const { ListCollectionsCursor } = require('mongodb')
const { json } = require('body-parser')
const app = express()
app.use(cors())

app.use(express.json({limit: '1mb'}));


const username = 'aizen'
const password = 'I6PkEu0wSt3lGHNO'
const host = 'cluster0.qfvfs.mongodb.net/myFirstDatabase'
const uri = `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`

const mongodb = new MongoClient( uri, 
    {useNewUrlParser: true});



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/server.html');
});

app.get('/register', (req, res) => {
    console.log('got a GET')
    res.send('This is register page');
});

const registerController = (request, res, next) => {
    console.log('got a POST')
    console.log(request.body)
    const data = request.body;

    mongodb.connect()
        .then(() => {
            const query = { email: data.email}
            return mongodb.db("users-db")
                .collection("users").findOne(query)    
        })
        .then( user => {
            if (user?._id){
                throw new Error ('Bad request', 400)
            }
            else {
                return mongodb.db("users-db")
                    .collection("users").insertOne(data)
            }
        })
        .then(doc => {
            if (doc.acknowledged) {
                res.json({
                    status:"Success.",
                    email: data.email,
                    password: data.password,
                })
            }
            else {
                throw new Error ('Operation failed.')
            }
        })
        .catch(err => {
            next(err.message)
        })
        .finally(() => {
            console.log('Closing connection')
            mongodb.close()
        })
}

app.post('/register', registerController);
   
const port = 3000
app.listen(port, () => console.log(`This app is listening on port ${port}`));

