function sketchyLine(x1, y1, x2, y2, numStrokes = 2) {
  strokeWeight(1);
  for (let i = 0; i < numStrokes; i++) {
    let maxPixelWobble = min(height, width) * random(0.004, 0.006);

    oneWavyLine(x1, y1, x2, y2, maxPixelWobble);
  }
}

function sketchyRect(x1, y1, w, h) {
  sketchyLine(x1, y1, x1, y1 + h);
  sketchyLine(x1, y1, x1 + w, y1);
  sketchyLine(x1 + w, y1, x1 + w, y1 + h);
  sketchyLine(x1, y1 + h, x1 + w, y1 + h);
}

//felt-tip simulated lines, from Nikolaus Gradwohl
//https://www.local-guru.net/blog/2010/4/23/simulation-of-hand-drawn-lines-in-processing
function oneWavyLine(x1, y1, x2, y2, amt) {
  noFill();
  beginShape();
  var dotTheEnds = false;
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dotTheEnds) {
    var r = 3;
    fill('black');
    ellipseMode(CENTER);
    ellipse(x1, y1, r, r);
    ellipse(x2, y2, r, r);
    noFill();
  }
  //start of line
  vertex(x1 + random(-amt, amt), y1 + random(-amt, amt));

  //at the start
  curveVertex(x1 + random(-amt, amt), y1 + random(-amt, amt));

  //1/3 of the way along
  curveVertex(x1 + dx / 3 + random(-amt, amt), y1 + dy / 3 + random(-amt, amt));

  //2/3 of the way along
  curveVertex(
    x1 + (2 * dx) / 3 + random(-amt, amt),
    y1 + (2 * dy) / 3 + random(-amt, amt)
  );

  //at the destination
  curveVertex(x2 + random(-amt, amt), y2 + random(-amt, amt));

  //end of line
  vertex(x2 + random(-amt, amt), y2 + random(-amt, amt));

  endShape();
}
