var buttonCheck = document.getElementById('check');
var addButton = document.querySelector('.add');




addButton.addEventListener('click', () =>{
   var div_add = document.createElement('div')//cria div
   var input_add = document.createElement('input')//cria input

   addButton.classList.remove('add')
   addButton.classList.add('addButton')
   input_add.classList.add('addInput')
   div_add.classList.add('addDiv')
   document.body.appendChild(div_add);
   div_add.appendChild(input_add);
   div_add.appendChild(addButton);
})


buttonCheck.addEventListener('click', () => {
   let resposta = document.createElement('p');
   resposta.classList.add('resposta');
   var nomeDoGibi = document.getElementById('textGibi').value;
      

   if (nomeDoGibi == '') {
      alert('Este campo é obrigatorio')
   } else {
      var listaDeGibis = fetch(`http://localhost:3000/database?name=${nomeDoGibi}`).then((result) => result.json())
         .then((dado) => {
            console.log(dado);
            resposta.textContent = `${dado}`
            document.body.appendChild(resposta)
            return dado
         })
   }
})