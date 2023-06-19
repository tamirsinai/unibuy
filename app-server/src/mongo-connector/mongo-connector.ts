import Mongoose from "mongoose";

export class MongoConnector {
    private database: Mongoose.Connection;
    private sellingItem: any;

    async connect() {
        const uri = "mongodb+srv://unibuy:rOH7GtrxIyOwFFWc@cluster0.nxaud2d.mongodb.net/?retryWrites=true&w=majority";
        if (this.database) {
            return;
        }
        await Mongoose.connect(uri);
        this.database = Mongoose.connection;
        this.database.once("open", async () => {
            console.log("Connected to database");
        });
        this.database.on("error", () => {
            console.log("Error connecting to database");
        });

        /*this.sellingItem = Mongoose.model('sellingItem', new Mongoose.Schema({
            name: {type: String},
            description: {type: String},
            creationDate: {type: Date},
            quantity:{type: Number},
            colors: {type: [String]},
            image: {type: String},
            tags: {type: [String]},
            sellersShop: {type: String},
            storeId: {type: String}
        },{collection: 'sellingItem'}));*/
    }

    disconnect() {
        if (!this.database) {
            return;
        }

        Mongoose.disconnect();
    }

    get sellingItemModel(): any | Error {
       return this.sellingItem ?? new Error('Selling item has not been initialized yet');
    }
}

const User = Mongoose.model('users', new Mongoose.Schema({
    email: String,
    password: String,
    name: String,
    favoriteTags: String,
    isSeller: Boolean,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date,
    orders: Number,
    profit: Number
}));

const Store = Mongoose.model('stores', new Mongoose.Schema({
    name: String,
    adminId: String,
    description: String,
    createdAt: Date,
    updatedAt: Date
}));

const SellingItem = Mongoose.model('sellingItem', new Mongoose.Schema({
    name: {type: String},
    description: {type: String},
    creationDate: {type: Date},
    quantity:{type: Number},
    colors: {type: [String]},
    image: {type: String},
    tags: {type: [String]},
    sellersShop: {type: String},
    storeId: {type: String},
    price: {type: String}
},{collection: 'sellingItem'}));

export const MongoModel = {User, Store, SellingItem};
