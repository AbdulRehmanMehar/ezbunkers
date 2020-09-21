const fs = require('fs')
const multer = require('multer')

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, next) => {
            // if (err) console.log(err)
            const path = 'app/uploads/' + req.body.fileType || file.fieldname
            fs.mkdirSync(path, { recursive: true })
            next(null, path)
        },
        filename: (req, file, next) => {
            const ext = file.originalname.split('.').pop()
            const filename = file.fieldname + ' - ' + ' - ' + file.originalname +' - ' + Date.now().toLocaleString() + '.' + ext
            console.log(filename)
            next(null, filename)
        }
    }),
}