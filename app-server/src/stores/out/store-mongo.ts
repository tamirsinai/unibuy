import {BasicUser} from "../../users/models/user";
import {MongoModel} from "../../mongo-connector/mongo-connector";
import {Store} from "../models/store";

async function createStore(store: Store) {
    const newStore = new MongoModel.Store({ name: store.name, adminId: store.adminId, description: store.description, createdAt: new Date(), updatedAt: new Date() });
    return await newStore.save();
}

export const StoresMongo = {createStore};
