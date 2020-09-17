const express = require("express");
const fs = require("fs");

const app = express();
const logins = [];
app.use(express.json());

function salvarEmails (){
  fs.writeFile("./emails.txt",`${logins}`, function(err){
    if(err){
      return console.log('Erro ao Criar Arquivo');
    }
    // console.log('Arquivo criado/atualizado');
  });
}

app.post('/SalvarLogin', (request, response)=>{
  const { login } = request.body;
  
  console.log({email: login});
  
  salvarEmails("login");
  
  logins.push(login);

  return response.json({id: logins.length-1 ,email: login});
});

app.get('/listarLogins', (request, response)=>{

  const loginsFormat = logins.map((login, index) => ({id: index, email: login}));
  
  return response.json(loginsFormat);

});

app.get('/listarLogins/:id', (request, response)=>{
  
  const {id} = request.params;
  
  console.log(id);
  
  return response.json({id: id, email: logins[id]});

});

app.post('/alterarEmail/:id', (request, response)=>{
  const {id} = request.params;
  const { login } = request.body;
  logins[id] = login;

  salvarEmails("login");
  
  return response.json({id: id, email: login});
});


app.listen(9999, ()=>{
  return console.log("Servidor no ar!");
});