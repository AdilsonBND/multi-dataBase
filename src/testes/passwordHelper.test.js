const assert = require('assert')
const PasswordHelper = require ('../helpers/passwordHelper')

const SENHA = 'qwe123@@@'
const HASH = '$2b$04$s5sKR4ZwNP60X9LsWNMDqeMjDj5K1kT4nhWIhi6l5mpHSlyAQDXxi'

describe('User Helper test suite', function() {
    it('deve gerar hash a partir de uma senha', async () =>{ 
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
        console.log(result)
    })
    it('compara a senha e seu hash', async()=>{
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        console.log(result)
        assert.ok(result)
    })
})