const fs = require('fs');
const path = require('path');
const {marked} = require('marked');
const cheerio = require('cheerio');

function gettingLinks(files){
    let links = [];
    files.forEach((file) => {
        let fileContent = fs.readFileSync(file, 'utf8');
        const html = marked.parse(fileContent);
        const $ = cheerio.load(html);
        $('a').each((i, element) => {
            let link = $(element).attr('href');
            let txt = $(element).text();
            let infoObject = {
                path: file,
                href: link,
                text: txt
            }
            links[i]=infoObject;
            });})


return links;
}
    
        

module.exports = gettingLinks;