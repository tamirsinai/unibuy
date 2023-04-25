import {Application} from "express";
import {StoresMongo} from "./out/store-mongo";
import {Store} from "./models/store";
import {getStoreItems} from "../mongo-connector/out/mongo-interface";

function init(app: Application) {
    app.post('/getStore', getStore);
    app.post('/createStore', createStore);
}

async function getStore(req, res) {
    let response;
    try {
        console.log(`Got request to get store with ${JSON.stringify(req.body)}`);
        const adminId: any = req.body.adminId;
        response = await StoresMongo.getStore(adminId);
        const items = await getStoreItems(response.id);
        response = {...response._doc, items};
    } catch (error) {
        console.log(error);
        response = `Error create store`;
    }
    res.send(response);
}
async function createStore(req, res) {
    let response;
    try {
        console.log(`Got request to create store with ${JSON.stringify(req.body)}`);
        const store: Store = req.body;
        response = await StoresMongo.createStore(store);
    } catch (error) {
        console.log(error);
        response = `Error create store`;
    }
    res.send(response);
}

export const StoresAPI = {init};
