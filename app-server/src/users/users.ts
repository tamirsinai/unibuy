import {BasicUser} from "./models/user";
import {Application} from "express";
import {UsersMongo} from "./out/user-mongo";
const nodemailer = require("nodemailer");

function init(app: Application) {
    app.get('/users', getAllUsers);
    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/pay', pay);
}
async function signUp(req, res) {
    let response;
    try {
        console.log(`Got request to sign up with ${JSON.stringify(req.body)}`);
        const basicUser: BasicUser = req.body;
        response = await UsersMongo.createUser(basicUser);
    } catch (error) {
        console.log(error);
        response = `Error sign up user`;
    }
    res.send(response);
}

async function login(req, res) {
    let response;
    try {
        console.log(`Got request to login with ${JSON.stringify(req.body)}`);
        const basicUser: BasicUser = req.body;
        response = await UsersMongo.login(basicUser);
    } catch (error) {
        console.log(error);
        response = `Error sign up user`;
    }
    res.send(response);
}

async function getAllUsers(req, res) {
    let response;
    try {
        console.log(`Got request to login with ${JSON.stringify(req.body)}`);
        response = await UsersMongo.getAllUsers();
    } catch (error) {
        console.log(error);
        response = `Error sign up user`;
    }
    res.send(response);
}

async function pay(req, res) {
    let response;
    try {
        console.log(`Got request to pay with ${JSON.stringify(req.body)}`);
        response = await UsersMongo.pay(req.body.storesOwnerIdAndProfit, req.body.userId, req.body.userOrders);

        const sendMail = (details, callback) => {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: "unibuy6@gmail.com",
                    pass: 'zzpfgbvrunjzonli'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const html = `<h1>
                            <div>${req.body.order.name} Order</div>
                            <div>${req.body.order.products.map(prod => (prod.name))}</div>
                            <div>total price: $${req.body.order.price}</div>
                          </h1>`;
            const dfusOwnerMail = {
                from: 'unibuy6@gmail.com',
                to: [response.ordersEmails, response.res.email],
                subject: "Unibuy Order",
                html
            };

            transporter.sendMail(dfusOwnerMail, callback);
        };
        sendMail('', (err, info) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.send(false);
            } else {
                console.log("Email has been sent");
                res.send(true);
            }
        })

    } catch (error) {
        console.log(error);
        response = `Error pay user`;
    }
    res.send(response);
}

export const UsersAPI = {init};
