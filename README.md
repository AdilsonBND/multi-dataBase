# Projeto multi banco de dados:



<div>
  <img align="right" src="https://github.com/AdilsonBND/multi-dataBase/blob/master/swaggerHeroku.png" width="55%"  />
</div>

<h2> Projeto realizado durante o curso disponibilizado pela comunidade NodeBE.org. </h2>

Trata-se de um projeto no qual utiliza-se o postgres para persistência dos usuários e suas respectivas senhas 
e utiliza-se o mongodb para persistência dos cadastros de heróis e seus poderes.

* Para vizualizar o projeto basta acessar o link abaixo uma vez que está disponibilizado no heroku:

<pre> https://multidb-project.herokuapp.com/documentation </pre>

* Acesse a rota de login e preencha os seguintes dados para obter o token:

<pre>
{
  "username": "ninguem",
  "password": "qwe123@@@"
}
</pre>

* Após preencher o usuário e senha será gerado o token que permitirá acessar as demais rotas: Listar, Cadastrar, Deletar e Alterar.

Também foram disponibilizados os índices de cobertura de testes do código no link abaixo:

<pre> https://multidb-project.herokuapp.com/coverage/ </pre>
