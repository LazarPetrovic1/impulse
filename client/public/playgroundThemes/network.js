(function () {
  var canvasBody = document.getElementById("playground"),
    canvas = canvasBody.getContext("2d"),
    w = canvasBody.width,
    h = canvasBody.height,
    opts = {
      amount: 75,
      len: 200,
      size: 14,
      baseTime: 35,
      addedTime: 5,
      color: "hsl(hue,100%,50%)",
      opacity: 1,
      bgColor: "rgba(10,10,10, alpha)",
      repaintAlpha: 0.05,
      angles: 3,
      cx: w / 2,
      cy: h / 2,
    },
    tick = 0,
    steam = [],
    currentHue = 0,
    circ = Math.PI * 2,
    baseRad = circ / opts.angles;

  canvas.clearRect(0, 0, canvas.width, canvas.height);

  function loop() {
    window.requestAnimationFrame(loop);
    ++tick;
    canvas.fillStyle = opts.bgColor.replace("alpha", opts.repaintAlpha);
    canvas.fillRect(0, 0, w, h);
    for (let i = 0; i < opts.amount; i++) {
      steam.push(new Arom());
      opts.amount -= 1;
    }
    steam.map(function (arom) {
      arom.step();
    });
  }

  function Arom() {
    this.reset();
  }

  Arom.prototype.reset = function () {
    this.startX = opts.cx;
    this.startY = opts.cy;
    this.x = 0;
    this.y = 0;
    this.addedX = 0;
    this.addedY = 0;
    this.rad = 0;
    this.cumulativeTime = 0;
    this.goReset = 0;
    this.color = opts.color.replace("aplha", opts.opacity);
    this.beginPhase();
  };
  Arom.prototype.beginPhase = function () {
    this.x += this.addedX;
    this.y += this.addedY;
    this.time = 0;
    this.targetTime = (opts.baseTime + opts.addedTime) | 0;
    this.rad += baseRad * (Math.random() > 0.5 ? 1 : -1);
    this.addedX = Math.cos(this.rad);
    this.addedY = Math.sin(this.rad);
    if (
      this.currentX > w - opts.size / 2 ||
      this.currentX < 0 - opts.size / 2 ||
      this.currentY > h - opts.size / 2 ||
      this.currentY < 0 + opts.size / 2
    ) {
      this.goReset += 1;
    }
  };
  Arom.prototype.step = function () {
    ++this.time;
    ++this.cumulativeTime;
    if (this.time >= this.targetTime) {
      this.beginPhase();
    }
    if (this.goReset == 1) {
      this.reset();
    }
    var prop = this.time / this.targetTime,
      timingFunction = Math.sin((prop * Math.PI) / 2),
      // timingFunction = prop,
      x = this.addedX * timingFunction,
      y = this.addedY * timingFunction;
    canvas.fillStyle = opts.color.replace("hue", (currentHue += 0.05));
    // canvas.fillRect(this.startX + (this.x + x) * opts.len, this.startY + (this.y + y) * opts.len, opts.size, opts.size)
    canvas.beginPath();
    canvas.arc(
      this.startX + (this.x + x) * opts.len,
      this.startY + (this.y + y) * opts.len,
      opts.size,
      0,
      (Math.PI * 2) / Math.random()
    );
    canvas.fill();
    this.currentX = this.startX + (this.x + x) * opts.len;
    this.currentY = this.startY + (this.y + y) * opts.len;
  };

  loop();

  window.addEventListener("resize", function () {
    w = canvasBody.width;
    h = canvasBody.height;
    opts.cy = h / 2;
    opts.cx = w / 2;
    steam.map(function (arom) {
      arom.reset();
    });
  });
})();
