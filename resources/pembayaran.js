const mongoose = require("mongoose");

const schemaPembayaran = mongoose.Schema({
    tanggal_transaksi: {
        type: Date,
        default: Date.now()
    },
    id_user: {
        type: mongoose.Types.ObjectId,
        required: [true, "Pembayaran harus memiliki target user"]
    },
    id_film: {
        type: mongoose.Types.ObjectId,
        required: [true, "Pembayaran harus memiliki target Film"]
    },
    kursi: {
        type: [String],
        required: [true, "Pembayaran harus memiliki kursi"]
    },
    jam_tayang: {
        type: String,
        required: [true, "Pembayaran harus memiliki jam tayang"]
    },
    total: {
        type: Number,
        required: [true, "Pembayaran harus memiliki total"]
    }
});

schemaPembayaran.indexes({ id_user: 1 });
schemaPembayaran.indexes({ id_film: 1 });

const pembayaran = mongoose.model("pembayaran", schemaPembayaran);

module.exports = pembayaran;