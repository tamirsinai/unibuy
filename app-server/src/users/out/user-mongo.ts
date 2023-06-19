import {BasicUser} from "../models/user";
import {MongoModel} from "../../mongo-connector/mongo-connector";
const { ObjectId } = require('mongodb');

async function createUser(basicUser: BasicUser) {
    const newUser = new MongoModel.User({ email: basicUser.email, password: basicUser.password, name: basicUser.name, isSeller: false, isAdmin: false, createdAt: new Date(), updatedAt: new Date() });
    return await newUser.save();
}

async function login(basicUser: BasicUser) {
    const user = await MongoModel.User.findOne({email: basicUser.email, password: basicUser.password});
    return user;
}

async function getUserByEmail(basicUser: BasicUser) {
    const user = await MongoModel.User.findOne({email: basicUser.email});
    return user;
}

async function getAllUsers() {
    const users = await MongoModel.User.find();
    return users;
}

async function updateUser(userId: any) {
    const updateUser = await MongoModel.User.updateOne({_id: ObjectId(userId)}, {$set: {isSeller: true}});
    return updateUser;
}

async function pay(storesOwnerIdAndProfit: any, userId: any, userOrders: any) {
    await MongoModel.User.updateOne({_id: ObjectId(userId)}, {$set: {orders: userOrders}});
    let res = await MongoModel.User.findOne({_id: ObjectId(userId)});
    let ordersEmails = [];
    for (let store of storesOwnerIdAndProfit) {
        let storeDbId = await MongoModel.Store.findOne({_id: ObjectId(store.id)});
        let storeUser = await MongoModel.User.findOne({_id: ObjectId(storeDbId.adminId)});
        ordersEmails.push(storeUser.email);
        await MongoModel.User.updateOne({_id: ObjectId(storeDbId.adminId)}, {$set: {orders: (storeUser.orders || 0) + store.orders, profit: (storeUser.profit || 0) + store.profit}});
    }
    return {res, ordersEmails};
}

export const UsersMongo = {createUser, login, updateUser, getAllUsers, pay};
