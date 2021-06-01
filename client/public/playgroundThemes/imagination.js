(function () {
  // Imagination by @neave

  window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60);
    };

  var context,
    canvas,
    mouseX,
    mouseY,
    px,
    py,
    points = [],
    size = 0,
    red = 0,
    green = 255,
    blue = 255,
    spread,
    SPEED_X = 0.15,
    SPEED_Y = 0.15,
    MAX_LENGTH = 120,
    RED_STEP = 0.02,
    GREEN_STEP = 0.015,
    BLUE_STEP = 0.025;

  function Point(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
  }

  Point.prototype.spread = function () {
    this.x += this.dx;
    this.y += this.dy;
  };

  function drawLines() {
    var p0,
      p1,
      p2,
      total = points.length;

    for (var i = total - 1; i > 1; i--) {
      p0 = points[i];
      p1 = points[i - 1];
      p2 = points[i - 2];

      context.beginPath();
      context.strokeStyle = p0.color;
      context.lineWidth = p0.size;
      context.globalAlpha = i / total;
      context.moveTo((p1.x + p0.x) / 2, (p1.y + p0.y) / 2);
      context.quadraticCurveTo(
        p1.x,
        p1.y,
        (p1.x + p2.x) / 2,
        (p1.y + p2.y) / 2
      );

      context.stroke();

      p0.spread();
    }

    points[0].spread();
    points[total - 1].spread();
  }

  function draw() {
    // Line movement
    var dx = (mouseX - px) * SPEED_X,
      dy = (mouseY - py) * SPEED_Y;

    // Limit the amount of movement
    if (dx < -spread) {
      dx = -spread;
    } else if (dx > spread) {
      dx = spread;
    }

    if (dy < -spread) {
      dy = -spread;
    } else if (dy > spread) {
      dy = spread;
    }

    // Store the mouse position
    px = mouseX;
    py = mouseY;

    // Create a new point on the line
    points.push(
      new Point(
        px,
        py,
        dx,
        dy,
        Math.abs(Math.sin((size += 0.125)) * 10) + 1,
        "rgb(" +
          Math.floor(Math.sin((red += RED_STEP)) * 128 + 128) +
          "," +
          Math.floor(Math.sin((green += GREEN_STEP)) * 128 + 128) +
          "," +
          Math.floor(Math.sin((blue += BLUE_STEP)) * 128 + 128) +
          ")"
      )
    );

    // Remove the last point from the list if we've reached the maximum length
    if (points.length > MAX_LENGTH) points.shift();

    // Fade out
    context.globalCompositeOperation = "source-over";
    context.globalAlpha = 1;
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the lines
    context.globalCompositeOperation = "lighter";
    drawLines();
    drawLines();
    drawLines();
  }

  function update() {
    requestAnimationFrame(update);
    draw();
  }

  function init() {
    canvas = document.getElementById("playground");
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.tapHighlightColor = "transparent";
    canvas.style.backgroundColor = "#000";
    canvas.style.userSelect = "none";
    canvas.style.cursor = "crosshair"; // || "default"

    canvas.onmousemove = function (event) {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.onmouseenter = function (event) {
      mouseX = event.pageX;
      mouseY = event.pageY;
      for (var i = points.length; i--; ) {
        points[i].x = mouseX;
        points[i].y = mouseY;
      }
    };

    canvas.ontouchmove = function (event) {
      mouseX = event.targetTouches[0].pageX;
      mouseY = event.targetTouches[0].pageY;
      spread = 1;
    };

    canvas.ontouchstart = function (event) {
      spread = 0;
      mouseX = event.targetTouches[0].pageX;
      mouseY = event.targetTouches[0].pageY;
      for (var i = points.length; i--; ) {
        points[i].x = mouseX;
        points[i].y = mouseY;
      }
      if (!event.target.href) {
        event.preventDefault();
      }
    };

    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;

    update();
  }

  document.addEventListener("DOMContentLoaded", init);
})();