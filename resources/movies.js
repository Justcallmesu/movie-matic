const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
    judul_film: {
        type: String,
        required: [true, "Film harus memiliki judul"]
    },
    durasi: {
        type: Number,
        required: [true, "Film Harus memiliki durasi"]
    },
    jam_tayang: [String],
    harga_tiket: {
        type: Number,
        required: [true, "Film harus memiliki jam tayang"]
    },
    deskripsi: {
        type: String,
        required: [true, "Film harus memiliki deskripsi"]
    },
    staff_film: {
        type: Object,
        required: [true, "Film harus memiliki staff"]
    },
    poster_film: {
        type: String,
        required: [true, "Film harus memiliki gambar"]
    },
    trailer: {
        type: String,
        required: [true, "Film harus memiliki URL Trailer"]
    }
});

moviesSchema.indexes({ judul_film: 1 });

const movies = mongoose.model("movies", moviesSchema);

module.exports = movies;
