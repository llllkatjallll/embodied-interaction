let sketch = function (p) {

  //Hier werden Variablen erstellt/definiert
  let canvas;
  let width = 0;
  let height = 0;

  //Hier bereiten wir Variablen für Finger/Hand-Punkte vor
  let fingerA = p.createVector(0, 0);
  let fingerB = p.createVector(0, 0);


  p.setup = function () {
    // Der Code in diesem Bereich wird beim Starten nur ein mal ausgeführt
    // Die Canvas wird erstellt. 
    // Die Größe der Canvas ist so groß wie die Größe des Browser-Fensters in dem Moment der Erstellung
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = p.createCanvas(width, height);
    canvas.parent("p5sketch");
  }


  p.draw = function () {
    //hintergrundfarbe einstellen
    p.background(212, 230, 255);

    //prüfen, dass wie werte der Finger nicht unbekannt sind
    if (handPositionen[4] != undefined && handPositionen[8] != undefined) {
      //Hier kann festgelegt, was passieren soll, wenn Finger von der Webcan erkannt wurden 

      //als erstes werden die aktuelle Positionen der Finger eingelesen  
      //(die Zahlen [4] und [8] geben an, welche Punkte genau abgelesen werden)
      //mit der MAP funktion wird die Position der Punkte an die Größe des Bildschirms angepasst
      fingerA.x = p.map(handPositionen[4].x, 1, 0, 0, width);
      fingerA.y = p.map(handPositionen[4].y, 0, 1, 0, height);

      fingerB.x = p.map(handPositionen[8].x, 1, 0, 0, width);
      fingerB.y = p.map(handPositionen[8].y, 0, 1, 0, height);

      //als nächstes führen wir eine selbst-geschriebene Funktion aus,die kreise dort zeichnet, wo gerade die Finger sind
      p.punkteZeichnen();
    }
  }

  p.punkteZeichnen = function () {

    //Kreise dort zeichnen, wo die finger gerade sind

    //funktion FILL gibt an, mit welcher farbe die kreise gefüllt werden soll
    p.fill(66, 99, 245);
    p.ellipse(fingerA.x, fingerA.y, 30, 30);
    p.ellipse(fingerB.x, fingerB.y, 30, 30);

  }


  p.windowResized = function () {
    width = window.innerWidth;
    height = window.innerHeight;
  }

}

let myp5 = new p5(sketch);