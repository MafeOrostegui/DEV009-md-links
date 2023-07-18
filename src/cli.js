const {mdLinks}=require('./index.js');

mdLinks('README.md', true)
  .then(resultado => {
    console.log('Links found:', resultado)
  })

  .catch(error => {
    console.error('Error',error)
  })

