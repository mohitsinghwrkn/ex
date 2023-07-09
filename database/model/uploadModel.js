const mongoose = require('mongoose')

uploadSchema = mongoose.Schema({
    name: String,
    desc: String,
    image: {
        data:  Buffer,
        contentType: String        
    }
})

uploadModel = mongoose.model("uploadCollection", uploadSchema)
module.exports = uploadModel
