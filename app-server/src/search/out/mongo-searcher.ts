import {Filter} from "../models/filter";
import {MongoConnector, MongoModel} from "../../mongo-connector/mongo-connector";
import {MongoInterface} from "../../mongo-connector/out/mongo-interface";
import {SellingItem} from "../../models/selling-item";
import {UsersMongo} from "../../users/out/user-mongo";
import {BasicUser} from "../../users/models/user";


export class MongoSearcher extends MongoInterface{

    constructor(mongoConnector:MongoConnector) {
        super(mongoConnector);
    }

    async search(filter:Filter): Promise<SellingItem[]> {
        const findObject = {
            $and: [
                ...(filter.wordSearch ? [{
                    $or: [{name: {$regex: filter.wordSearch, $options: 'i'}},
                        {description: {$regex: filter.wordSearch, $options: 'i'}}]
                }] : []),
                ...(filter.tags?.length ? [{tags: {$in: filter.tags}}] : []),
                ...(filter.colors?.length ? [{colors: {$in: filter.colors}}] : [])
            ]
        }
        const result: any = await MongoModel.SellingItem
            .find({...findObject})
            .limit(filter.limit);
        return result.map(this.mapResponseToObject<SellingItem[]>);
    }

    async searchNewest() {
        const result: any = await MongoModel.SellingItem
            .find()
            .limit(16)
            .sort({creationDate: 1});
        return result.map(this.mapResponseToObject<SellingItem[]>);
    }
}
