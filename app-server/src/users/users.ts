import {BasicUser} from "./models/user";
import {Application} from "express";
import {UsersMongo} from "./out/user-mongo";

function init(app: Application) {
    app.get('/users', getAllUsers);
    app.post('/signup', signUp);
    app.post('/login', login);
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

export const UsersAPI = {init};
