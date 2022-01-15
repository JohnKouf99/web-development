const express = require ('express') // fortwnei to dependency to express
const cors = require ('cors') // fortwnei to dependency to cors gia thn antimetwpish cors erros sto post kai sto response tou server 
const MongoClient = require('mongodb').MongoClient //gia thn sundesh sto db 
const app = express()
app.use(cors()) 

app.use(express.json({limit: '1mb'})); //o express mas douleuei me json data


const username = 'aizen' // gia sundesh ths db 
const password = 'I6PkEu0wSt3lGHNO'
const host = 'cluster0.qfvfs.mongodb.net/myFirstDatabase'
const uri = `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`

//mongodb+srv://aizen:I6PkEu0wSt3lGHNO@cluster0.qfvfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongodb = new MongoClient( uri,  //kataskeuazoume new client gia sundesh db 
    {useNewUrlParser: true});

app.get('/', (req, res) => { // get request sto '/' dinoume pisw ena server.html file 
    res.sendFile(__dirname + '/server.html');
});

app.get('/register', (req, res) => { //get request sto '/' dinoume pisw ena minima
    console.log('got a GET')
    res.send('This is register page');
});

const registerController = (request, res, next) => { //
    console.log('got a POST')
    console.log(request.body)
    const data = request.body; //pairnoume to data pou einai to request body 

    mongodb.connect() //promise gia connect sth database 
        .then(() => {
            const query = { email: data.email} // query giat to mail 
            return mongodb.db("users-db")
                .collection("users").findOne(query)  //psaxnw gia mia toulaxiston eggrafh tou mail 
        })
        .then( user => {
            if (user?._id){ //elegxos gia to an to user einai null 
                throw new Error ('Bad request', 400) // an einai gurnaei error
            }
            else {
                return mongodb.db("users-db") 
                    .collection("users").insertOne(data) //alliws kanei insert ton user 
            }
        })
        .then(doc => { // to return appo panw gurnaei doc me pedio acknowledged
            if (doc.acknowledged) { //ean uparxei 
                res.json({
                    status:"Success.", //o server gurnaei touto to response
                })
            }
            else {
                throw new Error ('Operation failed.') //alliws petaei error
            }
        })
        .catch(err => {
            next(err.message) //catcharoume ola ta errors kai ta gurname ston client 
        })
        .finally(() => {
            console.log('Closing connection') 
            mongodb.close() // kleinoume thn sundesh me to db 
        })
}

const profileController = (request, res, next) => { //
    console.log('got a POST')
    console.log(request.body)
    const data = request.body; //pairnoume to data pou einai to request body 

    mongodb.connect() //promise gia connect sth database 
        .then(() => {
            const query = { 
                email: data.email,
                password: data.password
            } // query giat to mail kai to password
            return mongodb.db("users-db")
                .collection("users").findOne(query)  //psaxnw gia mia toulaxiston eggrafh tou mail 
        })
        .then( user => {
            console.log(user)
            if (user) { //ean uparxei 
                res.json({
                    foundUser: user
                })
            }
            else {
                throw new Error ('Incorrect credentials.') //alliws petaei error
            }
        })
        .catch(err => {
            next(err.message) //catcharoume ola ta errors kai ta gurname ston client 
        })
        .finally(() => {
            console.log('Closing connection') 
            mongodb.close() // kleinoume thn sundesh me to db 
        })
}



app.post('/register', registerController); // handleroume to post request sto /register me to registerController parapanw

app.post('/profile', profileController); // handleroume to post request sto /register me to registerController parapanw
   
const port = 3000 //port pou akouei to app mas 
app.listen(port, () => console.log(`This app is listening on port ${port}`)); //anoigoume to port

