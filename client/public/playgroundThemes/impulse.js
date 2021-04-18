(function (main) {
  main(this, document, Vector2);
  // Vector2 library included from GitHub
})(function (window, document, vec2) {
  class Segment {
    constructor(start = new vec2(), end = new vec2(), width) {
      // super(start, end, width)
      this.start = start;
      this.end = end;
      this.width = width;
    }
  }

  class Lightning {
    constructor(center, end, iterations = 5) {
      // super(center, end, iterations)
      this.start = new vec2(center.x, center.y);
      this.end = new vec2(end.x, end.y);
      this.iterations = iterations;
      this.life = 0;
      this.ttl = 10; // time to live
      this.generateSegments();
    }

    generateSegments() {
      this.segments = [];
      this.segments.push(new Segment(this.start, this.end));
      this.branches = Math.round(1 + Math.random() * 2); // random number of branches between 1 and 3
      for (let i = 0; i < this.iterations; i++) {
        // for each number of iterations
        for (let j = this.segments.length; j > 0; j--) {
          // start at end of segments array
          var segmentWidth = 1;
          var oldSegment = this.segments[j - 1]; // segment to split
          var start = oldSegment.start; // get start and end points
          var end = oldSegment.end;
          var mid = start.midpoint(end); // get midpoint
          var angle = ((start.angleTo(end, "deg") - 90) * Math.PI) / 180; // calculate angle (in degrees) perpindicular to angle of current segment then convert to radians
          var offset =
            ((15 - Math.random() * 30) / (i + 1)) *
            (start.distanceTo(end) * 0.025); // offset by random value + scale down offset based on current iteration and distance to end of current segment

          mid.addScalarX(Math.cos(angle) * offset); // add calculated offset along perpindicular angle
          mid.addScalarY(Math.sin(angle) * offset);

          var newSegment1 = new Segment(start, mid, segmentWidth); // create two new segments to replace current segment
          var newSegment2 = new Segment(mid, end, segmentWidth);

          this.segments.splice(j - 1, 1); // remove the old segment

          this.segments.push(newSegment1); // replace the old segment
          this.segments.push(newSegment2);

          if (i < this.branches) {
            // add branches until i is greater than number of branches
            var branchAngle =
              ((start.angleTo(end, "deg") + (45 - Math.random() * 90)) *
                Math.PI) /
              180; // calculate current angle then offset by random amount between -45 and 45 (degrees) then convert to radians
            var branchStart = mid; // start at midpoint
            var branchEnd = new vec2( // offset branch end along calculated angle to length of current segment
              branchStart.x +
                Math.cos(branchAngle) * branchStart.distanceTo(end) * 0.85,
              branchStart.y +
                Math.sin(branchAngle) * branchStart.distanceTo(end) * 0.85
            );
            var branch = new Segment(branchStart, branchEnd, 0.5);
            this.segments.push(branch);
          }
        }
      }
    }

    update() {
      this.alpha = (this.ttl - this.life) / this.ttl;
      for (var i = this.segments.length - 1; i > 1; i--) {
        var segment = this.segments[i];
        segment.start.addRandom(0.8);
      }
      this.life++;
    }
  }

  class App {
    constructor() {
      this.tick = 0;
      this.bolts = [];
      this.initCanvas();
      this.initMouse();
      this.render();
    }

    initCanvas() {
      this.canvas = document.getElementById("playground");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.dimensions = new vec2();
      this.center = new vec2();
      this.resize();
    }

    resize() {
      this.dimensions.x = this.canvas.width;
      this.dimensions.y = this.canvas.height;
      this.center.x = this.dimensions.x * 0.5;
      this.center.y = this.dimensions.y * 0.5;
    }

    initMouse(e) {
      var self = this;
      self.mouse = new vec2();
      self.mouseOver = false;
      window.onresize = function () {
        self.resize();
      };
      window.onmouseenter = function (e) {
        self.mouseHandler(e);
      };
      window.onmousemove = function (e) {
        self.mouseHandler(e);
      };
      window.onmouseout = function (e) {
        self.mouseHandler(e);
      };
      window.onclick = function (e) {
        self.mouseHandler(e);
      };
    }

    mouseHandler(e) {
      if (e.type === "mousemove") {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouseOver = true;
      }
      if (e.type === "mouseout") {
        this.mouseOver = false;
      }
      if (e.type === "click") {
        this.bolts.push(
          new Lightning(this.center, new vec2(this.mouse.x, this.mouse.y), 5)
        );
      }
      if (e.type === "mouseenter") {
        this.bolts.push(
          new Lightning(this.center, new vec2(this.mouse.x, this.mouse.y), 5)
        );
      }
    }

    draw() {
      this.ctx.fillStyle = "rgba(0,0,0,0.5)";
      this.ctx.fillRect(0, 0, this.dimensions.x, this.dimensions.y);
      this.ctx.save();
      this.ctx.shadowColor = "rgba(165,215,255,0.9)";
      this.ctx.shadowBlur = 20;
      if (this.bolts.length > 0) {
        for (var i = this.bolts.length - 1; i >= 0; i--) {
          var bolt = this.bolts[i];
          bolt.update();
          for (var j = 0, len = bolt.segments.length; j < len; j++) {
            var segment = bolt.segments[j];
            this.ctx.beginPath();
            this.ctx.strokeStyle =
              "rgba(165,215,255," + bolt.alpha.toString() + ")";
            this.ctx.lineWidth = segment.width;
            this.ctx.moveTo(segment.start.x, segment.start.y);
            this.ctx.lineTo(segment.end.x, segment.end.y);
            this.ctx.stroke();
            this.ctx.closePath();
          }
          if (bolt.life > bolt.ttl) this.bolts.splice(i, 1);
        }
      }
      this.ctx.fillStyle = "rgba(200,200,200,1)";
      this.ctx.arc(this.center.x, this.center.y, 5, 0, Math.PI * 180);
      this.ctx.fill();
      this.ctx.restore();
    }

    render() {
      var self = this;
      var randomInt = Math.round(Math.random() * 60);
      self.tick++;
      if (self.tick % randomInt === 0 && self.mouseOver) {
        for (var i = 0; i < 3; i++) {
          self.bolts.push(
            new Lightning(
              new vec2(self.center.x, self.center.y),
              new vec2(self.mouse.x, self.mouse.y),
              5
            )
          );
        }
      }
      self.draw();
      window.requestAnimationFrame(self.render.bind(self));
    }
  }

  window.onload = function () {
    var app = new App();
    var i = 0;
    var interval = window.setInterval(function () {
      // if (i++ > 100) window.clearInterval(interval)
      // else {
      app.bolts.push(
        new Lightning(app.center, new vec2().randomize(app.dimensions), 5)
      );
      // }
    }, 20);
  };

  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
});
