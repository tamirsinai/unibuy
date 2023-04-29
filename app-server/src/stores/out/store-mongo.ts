import {MongoModel} from "../../mongo-connector/mongo-connector";
import {Store} from "../models/store";
import {UsersMongo} from "../../users/out/user-mongo";
import {getStoreItems} from "../../mongo-connector/out/mongo-interface";
const { ObjectId } = require('mongodb');

async function getStore(adminId: any) {
    const store = await MongoModel.Store.findOne({adminId: ObjectId(adminId)});
    return store;
}
async function createStore(store: Store) {
    const newStore = new MongoModel.Store({ name: store.name, adminId: store.adminId, description: store.description, createdAt: new Date(), updatedAt: new Date() });
    await newStore.save();
    await UsersMongo.updateUser(store.adminId);
    return newStore;
}

export const StoresMongo = {createStore, getStore};
