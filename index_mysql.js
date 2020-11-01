var express = require("express");
var app = express();
app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("Server Started");
});

var bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "shubham",
    password: "1234",
    database: "TestDB",
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Database Connected");
});

app.post("/insert", (req, res) => {
    let data = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
    };
    let sql = "INSERT INTO product SET ?;";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(
            JSON.stringify({ status: 200, error: null, response: results })
        );
        console.log("Inserted!");
        res.send("Inserted!");
    });
});

app.get("/display", (req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(
            JSON.stringify({ status: 200, error: null, response: results })
        );
    });
});

app.get("/displayone/:id", (req, res) => {
    let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(
            JSON.stringify({ status: 200, error: null, response: results })
        );
    });
});

app.put("/update/:id", (req, res) => {
    let sql =
        "UPDATE product SET product_name='" +
        req.body.product_name +
        "', product_price='" +
        req.body.product_price +
        "' WHERE product_id=" +
        req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(
            JSON.stringify({ status: 200, error: null, response: results })
        );
    });
});

app.delete("/delete/:id", (req, res) => {
    let sql = "DELETE FROM product WHERE product_id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(
            JSON.stringify({ status: 200, error: null, response: results })
        );
    });
});
