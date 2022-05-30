import express from "express";
import homeController from "../controller/homeController"
import multer from 'multer'
const path = require('path');
var appRoot = require('app-root-path');
let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.get('/delete-waifu/:id', homeController.deleteWaifu)
    router.get('/huongbui', (req, res) => {
        res.send('HUong dz 2003')
    })
    router.get('/add-waifu', homeController.addWaifu)
    router.post('/addwaifu', homeController.addNewWaifu)
    router.get('/update-waifu/:id', homeController.getUpdatePage)
    router.post('/update-waifu', homeController.updateNewWaifu)
    router.get('/upload-ava/:id', homeController.uploadAvaPage)
    router.post('/upload-profile-pic', upload.single('ava_pic'), homeController.handleUploadFile)
    return app.use('/', router)
}
export default initWebRoute