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

export const UsersMongo = {createUser, login, updateUser, getAllUsers};
