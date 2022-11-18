const path = require('path');

function readFile (inputPath, files){
    const fileExtension = path.extname(inputPath);
    if (fileExtension === '.md' || fileExtension === '.markdown'){
        files.push(inputPath);
    } else {
        console.log('This library can only parse links inside markdown files');
    }
return files;
}

module.exports = readFile;