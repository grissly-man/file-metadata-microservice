var express = require('express');
var multiparty = require('connect-multiparty')();
var path = require('path');
var fs = require('fs');
var app = express();

app.use('/', express.static(path.join(__dirname, 'doc')));
app.use('/get-file-size', express.static(path.join(__dirname, 'get-file-size-html')));

/**
 * @api {post} /get-file-size
 * @apiDescription Returns the file size of an uploaded file
 * @apiName get-file-size
 * @apiGroup FileMetadata
 * @apiSuccess {Number} size The size of the uploaded file in bytes
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "size":52476
 *  }
 */
app.post('/get-file-size', multiparty, function(req,res) {
    fs.unlink(req.files.file.path, function() {
        return res.status(200).json({
            size: req.files.file.size
        });
    });
});
app.listen(process.env.PORT || 8080);