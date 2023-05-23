// Module
const path = require("path");

const users = require(path.join(__dirname, "../resources/users.js"));

exports.register = async (req, res) => {
    const { body } = req;

    if (!body) return res.status(400).json({ status: 400, message: "Request harus memiliki body" });

    if (!("userName" in body) || !("password" in body) || !("email" in body) || !("nomorHP" in body)) {
        return res.status(400).json({ status: 400, message: "Semua data harus diisi" });
    }

    const isExist = await users.findOne({ email: body.email });

    if (isExist) return res.status(409).json({ status: 409, message: "Email sudah digunakan" });

    const { role, ...data } = body;
    const { userName, email, nomorHP } = await users.create(data);

    return res.status(200).json({ status: 200, message: "Register Berhasil", data: { userName, email, nomorHP } });
}

exports.login = async (req, res) => {
    const { body } = req;

    if (!body) return res.status(400).json({ status: 400, message: "Request harus memiliki body" });

    if (!("userName" in body) || !("password" in body)) {
        return res.status(400).json({ status: 400, message: "Semua data harus diisi" });
    }

    const isExist = await users.findOne({ userName: body.userName }).select("+password");

    if (!isExist) return res.status(409).json({ status: 400, message: "username atau password salah" });
    if (!await isExist.comparePassword(body.password)) return res.status(409).json({ status: 400, message: "username atau password salah" });

    return res.status(200).json({ status: 200, message: "Login Berhasil", data: {} });
}