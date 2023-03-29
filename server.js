const express = require('express');
var bodyParser = require('body-parser');
const app = express();

const generateKeys = require('./controller/generateKeys.js');
const encryptdecrypt = require('./controller/encryptdecrypt.js');
  
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/encrypt-decrypt', urlencodedParser, async (req, res) => {
    
    console.log("inside post: ",req.body.personal_data);

    await generateKeys(req.body); //to generate public and private keys

    const result = await encryptdecrypt(req.body.personal_data); //result with encrypted and decrypted data

    res.write("Encrypted message: "+result.encryptedMessage+"\n\n"+"Decrypted message: "+result.decryptedMessage);
    res.end()
});
    
app.listen(3000,()=>{
    console.log("Server is running on 3000");
});