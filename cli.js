#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { statsValidate, statsLinks } = require('./data.js');

const path = process.argv[2]
const options = process.argv;

function cli(path, options) {
  let validate = options.includes('--validate');
  let stats = options.includes('--stats');

  const promise = mdLinks(path, validate).then(links => {
    if (stats && validate) {
      console.log(statsValidate(links));
    } else if (stats) {
      console.log(statsLinks(links));
    } else {
      console.log('Links found:', links);
    }
  }).catch(error => {
    console.error('Error', error);
  });
  return promise;
}

cli(path, options);

