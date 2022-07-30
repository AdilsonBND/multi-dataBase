const ICrud = require('../interfaces/interfaceCrud')
const { Sequelize } = require('sequelize')

const { options } = require('./schemas/heroiSchema')




class Postgres extends ICrud{
    constructor(connection, schema){
        super()
        this._connection = connection
        this._schema = schema
        
    }

    async isConnected(){

        try{
            await this._connection.authenticate()
            return true 
        }
        catch(error){
            console.log(error)
            return false;
        }

    }

    async create(item){
        const {dataValues} = await this._schema.create(item)
        return dataValues
       
    }
    async read(item = {}){
        return this._schema.findAll({where: item, raw: true})
       

    }

    async update(id, item, upsert = false){
        const fn = upsert ? 'upsert': 'update'
        return this._schema[fn](item, {where:{id: id}})
    }
    async delete(id){
        const query = id ? {id : id} : {}
        return this._schema.destroy({where : query})
    }

    static async defineModel(connection, schema){
        const model = connection.define(
            schema.name, schema.schema, options.options
        )
        await model.sync()
        return model
    }

    static async connect(){


        
        const connection = new Sequelize(process.env.POSTGRES_URL, {
             
          
            dialectOptions: {
                
                ssl: {
                    require: process.env.SSL_DB,
                    rejectUnauthorized: false
                
                }
                           
                
            }
        })
     

        // const connection = new Sequelize(
        //     'heroes',
        //     'adilson',
        //     'senhasecreta',
        //     {
        //         host:'localhost',
        //         dialect:'postgres',
        //         quoteIdentifiers: false,
        //         operatorsAliases: false,
        //         logging: false
        //     }
        // )
        return connection
    }

}

module.exports = Postgres