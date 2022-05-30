import express from 'express'
import configViewEngine from "./configs/Viewengine"
import initWebRoute from "./route/web"
import multer from 'multer'

require('dotenv').config();
const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app)
initWebRoute(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})