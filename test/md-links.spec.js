const {mdLinks} = require('../src/index.js');


describe('mdLinks', () => {

  it('should return an error when the path does not exist',()=>{
    return mdLinks('linktes.md').catch((error)=>{
      expect(error).toBe('Path does not exist')
    })
  });

  it('should return an error when the file is not "md"',()=>{
    return mdLinks('linktest.txt').catch((error)=>{
      expect(error).toEqual(error)
    })
  });

  test('It should return the links that are in the path', () => {
    return mdLinks('linktest.md').then(data => {
      expect(data).toEqual([{
        href: '(https://openai.com)',
        text: '[OpenAI]',
        file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md'
      },
      {
        href: '(https://github.com)',
        text: '[GitHub]',
        file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md'
      },
      {
        href: '(https://www.markdownguide.org)',
        text: '[Markdown Guide]',
        file: '/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md'
      }]);
    });
  });
});
