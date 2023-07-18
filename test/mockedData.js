const dataMock={
  links : [
    { href: 'https://example.com', text: 'Link 1' },
    { href: 'https://example.org', text: 'Link 2' }
  ],

  mockResponses:[
    {status:200, statusText:'OK'},
    {status:200, statusText:'OK'},
    {status:200, statusText:'OK'}
  ],

  mockWrongResponses: [
    { status: 200, statusText: 'OK' },
    { status: 404, statusText: 'fail' }
  ],

  mockNoResponses: [   
    { status: 200, statusText: 'OK' },
    { status: 404, statusText: 'Not Found' } 
  ],
    
  successfulHttpResponse:[
    {
      href: 'https://openai.com',
      text: 'OpenAI',
      file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/testing_files/linktest.md',
      status: 200,
      statusText: 'OK'
    },
    {
      href: 'https://github.com',
      text: 'GitHub',
      file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/testing_files/linktest.md',
      status: 200,
      statusText: 'OK'
    },
    {
      href: 'https://www.markdownguide.org',
      text: 'Markdown Guide',
      file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/testing_files/linktest.md',
      status: 200,
      statusText: 'OK'
    }
  ],

  unsucessfulHttpResponse:[
    { href: 'https://example.com', text: 'Link 1', status: 200, statusText: 'OK' },
    { href: 'https://example.org', text: 'Link 2', status: 404, statusText: 'fail' }
  ],

  statusFailureResponse: [
    { href: 'https://example.com', text: 'Link 1', status: 'no response', statusText: 'fail' },
    { href: 'https://example.org', text: 'Link 2', status: 'no response', statusText: 'fail' }
  ]
}

module.exports={dataMock}