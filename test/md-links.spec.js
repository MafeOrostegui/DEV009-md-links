const { readTextFile, validateLinks, checkPathType, statsLinks, statsValidate } = require('../data.js');
const { mdLinks } = require('../index.js');
const { dataMock }=require('./mockedData.js')
const axios=require('axios');
const fs=require('fs')
jest.mock('axios');


describe('mdLinks', () => {

  test('should reject with an error message when path is null or not a string', () => {
    return mdLinks(null).catch((error) => {
      expect(error).toBe('You should enter a path valid. \nPlease enter to a path to a file or a folder');
    });
  })

  test('should return the same path when the path is absolute', ()=>{
    return mdLinks('/Users/lukasarias/Documents/Laboratoria/proyecto 3/DEV009-md-links/testing_files/linktest.md').then((data)=>{
      expect(data).toBeTruthy()
    })
  });

  test('should return an error when the path does not exist',()=>{
    return mdLinks('testing_files/linktestg.md').catch((error)=>{
      expect(error).toBe('This path does not exist, enter a valid path')
    })
  });

  test('should return an error when the file is not "md"',()=>{
    return mdLinks('testing_files/linktest.txt').catch((error)=>{
      expect(error).toEqual(error)
    })
  });

  test('should reject with an error when there is an error reading the file', () => {
    const path = '/path/to/nonexistent-file.md';
    return expect(readTextFile(path)).rejects.toThrow();
  });

  test('should return the links that are in the path', () => {
    return expect(readTextFile('testing_files/linktest.md')).resolves.toContainEqual(
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
    return mdLinks('testing_files/nolinks.md').catch(links=>{
      expect(links).toBe('There are no links in this path, enter another one');
    })
  })

  test('should return the links that are in the directory', () => {
    return expect(mdLinks('testing_files')).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: expect.any(String),
          text: expect.any(String),
          file: expect.any(String),
        }),
      ])
    );
  });

  test('Should return the links with the respective validation-http successful response', () => {
    axios.head.mockImplementation(() => Promise.resolve(dataMock.mockResponses.shift()));
    return mdLinks('testing_files/linktest.md', true)
      .then(results => {
        expect(results).toEqual(dataMock.successfulHttpResponse);
      });
  });
});


describe('validateLinks', () => {

  test('should assign status and statusText when response status is available', () => {
    axios.head.mockResolvedValueOnce(dataMock.mockNoResponses[0]);
    axios.head.mockRejectedValueOnce({ response: { status: 404 } });

    return validateLinks(dataMock.links).then((result) => {
      expect(result).toEqual(dataMock.unsucessfulHttpResponse);
    });
  });

  test('validateLinks handles non-array links correctly', () => {
    const link = { href: 'http://example.com' };
    const result = validateLinks(link);
    return expect(result).resolves.toEqual([{ href: 'http://example.com', status: 'no response', statusText: 'fail' }]);
  });
});


describe('checkPathType', () => {
  
  test('should reject with an error if fs.stat returns an error', () => {
    const error = new Error('Path not found');
    const path = '/path/to/nonexistent/file';

    jest.spyOn(fs, 'stat').mockImplementation((path, callback) => {
      callback(error);
    });
    return expect(checkPathType(path)).rejects.toEqual(error);
  });
});


describe(('statsLinks'), () => {
  test('should return the statistics of the links', () => {
    expect(statsLinks(dataMock.links)).toEqual(dataMock.statsLinks)
  });
})

describe(('statsValidate'), () => {
  test('should return the statistics of the links', () => {
    expect(statsValidate(dataMock.unsucessfulHttpResponse)).toEqual(dataMock.statsValidate)
  });
})
