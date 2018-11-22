import * as express from 'express';
import { family } from '../mocks/family';
import {exampleRouter} from './example.router';

const familyRouter = express.Router();

familyRouter.get('/', (req, res) => {
    res.status(200).json(family);
});

familyRouter.post('/', (req, res) => {
    const body = req.body;

    console.log('familyRouter post body', body);

    res.status(200).json(body);
});

export { familyRouter };

