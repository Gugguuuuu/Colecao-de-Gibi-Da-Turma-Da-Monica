var buttonCheck = document.getElementById('check');

buttonCheck.addEventListener('click', () =>{
   let nomeDoGibi = document.getElementById('textGibi').value;

   if (nomeDoGibi != '') {
      alert('Este camp')
   }

   var listaDeGibis = fetch('http://localhost:3000/database').then((result) => result.json())
   .then((dado) =>{
      console.log(dado);
      return dado
   })
   console.log(listaDeGibis)
})