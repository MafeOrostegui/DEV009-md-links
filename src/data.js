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


function checkPathType(path){
  return new Promise((resolve, reject)=>{
    fs.stat(path, (err, stats)=>{
      if(stats.isFile()){
        resolve(path)
      }else if(stats.isDirectory()){
        resolve(readDirectory(path))
      }else{
        reject(err)
      }
    })
  })
}


function readDirectory(path, arrayOfFiles=[]){
  const files = fs.readdirSync(path);
  files.forEach((file) => {
    const filePath = pathModule.join(path, file),
      stat = fs.statSync(filePath);

    (stat.isDirectory())
    ? readDirectory(filePath, arrayOfFiles)
    : arrayOfFiles.push(filePath)
  })
  return arrayOfFiles

}


function extensionCheck(paths) {
  return new Promise((resolve, reject) => {
    const fileArray = Array.isArray(paths) ? paths : [paths];
    const markdownPaths = fileArray.filter(path => pathModule.extname(path) === '.md');

    if (markdownPaths.length > 0) {
      resolve(markdownPaths);
    } else {
      reject(new Error('No markdown files found'));
    }
  });
}


function readTextFile(files, validate) {
  const fileArray = Array.isArray(files) ? files : [files]; 
  const promises = fileArray.map(file => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        extractLinks(file, data)
          .then((links) => resolve(links))
          .catch((err) => {
            resolve({file, err});
          });
      });
    });
  });

  return Promise.all(promises);
}


function extractLinks(path, data){
  return new Promise((resolve, reject)=>{
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
  
    (infoLinks.length>0)
    ? resolve(infoLinks)
    : reject('No links found'); 
  })
}


function validateLinks(links) {
  const fileArray = Array.isArray(links) ? links : [links]; 
  const promises = fileArray.map(link => {
    return axios.head(link.href)
      .then((response) => {     
          const httpResponse={status: response.status, statusText: response.statusText}
          Object.assign(link, httpResponse);
          return link
      })
      .catch((error) => {
        const httpResponse = { status: error.response ? error.response.status : 'no response', statusText: "fail" };
        Object.assign(link, httpResponse);
        return link;
      });
    });   
  return Promise.all(promises);
}
  

module.exports={verifyPath, pathExists, checkPathType, extensionCheck, readTextFile, validateLinks}


