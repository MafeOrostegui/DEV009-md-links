const { verifyPath, pathExists, extensionCheck, readTextFile} = require('./data');

function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    let absolutePath = verifyPath(path);

    pathExists(absolutePath)
      .then((() => extensionCheck(absolutePath)))
      .then((verifiedFile) => {
        readTextFile(verifiedFile, validate)
          .then(links=>{
            resolve(links)
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });

  });
}

module.exports={mdLinks}

