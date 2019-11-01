import * as express from 'express';
import * as multer from 'multer';

// config multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// фильтрую файлы которые могу загружать
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// const upload = multer({storage, fileFilter}).single('fileData');
const upload = multer({storage, fileFilter}).array('fileData', 5);
const uploadRouter = express.Router();

uploadRouter.post('/', (req, res) => {
    upload(req, res, (err) => {
        const filedata = req.file;
        const path = filedata && filedata.path;
        const mimetype = filedata && filedata.mimetype;

        if (Array.isArray(req.files) && req.files.length) {
            req.files.forEach(file => {
                if (
                    !(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
                ) {
                    res.status(422).json(`{"message": "Upload error. File should be 'image/png' || 'image/jpg' || 'image/jpeg'"}`);
                }
            });

            res.status(200).json(`{"message": "Файлы загружены"}`);
        } else {
            if (!filedata
                || !path
                || !mimetype
                || !(mimetype === 'image/png' || mimetype === 'image/jpg' || mimetype === 'image/jpeg')
            ) {
                res.status(422).json(`{"message": "Upload error. File should be 'image/png' || 'image/jpg' || 'image/jpeg'"}`);
            } else {
                res.status(200).json(`{"message": "Файл загружен ${path}"}`);
            }
        }
    });
});

export {uploadRouter};
