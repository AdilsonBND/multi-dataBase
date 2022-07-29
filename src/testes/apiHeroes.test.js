
const assert = require('assert')
const api = require('../api')
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pbmd1ZW0iLCJpZCI6MSwiaWF0IjoxNjU5MDYwMDY2fQ.7jKooqyIvlZqEos4IoRu2neDosJCZRHXSOSJmDeVhQo'
const headers = {
    Authorization: TOKEN
}
let app ={}
const HEROI_CADASTRAR = {
    nome: 'Colorado1',
    poder: "forca"
}
const HEROI_INICIAL = {
    nome: 'Huck',
    poder: "forca"
   
}
let MOCK_ID = ''

describe('testes de api heros', async() => {
    before(async () =>{
        app = await api 
        const result = await app.inject({
            method: 'POST',
            headers,
            url: '/heroes',
            payload: JSON.stringify(HEROI_INICIAL)
        })
        dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })
    it('listar /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/heroes?skip=10&limit=10&nome=Huck`
        })
        const dados = JSON.parse(result.payload)
    
        const statusCode = result.statusCode
        // console.log(result)
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })
    it('listar /herois retonar quantidade de reg', async() => {
        const tamanho_limite = 1
        const n_skip = 1
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/heroes?skip=${n_skip}&limit=${tamanho_limite}&nome=Huck`
        })
        const dados = JSON.parse(result.payload)
        // console.log(dados)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === tamanho_limite)
    })
    it('deve filtrar um item', async() =>{
        const tamanho_limite = 1
        const n_skip = 1
        const nome_filt = "Huck"
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/heroes?skip=${n_skip}&limit=${tamanho_limite}&nome=${nome_filt}`
        })
        const dados = JSON.parse(result.payload)
        
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)  
        assert.deepEqual(dados[0].nome, nome_filt)      
        // console.log(dados)
        assert.ok(dados[0].nome === nome_filt)
    })
    it('deve retornar erro', async() =>{
        const tamanho_limite = 'sdfsdf'
        const n_skip = 1
        const nome_filt = "Huck"
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/heroes?skip=${n_skip}&limit=${tamanho_limite}&nome=${nome_filt}`
        })
        const dados = JSON.parse(result.payload)
        
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 400)

        assert.deepEqual(result.payload, `{"statusCode":400,"error":"Bad Request","message":"child \\"limit\\" fails because [\\"limit\\" must be a number]","validation":{"source":"query","keys":["limit"]}}`)

        // console.log(result.payload)
    })   
    it('listar /herois validacao joi', async () =>{
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/heroes?skip=10&limit=10&nome=Huck`
            
            // url: `/heroes`
        })
        const dados = JSON.parse(result.payload)
    
        // const statusCode = result.statusCode
        // console.log(dados)
        // assert.deepEqual(statusCode, 200)
        // assert.ok(Array.isArray(dados))
        // console.log(result.query)

    })
    it('cadastrar heroes post', async() =>{
        const result = await app.inject({
            method: 'POST',
            url: `/heroes`,
            headers,
            payload: JSON.stringify(HEROI_CADASTRAR)
            
        })
        dados = JSON.parse(result.payload)
        assert.deepEqual(dados.message, "cadastrado")
        // const statusCode = result.statusCode
    //    console.log(result)
        
        
      
        // assert.ok(statusCode === 200)
        // const {message, _id} = JSON.parse(result.payload)
        // assert.deepEqual(message, "cadastrado")
        // console.log(_id)

    })
    it('ATUALIZAR patch heroes/id', async() =>{
        const _id = MOCK_ID
        const expected = {
        
            poder: 'Martelo',
            nome: 'Thor'
        }

         const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/heroes/${_id}`,
            payload: JSON.stringify(expected)
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
       
        // console.log(dados)
        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "atualizado")
    })
    it('deleta por id', async() =>{
        const _id = MOCK_ID
        // const _id = '62dbd133434b87185e7432f5'
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/heroes/${_id}`
        })

        const statusCode = result.statusCode
        assert.ok(statusCode === 200)
        const dados = JSON.parse(result.payload)
        assert.deepEqual(dados.message, 'removido')

    })
})