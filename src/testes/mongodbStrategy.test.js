const assert = require('assert')
const Context = require('../db/strategies/base/contextStrategy')
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchema')
const MongoDB = require('../db/strategies/mongodb/mongodb')

let context = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Huck',
    poder: 'Forca'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `Thor-${Date.now()}`,
    poder: 'Martelo'
}

describe('MongoDb test', function () {
    this.beforeAll( async()=>{
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, HeroiSchema))
        
    })
    it('verificar conexao',async()=>{
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
        // console.log(result)
    })
    it('cadastrar',async()=>{

        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        // console.log(result)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)

    })
    it('listar',async()=>{
    
        const result =await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        // console.log(result)
        const [{nome, poder}] = result
        // read retorna listas[] entao podemos extrair [lista0, lista1 etc...], ainda podemos extrair obejtos
        //  especificos da lista desta foma [{nome, poder}, lista1 ...] extraidos objetos nome e poder da lista 0
        // const result = {nome, poder }
    
        // console.log(result)
        resultado = {nome, poder}
        
        assert.deepEqual(resultado, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async() =>{

        await context.create(MOCK_HEROI_ATUALIZAR)
        const resultadoCriar = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = resultadoCriar._id

        // console.log(MOCK_HEROI_ID)
         const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
         })


         assert.deepEqual(result.modifiedCount, 1)
        // console.log(result)
    })
    it ('deletar dados', async()=>{
        const result = await context.delete(MOCK_HEROI_ID)
        // console.log(result.deletedCount, 1)

    })
})