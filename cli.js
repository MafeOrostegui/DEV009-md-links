#!/usr/bin/env node
const {mdLinks} = require('./index.js');
const {statsValidate, statsLinks} = require('./data.js');

const path = process.argv[2]
const options = process.argv;

function cli(path, options) {
  let promise;

  if (options.includes('--validate') && options.includes('--stats')) {
    promise = mdLinks(path, true).then(links => {
      console.log(statsValidate(links));
    });
  } else if (options.includes('--stats')) {
    promise = mdLinks(path, true).then(links => {
      console.log(statsLinks(links));
    });
  } else if (options.includes('--validate')) {
    promise = mdLinks(path, true).then(links => {
      console.log('Links found:', links);
    });
  } else {
    promise = mdLinks(path).then(links => {
      console.log('Links found:', links);
    });
  }
  promise.catch(error => {
    console.error('Error', error);
  });
}

cli(path, options);