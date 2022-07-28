const {config} = require('dotenv')
const {join} = require('path')
const {ok} = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env == "dev", "env é inválida, dev ou prod")
const configPath = join('./config/', `.env.${env}`)
config({
    path: configPath
})


const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')
const Postgres = require('../src/db/strategies/postgres/postgres')
const UsuarioSchema = require('../src/db/strategies/postgres/schemas/usuarioSchema')


const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const JWT_SECRET = process.env.JWT_KEY
const HapiJwt = require('hapi-auth-jwt2')


const app = new Hapi.Server({
    port: process.env.PORT,
})

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}

async function main (){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    // console.log(mapRoutes(new HeroRoute(context), HeroRoute.methods()))

    const connectionPostgres = await Postgres.connect()
    const usuarioSchemaPostgres = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, usuarioSchemaPostgres))


    
    const swaggerOptions = {
        info: {
            title: 'API Heroes',
            version: 'v1.0'
        },
        lang: 'pt'
    };

    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // }
        validate: async (dado, request) =>{
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase(),
                id: dado.id
            })
            if(!result){
                return{ isValid: false}
            }

            // console.log(result)
            // verifica no banco se user continua ativo
            // verificar se user esta pagando etc
            return {
                isValid: true   
            }
        }
    })

    app.auth.default('jwt')
    app.route([
    
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
    ])
    await app.start()
    console.log('rodando hapi na porta: ', app.info.port)
    return app;
}
module.exports = main()