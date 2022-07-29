const assert = require('assert')
const { model } = require('mongoose')

const api = require('../api')

const Context = require('../db/strategies/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema')

let app = {}
const USER = {
    username: 'ninguem',
    password: 'qwe123@@@'
}
const USER_DB = {
    username: USER.username.toLocaleLowerCase(),
    password: '$2b$04$s5sKR4ZwNP60X9LsWNMDqeMjDj5K1kT4nhWIhi6l5mpHSlyAQDXxi'
}
describe('Teste auth', async function () {
    this.beforeAll(async() =>{
        app = await api
        conexao = await Postgres.connect()
        const model = await Postgres.defineModel(conexao, UsuarioSchema)
        context = new Context(new Postgres(conexao, model))
        await context.update(null, USER_DB, true)
    })

    it('deve obter token', async() =>{
        const result = await app.inject({
            method: 'POST',
            url: "/login",
            payload: USER
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
        console.log(dados.token)
    })
    it('deve retornar nao autorizado ao tentar login errado', async() =>{
        
        const result = await app.inject({
            method: 'POST',
            url: "/login",
            payload: {
                username: 'teste',
                password: '123'
            }
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        // console.log(dados)
        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized")

    })
})