// include file system library
const fs = require("fs");

// promisfy fs readfile to use async/await
async function readFileAsync(fs, ...args) {
    return new Promise((resolve, reject) => {
        let promiseHandling = (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        };
        args.push(promiseHandling);
        fs.readFile.apply(fs, args);
    });
};

const mimeType = {
    '.ico': 'image/x-icon', '.html': 'text/html', '.js': 'text/javascript',
    '.json': 'application/json', '.css': 'text/css', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.wav'
    : 'audio/wav', '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject', '.ttf': 'aplication/font-sfnt'
};

// you can send full url here
function getExtension(filename) {
    return '.' + filename.split('.').pop();
}

module.exports = async function (context, req) {
    var file = "index.html"; //default file
    if (req.query.file) file = req.query.file;

    // if no file extension given, default to html (about ==> about.html)
    if (file.indexOf(".") == -1) {
        modified = true;
        file += ".html";
    }

    var ext = getExtension(file);
    var contentType = mimeType[ext] || 'text/plain';

    let data;

    try {
        context.log('GET ' + __dirname + "//..//content//" + file);
        data = await readFileAsync(fs, __dirname + "//..//content//" + file);

        context.res = {
            status: 200,
            body: data,
            isRaw: true,
            headers: {
                'Content-Type': contentType
            }
        };
    } catch (e) {
        context.log("Error: " + e);

        if (e.code == "ENOENT") {
            context.res = {
                status: 404,
                body: "Not Found.",
                headers: {
                }
            };
        } else {
            context.res = {
                status: 500,
                body: "500 Internal Server Error.",
                headers: {
                }
            };
        }
    }
};