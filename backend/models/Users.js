const mondgoose = require('mongoose');

const userFrinat = mondgoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});