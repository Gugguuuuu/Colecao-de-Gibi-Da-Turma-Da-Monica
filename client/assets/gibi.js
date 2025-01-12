var nomeDoGibi = document.getElementById('textGibi').value;
var buttonCheck = document.getElementById('check');

buttonCheck.addEventListener('click', async () =>{
   var listaDeGibis = await fetch('http://localhost:3000/database');
   
})//