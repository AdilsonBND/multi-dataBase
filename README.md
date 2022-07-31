Projeto multi banco de dados:

Projeto realizado durante o curso disponibilizado pela comunidade NodeBE.org.

Trata-se de um projeto no qual utiliza-se o postgres para persistência dos usuários e suas respectivas senhas 
e utiliza-se o mongodb para persistência dos cadastros de heróis e seus poderes.

Para vizualizar o projeto basta acessar o link abaixo uma vez que está disponibilizado no heroku:

https://multidb-project.herokuapp.com/documentation

Acesse a rota de login e preencha os seguintes dados para obter o token:

{
  "username": "ninguem",
  "password": "qwe123@@@"
}

Após preencher o usuário e senha será gerado o token que permitirá acessar as demais rotas: Listar, Cadastrar, Deletar e Alterar.

Também foram disponibilizados os índices de cobertura de testes do código no link abaixo:

https://multidb-project.herokuapp.com/coverage/