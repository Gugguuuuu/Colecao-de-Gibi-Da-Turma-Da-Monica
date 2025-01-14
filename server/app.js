const express = require('express');
const app = express()
const mysql = require('mysql2');
const cors = require('cors')//

app.use(express.json());
app.use(cors())//

var con = mysql.createConnection({//
  host: "localhost",
  user: "root",
  password: "Gustavo2011@#",
  database: 'gibis'
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

// app.get('/addgibi', async (req, res) => {
//   const nome_do_novo_gibi = req.query
//   const promisse = await new Promise((resolve, reject) => {
//     con.query(`insert into nomes_de_gibi ("nome", "personagem") values ("${nome_do_novo_gibi.nome}","${nome_do_novo_gibi.personagem}")`, function (err, result) {
//       if (err) {
//         res.send('Deu errado')
//         return reject(err)
//       } else {
//         resolve(result)
//         res.send('Deu certo')
//       }
//     })//fim da query
//   })//fim da promisse
// })


app.listen(3000, (err) => {
  if (err) {
    console.error('ERRO!', err.message)
  } else { console.log('http://localhost:3000'); }
});
