// Core
const path = require("path");

// NPM
const sharp = require("sharp");

// Class
const ErrorResponse = require(path.join(__dirname, "../modules/Error.js"));


async function savePictures(req, res, next) {
    const { body } = req;

    if (!("judul_film" in body)) return next(new ErrorResponse(400, "Mohon Isi Semua Data"));

    const files = req.file;

    if (!files) return next();

    const fileName = `film-${body.judul_film.replaceAll(" ", "_")}-${Date.now()}.webp`;

    await sharp(files.buffer).webp({ alphaQuality: 80, quality: 75 }).toFile(path.join(__dirname, `../assets/img/${fileName}`));

    req.body.poster_film = fileName;

    next();
}

module.exports = savePictures;