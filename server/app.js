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
      } else{
        resolve(result)//
      }
    })
  
  })
  return cay;
}

app.get('/', (req, res) => {
  res.send('bom dia')
})

app.get('/database', async(req, res) => {///
  try{
      var resp = await getGibi();///
      res.json(resp)//
  } catch(err){
      res.send(`Algo deu erradoooo! ${err.message}`)///
  }
})


app.listen(3000, (err) => {
  if (err) {
    console.error('ERRO!', err.message)
  } else { console.log('http://localhost:3000'); }
});
