const fs = require('fs');
const path = require('path');

function readingDirectory(inputPath, file) {

    let filesInDirectory = fs.readdirSync(inputPath);

    filesInDirectory.forEach((fileInDirectory) => {
        let resolvedPath = path.resolve(inputPath, fileInDirectory);
        let fileExtension = path.extname(resolvedPath);
        if(fs.lstatSync(resolvedPath).isDirectory()){
            readingDirectory(resolvedPath, file);
        } else if (fileExtension === '.md'){
            file.push(resolvedPath);
        }
   });

      return file;
}

module.exports = readingDirectory;