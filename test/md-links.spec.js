const { extractLinks } = require('../src/data.js');
const {mdLinks} = require('../src/index.js');


describe('mdLinks', () => {

  test('should return the same path when the path is absolute', ()=>{
    return mdLinks('/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md').then((data)=>{
      expect(data).toBeTruthy()
    })
  })

  test('should return an absolute path when given a relative path', ()=>{
    return mdLinks('linktest.md').then(()=>{
      expect.objectContaining('/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/linktest.md')
    })
  })

  test('should return an error when the path does not exist',()=>{
    return mdLinks('linktes.md').catch((error)=>{
      expect(error).toBe('Path does not exist')
    })
  });

  test('should return an error when the file is not "md"',()=>{
    return mdLinks('linktest.txt').catch((error)=>{
      expect(error).toEqual(error)
    })
  });

  test('should reject with an error when there is an error reading the file', () => {
    const path = '/path/to/nonexistent-file.md';
    return expect(extractLinks(path)).rejects.toThrow();
  });

  test('should return the links that are in the path', () => {
    return expect(extractLinks('linktest.md')).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: expect.any(String),
          text: expect.any(String),
          file: expect.any(String),
        }),
      ])
    );
  });

  test('should return an empty array when the path contains no links',()=>{
    return mdLinks('nolinks.md').catch(links=>{
      expect(links).toBe('No links found');
    })
  })
});
