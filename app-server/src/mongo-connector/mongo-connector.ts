import Mongoose from "mongoose";

export class MongoConnector {
    private database: Mongoose.Connection;
    private sellingItem: any;

    async connect() {
        const uri = "mongodb://localhost:27017/test";
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

        this.sellingItem = Mongoose.model('sellingItem', new Mongoose.Schema({
            name: {type: String},
            description: {type: String},
            creationDate: {type: Date},
            quantity:{type: Number},
            colors: {type: [String]},
            image: {type: String},
            tags: {type: [String]},
            sellersShop: {type: String}
        },{collection: 'sellingItem'}));
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