#!/usr/bin/env node
const {mdLinks}=require('./index.js');

mdLinks('testing_files')
  .then(resultado => {
    console.log('Links found:', resultado)
  })

  .catch(error => {
    console.error('Error',error)
  })
