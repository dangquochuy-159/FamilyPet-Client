const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://huydang1509:dangquochuy%40%401509abcxyz@atlascluster.fc1avhz.mongodb.net/Shoppet", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connect thành công");
    } catch (error) {
        console.log("connect thất bại");
    }
}

module.exports = {
    connect,
};