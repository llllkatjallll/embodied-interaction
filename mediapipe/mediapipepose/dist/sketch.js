
let sketch = function (p) {

    //Hier werden Variablen erstellt/definiert
    let canvas;
    let width = 0;
    let height = 0;
    let mittelpunkt=0;
    let distanz=0;
    let positionA = p.createVector(0, 0);
    let positionB = p.createVector(0, 0);
    let bild;
  
    p.setup = function () {
      // Der Code in diesem Bereich wird beim Starten nur ein mal ausgeführt
      // Die Canvas wird erstellt. 
      // Die Größe der Canvas ist so groß wie die Größe des Browser-Fensters in dem Moment der Erstellung
      width = window.innerWidth;
      height = window.innerHeight;
      canvas = p.createCanvas(width, height);
      canvas.parent("p5sketch");
  
      //ein bild aus dem ordner laden
      bild = p.loadImage("data/wal.png");
  
    }
  
    p.windowResized = function () {
      width = window.innerWidth;
      height = window.innerHeight;
    }
  
    p.draw = function () {
      p.background(212,230,255);
    
  
  
      
      p.abstandBerechnen();
      //p.mitteZwischenPunkten();
      //p.bildZwischenPunkten();
      p.punkteZeichnen();
    }
  
    p.punkteZeichnen = function () {
      positionB.x = p.map(handRechts.x, 0, 1, 0, width);
      positionB.y = p.map(handRechts.y, 0, 1, 0, height);

         //fingerpositionen auf bildschirm mappen
         positionA.x = p.map(handLinks.x, 0, 1, 0, width);
         positionA.y = p.map(handLinks.y, 0, 1, 0, height);

         p.ellipse(positionA.x,positionA.y, 50,50);
         p.ellipse(positionB.x,positionB.y, 50,50);
    }
  
    p.abstandBerechnen = function () {
       distanz = p.dist(positionB.x, positionB.y, positionA.x, positionA.y);
    }
  
    p.mitteZwischenPunkten = function () {
       mittelpunkt = p5.Vector.add(positionB, positionA).div(2);
          
       // ein anderer kreis wird in der mitte zwischen 2 fingern gezeichnet. 
       // Der Kreis ist so groß, wie der Abstand zwischen den Fingern
       p.fill(230,0,10);
       p.ellipse(mittelpunkt.x,mittelpunkt.y, distanz,distanz);
  
       // ein kreis mit diameter 50px wird in der mitte zwischen 2 punkten gezeichnet
       p.fill(10,10,10);
       p.ellipse(mittelpunkt.x,mittelpunkt.y, 50,50);
        let breiteZuhoehe = bild.width / bild.height;
       p.imageMode(p.CENTER);
  
       let neigungswinkel = p.atan2(positionB.y - positionA.y,positionB.x - positionA.x);
  
       p.push();
       p.translate(mittelpunkt.x,mittelpunkt.y);
       p.rotate(neigungswinkel);
       p.image(bild,0,0,breiteZuhoehe*distanz,distanz);
       p.pop();
      }
  
      p.bildZwischenPunkten = function () {
        mittelpunkt = p5.Vector.add(positionB, positionA).div(2);
         
        let breiteZuhoehe = bild.width / bild.height;
        p.imageMode(p.CENTER);
   
        let neigungswinkel = p.atan2(positionB.y - positionA.y,positionB.x - positionA.x);
   
        p.push();
        p.translate(mittelpunkt.x,mittelpunkt.y);
        p.rotate(neigungswinkel);
        p.image(bild,0,0,breiteZuhoehe*distanz,distanz);
        p.pop();
       }
  
  
  }
  
  let myp5 = new p5(sketch);