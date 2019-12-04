// // index.js
// const { ServiceBroker } = require("moleculer");
// const HTTPServer = require("moleculer-web");
// // const nodemailer = require("nodemailer");
// const mongoose = require("mongoose")
// const mailjet = require('node-mailjet').connect('33838f2d1a52859b1cdea1bec6a1e15c', 'a3ad7013241fa231625ab74c1528138e')

// // connect mongoose
// const brokerNodeDb = new ServiceBroker({
//     nodeID: "node-Db"
// })

// // Create the broker for node-1
// // Define nodeID and set the communication bus
// const brokerNode1 = new ServiceBroker({
//     nodeID: "node-1",
//     transporter: "nats://206.189.35.187:4222"
// });

// // Create the "gateway" service
// brokerNode1.createService({
//     // Define service name
//     name: "gateway",
//     // Load the HTTP server
//     mixins: [HTTPServer],

//     settings: {
//         routes: [
//             {
//                 aliases: {
//                     // When the "GET /products" request is made the "listProducts" action of "products" service is executed
//                     "GET /products": "products.listProducts",
//                     "GET /nodemailer": "nodemailer.sendMail"
//                 }
//             }
//         ]
//     }
// });

// // Create the broker for node-2
// // Define nodeID and set the communication bus
// const brokerNode2 = new ServiceBroker({
//     nodeID: "node-2",
//     transporter: "nats://206.189.35.187:4222"
// });

// // Create the "products" service
// brokerNode2.createService({
//     // Define service name
//     name: "products",

//     actions: {
//         // Define service action that returns the available products
//         listProducts(ctx) {
//             return [
//                 { name: "Apples", price: 5 },
//                 { name: "Oranges", price: 3 },
//                 { name: "Bananas", price: 2 }
//             ];
//         }
//     }
// });


// const brokerNode3 = new ServiceBroker({
//     nodeID: "node-3",
//     transporter: "nats://206.189.35.187:4222"
// });


// brokerNode3.createService({
//     name: "nodemailer",
//     actions: {
//         sendMail() {
//             const request = mailjet
//                 .post("send", { 'version': 'v3.1' })
//                 .request({
//                     "Messages": [
//                         {
//                             "From": {
//                                 "Email": "tranhoanglinh11101998@gmail.com",
//                                 "Name": "Tran"
//                             },
//                             "To": [
//                                 {
//                                     "Email": "hoangnguyenminh.hust@gmail.com",
//                                     "Name": "Minh"
//                                 }
//                             ],
//                             "Subject": "Greetings from Mailjet.",
//                             "TextPart": "My first Mailjet email",
//                             "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//                             "CustomID": "AppGettingStartedTest"
//                         }
//                     ]
//                 })
//             request
//                 .then((result) => {
//                     console.log(result.body)
//                     // console.log('done send request to Mailjet')
//                 })
//                 .catch((err) => {
//                     console.log(err.statusCode)
//                 })

//             // var carrier = nodemailer.createTransport({
//             //     service: "Gmail",
//             //     auth: {
//             //         user: 'fa.by.katarina2998@gmail.com',
//             //         pass: '3chapnhandi'
//             //     }
//             // });
//             // var mainOptions = {
//             //     from :"Linhdz",
//             //     to : "hoangnguyenminh.hust@gmail.com",
//             //     subject: "test service + nodemailer",
//             //     text: "you recieved email from" + carrier.auth.user,
//             //     html: `<h1>dit me may</h1>`
//             // };
//             // carrier.sendMail(mainOptions,(err, info) => {
//             //     if(err) console.log(err);
//             //     else console.log("message send");
//             // })
//         }
//     }
// })

// // Start both brokers
// Promise.all([brokerNode1.start(), brokerNode2.start(), brokerNode3.start()]);


"use strict";

const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");

const broker = new ServiceBroker();

// Create a Mongoose service for `post` entities
broker.createService({
    name: "posts",
    mixins: [DbService],
    adapter: new MongoDBAdapter("mongodb://admin:admin1@ds351428.mlab.com:51428/moleculer_test"),
    collection: "posts"
});


broker.start()
// Create a new post
.then(() => broker.call("posts.create", {
    user: "linhdz",
    password: "linhdz123",
    votes: 0
}))

// Get all posts
.then(() => broker.call("posts.find").then(console.log));