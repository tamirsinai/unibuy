import {Application} from "express";
import {StoresMongo} from "./out/store-mongo";
import {Store} from "./models/store";

function init(app: Application) {
    app.post('/createStore', createStore);
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
