const { verifyPath, pathExists, extensionCheck, extractLinks } = require('./data');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    let absolutePath = verifyPath(path);

    pathExists(absolutePath)
      .then((() => extensionCheck(absolutePath)))
      .then((verifiedFile) => {
        extractLinks(verifiedFile)
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

