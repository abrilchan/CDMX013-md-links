const fs = require('fs');
const path = require('path');
const {marked} = require('marked');
const cheerio = require('cheerio');
const readDirectory = require('./direct');
const readFile = require('./file');
const validateLinks = require('./validate');


const folderPath = '/home/abrilcg/CDMX013-md-links/';
let links = [];

         
function mdLinks(folderPath, validate){
    return new Promise((resolve, reject) => {

        if(path.isAbsolute(folderPath) === false){
            absolutePath = path.resolve(folderPath);
         } else {
             absolutePath = folderPath;
         }
         let fileReturned = [];
         if (fs.lstatSync(absolutePath).isDirectory()){
            readDirectory(absolutePath, fileReturned);
        } else {
          readFile(absolutePath, fileReturned);
        };

        let links = [];
        let linkObj = {};
    
        fileReturned.forEach((file) => {
        const data = fs.readFileSync(file, 'utf8');
        const html = marked.parse(data);
        const $ = cheerio.load(html);
        $('a').each((i, element) => {
            const link = $(element).attr('href');
            const txt = $(element).text().length < 50 ? $(element).text() : $(element).text().slice(0,50);
            linkObj = {
                path: file,
                href: link,
                text: txt
            }
            links.push(linkObj);
            });})
        
        if(!validate){
            resolve(links);
        } 
        else {
            const httpResponse = links.map((link) => validateLinks(link));
            resolve(Promise.all(httpResponse));
        };
    });
};

mdLinks('/home/abrilcg/CDMX013-md-links/readdd', true)
.then((result) => {
    if(result.length === 0) {
      console.log('no hay links');}
    else if (true) { 
        console.log('\nLinks in md file:');
        result.forEach((link) => {
          console.log(`\n${'file:'} ${link.path}\n${'href:'} ${link.href}\n${'text:'} ${link.text}\n`);
          if(link.statusText === 'fail'){
            console.log(`${'status:'} ${link.status} \n${'message:'} ${link.statusText}`);
          } else {
            console.log(`${'status:'} ${link.status} \n${'message:'} ${link.statusText}\n`);
          }
        });}
        })
.catch((error) => {
    console.log(`${'Error'} ${error.message}`);
         });