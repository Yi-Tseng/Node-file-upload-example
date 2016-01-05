var fs = require('fs');
var express = require('express');
var router = express.Router();
var multer  = require('multer')
var uploadMiddleware = multer({ dest: 'tmp_files/' })
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');

/*
 * api location start at /api
 */
router.get('/', function(req, res, next) {
    // rendering api document
});

router.get('/files/:fid', function(req, res, next) {
    // list all files
    // if fid is not undefined, download it.
});

router.post('/upload', uploadMiddleware.single('file'), function(req, res, next) {
    // upload a file
    if(!req.file) {
        res.status(400).json({msg: 'File is undefined.', err: true});
        res.end();
    }
    let filePath = req.file.path;
    let fileName = req.file.originalname;
    let conn = req.app.get('db_conn');
    let gfs = Grid(conn.db, mongoose.mongo);
    let writestream = gfs.createWriteStream({filename: fileName});
    fs.createReadStream(filePath).pipe(writestream);
    res.status(201).json({msg: 'file created', err: false});

});

router.delete('files/:fid', function(req, res, next) {
    // delete file
});

module.exports = router;
