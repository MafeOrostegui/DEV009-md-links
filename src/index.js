const { verifyPath, pathExists, checkExtension, extractLinks } = require('./data');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    let absolutePath = verifyPath(path);

    pathExists(absolutePath)
      .then((() => checkExtension(absolutePath)))
      .then((verifiedFile) => {
        extractLinks(verifiedFile)
          .then(links=>{
            resolve(links)
          })
      })
      .catch(error => {
        reject(error);
      });

  });
}

module.exports={mdLinks}

