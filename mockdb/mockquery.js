import fs from 'fs';
import path from 'path';

import { generateSalt, generateIV, hashPassword, CryptoJS } from "../crypto/cryptography.js";

//This worked finally.... now it makes sense why... this thing neeeds the whole path... too demanding for accruracy
const dbPath = path.resolve('mockdb/db.json');

// Read DB
function readDB() {
    if (!fs.existsSync(dbPath)) return { user: [] };
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

// Write DB
function writeDB(db) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}

// Insert user
function insertUser(userID, loginID, password, user_type = 'student') {
    const db = readDB();

    const salt = generateSalt();
    const iv = generateIV();
    const hashedpassword = hashPassword(password, salt);

    const newUser = {
        userID,
        loginID,
        user_type: (user_type === 'admin') ? 'admin' : 'student',
        hashedpassword,
        salt: salt.toString(CryptoJS.enc.Base64),
        iv: iv.toString(CryptoJS.enc.Base64)
    };

    db.user.push(newUser);
    writeDB(db);

    console.log("Inserted user:", newUser);
}