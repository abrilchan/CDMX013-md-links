/*const path = require('path');
const fs = require('fs');
const folderPath = '/home/abrilcg/test-mdlinks';

function readFiles (folderPath) {
    fs.readdir(inputPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
       files.forEach( (file) => {
        const newPath = path.resolve(inputPath, element);
        const fileExtension = path.extname(newPath);
        if (path.extname(file)===''){
            readFiles (newPath, inputFile)
        }
        else if (fileExtension === '.md' || fileExtension === '.markdown'){
            files.push(newPath);}
    });
});
return files;
}
       
module.exports = readFiles; */


//const process = require('path');
const folderPath = '/home/abrilcg/CDMX013-md-links';
//const filePath = '/home/abrilcg/test-mdlinks/untitled.txt';
//const readingfilepath = require('/home/abrilcg/test-mdlinks/untitled.txt');
//console.log(readingfilepath, 'file path: '+ filePath, 'file type: '+process.extname(filePath));
//console.log( 'folder path: '+ folderPath, 'folder type: '+process.extname(folderPath));

const path = require('path');
const fs = require('fs');
const {marked} = require('marked');
const cheerio = require('cheerio');
//joining path of directory 
//const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
let links = [];
fs.readdir(folderPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        if(path.extname(file)==='.md')
       //{console.log(file);} 
           { fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return err;
                }
               
               const htmlData = marked.parse(data);
               const $ = cheerio.load(htmlData);
               $('a').each((i, link) => {
                links[i]= {
                    href: link.attribs.href,
                    text: $(link).text().length < 50 ? $(link).text() : $(link).text().slice(0,50),
                    file: file
                }})
                    console.log(links)
            })}
              });})