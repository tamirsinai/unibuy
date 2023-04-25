import {SellingItem} from "../../models/selling-item";
import {MongoConnector, MongoModel} from "../mongo-connector";

export class MongoInterface{
    protected sellingItemModel: any;

    constructor(mongoConnector:MongoConnector) {
        this.sellingItemModel = mongoConnector.sellingItemModel;
    }

    protected mapResponseToObject<T>(res): T{
        const val:T = res.toObject();
        val["_id"] = undefined;
        return val;
    }
}

export async function getStoreItems(storeId: any) {
    return MongoModel.SellingItem.find({storeId});
}

export async function insert(selling: SellingItem[]) {
    return MongoModel.SellingItem.insertMany(selling);
}
