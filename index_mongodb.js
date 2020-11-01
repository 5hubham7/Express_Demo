var express = require("express");
var app = express();
app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server Started");
});

var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const mysql = require("mongodb").MongoClient;
var db;
const conn = MongoClient.connect(
    "mongodb://localhost:27017",
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) throw err;
        console.log("Database Connected!");
        db = client.db("TempDB");
    }
);

app.post("/insert", (req, res) => {
    let data = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    db.collection("users", (err, collection) => {
        if (err) throw err;
        collection.insertOne(data);
        console.log("Inserted!");
        res.send("Inserted!");
    });
});

app.get("/display", (req, res) => {
    db.collection("users", (err, collection) => {
        if (err) throw err;
        collection.find().toArray((err, result) => {
            if (err) throw err;
            console.log("Displaying!");
            console.log(result);
            res.send(result);
        });
    });
});

app.delete("/delete/:id", (req, res) => {
    db.collection("users", (err, collection) => {
        if (err) throw err;
        collection.deleteOne({ id: req.params.id }, (err, result) => {
            if (err) throw err;
            console.log("Deleted!");
            console.log(result);
            res.send(result);
        });
    });
});

app.put("/update/:id", (req, res) => {
    db.collection("users", (err, collection) => {
        if (err) throw err;
        collection.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            (err, result) => {
                if (err) throw err;
                console.log("Updated!");
                console.log(result);
                res.send(result);
            }
        );
    });
});

// app.get("/displayone/:id", (req, res) => {
//     let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(
//             JSON.stringify({ status: 200, error: null, response: results })
//         );
//     });
// });

// app.put("/update/:id", (req, res) => {
//     let sql =
//         "UPDATE product SET product_name='" +
//         req.body.product_name +
//         "', product_price='" +
//         req.body.product_price +
//         "' WHERE product_id=" +
//         req.params.id;
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(
//             JSON.stringify({ status: 200, error: null, response: results })
//         );
//     });
// });
