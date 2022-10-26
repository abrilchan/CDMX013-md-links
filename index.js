
//const process = require('path');
const folderPath = '/home/abrilcg/test-mdlinks';
//const filePath = '/home/abrilcg/test-mdlinks/untitled.txt';
//const readingfilepath = require('/home/abrilcg/test-mdlinks/untitled.txt');
//console.log(readingfilepath, 'file path: '+ filePath, 'file type: '+process.extname(filePath));
//console.log( 'folder path: '+ folderPath, 'folder type: '+process.extname(folderPath));

const path = require('path');
const fs = require('fs');
//joining path of directory 
//const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
fs.readdir(folderPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        if(path.extname(file)=='.md')
       // {console.log(file); 
           { fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                }
               // console.log(data);
               let dataArray = data.split(' ');
                dataArray.forEach(line => 
                    {let regExTest = /https:\/\/[a-zA-Z\.\/]+/gm.test(line);
                    if (regExTest){
                    console.log('link: '+ line)}})
              });
            }     
    });
});

