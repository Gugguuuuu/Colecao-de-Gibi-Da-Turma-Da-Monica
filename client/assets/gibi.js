var buttonCheck = document.getElementById('check');

buttonCheck.addEventListener('click',() =>{
   let nomeDoGibi = document.getElementById('textGibi').value;
   console.log(nomeDoGibi)

   if (nomeDoGibi == '') {
      alert('Este campo é obrigatorio')
   } else{
      var listaDeGibis = fetch(`http://localhost:3000/database?name=${nomeDoGibi}`).then((result) => result.json())
   .then((dado) =>{
      console.log(dado);
      return dado
   })
   let resposta = document.createElement('p');
   resposta.textContent = `${listaDeGibis}`
   }

})