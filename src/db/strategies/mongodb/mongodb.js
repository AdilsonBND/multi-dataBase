const ICrud = require('../interfaces/interfaceCrud')
const { mongoose, connection } = require('mongoose')


const STATUS = { 0: 'Desconectado', 1: 'Conectado', 2: 'Conectando', 3:'Desconectado'}


class MongoDB extends ICrud{
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
        
    }
    async isConnected(){
        const state = STATUS[connection.readyState]
        if(state === 'Conectado') return state;
        if(state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1000))
        return STATUS[connection.readyState]
    }
    
    static connect() {

        mongoose.connect(process.env.MONGODB_URL)
        const connection = mongoose.connection
        connection.once('open', () =>{
            
            console.log('db rodando')
        })

        return connection
        
    }
    async create(item){
        return await new this._schema(item).save()
        
        
    }
    async read(item, skip=0, limit=0){
        return this._schema.find(item).skip(skip).limit(limit)
    }
    async update(id, item){
       
        return this._schema.updateOne({_id: id}, {$set: item})
    }
    async delete(id){
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDB