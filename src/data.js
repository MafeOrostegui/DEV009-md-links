const pathModule = require('path');
const fs= require('fs');
const axios=require('axios');


function verifyPath(path) {
  const absolutePath = pathModule.isAbsolute(path) 
  ? path : pathModule.resolve(path);
  return absolutePath;
}


function pathExists(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
    (!err)
    ? resolve(true) : reject('Path does not exist', err);
    });
  })
}


function extensionCheck(path){
  return new Promise((resolve, reject) => {
    const extension=pathModule.extname(path);
    (extension !== '.md')
    ? reject(new Error('The file is not markdown')) : resolve(path);
  })
}


function readTextFile(path,validate) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) reject(err);

      const links=extractLinks(path, data);

      (links.length>0)
      ? resolve(extractLinks(path, data)) : reject('No links found')
    });
  });
}


function extractLinks(path, data){
  const regex = /\[(.*?)\]\((.*?)\)/g;
  let matches;
  const infoLinks = [];
  
  while ((matches = regex.exec(data))) {
    infoLinks.push({
      href: matches[2],
      text: matches[1],
      file: path,
    });
  }
  return infoLinks;
}


function validateLinks(links) {
  const forEachLink = links.map(link => {
    return axios.head(link.href)
      .then((response) => {     
          const httpResponse={status: response.status, statusText: response.statusText}
          Object.assign(link, httpResponse);
          return link
      })
      .catch((error) => {
        const httpResponse = { status: error.response ? error.response.status : undefined, statusText: "fail" };
        Object.assign(link, httpResponse);
        return link;
      });
  });
  
  return Promise.all(forEachLink);
}


module.exports={verifyPath, pathExists, extensionCheck, readTextFile, validateLinks}


