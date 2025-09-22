import CryptoJS from 'crypto-js';

// Generate random bytes (returns WordArray)
function randomBytes(length) {
    return CryptoJS.lib.WordArray.random(length);
}


function generateSalt(length = 16) {
    return randomBytes(length);
}

function generateIV(length = 16) {
    return randomBytes(length);
}

function hashPassword(password, salt, keySize = 256 / 32, iterations = 200000) {
    return CryptoJS.PBKDF2(password, salt, {
        keySize: keySize,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    }).toString(CryptoJS.enc.Base64);
}
// Derive key using PBKDF2

function deriveKey(password, salt, keySize = 256 / 32, iterations = 200000) {
    return CryptoJS.PBKDF2(password, salt, {
        keySize: keySize,
        iterations: iterations,
        hasher: CryptoJS.algo.SHA256
    });
}

// Encrypt with password
function encryptWithPassword(plaintext, password, salt, iv) {
    const key = deriveKey(password, salt);

    return encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv });

    // Pack salt + iv + ciphertext into JSON (base64 fields)
    /*return JSON.stringify({
        ct: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
        iv: iv.toString(CryptoJS.enc.Base64),
        s: salt.toString(CryptoJS.enc.Base64)
    });*/
}

// Decrypt with password
function decryptWithPassword(jsonStr, password) {
    const json = JSON.parse(jsonStr);

    const salt = CryptoJS.enc.Base64.parse(json.s);
    const iv = CryptoJS.enc.Base64.parse(json.iv);
    const ciphertext = CryptoJS.enc.Base64.parse(json.ct);

    const key = deriveKey(password, salt);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        key,
        { iv: iv }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { generateSalt, generateIV, hashPassword, deriveKey, encryptWithPassword, decryptWithPassword, CryptoJS };

// Example
/*const password = "myStrongPassword";
const plaintext = "Hello CryptoJS + PBKDF2!";

const encrypted = encryptWithPassword(plaintext, password);
console.log("Encrypted JSON:", encrypted);

const decrypted = decryptWithPassword(encrypted, password);
console.log("Decrypted:", decrypted);
*/