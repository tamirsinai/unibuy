import path from 'path';
import cors from 'cors';
import express from 'express'
import {SearchApi} from "../search/search-api";
import {MongoConnector} from "../mongo-connector/mongo-connector";
import {MongoSearcher} from "../search/out/mongo-searcher";
import {ShopApi} from "../shop/shop-api";
import {MongoInterface} from "../mongo-connector/out/mongo-interface";
import {UsersAPI} from "../users/users";
import {StoresAPI} from "../stores/stores";

export class Unibuy {

    async init() {
        const app = this.createExpressServer();
        const mongo = new MongoConnector();
        await mongo.connect();
        new SearchApi(app, new MongoSearcher(mongo));
        new ShopApi(app);
        UsersAPI.init(app);
        StoresAPI.init(app);
        app.listen(8080, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:8080`);
        });
    }

    private createExpressServer() {
        const app = express();
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');
        app.use(express.json());
        app.use(cors())
        app.use(express.urlencoded({extended: false}));
        app.use(express.static(path.join(__dirname, 'public')));
        return app;
    }
}
