var nombreCoup=0;
var ligneCaseVide=3;
var colonneCaseVide=3;
var tabNumeroDepart = [1,2,3,4,5,6,7,8];
var tabNumero=[1,2,3,4,5,6,7,8];

var laCaseScore = document.getElementById('score');
laCaseScore.innerHTML=nombreCoup;

var lesCaseTaquin = document.getElementsByClassName('case');

var btnSolution = document.getElementById('solution');
var btnReInit = document.getElementById('reInit');

btnSolution.addEventListener('click',solution);
btnReInit.addEventListener('click',init);

var msg = document.getElementById('msg');

window.addEventListener('load',init);
msg.addEventListener('click',function(){msg.style.display='none';})

function init(){
  shuffle(tabNumero);
  for (let i = 0; i < tabNumero.length; i++) {
    lesCaseTaquin[i].innerHTML=tabNumero[i];
    lesCaseTaquin[i].setAttribute('class','case');
  }
  lesCaseTaquin[8].setAttribute('class','case vide');
  lesCaseTaquin[8].innerHTML='';

  nombreCoup=0;
  laCaseScore.innerHTML=nombreCoup;
  ligneCaseVide=3;
  colonneCaseVide=3;
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

for (let i = 0; i < lesCaseTaquin.length; i++) {
  lesCaseTaquin[i].addEventListener('click',deplaceToi);
}

function deplaceToi(e){
  var laCaseCliquee = e.target;

  let ligneCaseCliquee = laCaseCliquee.id.substr(4,1);
  let colonneCaseCliquee = laCaseCliquee.id.substr(6,1);
  // console.log('ligne :'+ligneCaseCliquee);
  // console.log('colonne :'+colonneCaseCliquee);

  // Test si c'est un basculement vers le haut-bas
  if(((colonneCaseCliquee==colonneCaseVide)&&(Math.abs(ligneCaseCliquee-ligneCaseVide)==1))||
    // Test si c'est un basculement vers la gauche-droite
    ((ligneCaseCliquee==ligneCaseVide)&&(Math.abs(colonneCaseCliquee-colonneCaseVide)==1))){

    e.target.setAttribute('class','case vide');
    // On inverse les innerHTML
    let laCaseVide = document.getElementById('case'+ligneCaseVide+'-'+colonneCaseVide);
    laCaseVide.setAttribute('class','case');
    laCaseVide.innerHTML=laCaseCliquee.innerHTML
    laCaseCliquee.innerHTML='';
    
    //redefini les variables de la case vide
    ligneCaseVide=laCaseCliquee.id.substr(4,1);
    colonneCaseVide=laCaseCliquee.id.substr(6,1);
    
    nombreCoup++;
    laCaseScore.innerHTML=nombreCoup;
    testeGagne();
  }

}

function testeGagne(){
  let boolVictoire=true;

  for (let i = 0; i < tabNumeroDepart.length; i++) {
    if(lesCaseTaquin[i].innerHTML!=tabNumeroDepart[i]){
      boolVictoire=false;
      break;
    }
  }

  if(boolVictoire){msg.style.display='block';}

  return boolVictoire;
}

function solution(){
  for (let i = 0; i < tabNumeroDepart.length; i++) {
    lesCaseTaquin[i].innerHTML=tabNumeroDepart[i];
    }
    lesCaseTaquin[8].innerHTML='';
    laCaseScore.innerHTML='T\'as un peu triché non ?'
    testeGagne();
}