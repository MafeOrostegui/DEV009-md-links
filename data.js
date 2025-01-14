const pathModule = require('path');
const fs = require('fs');
const axios = require('axios');

function verifyPath(path) {
  return pathModule.isAbsolute(path) ? path : pathModule.resolve(path)
}

function pathExists(path){
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
    (err)
    ? reject('This path does not exist, enter a valid path', err) : resolve(true)
    });
  });
}

function checkPathType(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      }else{
        resolve(stats.isFile() ? path : readDirectory(path));
      }
    });
  });
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

    (markdownPaths.length > 0) 
    ? resolve(markdownPaths)
    : reject(('No markdown files found at this path, please enter another'));
  })
}

function readTextFile(files) {
  const fileArray = Array.isArray(files) ? files : [files]; 
  const promises = fileArray.map(file => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf-8', (err, data) => {
        (err)
        ? reject(err)
        : resolve(extractLinks(file, data))
      });
    });
  });
  return Promise.all(promises);
}

function extractLinks(path, data) {
  const regex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
  let matches;
  const infoLinks = [];
    
  while ((matches = regex.exec(data))) { 
    infoLinks.push({
      href: matches[2],
      text: matches[1],
      file: path,
    });
  }
  return infoLinks
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
        const httpResponse = { status: error.response ? error.response.status : 'no response', statusText: 'fail' };
        Object.assign(link, httpResponse);
        return link;
      });
    });
  return Promise.all(promises);
}

function statsLinks(links) {
  return {
      'Total': links.length,
      'Unique': new Set(links.map((link) => link.href)).size
  }
}

function statsValidate(links) {
  const broken = links.filter((link) => link.statusText === 'fail').length;
  return {
      'Total': links.length,
      'Unique': new Set(links.map((link) => link.href)).size,
      'Broken': broken,
  }
}
  
module.exports = { verifyPath, pathExists, checkPathType, extensionCheck, readDirectory, readTextFile, extractLinks, validateLinks, statsLinks, statsValidate }


