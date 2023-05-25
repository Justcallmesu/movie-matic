// Module
const path = require("path");

// Class
const ErrorResponse = require("../modules/Error");
const Response = require("../modules/Response");

// Models
const movies = require(path.join(__dirname, "../resources/movies.js"));

// Functions
const deleteImg = require(path.join(__dirname, "../functions/deleteImg.js"));

exports.getMovies = async (req, res) => {
    const moviesData = await movies.find();

    res.status(200).json({
        data: moviesData
    })
};

exports.getOneMovie = async (req, res, next) => {
    const { params: { _id } } = req;
    const moviesData = await movies.findOne({ _id });

    if (!moviesData) return next(new ErrorResponse(404, "Film Tidak Ditemukan"));

    res.status(200).json(new Response(200, "Film Ditemukan", moviesData));
}

exports.postMovies = async (req, res, next) => {
    const { body } = req;
    if (!Object.keys(body).length) return next(new ErrorResponse(400, "Harus memiliki body"));

    const { jam_tayang, ...moviesData } = Object.keys(body).reduce((acc, values) => {
        try {
            return { ...acc, [values]: JSON.parse(body[values]) };
        } catch {
            return { ...acc, [values]: body[values] };
        }
    }, {});

    const status = await movies.create({ jam_tayang: [...jam_tayang], ...moviesData });

    return res.status(200).json({ status: 200, message: "Film Berhasil Ditambahkan", data: status });
};

exports.updateMovie = async (req, res, next) => {
    const { body, params: { _id } } = req;

    if (!Object.keys(body).length) return next(new ErrorResponse(400, "Harus memiliki body"));

    const ConvertedData = Object.keys(body).reduce((acc, values) => {
        try {
            return { ...acc, [values]: JSON.parse(body[values]) };
        } catch {
            return { ...acc, [values]: body[values] };
        }
    }, {});

    const sanitizedData = Object.keys(ConvertedData).reduce((acc, value) => {
        if (!ConvertedData[value]) return { ...acc };

        return { ...acc, [value]: ConvertedData[value] };
    }, {});

    const foundMovie = await movies.findOne({ _id });

    if (!foundMovie) return next(new ErrorResponse(404, "Film Tidak Ditemukan"));

    const status = await movies.findOneAndUpdate({ _id }, sanitizedData, { new: true }).lean();

    await deleteImg(foundMovie.poster_film);

    res.status(200).json(new Response(200, "Film Berhasil Diedit", status)).end();
};


exports.deleteMovie = async (req, res, next) => {
    const { params: { _id } } = req;

    const isExist = await movies.findOne({ _id });

    if (!isExist) return next(new ErrorResponse(404, "Film Tidak Ditemukan"));

    await movies.deleteOne({ _id });

    await deleteImg(isExist.poster_film);

    res.status(204).end();

}