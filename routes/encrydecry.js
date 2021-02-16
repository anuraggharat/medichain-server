const router = require("express").Router();
const mongoose = require("mongoose");
const crypto = require("crypto");

var password = "password";
var algorithm = "aes-256-ctr";

router.get("/encrypt_address", async (req, res) => {
  let { address } = req.headers;
  var cipher = crypto.createCipher(algorithm, password);
  try {
    var crypted = cipher.update(address, "utf8", "hex");
    crypted += cipher.final("hex");
  } catch (e) {
    return;
  }
  res.send({
    message: "Address Encryption successful!",
    encrypytedAddress: crypted,
  });
});
router.get("/decrypt_address", async (req, res) => {
  let { eaddress } = req.headers;
  console.log(req.headers);
  var decipher = crypto.createDecipher(algorithm, password);
  try {
    var dec = decipher.update(eaddress, "hex", "utf8");
    dec += decipher.final("utf8");
    console.log(dec);
  } catch (e) {
    return;
  }
  res.send({
    message: "Address Decryption Successfull!",
    decryptedAddress: dec,
  });
});
module.exports = router;
