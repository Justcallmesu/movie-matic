const mongoose = require("mongoose");

const schemaPembayaran = mongoose.schema({
    tanggal_transaksi: {
        type: Date,
        default: Date.now()
    },
    id_user: {
        type: mongoose.Types.ObjectId,
        required: [true, "Pembayaran harus memiliki target user"]
    },
    total: {
        type: Number,
        required: [true, "Pembayaran harus memiliki total"]
    }
})

const pembayaran = mongoose.model("pembayaran", schemaPembayaran);

module.exports = pembayaran;