(function () {
  const canvas = document.getElementById("playground");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let seedX = [],
    seedY = [];
  let angles = [],
    radii = [],
    startAt = [];
  let thread,
    count = 0,
    noaction = 0;
  let pressed = false;

  canvas.style.backgroundColor = "#000";

  function init() {
    setSize();
    thread = setInterval(paint, 10);
  }

  window.onresize = function (event) {
    setSize();
  };

  function setSize() {
    ctx.strokeStyle = "#88f";
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    //ctx.shadowBlur=20;
    //ctx.shadowColor="#00f";
  }

  function press(input) {
    pressed = Boolean(input);
    if (pressed) {
      fire(event.clientX, event.clientY);
    }
  }

  function tryFire() {
    if (pressed) {
      fire(event.clientX, event.clientY);
    }
  }

  function fire(x, y) {
    seedX.push(x);
    seedY.push(y);
    var points = Math.floor(Math.random() * 5) + 50;
    startAt.push(points);
    var tmpArray = [0];
    var max = 0,
      rand;
    for (var i = 0; i < points; i++) {
      rand = Math.random() * 15 + 5;
      max += rand;
      tmpArray.push(max);
    }
    rand = Math.random(); //rotate a little
    for (var i = 0; i < points; i++) {
      tmpArray[i] = tmpArray[i] / max + rand;
    }
    for (var i = 0; i < points; i++) {
      angles.push(tmpArray[i] * (2 * Math.PI));
      radii.push(0);
    }
    noaction = 0;
  }

  function paint() {
    var explode = false,
      pos;
    if (count % 5 == 0) {
      //ctx.shadowColor="transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //ctx.shadowColor="#00f";
      if (count % 80 == 0) {
        fire(canvas.width / 2, canvas.height / 2);
      }
    }
    var max = 0;
    for (var i = 0; i < seedX.length; i++) {
      explode = false;
      if (Math.floor(Math.random() * 10) == 0) {
        explode = true;
        pos = Math.floor(Math.random() * startAt[i]);
      }
      if (radii[max] > window.innerWidth / 2) {
        seedX.splice(i, 1);
        seedY.splice(i, 1);
        angles.splice(max, startAt[i]);
        radii.splice(max, startAt[i]);
        startAt.splice(i, 1);
      }
      for (var a = max; a < max + startAt[i]; a++) {
        ctx.beginPath();
        ctx.moveTo(
          seedX[i] + Math.cos(angles[a]) * radii[a],
          seedY[i] + Math.sin(angles[a]) * radii[a]
        );
        angles[a] += Math.random() * 0.05 - 0.025;
        radii[a] += Math.random() * 10;
        ctx.lineTo(
          seedX[i] + Math.cos(angles[a]) * radii[a],
          seedY[i] + Math.sin(angles[a]) * radii[a]
        );
        ctx.stroke();
      }
      max += startAt[i];
    }
    count++;
  }

  // canvas.addEventListener('mousemove', tryFire)
  canvas.addEventListener("mousedown", () => press(1));

  init();
})();
