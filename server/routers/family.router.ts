import * as express from 'express';
import * as fromFamily from '../mocks';
import {clearTimeout} from 'timers';

const familyRouter = express.Router();

familyRouter.get('/', (req, res) => {
    res.status(200).json(fromFamily.family);
});

let timeoutId;

familyRouter.get('/search', (req, res) => {

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        if (req.query && typeof req.query.query === 'string') {
            const foundFamilyMembers =
                fromFamily.family
                    .filter(item => item.name.toLowerCase().indexOf((req.query.query + "").toLowerCase()) > -1);

            if (foundFamilyMembers.length) {
                res.status(200).json(foundFamilyMembers);
            } else {
                res.status(200).json([]);
            }
        } else {
            res.status(200).json([]);
        }
    }, 300);
});

familyRouter.get('/families/:id', (req, res) => {
    if (req.params && typeof +req.params.id === 'number') {
        if (fromFamily['family' + req.params.id]) {
            res.status(200).json(fromFamily['family' + req.params.id]);
        } else {
            res.status(200).json('no such family');
        }
    }
});

familyRouter.post('/', (req, res) => {
    const body = req.body;

    console.log('familyRouter post body', body);

    res.status(200).json(body);
});

export {familyRouter};

