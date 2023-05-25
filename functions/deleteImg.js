// Module
const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises");

async function ManageImg(img) {
    try {
        await fsPromise.access(path.join(__dirname, `../assets/img/${img}`), fs.constants.F_OK);
        await fsPromise.rm(path.join(__dirname, `../assets/img/${img}`));
    } catch { }
}

module.exports = ManageImg;