const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema')
const ContextStrategy = require('../db/strategies/base/contextStrategy')

// const context = new Context(new Postgres())
const MONCK_HEROI_CADASTRAR = {
    
    nome: 'gaviao',
    poder: 'flexas'
}

const MONCK_HEROI_ARUALIZAR = {
    
    nome: 'BATMAN',
    poder: 'GRANA'
}

let context = {}
describe('teste crud Postgres', () => {
    before(async function(){
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
        await context.create(MONCK_HEROI_ARUALIZAR)
    })
    it('teste connect', async() =>{
        const result = await context.isConnected()
        assert.equal(result, true)
         
    })
    it('cadastrar', async() =>{
        const result = await context.create(MONCK_HEROI_CADASTRAR)
        delete result.id

        const {nome, poder} = result
       
        assert.deepEqual({nome, poder} , MONCK_HEROI_CADASTRAR)
        
    })
    it ('listar', async () => {
        //pegar posicao zero result[0]
        const [result] = await context.read({nome: MONCK_HEROI_CADASTRAR.nome})
        delete result.id
        const {nome, poder} = result
        assert.deepEqual({nome, poder}, MONCK_HEROI_CADASTRAR)
    })
    it ('teste update',  async()=>{
        const [itemAtualizar] = await context.read({nome: MONCK_HEROI_ARUALIZAR.nome})
        const novoItem = {
            ...MONCK_HEROI_ARUALIZAR,
            nome: 'XYZ'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        assert.deepEqual(result, 1)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })
    it('delete por id', async()=>{
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})