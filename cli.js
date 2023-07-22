#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { statsValidate, statsLinks } = require('./data.js');
const gradient = require('gradient-string');
const path = process.argv[2]
const options = process.argv;

let validate = options.includes('--validate');
let stats = options.includes('--stats');

const customColors = {
  PinkFlamingo: gradient('#E80C7A', '#FF5C9F'),
  LemonDrop: gradient('#FADE5E', '#E80C7A'),
  ElectricViolet: gradient('#FF5C9F', '#5F9EFF'),
  PaleSpringBud: gradient('#FFBA7E', '#FADE5E'),
};

mdLinks(path, validate).then(links => {
  if (stats && validate) {
    console.log(customColors.ElectricViolet(`Statistics for verified links in ${options[2]}`), statsValidate(links));
  } else if (stats) {
    console.log(customColors.LemonDrop(`Statistics for links in ${options[2]}`), statsLinks(links));
  } else if(options[3] === undefined){
    console.log('🏆 Links found:', links);
  }else if(validate){
    console.log('🏆 Links found:', links)
  }else {
    console.log(`💥 ${customColors.PinkFlamingo(options[3])} is an invalid option. Please use ${customColors.PaleSpringBud('--stats or --validate')}`)
  }
  }).catch(error => {
    console.error(('Error', customColors.PinkFlamingo(`💥 ${error}`)));
});


