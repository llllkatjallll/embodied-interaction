let sketch = function (p) {
  //Hier werden Variablen erstellt/definiert
  let canvas;
  let width = 0;
  let height = 0;

  //Variablen für Animationsvideos  
  let windGif;
  let wind2Gif;
  let water1Gif;
  let water2Gif;
  let fireLGif;
  let fireRGif;
  let earth1Gif;
  let earth2Gif;


  //Tracking + Animations
  let wristL_lastPosition = p.createVector(0, 0);
  let wristR_lastPosition = p.createVector(0, 0);
  let ankleL_lastPosition = p.createVector(0, 0);
  let ankleR_lastPosition = p.createVector(0, 0);

  let wristCenter = p.createVector(0, 0);
  let shoulderCenter = p.createVector(0, 0);

  let windCounter = 0;
  let windWasActive = false;



  //Hier bereiten wir Variablen für Finger/Hand-Punkte vor
  let wristL = p.createVector(0, 0);
  let wristR = p.createVector(0, 0);
  let fingerL = p.createVector(0, 0);
  let fingerR = p.createVector(0, 0);
  let ankleL = p.createVector(0, 0);
  let ankleR = p.createVector(0, 0);
  let shoulderL = p.createVector(0, 0);
  let shoulderR = p.createVector(0, 0);
  
  
  // HTML container
  let container = document.getElementById("p5sketch");
  
  // Webcam (üblicherweise 16:9)
  let webcamWidth = container.offsetHeight*1.78;
  let webcamHeight = container.offsetHeight;
  let webcam; // Webcam
  let webcamCanvas; // Fläche für die Webcam

  


  p.preload = function () {
    //hier können Inhalte wie Bilder/Bildsequenzen,Sound-Files,Videos vorgeladen werden
      windGif = p.loadImage('Animations/Wind/wind.gif');
      wind2Gif = p.loadImage('Animations/Wind/wind2.gif');
      fireLGif = p.loadImage('Animations/Fire/fireL.gif');
      fireRGif = p.loadImage('Animations/Fire/fireR.gif');
      water1Gif = p.loadImage('Animations/Water/water1.gif');
      water2Gif = p.loadImage('Animations/Water/water2.gif');
      earth1Gif = p.loadImage('Animations/Earth/earth1.gif');
      earth2Gif = p.loadImage('Animations/Earth/earth2.gif');

    //Alle Gifs auf frame 0 setzen
      windGif.setFrame(0);
      wind2Gif.setFrame(0);
      fireLGif.setFrame(0);
      fireRGif.setFrame(0);
      water1Gif.setFrame(0);
      water2Gif.setFrame(0);
      earth1Gif.setFrame(0);
      earth2Gif.setFrame(0);
  };

  p.setup = function () {
    // Der Code in diesem Bereich wird beim Starten nur ein mal ausgeführt
    // Die Canvas wird erstellt.
    // Die Größe der Canvas ist so groß wie die Größe des Browser-Fensters in dem Moment der Erstellung
    width = container.offsetHeight*1.78;
    height = container.offsetHeight;
    canvas = p.createCanvas(width, height);
    canvas.parent("p5sketch");

    // Webcam
    webcam = p.createCapture(p.VIDEO);
    webcam.size(webcamWidth, webcamHeight);
    webcam.hide();

    // Fläche für die Webcam
    webcamCanvas = p.createGraphics(webcamWidth, webcamHeight);

  };

  p.draw = function () {
    //hintergrundfarbe einstellen
    p.background(212, 230, 255);
    
    //Gif abspielen
    //p.image(windGif, width/2-600, height/2-450, 1200, 900);
    
    p.push();
    p.translate(-webcamWidth / 2 + width / 2, 0); // Webcam zentrieren
    p.scale(-1, 1); // Webcam spiegeln
    webcamCanvas.image(webcam, 0, 0, webcamWidth, webcamHeight); // Webcam platzieren    
    p.image(webcamCanvas, -webcamCanvas.width, 0); // Webcamfläche zeichnen
    //p.filter(p.GRAY);
    p.scale(-1, 1); // Spiegelung aufheben
    p.pop();
    
    //sichergehen, dass wie werte der Finger nicht unbekannt sind
    if (
      bodyPositionen != undefined &&
      bodyPositionen[11] != undefined &&
      bodyPositionen[12] != undefined &&
      bodyPositionen[15] != undefined &&
      bodyPositionen[16] != undefined &&
      bodyPositionen[19] != undefined &&
      bodyPositionen[20] != undefined &&
      bodyPositionen[27] != undefined &&
      bodyPositionen[28] != undefined
    ) {
      
      //Punkte erkennen
      wristL.x = p.map(bodyPositionen[15].x, 1, 0, 0, width);
      wristL.y = p.map(bodyPositionen[15].y, 0, 1, 0, height);

      wristR.x = p.map(bodyPositionen[16].x, 1, 0, 0, width);
      wristR.y = p.map(bodyPositionen[16].y, 0, 1, 0, height);

      fingerL.x = p.map(bodyPositionen[19].x, 1, 0, 0, width);
      fingerL.y = p.map(bodyPositionen[19].y, 0, 1, 0, height);

      fingerR.x = p.map(bodyPositionen[20].x, 1, 0, 0, width);
      fingerR.y = p.map(bodyPositionen[20].y, 0, 1, 0, height);
      
      ankleL.x = p.map(bodyPositionen[27].x, 1, 0, 0, width);
      ankleL.y = p.map(bodyPositionen[27].y, 0, 1, 0, height);

      ankleR.x = p.map(bodyPositionen[28].x, 1, 0, 0, width);
      ankleR.y = p.map(bodyPositionen[28].y, 0, 1, 0, height);

      shoulderL.x = p.map(bodyPositionen[11].x, 1, 0, 0, width);
      shoulderL.y = p.map(bodyPositionen[11].y, 0, 1, 0, height);

      shoulderR.x = p.map(bodyPositionen[12].x, 1, 0, 0, width);
      shoulderR.y = p.map(bodyPositionen[12].y, 0, 1, 0, height);


      //(Tracking-)Punkte zeichnen
      //p.punkteZeichnen();

  

      // ***Wasser***
      let wristL_Yspeed = wristL_lastPosition.y - wristL.y;
      let wristR_Yspeed = wristR_lastPosition.y - wristR.y;
      //let wirsts_avg_Yspeed = (wristL_Yspeed + wristR_Yspeed) /2;
      let wrists_avg_y = (wristL.y + wristR.y) / 2

      let wristDist = p.dist(wristL.x, wristL.y, wristR.x, wristR.y);
      let waterWidthFactor = p.map(wristDist, 0, 500, 0, 2);
      let waterHeightFactor = p.map(wrists_avg_y, 0, 500, 2, 0);

      shoulderCenter = p.createVector(((shoulderR.x + shoulderL.x) / 2), ((shoulderR.y + shoulderL.y) / 2))
      wristCenter = p.createVector(((wristR.x + wristL.x) / 2), ((wristR.y + wristL.y) / 2))

      wristL_lastPosition.y = wristL.y;
      wristR_lastPosition.y = wristR.y;

      if(((wristL.y - wristR.y) < 100) && wristL_Yspeed > 20 && wristR_Yspeed > 20) {
        water1Gif.setFrame(0);
        water1Gif.play();
        water2Gif.setFrame(0);
        water2Gif.play();
      }
      
      p.image(water1Gif, wristCenter.x-(600*waterWidthFactor), height-(900*waterHeightFactor), 1600*waterWidthFactor, 900*waterHeightFactor);
      p.image(water2Gif, wristCenter.x-(1000*waterWidthFactor), height-(900*waterHeightFactor), 1600*waterWidthFactor, 900*waterHeightFactor);


      // ***Erde*** 
      // linker Fuß
      let ankleL_speed = ankleL.y - ankleL_lastPosition.y;
      ankleL_lastPosition.y = ankleL.y;

      if(ankleL_speed >= 50) {
        earth1Gif.setFrame(0);
        earth1Gif.play();
      }
      p.image(earth1Gif, ankleL.x-100-450, ankleL.y-750, 450, 800);

      // rechter Fuß
      let ankleR_speed = ankleR.y - ankleR_lastPosition.y;
      ankleR_lastPosition.y = ankleR.y;

      if(ankleR_speed >= 50) {
        earth2Gif.setFrame(0);
        earth2Gif.play();      
      }
      p.image(earth2Gif, ankleR.x+100-0, ankleR.y-750, 450, 800);


      // ***Feuer***
      //linke Hand
      let wristL_Xspeed = wristL_lastPosition.x - wristL.x;
      wristL_lastPosition.x = wristL.x;

      if(wristL_Xspeed >= 80) {
        fireLGif.setFrame(0);
        fireLGif.play();
      }
      p.image(fireLGif, wristL.x-450, wristL.y-150, 400, 225);

      //rechte Hand
      let wristR_Xspeed = wristR.x - wristR_lastPosition.x;
      wristR_lastPosition.x = wristR.x;

      if(wristR_Xspeed >= 80) {
        fireRGif.setFrame(0);
        fireRGif.play();
      }
      p.image(fireRGif, wristR.x+50, wristR.y-150, 400, 225);


      // ***Luft***
        
      // Größe berechnen
      let windSizeFactor = p.map(wristDist, 0, 500, 0, 2);

      wristCenter = p.createVector(((wristR.x + wristL.x) / 2), ((wristR.y + wristL.y) / 2));

      

      if(p.abs(fingerL.x - fingerR.x) < 50 ) {
        windCounter++;
        if(windCounter>=20) {
          // Mitte berechnen und anzeigen
          windWasActive = true;
          p.image(windGif, wristCenter.x-(700*windSizeFactor), wristCenter.y-(450*windSizeFactor), 1600 * windSizeFactor, 900 * windSizeFactor);
        }
        
      } else {
        if(windWasActive) {
          wind2Gif.setFrame(0);
          wind2Gif.play();
        } 
        if (windCounter > 0) {
          windCounter--;
        }
        p.image(wind2Gif, wristCenter.x-(700*windSizeFactor), wristCenter.y-(450*windSizeFactor), 1600 * windSizeFactor, 900 * windSizeFactor);
        windWasActive = false;
      }


    }
  };

  p.punkteZeichnen = function () {
    //Kreise dort zeichnen, wo die finger gerade sind
    p.fill(66, 99, 245);
    p.ellipse(wristL.x, wristL.y, 30, 30);
    p.ellipse(wristR.x, wristR.y, 30, 30);
    p.ellipse(ankleL.x, ankleL.y, 30, 30);
    p.ellipse(ankleR.x, ankleR.y, 30, 30);
    p.ellipse(shoulderL.x, shoulderL.y, 30, 30);
    p.ellipse(shoulderR.x, shoulderR.y, 30, 30);
    p.ellipse(fingerL.x, fingerL.y, 20, 20);
    p.ellipse(fingerR.x, fingerR.y, 20, 20);

  };


  p.windowResized = function () {
    width = window.innerWidth;
    height = window.innerHeight;
  };
};

let myp5 = new p5(sketch);
