var lesChiffres=document.getElementsByClassName('chiffre');
var lesCases=document.getElementsByClassName('case');
var leResultat = document.getElementById('resultat');

leResultat.addEventListener('click',init);

for (let laCase of lesCases) {
  laCase.addEventListener('click',function(){testerReponse(laCase);});
}

window.addEventListener("load",init);

function init(){
  for (let laCase of lesCases) {
    laCase.innerHTML="";
  }
  leResultat.src="";
  leResultat.style.visibility="hidden";
  lancerJeux();
}

function lancerJeux(){ 

  // chiffres aléatoires
  for (let leChiffre of lesChiffres) {
    leChiffre.innerHTML=entierAleatoire(1,10);
  }
   let tabCase=[];
  // Les cases de proposition
  for (let i = 0; i < 3; i++) {
    if(i==0){
      tabCase.push(parseInt(lesChiffres[0].innerHTML)+parseInt(lesChiffres[1].innerHTML));
    }else{
      let alea =0;
      do{
        alea = entierAleatoire(1,19);
      }while(tabCase.includes(alea));
      tabCase.push(alea);
    }
  }

  tabCase.sort(function(a, b){
    return a - b;
  });

  for (let i = 0; i < tabCase.length; i++) {
    lesCases[i].innerHTML=tabCase[i];
  }
}

function entierAleatoire(min, max){
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function testerReponse(elmt){
  resultat(parseInt(elmt.innerHTML)==parseInt(lesChiffres[0].innerHTML)+parseInt(lesChiffres[1].innerHTML));
}

function resultat(boolResultat){
  leResultat.src=(boolResultat)?"https://media.giphy.com/media/4QFAH0qZ0LQnIwVYKT/giphy.gif":"https://media.giphy.com/media/d1E1msx7Yw5Ne1Fe/giphy.gif";
  leResultat.style.visibility="visible";
}