const assert = require('assert')
const PasswordHelper = require ('../helpers/passwordHelper')

const SENHA = 'qwe123@@@'
const HASH = '$2b$04$eU0/AinjsmTu6uZhaB6SOelPc2sx/jZKXChr1b3Xyv5blSey5Eg2W'

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