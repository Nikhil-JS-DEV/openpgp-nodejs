const openpgp = require('openpgp');
const fs =require('fs');

const encryptdecrypt = async function(persnonalData){

    //try-catch block to encrypt and decrypt the input data
    try{
        const publicKeyArmored = `${fs.readFileSync('./model/publicKey.txt')}`;
        const privateKeyArmored = `${fs.readFileSync('./model/privateKey.txt')}`;
        const passphrase = 'this is an assessment test'; // phrase with the private key is encrypted
    
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        }); //decrypt private key using passphrase
    
        const encrypted = await openpgp.encrypt({
            message: await openpgp.createMessage({"text": persnonalData}), // input as Message object
            encryptionKeys: publicKey
        });
        console.log("Encrypted message: ",encrypted); //encrypted message
    
        const message = await openpgp.readMessage({
            armoredMessage: encrypted // parse armored message
        });

        const { data: decrypted } = await openpgp.decrypt({
            message,
            decryptionKeys: privateKey
        });
        console.log("Decrypted message: ",decrypted); 
    
        return {"encryptedMessage":encrypted, "decryptedMessage": decrypted};

    }catch(err){

        throw new Error("Error while encrypting/decrypting message: ",err.message);
        
    }

}

module.exports = encryptdecrypt;