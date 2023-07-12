const {mdLinks}=require('./index.js');

mdLinks('linktest.md', true)
  .then(resultado=>{
    console.log('Links found:', resultado)
  })

  .catch(error=>{
    console.error('Error',error)
  })

