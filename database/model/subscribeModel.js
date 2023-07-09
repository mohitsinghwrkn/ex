const mongoose = require("mongoose")

const subscribeSchema = mongoose.Schema(
    {subscribe: String}
)

const subscribeModel = mongoose.model('subscribeCollection', subscribeSchema)
module.exports = subscribeModel
