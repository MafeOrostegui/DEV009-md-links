const pathModule = require('path');
const fs= require('fs');


function verifyPath(path){
    let absolutePath;
    if(pathModule.isAbsolute(path)){
      absolutePath=path
    }else{
      absolutePath=pathModule.resolve(path)
    }
    return absolutePath;
}

function pathExists(path){
    return new Promise((resolve, reject)=>{
        fs.stat(path, (err)=>{
            if(!err){
                resolve(true)
            }else{
                reject('Path does not exist', err)
            }
        });
    })
}

function extensionCheck(path){
    return new Promise((resolve, reject)=>{
        const extension=pathModule.extname(path);
        if(extension !== '.md'){
            reject(new Error('The file is not markdown'));
        }else{
            resolve(path);
        }

    })
}

function extractLinks(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data)=>{
            if (err) {
                reject(err)
            }
            
            const regex = /(\[.*\])(\((http)(?:s)?(\:\/\/).*\))/g;          
            if(regex.test(data)){
                const allLinks=data.match(regex);
                let array=[];
                allLinks.forEach(link=>{
                    array.push({
                        href:link.replace(/(\[.*\])/g, ""),
                        text:link.replace(/(\((http)(?:s)?(\:\/\/).*\))/g, ""),
                        file:path,
                    })
                })
                resolve(array)
            } else {
                reject('No links found')
            }
        })
    })
}


module.exports={verifyPath, pathExists, extensionCheck, extractLinks}


