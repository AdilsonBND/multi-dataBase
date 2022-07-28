const { mongoose, Schema }= require('mongoose')



const heroeSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('hero', heroeSchema)


