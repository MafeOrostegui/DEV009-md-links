const { verifyPath, pathExists, extensionCheck, readTextFile, validateLinks} = require('./data');

function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    let absolutePath = verifyPath(path);

    pathExists(absolutePath)
      .then((() => extensionCheck(absolutePath)))
      .then((verifiedFile) => {
        (validate !== true)
        ? resolve(readTextFile(verifiedFile))
        : readTextFile(verifiedFile, true).then((links) => resolve(validateLinks(links)))
      })
      .catch(error => {
        reject(error);
      });

  });
}

module.exports={ mdLinks }

