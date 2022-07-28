//npm install sequelize pg-hstore pg

const { Sequelize } = require('sequelize')


const driver = new Sequelize(
    'heroes',
    'adilson',
    'senhasecreta',
    {
        host:'localhost',
        dialect:'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

async function main(){

    const Heroes = driver.define('heroes', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })
    await Heroes.sync()


    await Heroes.create({
        nome: 'lanterna verde',
        poder: 'anel'
    })

    const result = await Heroes.findAll({
        raw:true,
        //se quiser apresentar apenas tributos selecionados:
        attributes: ['nome','poder']
    })
    console.log(result)
}
main()