// Module
const path = require("path");

// Class
const ErrorResponse = require("../modules/Error");

// Models
const movies = require(path.join(__dirname, "../resources/movies.js"));

exports.getMovies = async (req, res) => {
    const moviesData = await movies.find();

    res.status(200).json({
        data: moviesData
    })
};

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

    console.log(moviesData);

    const status = await movies.create({ jam_tayang: [...jam_tayang], ...moviesData });

    return res.status(200).json({ status: 200, message: "Film Berhasil Ditambahkan", data: status });
}