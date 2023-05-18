
import {MoveObject} from "embodiedinteractionnpm/MoveObject"
let sketch = function (p) {
  
   
    //Hier werden Variablen erstellt/definiert
    let canvas;
    let width = 0;
    let height = 0;
  
    //Hier bereiten wir Variablen für Finger/Hand-Punkte vor
    let punktA = p.createVector(0, 120);
    let punktB = p.createVector(0, 0);

    let sphereA = p.createVector(0, 120, 0);
    let sphereB = p.createVector(0, 120, 0);
    
    let mittelpunkt = 0;
    let distanz = 0;
    let bild;
  
   
      p.preload = function () {
        //hier können Inhalte wie Bilder/Bildsequenzen,Sound-Files,Videos vorgeladen werden
    
      };
  
      let sphere;
    p.setup = function () {
      // Der Code in diesem Bereich wird beim Starten nur ein mal ausgeführt
      // Die Canvas wird erstellt.
      // Die Größe der Canvas ist so groß wie die Größe des Browser-Fensters in dem Moment der Erstellung
      width = window.innerWidth/4;
      height = window.innerWidth/4;
      canvas = p.createCanvas(width, height);
      canvas.parent("p5sketch");
     
    };
  
    p.draw = function () {
      //hintergrundfarbe einstellen
      p.background(212, 230, 255);
      if(!sphere){
        sphere = Needle.findObjectOfType(MoveObject);
        console.log("look for needle")
      }
      
      
      
      
      //prüfen, dass wie werte der Finger nicht unbekannt sind
      if (ersteHandPositionen != undefined && ersteHandPositionen[4] != undefined &&  ersteHandPositionen[8] != undefined) {
        //Hier kann festgelegt, was passieren soll, wenn Finger von der Webcan erkannt wurden
  
        //als erstes werden die aktuelle Positionen der Finger eingelesen
        //(die Zahlen [4] und [8] geben an, welche Punkte genau abgelesen werden)
        //mit der MAP funktion wird die Position der Punkte an die Größe des Bildschirms angepasst
        punktA.x = p.map(ersteHandPositionen[4].x, 1, 0, 0, width);
        punktA.y = p.map(ersteHandPositionen[4].y, 0, 1, 0, height);
  
        punktB.x = p.map(ersteHandPositionen[8].x, 1, 0, 0, width);
        punktB.y = p.map(ersteHandPositionen[8].y, 0, 1, 0, height);


        sphereA.x = p.map(ersteHandPositionen[4].x, 1, 0, 16, -16);
        sphereA.y = p.map(ersteHandPositionen[4].y, 0, 1, 6, -4);
        sphereA.z = p.map(ersteHandPositionen[4].z, 0, 1, -1,1);

        sphereB.x = p.map(ersteHandPositionen[8].x, 1, 0, 16, -16);
        sphereB.y = p.map(ersteHandPositionen[8].y, 0, 1, 8, -8);
        sphereB.z = p.map(ersteHandPositionen[8].z, 0, 1, -1,1);

        if(sphere){
            sphere.setObjectPosition(p.easePosition(sphereA));
            sphere.setObjectBPosition(p.easePositionB(sphereB));
        }
        
        //als nächstes führen wir eine selbst-geschriebene Funktion aus,die kreise dort zeichnet, wo gerade die Finger sind
        p.punkteZeichnen();
        p.abstandBerechnen();
        //p.bildZwischenPunkten();
       
      }
    };

    let easing = 0.08;
    let easedPosition =  p.createVector(0, 120,0);
  
    p.easePosition = function (vector) {
      let targetX = vector.x;
      let dx = targetX - easedPosition.x;
      easedPosition.x += dx * easing;
    
      let targetY = vector.y;
      let dy = targetY - easedPosition.y;
      easedPosition.y += dy * easing;

      let targetZ = vector.z;
      let dz = targetZ - easedPosition.z;
      easedPosition.z += dz * easing;

      return(easedPosition);
    }

    let easedPositionB =  p.createVector(0, 0,0);
  
    p.easePositionB = function (vector) {
      let targetX = vector.x;
      let dx = targetX - easedPositionB.x;
      easedPositionB.x += dx * easing;
    
      let targetY = vector.y;
      let dy = targetY - easedPositionB.y;
      easedPositionB.y += dy * easing;

      let targetZ = vector.z;
      let dz = targetZ - easedPositionB.z;
      easedPositionB.z += dz * easing;

      return(easedPositionB);
    }
    
    p.kreisZeichnen = function(){
      
      p.ellipse(width/2,height/2, 100,100);
      
    }
  
    p.punkteZeichnen = function () {
      //Kreise dort zeichnen, wo die finger gerade sind
      //funktion FILL gibt an, mit welcher farbe die kreise gefüllt werden soll
      p.fill(66, 99, 245);
      p.ellipse(punktA.x, punktA.y, 30, 30);
      p.ellipse(punktB.x, punktB.y, 30, 30);
    };
    
     p.abstandBerechnen = function () {
      distanz = p.dist(punktA.x,punktA.y,punktB.x,punktB.y);
      p.text(distanz, 20,20);
    };
    
      p.bildZwischenPunkten = function () {
      mittelpunkt = p5.Vector.add(punktA, punktB).div(2);
  
      p.ellipse(mittelpunkt.x,mittelpunkt.y,distanz*5,distanz*5);  
        
      let breiteZuhoehe = bild.width / bild.height;
        
      p.imageMode(p.CENTER);
  
      let neigungswinkel = p.atan2(
        punktA.y - punktB.y,
        punktA.x - punktB.x
      );
  
      /*p.push();
      p.translate(mittelpunkt.x, mittelpunkt.y);
      p.rotate(neigungswinkel);
      p.image(bild, 0, 0, breiteZuhoehe * distanz, distanz);
      p.pop();*/
        
        
    };
  
    
    p.windowResized = function () {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    
  };
  
  let myp5 = new p5(sketch);
  