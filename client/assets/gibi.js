var buttonCheck = document.getElementById('check');
var addButton = document.querySelector('.add');
var eraserButton = document.querySelector('.eraserButton')

eraserButton.addEventListener('click', () => {
   //INPUT
   label_nome.removeChild(inputAdd_nome)// remove input nome a label nome
   label_personagem.removeChild(inputAdd_personagem)// remove input a label personagem

   //ERASER BUTTON
   div_add.removeChild(eraserButtonDiv)

   //LABEL
   div_add.removeChild(label_nome);//remove label nome
   div_add.removeChild(label_personagem);// remove label personagem

   //BUTTON ADD
   div_add.removeChild(addButton);// remove botao
   addButton.classList.remove('addButton')
   addButton.classList.add('add')
   addButton.textContent = '+'
   addButton.addEventListener('click', createFormAdd)
   document.body.appendChild(addButton)
})

const createFormAdd = () => {
   


   eraserButton.addEventListener('click', () => {
      //INPUT
      label_nome.removeChild(inputAdd_nome)// remove input nome a label nome
      label_personagem.removeChild(inputAdd_personagem)// remove input a label personagem

      //ERASER BUTTON
      div_add.removeChild(eraserButtonDiv)

      //LABEL
      div_add.removeChild(label_nome);//remove label nome
      div_add.removeChild(label_personagem);// remove label personagem

      //BUTTON ADD
      div_add.removeChild(addButton);// remove botao
      addButton.classList.remove('addButton')
      addButton.classList.add('add')
      addButton.textContent = '+'
      addButton.addEventListener('click', createFormAdd)
      document.body.appendChild(addButton)

      // MAIN DIV
      document.body.removeChild(div_add);// remove a div no body
   })

   eraserButtonDiv.appendChild(eraserButton) // adicionar o eraserButton a div dele



   document.body.appendChild(div_add);// coloca a div no body
   div_add.appendChild(eraserButtonDiv)
   div_add.appendChild(label_nome);//add label nome
   div_add.appendChild(label_personagem);// add label personagem
   div_add.appendChild(addButton);// add botao

   addButton.removeEventListener('click', createFormAdd);//tira antiga função do botao

   addButton.addEventListener('click', (err) => { // add nova funçao do botao
      if (inputAdd_nome.value != '' || inputAdd_personagem != '') {
         let result = fetch(`http://localhost:3000/addgibi?nome=${inputAdd_nome.value}&personagem=${inputAdd_personagem.value}`)
            .then((result) => result.json()).then((dado) => {
               console.log(dado)
               return dado
            })
         if (err) {
            console.log(err)
         } else {
            console.log('deu certo', result)
         }
      }
   })
}


addButton.addEventListener('click', createFormAdd)


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