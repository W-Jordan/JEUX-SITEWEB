var voiture = document.getElementsByClassName("voiture")[0];
var divPoint = document.getElementById("score");
var point = 0;
var deplacement = 100 / document.documentElement.clientWidth;
var msg = document.getElementById('msg');
msg.addEventListener('click',function(){msg.style.display='none';})

document.getElementById('route1').addEventListener('click',function(){
  voiture.style.left = "17vw";
})
document.getElementById('route2').addEventListener('click',function(){
  voiture.style.left ="32vw";
})
document.getElementById('route3').addEventListener('click',function(){
  voiture.style.left ="45vw"
})
document.getElementById('route4').addEventListener('click',function(){
  voiture.style.left ="59vw"
})
document.getElementById('route5').addEventListener('click',function(){
  voiture.style.left ="73vw"
})

document.addEventListener("keydown", appuieClavier);
window.addEventListener("load", gamePlay);

voiture.style.top = "80vh";
voiture.style.left = "45vw";

function gamePlay() {
  nouveauObstacle();
  deplacerObstacle();
}
function nouveauObstacle() {
  var obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  var imgCar = document.createElement("img");
  var aleatoire = parseInt(Math.floor(Math.random() * (20 - 1 + 1)) + 1);
  imgCar.src = "./IMG/"+aleatoire+".svg";
  obstacle.appendChild(imgCar);
  obstacle.style.top = "-5vh";
  switch (parseInt(Math.random() * 5 + 1)) {
    case 1:
      obstacle.style.left = "17vw";
      break;
    case 2:
      obstacle.style.left = "32vw";
      break;
    case 3:
      obstacle.style.left = "45vw";
      break;
    case 4:
      obstacle.style.left = "59vw";
      break;
    case 5:
      obstacle.style.left = "73vw";
      break;
  }

  document.getElementsByTagName("body")[0].appendChild(obstacle);
  var timeObstacle = setTimeout(nouveauObstacle,500);
}
function deplacerObstacle() {
  var listeobstacle = document.getElementsByClassName("obstacle");
  for (let j = 0; j < listeobstacle.length; j++) {
    listeobstacle[j].style.top =
      parseFloat(parseFloat(listeobstacle[j].style.top) + 0.4) + "vh";
    if (
      parseInt(listeobstacle[j].style.top) > 85 &&
      listeobstacle[j].style.display != "none"
    ) {
      point++;
      divPoint.innerHTML = point;
      listeobstacle[j].style.display = "none";
      document.getElementsByTagName("body")[0].removeChild(listeobstacle[j]);
    }
  }
  if(testCollision()){
    // msg.style.display="block";
    alert('boom');
    document.location.reload();
  }
  var myVar = setTimeout(deplacerObstacle, 0);
}
function gauche() {
  if (parseFloat(voiture.style.left.replace("vw", "")) > 16) {
    voiture.style.left =
      parseFloat(voiture.style.left.replace("vw", "")) - 14 + "vw";
    testCollision();
  }
}
function droite() {
  if (parseFloat(voiture.style.left.replace("vw", "")) < 72) {
    voiture.style.left =
      parseFloat(voiture.style.left.replace("vw", "")) + 14 + "vw";
    testCollision();
  }
}
function appuieClavier(e) {
  switch (e.which) {
    case 39:
      droite();
      break;
    case 37:
      gauche();
      break;
    case 38:
      haut();
      break;
    case 40:
      bas();
      break;
    case 32:
      document.location.reload();
      break;
  }
}
function testCollision() {
  var voiture = document.getElementsByClassName("voiture")[0];
  var listeObstacle = document.getElementsByClassName("obstacle");

  for (let i = 0; i < listeObstacle.length; i++) {
    if (
      voiture.offsetLeft <
        listeObstacle[i].offsetLeft + listeObstacle[i].offsetWidth &&
      voiture.offsetLeft + voiture.offsetWidth > listeObstacle[i].offsetLeft &&
      voiture.offsetTop <
        listeObstacle[i].offsetTop + listeObstacle[i].offsetHeight &&
      voiture.offsetTop + voiture.offsetHeight > listeObstacle[i].offsetTop
    ) {
      return true;
    }

  }
}
