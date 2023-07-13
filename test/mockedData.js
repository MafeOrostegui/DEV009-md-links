const dataMock={

    mockResponses:[
        {status:200, statusText:'OK'},
        {status:200, statusText:'OK'},
        {status:200, statusText:'OK'}
    ],
    
    successfulHttpResponse:[
        {
          href: 'https://openai.com',
          text: 'OpenAI',
          file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'https://github.com',
          text: 'GitHub',
          file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md',
          status: 200,
          statusText: 'OK'
        },
        {
          href: 'https://www.markdownguide.org',
          text: 'Markdown Guide',
          file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md',
          status: 200,
          statusText: 'OK'
        }
    ],
}

module.exports={dataMock}