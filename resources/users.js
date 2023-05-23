// NPM Modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User harus memiliki userName"]
    },
    password: {
        type: String,
        required: [true, "User harus memiliki password"],
        select: false
    },
    email: {
        type: String,
        required: [true, "User harus memiliki email"]
    },
    nomorHP: {
        type: String,
        required: [true, "User harus memiliki nomor hp"]
    },
    roles: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: "User harus memiliki roles"
        },
        select: false
    }
},
    {
        methods: {
            async comparePassword(candidate) {
                return await bcrypt.compare(candidate, this.password);
            }
        }
    });

userSchema.indexes({ userName: 1 });
userSchema.indexes({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 11);
        } catch (error) {
            next(error);
        }
        next();
    }
});

const user = mongoose.model("users", userSchema);

module.exports = user;

