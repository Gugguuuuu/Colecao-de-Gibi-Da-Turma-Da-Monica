const express = require('express');
const app = express()
const mysql = require('mysql2');
const cors = require('cors')//

app.use(express.json());
app.use(cors())//

var con = mysql.createConnection({//
  host: "supinely-vocal-dobsonfly.data-1.use1.tembo.io",
  user: "postgres",
  password: "ZMksQDshlrKyhbW0",
  database: 'gibis',
  connectTimeout: 10000
});

con.connect((err) => {
  if (err) {
    console.error("Erro de conexão:", err);
    return;
  }
  console.log("Conectado!");
});


function getGibi() { // ESSA FUNÇAO TEM Q SER ASSINCRONA
  var cay = new Promise((resolve, reject) => { ///
    con.query('select nome from nomes_de_gibi;', function (err, result, fields) {//

      if (err) {
        console.error("Erro de conexão:", err);
        return reject(err);//
      } else {
        resolve(result)//
      }
    })

  })
  return cay;
}

app.get('/', (req, res) => {
  res.send('bom dia')
})

app.get('/database', async (req, res) => {///
  const nomes_do_gibi = req.query.name;
  const temGibiOuNao = await new Promise((resolve, reject) => {
    con.query(`select nome from nomes_de_gibi where nome = "${nomes_do_gibi}"`, function (err, result) {
      if (err) {
        console.log(`ERRO : ${err.message}`)
        return reject(err);
      } else {
        resolve(result)
      }
    })
  })
  if (temGibiOuNao == '') {
    res.json('nao tem o gibi, pode comprar')
  } else if (temGibiOuNao[0].nome == nomes_do_gibi) {
    res.json('tem o gibi')
  }

})

app.get('/addgibi', async (req, res) => {
  const nome_do_novo_gibi = req.query.nome
  const nome_do_personagem_do_novo_gibi = req.query.personagem

  const verificacao = await new Promise((resolve, reject) => {
    con.query(`select nome from nomes_de_gibi where nome = '${nome_do_novo_gibi}'`, function (err, result) {
      if (err) {
        console.log("message : 'deu errado'")
        return reject(err)
      } else {
        console.log("message : 'deu certo'")
        resolve(result)
      }
    })
    //fim da query
  })
  //fim da promisse

  if (verificacao.length === 0) {
    con.query(`insert into nomes_de_gibi (nome, personagem) values ("${nome_do_novo_gibi}","${nome_do_personagem_do_novo_gibi}")`, function (err) {
      if (err) {
        res.json({message :` erro : ${err}`})
      } else {
        res.json({message :"Gibi Adicionado"})
      }
    })

  } else{
    res.json({message :"ja tem gibi"})
  }

}) // fim da função



app.listen(5432, (err) => {
  if (err) {
    console.error('ERRO!', err.message)
  } else { console.log('http://supinely-vocal-dobsonfly.data-1.use1.tembo.io:5432'); }
});
