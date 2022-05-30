import pool from '../configs/connectDB'

let getHomePage = async (req, res) => {

    const [rows, fields] = await pool.execute('select * from `users1`')
    console.log(rows)
    return res.render('index.ejs', { dataWaifu: rows })
}

let getDetailPage = async (req, res) => {
    let id = req.params.id
    let [waifu] = await pool.execute('select * from `users1` where id = ?', [id])
    console.log(waifu)
    return res.render('detail.ejs', { waifu: waifu })
}

let deleteWaifu = async (req, res) => {
    let id = req.params.id
    await pool.execute('delete from `users1` where id = ?', [id])
    return res.redirect('/')
}

let addWaifu = async (req, res) => {
    return res.render('add.ejs')
}

let addNewWaifu = async (req, res) => {
    let { name, birth, address } = req.body
    console.log(name)
    await pool.execute('insert into users1(name, birth,address) values (?, ?, ?)',
        [name, birth, address]);
    return res.redirect('/')
}

let getUpdatePage = async (req, res) => {
    let id = req.params.id
    let [waifu] = await pool.execute('select * from `users1` where id = ?', [id])
    return res.render('update.ejs', { waifu: waifu })

}

let updateNewWaifu = async (req, res) => {
    let { name, birth, address, id } = req.body
    await pool.execute('update users1 set name= ?, birth = ? , address = ?,img = ? where id=? ', [name, birth, address, '', id])
    return res.redirect('/')
}

let uploadAvaPage = async (req, res) => {
    let id = req.params.id
    return res.render('ava.ejs', { waifuId: id })
}

let handleUploadFile = async (req, res) => {
    let { id } = req.body
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    console.log(req.file.filename)
    console.log(id)
    await pool.execute('update users1 set img=? where id=? ', [req.file.filename, id])
    res.redirect('/')
    // });
}
module.exports = {
    getHomePage, getDetailPage, deleteWaifu, addWaifu, addNewWaifu, getUpdatePage, updateNewWaifu, uploadAvaPage, handleUploadFile
}