const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')



const Boom = require('boom')

const failAction = (request, headers, erro) => {throw erro}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()


class HeroRoutes  extends BaseRoute {
    constructor(db){
         super()
        this.db = db
    }
    
    list() {


        return {
            path: '/heroes',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Listar herois cadastrados',
                notes: 'pode filtrar por nome e paginar os dados',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number(),
                        limit: Joi.number(),                  
                        nome: Joi.string()
                    },
                    headers,
        
                }
            },
            handler: (request) => {
                try {
                    const {skip, limit, nome} = request.query
                    
                    // console.log(request.query)
                    
                    // let query = {}
                    // if(nome){
                        // query.nome = nome
                    // }
                    // if(typeof skip === String){
                    //     throw Error('tipo skip inválido')
                    // }
                    // if(typeof limit  === String){
                    //     throw Error('tipo limit inválido')
                    // }
                    const query = nome ? {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    } : {}
                    
            
                  
                    return this.db.read(query, skip, limit)
                }
                catch(error){
                    return Boom.internal()

                }
            
            }
            
        }
    }

    create(){
        return{
            path: '/heroes',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Criar herois',
                notes: 'cria herois e registra no BD',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(30).required()
                    }
                },

            },
            handler: async (request) => {
                try {
                    const {nome, poder} = request.payload
                    
                    // console.log(typeof(nome))
                    // if(typeof nome != 'string'){
                    //     throw Error('tipo  inválido')
                    // }
                    // if(typeof poder  != 'string'){
                    //     throw Error('tipo  inválido')
                    // }
                    
                    
                    const result = await this.db.create({nome, poder})
                    
                    return {
                        message: "cadastrado",
                        _id: result._id
                    }
                } 
                catch (error) {
                    return Boom.internal()
                }   

            },
       
        }
        
    }
    
    update() {
        return {
            path: '/heroes/{_id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Altera Herói',
                notes: 'altera dados de um Herói',
                validate: {
                    failAction,
                    params: {
                        _id: Joi.string().required()
                    },
                    headers,
                    payload: {
                        nome: Joi.string(),
                        poder: Joi.string()
                    }
                }
            },
            handler: async (request) => {
                try {
                                       
                    const id = request.params
                    const payload = request.payload
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    // if(payload.nome){
                    //     if(typeof payload.nome !="string"){
                    //         throw('invalido')
                    //     }
                    // }
                    // if(payload.poder){
                    //     if(typeof payload.poder !="string"){
                    //         throw('invalido')
                    //     }
                    // }
                    

                    // if(!id) {
                    //     throw Error('Incluir ID')
                    // }
                    // console.log(id)
                    const result = await this.db.update(id, dados)
                //     if (result.modifiedCount !== 1){
                //         return Boom.preconditionFailed()
                //     }
                     return { message: "atualizado" }
                }
                catch(error){
                    return Boom.internal()
                }
                
            }
        }
    }
    delete() {
        return {
            path: '/heroes/{_id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                notes: 'Deletar Heróis',
                description: 'Deleta o herói',
                validate: {
                    failAction,
                    headers,
                    params: {
                        _id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const id = request.params
                    // console.log(id)
                    const result = await this.db.delete(id)
                    // console.log(result)
                    if (result.deletedCount != 1){
                        throw(error)
                    }
                    return {message: 'removido'}
                }
                catch(error){
                    return Boom.internal()
                }
            }

        }

    }
}
module.exports = HeroRoutes