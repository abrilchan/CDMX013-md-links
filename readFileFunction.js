const path = require('path');
const fs = require('fs');
const folderPath = '/home/abrilcg/test-mdlinks';
let readingfilepath = require(folderPath);

fs.readdir(folderPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach( (file) => {
        if (path.extname(file)===''){
            console.log('Directory: ' + file)
        }
        console.log(file); 
    });
});