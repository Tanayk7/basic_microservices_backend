const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        gender: { type: String, required: true },
        status: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

userSchema.statics.build = (attrs) => {
    return new User(attrs);
}

const User = mongoose.model("user", userSchema);

module.exports = User;

