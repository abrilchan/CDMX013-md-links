const path = require('path');

function readingFile (inputPath, file){

    path.extname(inputPath) === '.md' ? file.push(inputPath) : console.log('No MD');

return file;
}

module.exports = readingFile;