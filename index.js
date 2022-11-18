const fs = require('fs');
const path = require('path');
const pathResolve = require('./lib/pathResolve');
const readingDirectory = require('./lib/readingDirectory');
const readingFile = require('./lib/readingFile');
const gettingLinks = require('./lib/gettingLinks');
const validateFunction = require('./lib/validateFunction');



const folderPath = '/home/abrilcg/CDMX013-md-links/';
let links = [];

         
function mdLinks(folderPath, validate){
    return new Promise((resolve, reject) => {
      
      let absolutePath = pathResolve(folderPath);
      
      let fileReturned = [];
      
      if (fs.lstatSync(absolutePath).isDirectory()){
        readingDirectory(absolutePath, fileReturned);
        }
      else {
        readingFile(absolutePath, fileReturned);
        };
        
      let links = gettingLinks(fileReturned);
      
      if(!validate){
        resolve(links);
        } 
      else {
        let linkToBeValidated = [];

        links.forEach(link => {
          linkToBeValidated.push(validateFunction(link));
        })

        resolve(Promise.all(linkToBeValidated));
        };
    });
};


module.exports = mdLinks;

mdLinks('/home/abrilcg/CDMX013-md-links/readdd', true)
.then((result) => {
    if(result.length === 0) {
      console.log('no hay links');}
    else if (true) { 
        console.log('\nLinks in md file:');
        result.forEach((link) => {
          console.log(`\n${'file:'} ${link.path}\n${'href:'} ${link.href}\n${'text:'} ${link.text}\n`);
          if(link.statusText === 'fail'){
            console.log(`${'status:'} ${link.status} \n${'message:'} ${link.message}`);
          } else {
            console.log(`${'status:'} ${link.status} \n${'message:'} ${link.message}\n`);
          }
        });}
        })
.catch((error) => {
    console.log(`${'Error'} ${error.message}`);
         });