
let sketch = function (p) {

/*-----------VARIABLEN ERSTELLEN-----------*/
  let canvas; //Größe Zeichenfläche
  let width = 0; //Breite
  let height = 0; //Höhe
  let zeigefinger = p.createVector(0, 0);//var für Zeigefinger
  let letztePosition = p.createVector(0, 0); //var für Funktion Geschwindigkeit
  let regenStaerke =1; //var für regenstärke
  let drops = [];
  let geschwindigkeit;

  let sound;
  let volumeRain=0;
  
  
  
/*-----------SETUP-----------*/
//Der Code in diesem Bereich wird beim Starten nur ein mal ausgeführt
  
   p.preload = function () {
     
     sound = p.loadSound('sound.mp3');
   }

  p.setup = function () {
    
    width = window.innerWidth; //Definition: Breite so groß wie Bildschrim
    height = window.innerHeight;//Definition: Höhe so groß wie Bildschrim
    canvas = p.createCanvas(width, height); //Zeichenfläche wird erstellt
    canvas.parent("p5sketch");
    
     
    sound.setVolume(volumeRain);
    sound.loop();
    
    for (let i = 0; i < 5000; i++) {
    drops.push(new Drop());
  }
  }

  
  
/*-----------DRAW-----------*/
//Der Code in diesem Bereich wird immer wieder ausgeführt

  p.draw = function () {
  p.windowResized = function () {
    width = window.innerWidth;
    height = window.innerHeight;
  }
  p.background(0, 0, 0);     //hintergrundfarbe einstellen
    if (handPositionen[4] != undefined && handPositionen[8] != undefined) //prüfen, dass wie werte der Finger nicht unbekannt sind
    

    { zeigefinger.x = p.map(handPositionen[8].x, 1, 0, 0, width);
      zeigefinger.y = p.map(handPositionen[8].y, 0, 1, 0, height); /*---Hier wurde festgelegt, was passieren soll, wenn Finger von der Webcan erkannt wurden. als erstes werden die aktuelle Positionen der Finger eingelesen. die Zahlen [4] und [8] geben an, welche Punkte genau abgelesen werden. mit der MAP funktion wird die Position der Punkte an die Größe des Bildschirms angepasst---*/
      

      
//p.punkteZeichnen(); //Funktion Kreise zeichnen, wo finger sind
p.geschwindigkeitBerechnen(); // Funktion Geschwindigkeit
p.regen();  


    }
  }
  
  
  
  
  
/*-----------FUNKTIONEN-----------*/
//Hier wird der Inhalt der Funktionen definiert: Was soll die Funktion ausführen, Formen, Farbe, Bewegung, etc.
  

/*------------------------------------------------
Punkte Zeichnen: Kreise dort zeichnen, wo die finger gerade sind */

/*p.punkteZeichnen = function () {
p.ellipse(zeigefinger.x, zeigefinger.y, regenStaerke, regenStaerke);//punkt wird gezeichnet, höhe und breite wird durch var kreisgröße angepasst
p.fill(66, 99, 0); //Farbliche Füllung der Kreise
  }*/
  
/*----------------------------------------------------
Geschwindigkeit brechnen: hier berechnen wir geschwindigkeit von dem y-Wert von einer hand wie doll bewegt sich die hand auf und ab? */

p.geschwindigkeitBerechnen = function () {

    let geschwindigkeit = p.abs(zeigefinger.y - letztePosition.y);
    letztePosition.y = zeigefinger.y;
    //p.text(p.int(geschwindigkeit), 100,100);
      if(geschwindigkeit <= 20){
        if(regenStaerke <= 10)
          {regenStaerke = 0;
        } else {
          regenStaerke = regenStaerke - 10;
        }
        
      } else {
        regenStaerke =  regenStaerke + geschwindigkeit/5;
      }
        
     volumeRain = p.map(regenStaerke,0,50,0,1);
      sound.setVolume(volumeRain);
  }
  
  
  

  
/*----------------------------------------------------
Regen: hier definieren wir i darstellung des regens */
  
  p.regen = function () {
  for (let i = 0; i < regenStaerke; i++) {
    drops[i].fall();
    drops[i].show();
     //let bgColor = p.map(regenStaerke, 0, 499, 255, 2); // calculate background color based on rain intensity
// p.background(bgColor);
  }
}
  
  
    

 

class Drop {
  constructor() {
  this.x = p.random(width);
    this.y = p.random(-500, -50);
    this.z = p.random(0, 20);
    this.len = p.map(this.z, 0, 20, 10, 20);
    this.yspeed = p.map(this.z, 0, 20, 1, 20);
    this.positions = [this.y, this.y, this.y, this.y];
  }

  fall() {
    this.positions.shift();
    this.positions.push(this.y);
    this.y += this.yspeed;
    let grav = p.map(this.z, 0, 20, 0, 0.2);
    this.yspeed += grav;
    if (this.y > height) {
      this.y = p.random(-200, -100);
      this.yspeed = p.map(this.z, 0, 20, 1, 20);
    }
  }

  show() {
    let thick = p.map(this.z, 0, 20, 1, 3);
    p.noStroke();
    for (let i = 0; i < 4; i++) {
      let alpha = p.map(i, 0, 2, 100, 255);
      let dropColor = p.color(180, alpha);
      p.fill(dropColor);
      p.ellipse(this.x, this.positions[i], thick, 20+this.positions[i]*0.05);
    }
  }
}

    
  }
   



let myp5 = new p5(sketch);