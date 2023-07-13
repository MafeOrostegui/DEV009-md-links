const {mdLinks}=require('./index.js');

mdLinks('testing_files/linktest.md', true)
  .then(resultado => {
    console.log('Links found:', resultado)
  })

  .catch(error => {
    console.error('Error',error)
  })

