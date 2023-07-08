const {mdLinks}=require('./index.js');

mdLinks('linktest.md')
  .then(resultado=>{
    console.log('Links found:', resultado)
  })

  .catch(error=>{
    console.error('Error',error)
  })

