const {mdLinks}=require('./index.js');

mdLinks('testing_files', true)
  .then(resultado => {
    console.log('Links found:', resultado)
  })

  .catch(error => {
    console.error('Error',error)
  })

