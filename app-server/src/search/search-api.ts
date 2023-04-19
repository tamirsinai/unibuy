import {Application, Request, Response} from "express";
import {Filter} from "./models/filter";
import {MongoSearcher} from "./out/mongo-searcher";

export class SearchApi {

    constructor(app: Application, private mongoSearcher:MongoSearcher) {
        app.post('/search', this.search.bind(this))
        app.get('/search/newest', this.getNewestItems.bind(this))

    }

    private async search(req: Request, res: Response): Promise<void> {
        try {
            const filter: Filter = req.body;
            console.log(`searching ${JSON.stringify(filter)}`)
            res.send(JSON.stringify(await this.mongoSearcher.search(filter)));
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

    private async getNewestItems(req: Request, res: Response): Promise<void> {
        try {
            res.send(JSON.stringify(await this.mongoSearcher.searchNewest()));
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
}
