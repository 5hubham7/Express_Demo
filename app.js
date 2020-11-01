var express = require('express');
var app = express();
app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server Started");
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

var firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyBcplAhcyVhXi2JwZMNeN1K_fncg81vvXw",
    authDomain: "express-demo-fe736.firebaseapp.com",
    databaseURL: "https://express-demo-fe736.firebaseio.com",
    projectId: "express-demo-fe736",
    storageBucket: "express-demo-fe736.appspot.com",
    messagingSenderId: "715971435073",
    appId: "1:715971435073:web:57bad1b23f12ef562584c0",
    measurementId: "G-YN27JYDP2S"
};

app.get('/firebase', function (req, res) {

    console.log("HTTP firebase Get Request");
    res.send("HTTP firebase GET Request");
    //Insert key,value pair to database
    firebase.database().ref('/TestMessages').set({ TestMessage: 'Received GET req. This is dummy msg' });

});

let movies = [
    {
        id: "1",
        title: "Dil Bechara",
        actor: "SSR"
    },
    {
        id: "2",
        title: "Tanhaji",
        actor: "Ajay"
    }
];


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.post("/movie", (req, res) => {
    const new_movie = req.body;
    console.log(req.body)
    movies.push(new_movie);
    res.send("Movie Added");
})