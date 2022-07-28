const context = require('../db/strategies/base/contextStrategy')
const mongo = require('../db/strategies/mongodb/mongodb')
const schema = require('../db/strategies/mongodb/schemas/heroisSchema')

// const connection = mongo.connect()
// const heroiCon = new context(new mongo(connection, schema))



const newHeroe = {
    nome: 'Mulher gaivião',
    poder: 'asas'
}

// heroiCon.create(newHeroe)

async function list(){

    const connection = mongo.connect()
    const heroiCon = new context(new mongo(connection, schema))


    const listar = await heroiCon.read({})
    return console.log(listar)
}
list()
