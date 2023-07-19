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
          .then((links) => Promise.all(links.map(link => validateLinks(link))));
      })
      .then((finalLinks) => {
        resolve((finalLinks).flat());
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = { mdLinks }

