// CRIAÇÃO E REMOÇÃO DO FORMULARIO

var form_Add_Box = document.querySelector('.add-gibi-Div-box')//A section do formulario
var formAdd = document.querySelector('.add-gibi-Div');//O formulario

var button_Add_Gibi = document.querySelector('.button-add-gibi')
var eraserButton = document.querySelector('.eraser-Button');
form_Add_Box.removeChild(formAdd);


// FUNÇÃO QUE BOTA O FORMULARIO NA TELA 

var button_form = document.querySelector('.button-Form');//botao que 'cria' o Formulario
const createFormAdd = () => {
   form_Add_Box.appendChild(formAdd)
}
button_form.addEventListener('click', createFormAdd)


// ADICIONA OS GIBIS

const adicionar_gibi = () => { 
   let inputAdd_nome = document.getElementById('input-add-name')
   let inputAdd_personagem = document.getElementById('input-add-personagem')

   if (inputAdd_nome.value != '' && inputAdd_personagem != '') {
      let result = fetch(`http://localhost:3000/addgibi?nome=${inputAdd_nome.value}&personagem=${inputAdd_personagem.value}`)
         .then((result) => result.json()).then((dado) => {
            console.log(dado)
            return dado
         }).catch((err) => {
            console.err(err)
         })

   }
}
button_Add_Gibi.addEventListener('click', adicionar_gibi)


// TIRA O FORMULARIO
eraserButton.addEventListener('click', () => { form_Add_Box.removeChild(formAdd); })


// VERIFICA SE TEM OS GIBIS
var button_Check = document.getElementById('button-check');//botao que verifica se tem o gibi
const verifica_gibi = () => {
   let resposta = document.createElement('p');
   resposta.classList.add('resposta');
   var nomeDoGibi = document.getElementById('input-textGibi').value;


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
}
button_Check.addEventListener('click', verifica_gibi)





