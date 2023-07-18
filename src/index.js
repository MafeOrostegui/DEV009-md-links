const { verifyPath, checkPathType, pathExists, extensionCheck, readTextFile, validateLinks } = require('./data');

function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    let absolutePath = verifyPath(path);

    pathExists(absolutePath)
      .then((() => checkPathType(absolutePath)))
      .then(((files) => extensionCheck(files)))
      .then((files) => {
        return (validate !== true)
        ? readTextFile(files)
        : readTextFile(files, true)
          .then((links) => {
            const validatePromises = links.map((link) => validateLinks(link));
            return Promise.all(validatePromises)
          });
      })
      .then((validatedFiles) => {
        resolve((validatedFiles).flat());
      })
      .catch(error => {
        reject(error);
      });
  });
}


module.exports={ mdLinks }

