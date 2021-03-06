import * as express from 'express';
// import * as multer from 'multer';

const exampleRouter = express.Router();

exampleRouter.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'example message'
    });
});

exampleRouter.get('/:id', (req, res) => {
    const params = req.params;

    console.log('example get /:id', params); // { id: '1' }

    res.status(200).json(params.id);
});


exampleRouter.post('/', (req, res) => {
    const body = req.body;

    console.log('example post body', body);

    res.status(200).json(body);
});

export { exampleRouter };
