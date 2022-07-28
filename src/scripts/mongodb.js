// docker ps \

// docker exec -it mongodb bash 

// mongo --host mongodb://adilson:senhasecreta@localhost/27017?authSource=heroes

// use heroes

// show collections

db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
});

db.heroes.find().pretty();

for(let i=0; i<= 10; i++){
    db.heroes.insert({
        nome: `Clone-${i}`,
        poder: 'clonagem',
        dataNascimento: '1998-01-01'
    })
};
db.heroes.count()

db.heroes.findOne()

db.heroes.find().limit(10).sort({nome: -1})

// trazer todos registros {} com o poder = 1 mas sem o _id = 0
db.heroes.find({},{poder: 1, _id:0}) 

// create

db.heroes.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
});

// read

db.heroes.findOne()

db.heroes.find().limit(10).sort({nome: -1})

// trazer todos registros {} com o poder = 1 mas sem o _id = 0
db.heroes.find({},{poder: 1, _id:0}) 

// update
// atualizou apenas um campo excluindo os demais
db.heroes.update({_id: ObjectId("62d0a94bf2dc59adbbb1152c")}, {nome: 'Anel verde'})

// atualizar um campo sem excluir os demais

db.heroes.update({_id: ObjectId("62d0ab1306ae78315ab8ff58")}, {$set: {nome: 'Batman'}})

// delete

db.heroes.remove({nome: 'Clone-0'})
