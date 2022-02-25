// Modules / Global Variables
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
// fs.readFile('comments.json', 'utf-8', (err, data) => {
//     if (err) {throw err;} else {
//         return data;
//     }
// })
// const comments = JSON.parse(data);
// fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
//     if (err) { console.log('error found:' + err)} else {return;}
// });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true}))

// Comment Template
class Comment {
    constructor(username, commentData) {
        this.name = username,
        this.info = commentData
    }
}
// Create a root endpoint
app.get('/', function (req, res) {
    var orderFile = JSON.parse(fs.readFileSync('orders.json'));
    res.render('home', {
        previousOrders: orderFile.orders
    });
})

app.get('/neworder', function (req, res) {
    res.render('neworder')
})
app.get('/additem', function (req, res) {
    res.render('additem')
})
app.get('/view', function (req, res) {
    if (req.query.order) {
        res.render('view.ejs', {

        });
    } else {
        res.render
    }
})
app.post('/neworder', function(req, res){
    console.log(req.body.cName)
    console.log(req.body.cAddy)
    if (req.body.cName && req.body.cAddy) {
        var data = JSON.parse(fs.readFileSync('orders.json'));
        let order = {
            orderNumber: data.orders.length,
            customerName: req.body.cName,
            customerAddress: req.body.cAddy,
            items: [],
            subtotal: 0,
            tax: 0,
            total: 0
        }

        app.post('/additem', function(req, res){
            console.log(req.body.cName)
            console.log(req.body.cAddy)
            if (req.body.cName && req.body.cAddy) {
                var data = JSON.parse(fs.readFileSync('orders.json'));
                let order = {
                    orderNumber: data.orders.length,
                    customerName: req.body.cName,
                    customerAddress: req.body.cAddy,
                    items: [],
                    subtotal: 0,
                    tax: 0,
                    total: 0
                }
        console.log(order)
        data.orders.push(order)
        fs.writeFile('orders.json', JSON.stringify(data), function(err) {} )
        res.redirect('/')
    } else {
        res.send(`ERROR: You left one or more of the fields blank`)
    }
});

// Start Website Server / Open Connections
var port = 5000
app.listen(port, function () {
    console.log(`mommy discord channel ready on port ${port}`)
})
