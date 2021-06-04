var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
c.style.background = "#111";
var cw = (c.width = window.innerWidth);
var ch = (c.height = window.innerHeight);
document.body.appendChild(c);

var rand = function (a, b) {
  return ~~(Math.random() * (b - a + 1) + a);
};
var mx = cw / 2;
var my = ch / 2;
var spacing = 35;
var rows = ch / spacing - 1;
var cols = cw / spacing - 1;
var points = [];

var Point = function (x, y) {
  this.x = x;
  this.y = y;
  this.baseR = spacing / 4;
  this.r = this.baseR;
  this.a = 1;
  this.dist = 0;
};

Point.prototype.update = function () {
  var dx = this.x - mx;
  var dy = this.y - my;
  this.dist = Math.sqrt(dx * dx + dy * dy);
  this.r = this.baseR - this.dist / (spacing / 1);
};

Point.prototype.render = function () {
  var rad = this.r >= 1 ? this.r : 1;
  ctx.beginPath();
  ctx.arc(
    this.x + ((rand(0, 100) - 50) * this.dist) / 10000,
    this.y + ((rand(0, 100) - 50) * this.dist) / 10000,
    rad,
    0,
    Math.PI * 2,
    false
  );
  ctx.fillStyle =
    "hsla(" + (180 - this.dist / 20) + ", 75%, 50%, " + this.a + ")";
  ctx.fill();

  if (this.dist < 150) {
    ctx.beginPath();
    ctx.moveTo(this.x + rand(0, 4) - 2, this.y + rand(0, 4) - 2);
    ctx.lineTo(mx + rand(0, 4) - 2, my + rand(0, 4) - 2);
    ctx.strokeStyle =
      "hsla(" +
      (160 - this.dist / 20 + rand(0, 60)) +
      ", 75%, 50%, " +
      this.a / 2 +
      ")";
    ctx.lineWidth = rand(1, 3) / 2;
    ctx.stroke();
  }
};

var loop = function () {
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0,0,0,.3)";
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "lighter";

  var i = points.length;
  while (i--) {
    var point = points[i];
    point.update();
    point.render();
  }
  setTimeout(loop, 16);
};

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    points.push(new Point(j * spacing + spacing, i * spacing + spacing));
  }
}

window.addEventListener("mousemove", function (e) {
  mx = e.pageX - c.offsetLeft;
  my = e.pageY - c.offsetTop;
});

loop();
