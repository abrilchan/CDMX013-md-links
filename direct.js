const fs = require('fs');
const path = require('path');

function readDirectory(inputPath, files){
    const contentOfDir = fs.readdirSync(inputPath);
       contentOfDir.forEach((element) => {
            const newPath = path.resolve(inputPath, element);
            const fileExtension = path.extname(newPath);
            if(fs.lstatSync(newPath).isDirectory()){
                readDirectory(newPath,files);
            } else if (fileExtension === '.md' || fileExtension === '.markdown'){
                files.push(newPath);
            } else {
                console.log('No MD');
            };
       });
       return files;
};
module.exports = readDirectory; 