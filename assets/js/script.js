const menuAjuda = document.querySelector('#menuAjuda');

const pTipo = document.querySelector('nav ul li p');
const pAcessibilidade = document.querySelector('#Acessibilidade');
const pParticipantes = document.querySelector('#Participantes');
const pAtividade = document.querySelector("#Atividade");
const pLink = document.querySelector('#Link');

const button = document.querySelector('main section button')

const navMenu = document.querySelector('div nav');
const navBar = document.querySelector('.navbar i');

const input = document.querySelector(' div input');
let valor = JSON.parse(localStorage.getItem("valorTotal") || 0);
input.value = valor;

const buttonAtividadeCompleta = document.querySelector('div button');
var LiberarButtonAtividadeCumprida = false;



menuAjuda.onclick = function () {
    pTipo.textContent = "Tipo de atividade [educação, recreação, social, bricolagem, caridade, culinária, relaxamento, música, atividade ocupada] "
    pAcessibilidade.textContent = "Um fator que descreve como é possível um evento ser zero, sendo o mais acessível [0,0, 1,0]";
    pAtividade.textContent = "Descrição da atividade";
    pParticipantes.textContent = "O número de pessoas que essa atividade poderia envolver [0, n]";
    pLink.textContent = "Um link para realizar a atividade, caso necessario.";
    document.getElementById("Link").style.display = "block";

 }



function implementandoRespostaDaAPI(Informaçoes) { 
   for(var campo in Informaçoes){
    
    
    switch(campo){
        case 'activity' :
            var Atividade = Informaçoes[campo];
        
        break

        case 'accessibility' :
            var Acessibilidade = Informaçoes[campo];
            
        break

        case 'participants' :
            var Participantes = Informaçoes[campo];
           
        break

        case 'type' :
            var Tipo = Informaçoes[campo];
            
        break

        case 'link' :
           var Link = Informaçoes[campo];
           
        break

    }    

    pTipo.textContent = Tipo + ".";
    pAtividade.textContent = Atividade + ".";
    pAcessibilidade.textContent = Acessibilidade + ".";
    pParticipantes.textContent = Participantes + ".";

    pLink.textContent = Link;
    if(pLink.textContent == "") {
        pLink.textContent = "Not Link";
    }

   }
}

pLink.onclick = function AcessarLink() {
    if(pLink.textContent == "Not Link" || pLink.textContent == "Um link para realizar a atividade, caso necessario."){
        alert("Não existe um link...")
    }else {
    window.open(pLink.textContent);
    }

}

var opçoes = { method: 'GET',
               mode: 'cors',
               cache: 'default' 
            };


function obtendoRespostaDaAPI() {
fetch(`https://www.boredapi.com/api/activity`, opçoes)
.then(Response => {Response.json()
.then(data => {implementandoRespostaDaAPI(data)
})
.catch(error => {`requisiçao em json negada:${error}`})
}).catch(error => {"requisiçao negada" + error})
}

button.onclick = function(){obtendoRespostaDaAPI(), LiberarButtonAtividadeCumprida = true, 
buttonAtividadeCompleta.textContent = "Completar Atividade?", document.getElementById("Link").style.display = "block"};




//MenuScript
navBar.addEventListener('click', () => {
   navMenu.classList.toggle('mostrar')
})

buttonAtividadeCompleta.addEventListener('click', () => {
    
   if(LiberarButtonAtividadeCumprida == true && !(pTipo.textContent == "")) {
       valor += 1;
       localStorage.setItem('valorTotal', JSON.stringify(valor));
       input.value = localStorage.getItem('valorTotal');
       LiberarButtonAtividadeCumprida = false;
       buttonAtividadeCompleta.textContent = "Atividade Completa!";
   }else{
       if (pTipo.textContent == "" || pTipo.textContent == "Tipo de atividade [educação, recreação, social, bricolagem, caridade, culinária, relaxamento, música, atividade ocupada] ") {
           alert("Pesquise uma atividade primeiro!");
       } else {
           alert("A atividade acabou de ser concluida, tente outras para ganhar mais pontos!");
       }
       
   }
})
