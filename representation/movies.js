// Module
const path = require("path");

const movies = require(path.join(__dirname, "../resources/movies.js"));
const users = require(path.join(__dirname, "../resources/users.js"));

exports.getMovies = async (req, res) => {
    const moviesData = await movies.find();

    res.status(200).json({
        data: moviesData
    })
};

exports.postMovies = async (req, res) => {
    const { body } = req;

    if (!("email" in body)) return res.status(400).json({ status: 400, message: "body harus memiliki email" });

    const foundUser = users.findOne({ email: body.email });

    if (!foundUser) return res.status(400).json({ status: 404, message: "User tidak ditemukan" });

    if (foundUser.role !== 'admin') return res.status(400).json({ status: 400, message: "Kamu tidak memiliki akses" });

    const { email, ...movieData } = body;

    const status = await movies.create(movieData);

    return res.status(200).json({ status: 200, message: "Film Berhasil Ditambahkan", data: status });
}