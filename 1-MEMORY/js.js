var lesCartes = document.getElementsByClassName('imgMemory');
var tabCarteRetournee=[];
var leNombreClique = document.getElementById('clique');
var leNombrePaire = document.getElementById('paire');
var lesHeros = document.getElementsByClassName('hero');
var msg = document.getElementById('msg');

msg.addEventListener('click',function(){msg.style.display='none';})
document.getElementById('solution').addEventListener('click',solution);
document.getElementById('init').addEventListener('click',init);

for (let i = 0; i < lesHeros.length; i++) {
  let hero = lesHeros[i].id.toUpperCase();
  lesHeros[i].addEventListener('click',function(){preparerCartes(hero);});
}

var nbClique = 0,paireTrouvee=0;

leNombreClique.innerHTML=nbClique;
leNombrePaire.innerHTML=paireTrouvee;

window.addEventListener("load",init);

function init(){
  nbClique=0;
  paireTrouvee=0;
  leNombreClique.innerHTML=nbClique;
  leNombrePaire.innerHTML=paireTrouvee;
  preparerCartes("SONIC");
}

function preparerCartes(leHero){ 
  let images = [];
  let index = 0;
  for (let i = 1; i < 7; i++) {
      images[index++] = i
      images[index++] = i;
  }
  //on tri de manière aléatoire
  images.sort(function (a, b) {return 0.5 - Math.random()});
  for (let i = 0; i < lesCartes.length; i++) {
  lesCartes[i].firstChild.style.display='none';
  lesCartes[i].firstChild.src="./IMG/"+leHero+"/"+(images[i])+".jpg";
  lesCartes[i].addEventListener('click',retournerCarte);
  lesCartes[i].firstChild.addEventListener('click',retournerCarte);
  }
}

function solution(){
  nbClique=0;
  paireTrouvee=0;
  leNombreClique.innerHTML=nbClique;
  leNombrePaire.innerHTML=paireTrouvee;
  for (let i = 0; i < lesCartes.length; i++) {
    lesCartes[i].firstChild.style.display='flex';
  }
  testerPaire();
}

function retournerCarte(e){
  // si c'est une DIV alors on test son enfant
  if(e.target.tagName=='DIV'){
    if(e.target.firstChild.style.display='none'){
      e.target.firstChild.style.display='flex';
      e.target.firstChild.style.transition='transform 0.8s';
      e.target.firstChild.style.transformStyle='preserve-3d';
      tabCarteRetournee.push(e.target.firstChild);
      nbClique++;
      
      // 2 carte retournée
      if (tabCarteRetournee.length==2){
        setTimeout(testerPaire,500);
      }
    }else{
      e.target.firstChild.style.display='none';
      retournerSelection();
      nbClique++;
    }
  // Si c'est une IMG alors display none
  }else{
    e.target.style.display='none';
    nbClique++;
    retournerSelection();
  }

  // Affiche le nombre de clique
  leNombreClique.innerHTML=nbClique;
  
}

function testerPaire(){
  //Test les cartes retournées
    if((tabCarteRetournee[0].src==tabCarteRetournee[1].src)&&tabCarteRetournee.length==2){
      paireTrouvee++;
      // Affiche le nombre de paire
      leNombrePaire.innerHTML=paireTrouvee;
      for (let i = 0; i < tabCarteRetournee.length; i++) {
        tabCarteRetournee[i].parentNode.removeEventListener('click',retournerCarte);
        tabCarteRetournee[i].removeEventListener('click',retournerCarte);
      }
      if(paireTrouvee==(lesCartes.length/2)){
        msg.style.display='block';
      }
    }else{
      for (let i = 0; i < tabCarteRetournee.length; i++) {
        tabCarteRetournee[i].style.display='none';
      }
    }
    retournerSelection();
}

function retournerSelection(){
  for (let i = 0; i < tabCarteRetournee.length; i++) {
    tabCarteRetournee[i].style.display='none';
  }
  tabCarteRetournee=[];
}