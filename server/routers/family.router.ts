import * as express from 'express';
import * as fromFamily from '../mocks';
import {exampleRouter} from './example.router';

const familyRouter = express.Router();

familyRouter.get('/', (req, res) => {
    res.status(200).json(fromFamily.family);
});

familyRouter.get('/:id', (req, res) => {
    console.log(req.params);
    if (req.params && typeof +req.params.id === "number") {
        if (fromFamily["family" + req.params.id]) {
            res.status(200).json(fromFamily["family" + req.params.id]);
        } else {
            res.status(200).json("no such family");
        }
    }
});

familyRouter.post('/', (req, res) => {
    const body = req.body;

    console.log('familyRouter post body', body);

    res.status(200).json(body);
});

export { familyRouter };

