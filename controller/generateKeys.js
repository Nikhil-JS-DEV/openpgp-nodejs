const openpgp = require('openpgp');
const fs = require('fs');


const generateKeys = async function (personalData){

    //try-catch block to generate public and private keys
    try{
        var { privateKey, publicKey } = await openpgp.generateKey({
            type: 'ecc', 
            curve: 'curve25519', 
            userIDs: [{"personalData":personalData}], //we can give multiple inputs here
            passphrase: 'this is an assessment test', // passphrase
            format: 'armored' // 
        });
    }catch(err){
        throw new Error("Error while generating keys: ",err.message);
    }

    //try-catch block to write public and private keys in static files
    try{
        fs.writeFileSync(('./model/privateKey.txt'),`${privateKey}`);
        fs.writeFileSync(('./model/publicKey.txt'),`${publicKey}`);

        return;
    }catch(err){
        throw new Error("Error while saving the keys into static files: ",err.message);
    }
   
}

module.exports = generateKeys;