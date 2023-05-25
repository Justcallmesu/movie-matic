// Modules
const path = require("path");

// Class
const ErrorResponse = require("../modules/Error");
const Response = require("../modules/Response");

// Models
const pembayaran = require(path.join(__dirname, "../resources/pembayaran.js"));

exports.getPembayaran = async (req, res, next) => {
    const { params: { _id } } = req;

    const pembayaranData = await pembayaran.find({ _id }).lean();

    if (!pembayaranData.length) return next(new ErrorResponse(404, "Pemabayaran untuk user tersebut tidak ditemukan"));

    res.status(200).json(new Response(200, "Data Ditemukan", pembayaranData));
};

exports.postPembayaran = async (req, res, next) => {
    const { body } = req;

    if (!Object.keys(body).length) return next(new ErrorResponse(400, "Harus memiliki body"));

    const isKursiOrdered = await pembayaran.find({
        kursi: {
            $in: body.kursi
        }
    })

    if (isKursiOrdered.length) return next(new ErrorResponse(409, "Kursi yang dipilih sudah dipesan"));

    const status = await pembayaran.create(body);

    res.status(201).json(new Response(201, "Pembayaran berhasil ditambahkan", status));
}
