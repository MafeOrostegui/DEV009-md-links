const { verifyPath, checkPathType, pathExists, extensionCheck, readTextFile, validateLinks } = require('./data');

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    if (!path || typeof path !== 'string') reject('You should enter a path valid. \nPlease enter to a path to a file or a folder');
  
    let absolutePath = verifyPath(path);
    pathExists(absolutePath)
      .then((() => checkPathType(absolutePath)))
      .then(((files) => extensionCheck(files)))
      .then((files) => {
        return (options !== true)
        ? readTextFile(files)
        : readTextFile(files)
          .then((links) => Promise.all(links.map(link => validateLinks(link))));
      })
      .then((finalLinks) => {
        const array=finalLinks.flat()
        array.length === 0 ? reject('There are no links in this path, enter another one') : resolve(array);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = { mdLinks }

