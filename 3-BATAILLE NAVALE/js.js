var battleship = document.getElementsByClassName('battleship')[0];
var lesCases = battleship.getElementsByTagName('div');

const nombreLigne =7;
const nombreColonne =7;
var tabBattleship=[nombreLigne,nombreColonne];
const longueurBateau = 3;
const nombreBateauLigne=1;
const nombreBateauColonne=1;

window.addEventListener('load',function(){
    creerBattleship();
    clickDivBattleship();
    creerBateau();
    afficherBateau();}
);

function creerBattleship(){
  var tabTitreLettre = ['','a','b','c','d','e','f','g'];
  var compteur=0;
  for (let i = 0; i <8 ; i++) {

    for (let j = 0; j <8; j++) {
      let laClasse='';
      let contenu='';
      if(i==0 && j>0){
        contenu=j;
        laClasse='titre';
      }
      if(j==0){
        contenu=tabTitreLettre[i];
        laClasse='titre';
      }

      var maDiv = document.createElement('div');
      maDiv.className=laClasse;
      maDiv.innerHTML=contenu;
      battleship.appendChild(maDiv);
    }
    
  }
}


function creerBateau(){

  let ligne = [];
  for (let i = 0; i < nombreLigne; i++) {
    ligne=[];
    for (let j = 0; j < nombreColonne; j++) {
      ligne.push('_');
    }
    tabBattleship[i]= ligne;
  }

  //Dessiner Bateau ligne
  
  var boolAccessible;
  for (let i=0; i <1 ; i++) { 
      // pour chaque bateau
      var intL = parseInt(Math.random() * (nombreLigne-1));
      var intC = parseInt(Math.random() * (nombreColonne-1-longueurBateau));
      do{
          boolAccessible = true;
          for (let j=0; j <= (longueurBateau-1); j++){ 
              if (tabBattleship[intL][j+intC]=="b"){
                boolAccessible=false;
              }
          }
      }while(!boolAccessible);
      for (let j=0; j <= (longueurBateau-1); j++){ 
        tabBattleship[intL][j+intC]="b";
      }
  }

  //Dessiner bateau colonne
  //Dessiner Bateau ligne
  for (let i=0; i <1; i++) {
      // pour chaque bateau
      intL = parseInt(Math.random() * (nombreLigne-1-longueurBateau));
      intC = parseInt(Math.random() * (nombreColonne-1));
      // verifier toutes les cases sont accessibles (!="_")
      do{
          boolAccessible = true;
          for (let j=0; j <= (longueurBateau-1); j++){ 
              if (tabBattleship[intL+j][intC]=="b"){
                  boolAccessible=false;
              }
          }
      }while(!boolAccessible);
      for (let j=0; j <= (longueurBateau-1); j++){ 
        tabBattleship[intL+j][intC]="b";
      }
  }

  // afficher le tableau
  console.table(tabBattleship);

}

function afficherBateau(){
  var listeCase = battleship.getElementsByTagName('div');
  // Pour chaque ligne du tableau
    // Affiche un bc blue si == b
    for (let i = 0; i < nombreLigne; i++) {
      for (let j = 0; j < nombreColonne; j++) {
        if(tabBattleship[i][j]=="b"){
          listeCase[(((8*i)+j)+9)].style.background='tomato';
        }
      }
      
    }
}

function clickDivBattleship(){
  // Pour chaque div du Battleship (sauf les titre)  
  for (let i = 0; i < lesCases.length; i++) {
    if(lesCases[i].className!='titre'){
      lesCases[i].addEventListener('click',retournerCase);
    }
    
  }
}

function retournerCase(e){
  let laCase = e.target;
  laCase.style.backgroundColor='pink';
}