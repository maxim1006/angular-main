import * as express from 'express';
import { words } from '../mocks/rxjs';

const rxjsRouter = express.Router();

rxjsRouter.get('/words', (req, res) => {
    let filteredWords = words.filter(word => word.includes(req.query.value));

    setTimeout(() => {res.status(200).json(filteredWords);}, 500);
});

export { rxjsRouter };

