import * as express from 'express';
import { dictionaries } from '../mocks/dictionaries';

const dictionariesRouter = express.Router();

dictionariesRouter.get('/', (req, res) => {
    res.status(200).json(dictionaries);
});

export default dictionariesRouter;