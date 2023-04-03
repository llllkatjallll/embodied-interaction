
let sketch = function (p) {

  //Hier werden Variablen erstellt/definiert
  let canvas;
  let width = 0;
  let height = 0;
  let mittelpunkt=0;
  let distanz=0;
  let daumenPosition = p.createVector(0, 0);
  let zeigefingerPosition = p.createVector(0, 0);
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
     //fingerpositionen auf bildschirm mappen
     daumenPosition.x = p.map(daumen.x, 0, 1, 0, width);
     daumenPosition.y = p.map(daumen.y, 0, 1, 0, height);


    
    p.abstandBerechnen();
    //p.mitteZwischenPunkten();
    p.bildZwischenPunkten();
    p.punkteZeichnen();
  }

  p.punkteZeichnen = function () {
    zeigefingerPosition.x = p.map(zeigefinger.x, 0, 1, 0, width);
    zeigefingerPosition.y = p.map(zeigefinger.y, 0, 1, 0, height);
  }

  p.abstandBerechnen = function () {
     distanz = p.dist(zeigefingerPosition.x, zeigefingerPosition.y, daumenPosition.x, daumenPosition.y);
  }

  p.mitteZwischenPunkten = function () {
     mittelpunkt = p5.Vector.add(zeigefingerPosition, daumenPosition).div(2);
    	
     // ein anderer kreis wird in der mitte zwischen 2 fingern gezeichnet. 
     // Der Kreis ist so groß, wie der Abstand zwischen den Fingern
     p.fill(230,0,10);
     p.ellipse(mittelpunkt.x,mittelpunkt.y, distanz,distanz);

     // ein kreis mit diameter 50px wird in der mitte zwischen 2 punkten gezeichnet
     p.fill(10,10,10);
     p.ellipse(mittelpunkt.x,mittelpunkt.y, 50,50);
      let breiteZuhoehe = bild.width / bild.height;
     p.imageMode(p.CENTER);

     let neigungswinkel = p.atan2(zeigefingerPosition.y - daumenPosition.y,zeigefingerPosition.x - daumenPosition.x);

     p.push();
     p.translate(mittelpunkt.x,mittelpunkt.y);
     p.rotate(neigungswinkel);
     p.image(bild,0,0,breiteZuhoehe*distanz,distanz);
     p.pop();
    }

    p.bildZwischenPunkten = function () {
      mittelpunkt = p5.Vector.add(zeigefingerPosition, daumenPosition).div(2);
       
      let breiteZuhoehe = bild.width / bild.height;
      p.imageMode(p.CENTER);
 
      let neigungswinkel = p.atan2(zeigefingerPosition.y - daumenPosition.y,zeigefingerPosition.x - daumenPosition.x);
 
      p.push();
      p.translate(mittelpunkt.x,mittelpunkt.y);
      p.rotate(neigungswinkel);
      p.image(bild,0,0,breiteZuhoehe*distanz,distanz);
      p.pop();
     }


}

let myp5 = new p5(sketch);