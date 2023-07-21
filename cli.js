#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { statsValidate, statsLinks } = require('./data.js');

const path = process.argv[2]
const options = process.argv;

let validate = options.includes('--validate');
let stats = options.includes('--stats');

mdLinks(path, validate).then(links => {
  if (stats && validate) {
    console.log(statsValidate(links));
  } else if (stats) {
    console.log(statsLinks(links));
  } else if(options[3] === undefined){
    console.log('Links found:', links);
  }else if(validate){
    console.log('Links found:', links)
  }else {
    console.log('You did not enter a valid command. Plese use --stats or --validate')
  }
  }).catch(error => {
    console.error('Error', error);
});

