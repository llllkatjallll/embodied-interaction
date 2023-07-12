let sketch = function (p) {

  //Hier werden Variablen erstellt/definiert
  let canvas;
  let width = 0;
  let height = 0;

  // Bilder für das Messer
  let messerbild; // Körper
  let objekt1; // 1. Objekt
  let finger; // flutschfinger
  let ken; // ken
  let zigarette; // zigarette
  
  //Hier bereiten wir Variablen für Finger/Hand-Punkte vor
  let punktA = p.createVector(0, 0);
  let punktB = p.createVector(0, 0);
  let punktD = p.createVector(0,0);
  let punktC = p.createVector(0,0);
  let punktE = p.createVector(0,0); 

  p.preload = function () {
    messerbild = p.loadImage("victori_body.png");
    objekt1 = p.loadImage("gabel.png");
    finger = p.loadImage("Flutschfinger1.png");
    ken = p.loadImage ("ken.png");
    zigarette = p.loadImage ("zigarette.png");
    
  }


  p.setup = function () {
    // Der Code in diesem Bereich wird beim Starten nur ein mal ausgeführt
    // Die Canvas wird erstellt. 
    // Die Größe der Canvas ist so groß wie die Größe des Browser-Fensters in dem Moment der Erstellung
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = p.createCanvas(width, height);
    canvas.parent("p5sketch");

    console.log()
  }


  p.draw = function () {
    //hintergrundfarbe einstellen
    p.background("#38E6FF");

    //prüfen, dass wie werte der Finger nicht unbekannt sind
    if (bodyPositionen != undefined && bodyPositionen[16] != undefined && bodyPositionen[15] != undefined) {
      //Hier kann festgelegt, was passieren soll, wenn Finger von der Webcan erkannt wurden 

      //als erstes werden die aktuelle Positionen der Finger eingelesen  
      //(die Zahlen [4] und [8] geben an, welche Punkte genau abgelesen werden)
      //mit der MAP funktion wird die Position der Punkte an die Größe des Bildschirms angepasst
      punktA.x = p.map(bodyPositionen[20].x, 1, 0, 0, width);
      punktA.y = p.map(bodyPositionen[20].y, 0, 1, 0, height);

      punktB.x = p.map(bodyPositionen[26].x, 1, 0, 0, width);
      punktB.y = p.map(bodyPositionen[26].y, 0, 1, 0, height);

      punktD.x = p.map(bodyPositionen[15].x, 1, 0, 0, width);
      punktD.y = p.map(bodyPositionen[15].y, 0, 1, 0, height);
      
         punktC.x = p.map(bodyPositionen[27].x, 1, 0, 0, width);
      punktC.y = p.map(bodyPositionen[27].y, 0, 1, 0, height);
      //ken fuß links
      
      punktE.x = p.map(bodyPositionen[28].x, 1, 0, 0, width);
      punktE.y = p.map(bodyPositionen[28].y, 0, 1, 0, height);

//zigarette fuß rechts


      // p.fill("red");
      // p.ellipse(punktA.x, punktA.y, 30, 30);
      // p.ellipse(punktB.x, punktB.y, 30, 30);

      let gabelrotation = p.map(punktA.x, width/2, width, 0, -360);

      // Gabel
      p.imageMode(p.CORNER);

      p.push(); // ab hier wird rotiert
      p.translate(width / 2 + 50, 200);
      p.rotate(p.radians(gabelrotation)); // rotieren um 20 Grad
      p.image(objekt1, 0, 0, 45, 250 ); // Gabel
      p.pop(); // rotieren beenden
      
     
      
      // bild wird von Handbewegung links nach rechts zu Rotatin von 180 bis 0 Grad übersetzt
      let fingerrotation = p.map (punktD.x, width/2, 0, 0, 360);
     
      
      //flutschfinger 
        p.imageMode(p.CORNER);

      p.push(); // ab hier wird rotiert
      p.translate(width / 2 + 50, 220);
      p.rotate(p.radians(fingerrotation)); // rotieren um 20 Grad
      p.image(finger, 0, 0, 90, 250); // Größe vom Finger
      p.pop(); // rotieren beenden
      
      
      let kenrotation = p.map (punktC.x, width/2, width, 0, -90);
          
      //ken
        p.imageMode(p.CORNER);

      p.push(); // ab hier wird rotiert
      p.translate(width / 2 + 15, 380);
      p.rotate(p.radians(kenrotation)); // rotieren um 20 Grad
      p.image(ken, 0, 0, 120, 250); // Gabel
      p.pop(); // rotieren beenden
      
         
      let zigarettenrotation = p.map(punktE.x, width/2, width, -90, 90);
      
      //zigartette rechtes knie
      p.imageMode(p.CORNER);

      p.push(); // ab hier wird rotiert
      p.translate(width / 2 + 50, 400);
      p.rotate(p.radians(zigarettenrotation)); // rotieren um 20 Grad
      p.image(zigarette, 0, 0, 200, 80); // zigarette
  
      p.pop(); // rotieren beenden
      
    
    
    }
    
    





    // zeichne den Körper vom Messer über allem anderen
    p.imageMode(p.CENTER);
    p.image(messerbild, width / 2, height / 2, 700, 450); // Messerkörper

  }


  p.windowResized = function () {
    width = window.innerWidth;
    height = window.innerHeight;
  }

}

let myp5 = new p5(sketch);