const { mongoose, Schema } = require('mongoose')




mongoose.connect('mongodb://adilson:senhasecreta@localhost:27017/heroes?authSource=heroes')

const connection = mongoose.connection

connection.once('open', () =>{
    console.log('db rodando')
})



// setTimeout(()=>{
//     const state = connection.readyState
//     console.log(state)

// }, 1000)

// status:
// 0 desconectado
// 1 conectado
// 2 conectando

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

const hero = mongoose.model('hero', heroeSchema)

async function main(){
    const resultCadastrar = await new hero({
        nome: 'Batman',
        poder: 'Grana'
    }).save()

    const listItems = await hero.find()
    console.log(listItems)
}
main()