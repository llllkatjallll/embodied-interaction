
let sketch = function (p) {

  let canvas;
  let width = 0;
  let height = 0;

  let gridSize = 100;
  let angle = 0;
  let size = 100;
  let speed = 0.01;

  let daumenPosition = p.createVector(0, 0);
  let zeigefingerPosition = p.createVector(0, 0);

  //objekt greifen
  let objektPosition =p.createVector(0, 0);
  let objekt2Position =p.createVector(1500, 960);
  let farbeInaktiv = p.color(91, 108, 235);
  let farbeAktiv = p.color(255, 0, 75);
  let objectFarbe = p.color(91, 108, 235);
  let object2Farbe = p.color(5, 108, 235);

  p.setup = function () {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.parent("p5sketch");
  }

  p.draw = function () {
    p.background(50, 50, 50);
    p.drawGrid();
    //p.objectBetweenFingers();
    //p.pinchObject();
    p.objektNeigen();
  }

  p.mousePressed = function () {
     objektPosition =p.createVector(0, 0);
     objekt2Position =p.createVector(1500, 960);
  }

  let easing = 0.05;
  let easedPosition =  p.createVector(0, 0);

  p.easePosition = function (x,y) {
    let targetX = x;
    let dx = targetX - easedPosition.x;
    easedPosition.x += dx * easing;
  
    let targetY = y;
    let dy = targetY - easedPosition.y;
    easedPosition.y += dy * easing;
    return(easedPosition);
  }

  let easedPosition2 =  p.createVector(0, 0);
  p.easePosition2 = function (x,y) {
    let targetX = x;
    let dx = targetX - easedPosition2.x;
    easedPosition2.x += dx * easing;
  
    let targetY = y;
    let dy = targetY - easedPosition2.y;
    easedPosition2.y += dy * easing;
    return(easedPosition2);
  }
 
 

  p.objektNeigen = function () {
    console.log(neigung);
    p.rectMode(p.CENTER);
    p.push();
    p.translate(width / 2, height / 2);
    p.rotate(p.radians(-neigung+0));
    
    p.rect(0, 0, 300,500,80);
    p.pop();

  }
  p.pinchObject = function () {

    //objekt das man greift
    p.fill(objectFarbe);
    p.ellipse(p.easePosition(objektPosition.x,objektPosition.y).x, p.easePosition(objektPosition.x,objektPosition.y).y, 400, 400);
    p.fill(object2Farbe);
    p.ellipse(p.easePosition2(objekt2Position.x,objekt2Position.y).x, p.easePosition2(objekt2Position.x,objekt2Position.y).y, 400, 400);


    //fingerpositionen auf bildschirm mappen
    daumenPosition.x = p.map(daumen.x, 0, 1, 0, width);
    daumenPosition.y = p.map(daumen.y, 0, 1, 0, height);

    zeigefingerPosition.x = p.map(zeigefinger.x, 0, 1, 0, width);
    zeigefingerPosition.y = p.map(zeigefinger.y, 0, 1, 0, height);

    p.strokeWeight(2);

    //distanz zwischen fingern berechnen
    let distanz = p.dist(zeigefingerPosition.x, zeigefingerPosition.y, daumenPosition.x, daumenPosition.y);
    let middle = p5.Vector.add(zeigefingerPosition, daumenPosition).div(2);

     //distanz zwischen fingern-mittelpunkt und dem objekt berechnen
     let distanzZumObjekt = p.dist(middle.x, middle.y, objektPosition.x, objektPosition.y);

     let distanzZumObjekt2 = p.dist(middle.x, middle.y, objekt2Position.x, objekt2Position.y);
    console.log(distanz + "   " + distanzZumObjekt + "   " );
    //mache etwas, wenn distanz kleiner ist als 20
    if ((distanz < 50) && (distanzZumObjekt < 250)){
      //was soll passieren wenn distanz kleiner ist als 20?
        objectFarbe = farbeAktiv;
        objektPosition=middle;
      } else {
        objectFarbe = farbeInaktiv;
      }

      if ((distanz < 50) && (distanzZumObjekt2 < 250)){
        //was soll passieren wenn distanz kleiner ist als 20?
          object2Farbe = farbeAktiv;
          objekt2Position=middle;
        } else {
          object2Farbe = farbeInaktiv;
        } 
    

    
    p.noFill();
    p.stroke(255);
    p.ellipse(middle.x, middle.y, distanz, distanz);

    p.fill(66, 245, 120);
    p.ellipse(daumenPosition.x, daumenPosition.y, 30, 30);
    p.fill(66, 99, 245);
    p.ellipse(zeigefingerPosition.x, zeigefingerPosition.y, 30, 30);

  }

  p.objectBetweenFingers = function () {
    //fingerpositionen auf bildschirm mappen
    daumenPosition.x = p.map(daumen.x, 0, 1, 0, width);
    daumenPosition.y = p.map(daumen.y, 0, 1, 0, height);

    zeigefingerPosition.x = p.map(zeigefinger.x, 0, 1, 0, width);
    zeigefingerPosition.y = p.map(zeigefinger.y, 0, 1, 0, height);

    p.strokeWeight(2);

    //distanz zwischen fingern berechnen
    let distanz = p.dist(zeigefingerPosition.x, zeigefingerPosition.y, daumenPosition.x, daumenPosition.y);
    
    //mache etwas, wenn distanz kleiner ist als 20
    if (distanz < 20) {
      //was soll passieren wenn distanz kleiner ist als 20?
    }

    let middle = p5.Vector.add(zeigefingerPosition, daumenPosition).div(2);
    p.noFill();
    p.stroke(255);
    p.ellipse(middle.x, middle.y, distanz, distanz);

    p.fill(66, 245, 120);
    p.ellipse(daumenPosition.x, daumenPosition.y, 30, 30);
    p.fill(66, 99, 245);
    p.ellipse(zeigefingerPosition.x, zeigefingerPosition.y, 30, 30);

    
  
    /* // Calculate the size of the circles
    let circleSize = p.abs(p.sin(angle)) * distanz;

    // Draw the three circles
    p.noFill();
    p.ellipse(middle.x, middle.y, circleSize, circleSize);
    p.ellipse(middle.x, middle.y, circleSize / 2, circleSize / 2);
    p.ellipse(middle.x, middle.y, circleSize /4, circleSize /4);
    console.log(circleSize);
    // Increase the angle for the next frame
    angle = angle + 0.015; */
    
  }



  p.drawGrid = function () {
    // Draw vertical lines
    p.strokeWeight(0.2);
    for (let x = 0; x <= width; x += gridSize) {
      p.line(x, 0, x, height);
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      p.line(0, y, width, y);
    }
  }


}

let myp5 = new p5(sketch);