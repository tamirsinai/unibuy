import path from "path";
import express from 'express'
import {SearchApi} from "../search/search-api";
import {MongoConnector} from "../mongo-connector/mongo-connector";
import {MongoSearcher} from "../search/out/mongo-searcher";

export class Unibuy {

    async init() {
        const app = this.createExpressServer();
        const mongo = new MongoConnector();
        await mongo.connect();
        new SearchApi(app, new MongoSearcher(mongo));
        app.listen(8080, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:8080`);
        });
    }

    private createExpressServer() {
        const app = express();
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');
        app.use(express.json());
        app.use(express.urlencoded({extended: false}));
        app.use(express.static(path.join(__dirname, 'public')));
        return app;
    }
}