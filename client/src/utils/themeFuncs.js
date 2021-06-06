/* eslint-disable */
import Vector2 from "./Vector2";

export function dark() {
  const canvas = document.getElementById("playground");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.background = `linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(0,0,55,1) 44%, rgba(17,17,17,1) 100%)`;
}

export function daysnow() {
  document.getElementById("playground").style.background = `
  linear-gradient(
    bottom,
    rgb(105, 173, 212) 0%,
    rgb(23, 82, 145) 84%
  )
  `;
  (function () {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  var flakes = [],
    canvas = document.getElementById("playground"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `
  linear-gradient(
    bottom,
    rgb(105, 173, 212) 0%,
    rgb(23, 82, 145) 84%
  )
  `;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
      var flake = flakes[i],
        x = mX,
        y = mY,
        minDist = 150,
        x2 = flake.x,
        y2 = flake.y;

      var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
        dx = x2 - x,
        dy = y2 - y;

      if (dist < minDist) {
        var force = minDist / (dist * dist),
          xcomp = (x - x2) / dist,
          ycomp = (y - y2) / dist,
          deltaV = force / 2;

        flake.velX -= deltaV * xcomp;
        flake.velY -= deltaV * ycomp;
      } else {
        flake.velX *= 0.98;
        if (flake.velY <= flake.speed) {
          flake.velY = flake.speed;
        }
        flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
      }

      ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }

      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(snow);
  }

  function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = Math.random() * 3 + 2;
    flake.speed = Math.random() * 1 + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = Math.random() * 0.5 + 0.3;
  }

  function init() {
    for (var i = 0; i < flakeCount; i++) {
      var x = Math.floor(Math.random() * canvas.width),
        y = Math.floor(Math.random() * canvas.height),
        size = Math.random() * 3 + 2,
        speed = Math.random() * 1 + 0.5,
        opacity = Math.random() * 0.5 + 0.3;

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: Math.random() / 30,
        step: 0,
        opacity: opacity,
      });
    }

    snow();
  }

  canvas.addEventListener("mousemove", function (e) {
    mX = e.clientX;
    mY = e.clientY;
  });

  init();
}

export function drawworm() {
  function DrawWorm() {
    // Keep 'em global'
    var canvas;
    var context;

    let width;
    let height;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight };
    this.mouse = mouse;

    let interval;

    let vms = [];

    let MAX_NUM = 100;
    let N = 80;

    let px = window.innerWidth / 2;
    let py = window.innerHeight;

    this.initialize = function () {
      canvas = document.getElementById("playground");
      context = canvas.getContext("2d");
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.backgroundColor = "#000";
      canvas.addEventListener("touchmove", TouchMove, false);
      canvas.addEventListener("mousemove", MouseMove, false);
      canvas.addEventListener("click", MouseDown, false);
      context.clearRect(0, 0, canvas.width, canvas.height);

      //Set interval - Bad! - I know!
      let interval = setInterval(Draw, 20);
    };

    let Draw = function () {
      let len = vms.length;
      let i;

      //fadeScreen();

      for (i = 0; i < len; i++) {
        let o = vms[i];

        if (o.count < N) {
          DrawWorm(o);
          o.count++;
          //This looks a tad hacky - modifying the loop from within :S
        } else {
          len--;
          vms.splice(i, 1);
          i--;
        }
      }

      Check();
    };

    //Takes a worm (obj) param
    let DrawWorm = function (obj) {
      if (Math.random() > 0.9) {
        obj.tmt.rotate(-obj.r * 2);
        obj.r *= -1;
      }

      //Prepend is just concat -- right?

      obj.vmt.prependMatrix(obj.tmt);

      let cc1x = -obj.w * obj.vmt.c + obj.vmt.tx;
      let cc1y = -obj.w * obj.vmt.d + obj.vmt.ty;

      let pp1x = (obj.c1x + cc1x) / 2;
      let pp1y = (obj.c1y + cc1y) / 2;

      let cc2x = obj.w * obj.vmt.c + obj.vmt.tx;
      let cc2y = obj.w * obj.vmt.d + obj.vmt.ty;

      let pp2x = (obj.c2x + cc2x) / 2;
      let pp2y = (obj.c2y + cc2y) / 2;

      context.fillStyle = "#fff";
      context.strokeStyle = "#fff";
      context.beginPath();

      context.moveTo(obj.p1x, obj.p1y);
      context.quadraticCurveTo(obj.c1x, obj.c1y, pp1x, pp1y);

      context.lineTo(pp2x, pp2y);

      context.quadraticCurveTo(obj.c2x, obj.c2y, obj.p2x, obj.p2y);

      //context.stroke();
      context.closePath();
      context.fill();

      obj.c1x = cc1x;
      obj.c1y = cc1y;
      obj.p1x = pp1x;
      obj.p1y = pp1y;
      obj.c2x = cc2x;
      obj.c2y = cc2y;
      obj.p2x = pp2x;
      obj.p2y = pp2y;
    };

    let Check = function () {
      let x0 = mouse.x;
      let y0 = mouse.y;

      let vx = x0 - px;
      let vy = y0 - py;

      let len = Math.min(Magnitude(vx, vy), 50);

      if (len < 10) {
        return;
      }

      let matrix = new Matrix2D();

      matrix.rotate(Math.atan2(vy, vx));

      matrix.translate(x0, y0);

      createWorm(matrix, len);

      context.beginPath();
      context.strokeStyle = "#000000";
      context.moveTo(px, py);
      context.lineTo(x0, y0);
      context.stroke();
      context.closePath();

      px = x0;
      py = y0;

      //More logic here for afterwards?
    };

    let createWorm = function (mtx, len) {
      let angle = Math.random() * (Math.PI / 6 - Math.PI / 64) + Math.PI / 64;

      if (Math.random() > 0.5) {
        angle *= -1;
      }

      let tmt = new Matrix2D();
      tmt.scale(0.95, 0.95);
      tmt.rotate(angle);
      tmt.translate(len, 0);

      let w = 0.5;

      let obj = new Worm();

      obj.c1x = -w * mtx.c + mtx.tx;
      obj.p1x = -w * mtx.c + mtx.tx;

      obj.c1y = -w * mtx.d + mtx.ty;
      obj.p1y = -w * mtx.d + mtx.ty;

      obj.c2x = w * mtx.c + mtx.tx;
      obj.p2x = w * mtx.c + mtx.tx;

      obj.c2y = w * mtx.d + mtx.ty;
      obj.p2y = w * mtx.d + mtx.ty;

      obj.vmt = mtx;
      obj.tmt = tmt;

      obj.r = angle;
      obj.w = len / 20;
      obj.count = 0;

      vms.push(obj);

      if (vms.length > MAX_NUM) {
        vms.shift();
      }
    };

    //Not sure why they do this kinda thing in flash.
    let Worm = function () {
      this.c1x = null;
      this.c1y = null;
      this.c2x = null;
      this.c2y = null;
      this.p1x = null;
      this.p1y = null;
      this.p2x = null;
      this.p2y = null;

      this.w = null;
      this.r = null;

      this.count = null;
      this.vmt = null;
      this.tmt = null;
    };

    let fadeScreen = function () {
      context.fillStyle = "rgba(255, 255, 255, 0.02)";
      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fill();
    };

    //Clear the screen,
    let MouseDown = function (e) {
      e.preventDefault();
      canvas.width = canvas.width;
      vms = [];
    };

    let MouseMove = function (e) {
      mouse.x = e.layerX - canvas.offsetLeft;
      mouse.y = e.layerY - canvas.offsetTop;
    };

    let TouchMove = function (e) {
      e.preventDefault();
      mouse.x = e.targetTouches[0].pageX - canvas.offsetLeft;
      mouse.y = e.targetTouches[0].pageY - canvas.offsetTop;
    };

    //Returns Magnitude
    let Magnitude = function (x, y) {
      return Math.sqrt(x * x + y * y);
    };
  }

  let Matrix2D = function (a, b, c, d, tx, ty) {
    this.initialize(a, b, c, d, tx, ty);
  };
  let p = Matrix2D.prototype;

  // static public properties:

  Matrix2D.identity = null; // set at bottom of class definition.

  Matrix2D.DEG_TO_RAD = Math.PI / 180;

  p.a = 1;

  p.b = 0;

  p.c = 0;

  p.d = 1;

  p.tx = 0;

  p.ty = 0;

  p.alpha = 1;

  p.shadow = null;

  p.compositeOperation = null;

  p.initialize = function (a, b, c, d, tx, ty) {
    if (a != null) {
      this.a = a;
    }
    this.b = b || 0;
    this.c = c || 0;
    if (d != null) {
      this.d = d;
    }
    this.tx = tx || 0;
    this.ty = ty || 0;
  };

  p.prepend = function (a, b, c, d, tx, ty) {
    let n11 = a * this.a + b * this.c;
    let n12 = a * this.b + b * this.d;
    let n21 = c * this.a + d * this.c;
    let n22 = c * this.b + d * this.d;
    let n31 = tx * this.a + ty * this.c + this.tx;
    let n32 = tx * this.b + ty * this.d + this.ty;

    this.a = n11;
    this.b = n12;
    this.c = n21;
    this.d = n22;
    this.tx = n31;
    this.ty = n32;
  };

  p.append = function (a, b, c, d, tx, ty) {
    let a1 = this.a;
    let b1 = this.b;
    let c1 = this.c;
    let d1 = this.d;

    this.a = a * a1 + b * c1;
    this.b = a * b1 + b * d1;
    this.c = c * a1 + d * c1;
    this.d = c * b1 + d * d1;
    this.tx = tx * a1 + ty * c1 + this.tx;
    this.ty = tx * b1 + ty * d1 + this.ty;
  };

  p.prependMatrix = function (matrix) {
    this.prepend(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    this.prependProperties(
      matrix.alpha,
      matrix.shadow,
      matrix.compositeOperation
    );
  };

  p.appendMatrix = function (matrix) {
    this.append(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    this.appendProperties(
      matrix.alpha,
      matrix.shadow,
      matrix.compositeOperation
    );
  };

  p.prependTransform = function (
    x,
    y,
    scaleX,
    scaleY,
    rotation,
    skewX,
    skewY,
    regX,
    regY
  ) {
    let sin, cos, r;
    if (rotation % 360) {
      r = rotation * Matrix2D.DEG_TO_RAD;
      cos = Math.cos(r);
      sin = Math.sin(r);
    } else {
      cos = 1;
      sin = 0;
    }

    if (regX || regY) {
      // append the registration offset:
      this.tx -= regX;
      this.ty -= regY;
    }
    if (skewX || skewY) {
      // TODO: can this be combined into a single prepend operation?
      skewX *= Matrix2D.DEG_TO_RAD;
      skewY *= Matrix2D.DEG_TO_RAD;
      this.prepend(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        0,
        0
      );
      this.prepend(
        Math.cos(skewY),
        Math.sin(skewY),
        -Math.sin(skewX),
        Math.cos(skewX),
        x,
        y
      );
    } else {
      this.prepend(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        x,
        y
      );
    }
  };

  p.appendTransform = function (
    x,
    y,
    scaleX,
    scaleY,
    rotation,
    skewX,
    skewY,
    regX,
    regY
  ) {
    let sin, cos, r;
    if (
      rotation % 360 == 0 &&
      scaleX == 1 &&
      scaleY == 1 &&
      skewX == 0 &&
      skewY == 0
    ) {
      this.tx += x - regX;
      this.ty += y - regY;
      return;
    }

    if (rotation % 360) {
      r = rotation * Matrix2D.DEG_TO_RAD;
      cos = Math.cos(r);
      sin = Math.sin(r);
    } else {
      cos = 1;
      sin = 0;
    }

    if (skewX || skewY) {
      // TODO: can this be combined into a single append?
      skewX *= Matrix2D.DEG_TO_RAD;
      skewY *= Matrix2D.DEG_TO_RAD;
      this.append(
        Math.cos(skewY),
        Math.sin(skewY),
        -Math.sin(skewX),
        Math.cos(skewX),
        x,
        y
      );
      this.append(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        0,
        0
      );
    } else {
      this.append(
        cos * scaleX,
        sin * scaleX,
        -sin * scaleY,
        cos * scaleY,
        x,
        y
      );
    }

    if (regX || regY) {
      // prepend the registration offset:
      this.tx -= regX * this.a + regY * this.c;
      this.ty -= regX * this.b + regY * this.d;
    }
  };

  p.rotate = function (angle) {
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let n11 = cos * this.a + sin * this.c;
    let n12 = cos * this.b + sin * this.d;
    let n21 = -sin * this.a + cos * this.c;
    let n22 = -sin * this.b + cos * this.d;
    this.a = n11;
    this.b = n12;
    this.c = n21;
    this.d = n22;
  };

  p.skew = function (skewX, skewY) {
    skewX = skewX * Matrix2D.DEG_TO_RAD;
    skewY = skewY * Matrix2D.DEG_TO_RAD;
    this.append(
      Math.cos(skewY),
      Math.sin(skewY),
      -Math.sin(skewX),
      Math.cos(skewX),
      0,
      0
    );
  };

  p.scale = function (x, y) {
    this.a *= x;
    this.d *= y;
    this.tx *= x;
    this.ty *= y;
  };

  p.translate = function (x, y) {
    this.tx += x;
    this.ty += y;
  };

  p.identity = function () {
    this.alpha = this.a = this.d = 1;
    this.b = this.c = this.tx = this.ty = 0;
    this.shadow = this.compositeOperation = null;
  };

  p.invert = function () {
    let a1 = this.a;
    let b1 = this.b;
    let c1 = this.c;
    let d1 = this.d;
    let tx1 = this.tx;
    let n = a1 * d1 - b1 * c1;

    this.a = d1 / n;
    this.b = -b1 / n;
    this.c = -c1 / n;
    this.d = a1 / n;
    this.tx = (c1 * this.ty - d1 * tx1) / n;
    this.ty = -(a1 * this.ty - b1 * tx1) / n;
  };

  p.isIdentity = function () {
    return (
      this.tx == 0 &&
      this.ty == 0 &&
      this.a == 1 &&
      this.b == 0 &&
      this.c == 0 &&
      this.d == 1
    );
  };

  p.decompose = function (target) {
    // TODO: it would be nice to be able to solve for whether the matrix can be decomposed into only scale/rotation
    // even when scale is negative
    if (target == null) {
      target = {};
    }
    target.x = this.tx;
    target.y = this.ty;
    target.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
    target.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);

    let skewX = Math.atan2(-this.c, this.d);
    let skewY = Math.atan2(this.b, this.a);

    if (skewX == skewY) {
      target.rotation = skewY / Matrix2D.DEG_TO_RAD;
      if (this.a < 0 && this.d >= 0) {
        target.rotation += target.rotation <= 0 ? 180 : -180;
      }
      target.skewX = target.skewY = 0;
    } else {
      target.skewX = skewX / Matrix2D.DEG_TO_RAD;
      target.skewY = skewY / Matrix2D.DEG_TO_RAD;
    }
    return target;
  };

  p.reinitialize = function (
    a,
    b,
    c,
    d,
    tx,
    ty,
    alpha,
    shadow,
    compositeOperation
  ) {
    this.initialize(a, b, c, d, tx, ty);
    this.alpha = alpha || 1;
    this.shadow = shadow;
    this.compositeOperation = compositeOperation;
    return this;
  };

  p.appendProperties = function (alpha, shadow, compositeOperation) {
    this.alpha *= alpha;
    this.shadow = shadow || this.shadow;
    this.compositeOperation = compositeOperation || this.compositeOperation;
  };

  p.prependProperties = function (alpha, shadow, compositeOperation) {
    this.alpha *= alpha;
    this.shadow = this.shadow || shadow;
    this.compositeOperation = this.compositeOperation || compositeOperation;
  };

  p.clone = function () {
    let mtx = new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
    mtx.shadow = this.shadow;
    mtx.alpha = this.alpha;
    mtx.compositeOperation = this.compositeOperation;
    return mtx;
  };

  p.toString = function () {
    return (
      "[Matrix2D (a=" +
      this.a +
      " b=" +
      this.b +
      " c=" +
      this.c +
      " d=" +
      this.d +
      " tx=" +
      this.tx +
      " ty=" +
      this.ty +
      ")]"
    );
  };

  // this has to be populated after the class is defined:
  Matrix2D.identity = new Matrix2D(1, 0, 0, 1, 0, 0);

  window.Matrix2D = Matrix2D;

  let app, interval, count;

  function demoApp() {
    count++;
    if (count % 2 == 0) {
      app.mouse.y -= 40;
    } else {
      app.mouse.y += 40;
    }

    if (count > 30) {
      window.clearInterval(interval);
    }
  }

  setTimeout(function () {
    app = new DrawWorm();
    app.initialize();
    count = 0;
    interval = setInterval(demoApp, 20);
  }, 10);
}

export function fireworks() {
  var options = {
    /* Which hue should be used for the first batch of rockets? */
    startingHue: 120,
    /* How many ticks the script should wait before a new firework gets spawned, if the user is holding down his mouse button. */
    clickLimiter: 5,
    /* How fast the rockets should automatically spawn, based on ticks */
    timerInterval: 40,
    /* Show pulsing circles marking the targets? */
    showTargets: true,
    /* Rocket movement options, should be self-explanatory */
    rocketSpeed: 2,
    rocketAcceleration: 1.03,
    /* Particle movement options, should be self-explanatory */
    particleFriction: 0.95,
    particleGravity: 1,
    /* Minimum and maximum amount of particle spawns per rocket */
    particleMinCount: 25,
    particleMaxCount: 40,
    /* Minimum and maximum radius of a particle */
    particleMinRadius: 3,
    particleMaxRadius: 5,
  };

  // Local variables
  var fireworks = [];
  var particles = [];
  var mouse = { down: false, x: 0, y: 0 };
  var currentHue = options.startingHue;
  var clickLimiterTick = 0;
  var timerTick = 0;
  var cntRocketsLaunched = 0;
  // Helper function for canvas animations
  const requestAnimFrame = (function (callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // Helper function to return random numbers within a specified range
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Helper function to calculate the distance between 2 points
  function calculateDistance(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x;
    var yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

  // Setup some basic variables
  var canvas = document.getElementById("playground");
  canvas.style.backgroundColor = "black";
  canvas.style.cursor = "crosshair";
  var canvasCtx = canvas.getContext("2d");
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;

  // Firework class
  function Firework(sx, sy, tx, ty) {
    // Set coordinates (x/y = actual, sx/sy = starting, tx/ty = target)
    this.x = this.sx = sx;
    this.y = this.sy = sy;
    this.tx = tx;
    this.ty = ty;

    // Calculate distance between starting and target point
    this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
    this.distanceTraveled = 0;

    // To simulate a trail effect, the last few coordinates will be stored
    this.coordinates = [];
    this.coordinateCount = 3;

    // Populate coordinate array with initial data
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }

    // Some settings, you can adjust them if you'd like to do so.
    this.angle = Math.atan2(ty - sy, tx - sx);
    this.speed = options.rocketSpeed;
    this.acceleration = options.rocketAcceleration;
    this.brightness = random(50, 80);
    this.hue = currentHue;
    this.targetRadius = 1;
    this.targetDirection = false; // false = Radius is getting bigger, true = Radius is getting smaller

    // Increase the rockets launched counter
    cntRocketsLaunched++;
  }

  // This method should be called each frame to update the firework
  Firework.prototype.update = function (index) {
    // Update the coordinates array
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    // Cycle the target radius (used for the pulsing target circle)
    if (!this.targetDirection) {
      if (this.targetRadius < 8) this.targetRadius += 0.15;
      else this.targetDirection = true;
    } else {
      if (this.targetRadius > 1) this.targetRadius -= 0.15;
      else this.targetDirection = false;
    }

    // Speed up the firework (could possibly travel faster than the speed of light)
    this.speed *= this.acceleration;

    // Calculate the distance the firework has travelled so far (based on velocities)
    var vx = Math.cos(this.angle) * this.speed;
    var vy = Math.sin(this.angle) * this.speed;
    this.distanceTraveled = calculateDistance(
      this.sx,
      this.sy,
      this.x + vx,
      this.y + vy
    );

    // If the distance traveled (including velocities) is greater than the initial distance
    // to the target, then the target has been reached. If that's not the case, keep traveling.
    if (this.distanceTraveled >= this.distanceToTarget) {
      createParticles(this.tx, this.ty);
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  };

  // Draws the firework
  Firework.prototype.draw = function () {
    var lastCoordinate = this.coordinates[this.coordinates.length - 1];

    // Draw the rocket
    canvasCtx.beginPath();
    canvasCtx.moveTo(lastCoordinate[0], lastCoordinate[1]);
    canvasCtx.lineTo(this.x, this.y);
    canvasCtx.strokeStyle =
      "hsl(" + this.hue + ",100%," + this.brightness + "%)";
    canvasCtx.stroke();

    // Draw the target (pulsing circle)
    if (options.showTargets) {
      canvasCtx.beginPath();
      canvasCtx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
      canvasCtx.stroke();
    }
  };

  // Particle class
  function Particle(x, y) {
    // Set the starting point
    this.x = x;
    this.y = y;

    // To simulate a trail effect, the last few coordinates will be stored
    this.coordinates = [];
    this.coordinateCount = 5;

    // Populate coordinate array with initial data
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }

    // Set a random angle in all possible directions (radians)
    this.angle = random(0, Math.PI * 2);
    this.speed = random(1, 10);

    // Add some friction and gravity to the particle
    this.friction = options.particleFriction;
    this.gravity = options.particleGravity;

    // Change the hue to a random number
    this.hue = random(currentHue - 20, currentHue + 20);
    this.brightness = random(50, 80);
    this.alpha = 1;

    // Set how fast the particles decay
    this.decay = random(0.01, 0.03);
  }

  // Updates the particle, should be called each frame
  Particle.prototype.update = function (index) {
    // Update the coordinates array
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);

    // Slow it down (based on friction)
    this.speed *= this.friction;

    // Apply velocity to the particle
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;

    // Fade out the particle, and remove it if alpha is low enough
    this.alpha -= this.decay;
    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  };

  // Draws the particle
  Particle.prototype.draw = function () {
    var lastCoordinate = this.coordinates[this.coordinates.length - 1];
    var radius = Math.round(
      random(options.particleMinRadius, options.particleMaxRadius)
    );

    // Create a new shiny gradient
    var gradient = canvasCtx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      radius
    );
    gradient.addColorStop(0.0, "white");
    gradient.addColorStop(0.1, "white");
    gradient.addColorStop(
      0.1,
      "hsla(" + this.hue + ",100%," + this.brightness + "%," + this.alpha + ")"
    );
    gradient.addColorStop(1.0, "black");

    // Draw the gradient
    canvasCtx.beginPath();
    canvasCtx.fillStyle = gradient;
    canvasCtx.arc(this.x, this.y, radius, Math.PI * 2, false);
    canvasCtx.fill();
  };

  // Create a bunch of particles at the given position
  function createParticles(x, y) {
    var particleCount = Math.round(
      random(options.particleMinCount, options.particleMaxCount)
    );
    while (particleCount--) {
      particles.push(new Particle(x, y));
    }
  }

  // Add event listeners to the canvas to handle mouse interactions
  canvas.addEventListener("mousemove", function (e) {
    e.preventDefault();
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
  });

  canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
    mouse.down = true;
  });

  canvas.addEventListener("mouseup", function (e) {
    e.preventDefault();
    mouse.down = false;
  });

  // Main application / script, called when the window is loaded
  function gameLoop() {
    // This function will rund endlessly by using requestAnimationFrame (or fallback to setInterval)
    requestAnimFrame(gameLoop);

    // Increase the hue to get different colored fireworks over time
    currentHue += 0.5;

    // 'Clear' the canvas at a specific opacity, by using 'destination-out'. This will create a trailing effect.
    canvasCtx.globalCompositeOperation = "destination-out";
    canvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    canvasCtx.globalCompositeOperation = "lighter";

    // Loop over all existing fireworks (they should be updated & drawn)
    var i = fireworks.length;
    while (i--) {
      fireworks[i].draw();
      fireworks[i].update(i);
    }

    // Loop over all existing particles (they should be updated & drawn)
    var i = particles.length;
    while (i--) {
      particles[i].draw();
      particles[i].update(i);
    }

    // Draw some text
    canvasCtx.fillStyle = "white";
    canvasCtx.font = "14px Arial";

    // Launch fireworks automatically to random coordinates, if the user does not interact with the scene
    if (timerTick >= options.timerInterval) {
      if (!mouse.down) {
        fireworks.push(
          new Firework(
            canvasWidth / 2,
            canvasHeight,
            random(0, canvasWidth),
            random(0, canvasHeight / 2)
          )
        );
        timerTick = 0;
      }
    } else {
      timerTick++;
    }

    // Limit the rate at which fireworks can be spawned by mouse
    if (clickLimiterTick >= options.clickLimiter) {
      if (mouse.down) {
        fireworks.push(
          new Firework(canvasWidth / 2, canvasHeight, mouse.x, mouse.y)
        );
        clickLimiterTick = 0;
      }
    } else {
      clickLimiterTick++;
    }
  }

  window.onload = gameLoop();
}

export function fountain() {
  var canvas = document.getElementById("playground"),
    c = canvas.getContext("2d"),
    particles = {},
    particleIndex = 0,
    particleNum = 50,
    gravity = 0.7;

  c.clearRect(0, 0, canvas.width, canvas.height);

  // particle
  function Particle() {
    this.posX = canvas.width / 2; // position X
    this.posY = canvas.height / 8; // position Y
    this.vx = Math.random() * 10 - 5; // velocity X
    this.vy = Math.random() * 10 - 5; // velocity Y
    this.width = 1; // particle width
    this.height = Math.random() * 6 - 3; // particle height

    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;

    this.life = 0;
    this.death = 140;

    //random color
    this.colors = [
      "rgba(100, 100, 100," + (Math.random() + 0.5) + ")",
      "rgba(52, 152, 200," + (Math.random() + 0.5) + ")",
      "rgba(41, 128, 250," + (Math.random() + 0.5) + ")",
    ];
    this.color = this.colors[Math.floor(Math.random() * 3)];
  }

  // draw
  Particle.prototype.draw = function () {
    this.posX += this.vx;
    this.posY += this.vy;

    this.life++;

    if (this.life >= this.death) {
      delete particles[this.id];
    }

    if (this.posY > canvas.height - 5) {
      this.vx *= 0.8;
      this.vy *= -0.5;
      this.posY = canvas.height - 5;
    }

    this.vy += gravity;

    c.fillStyle = this.color;
    c.fillRect(this.posX, this.posY, this.width, this.height);
  };

  setInterval(function () {
    c.fillStyle = "rgba(0,0,0,0.4)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particleNum; i++) {
      new Particle();
    }

    for (var i in particles) {
      particles[i].draw();
    }
  }, 30);
}

export function galaxy() {
  //******************************************************
  // Yet Another Particle Engine
  var cos = Math.cos,
    sin = Math.sin,
    sqrt = Math.sqrt,
    abs = Math.abs,
    atan2 = Math.atan2,
    log = Math.log,
    random = Math.random,
    PI = Math.PI,
    sqr = function (v) {
      return v * v;
    },
    particles = [],
    drawScale = 1,
    emitters = [],
    forces = [],
    collidedMass = 0,
    maxParticles = 100,
    emissionRate = 1;

  //-------------------------------------------------------
  // Vectors, and not the kind you put stuff in
  function Vector(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  Vector.prototype = {
    add: function (vector) {
      this.x += vector.x;
      this.y += vector.y;
      this.z += vector.z;
      return this;
    },
    subtract: function (vector) {
      this.x -= vector.x;
      this.y -= vector.y;
      this.z -= vector.z;
      return this;
    },
    multiply: function (another) {
      this.x /= another.x;
      this.y /= another.y;
      this.z /= another.z;
      return this;
    },
    divide: function (another) {
      this.x /= another.x;
      this.y /= another.y;
      this.z /= another.z;
      return this;
    },
    scale: function (factor) {
      this.x *= factor;
      this.y *= factor;
      this.z *= factor;
      return this;
    },
    magnitude: function () {
      return sqrt(sqr(this.x + this.y));
    },
    distance: function (another) {
      return abs(sqrt(sqr(this.x - another.x) + sqr(this.y - another.y)));
    },
    angle: function (angle, magnitude) {
      if (angle && magnitude) return Vector.fromAngle(angle, magnitude);
      return atan2(this.y, this.x);
    },
    clone: function () {
      return new Vector(this.x, this.y, this.z);
    },
    equals: function (another) {
      return (
        this.x === another.x && this.y === another.y && this.z === another.z
      );
    },
    random: function (r) {
      this.x += random() * r * 2 - r;
      this.y += random() * r * 2 - r;
      return this;
    },
  };
  Vector.fromAngle = function (angle, magnitude) {
    return new Vector(
      magnitude * cos(angle),
      magnitude * sin(angle),
      magnitude * sin(angle)
    );
  };

  //******************************************************
  // A thing with mass, position, and velocity - like your mom
  function Particle(pt, vc, ac, mass) {
    this.pos = pt || new Vector(0, 0);
    this.vc = vc || new Vector(0, 0);
    this.ac = ac || new Vector(0, 0);
    this.mass = mass || 1;
    this.alive = true;
  }
  Particle.prototype.move = function () {
    this.vc.add(this.ac);
    this.pos.add(this.vc);
  };
  Particle.prototype.reactToForces = function (fields) {
    var totalAccelerationX = 0;
    var totalAccelerationY = 0;

    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var vectorX = field.pos.x - this.pos.x;
      var vectorY = field.pos.y - this.pos.y;
      var distance = this.pos.distance(field.pos);
      if (distance < 1) field.grow(this);
      if (distance < 100) this.doubleSize = true;
      var force = G(this.forceBetween(field, distance));
      totalAccelerationX += vectorX * force;
      totalAccelerationY += vectorY * force;
    }
    this.ac = new Vector(totalAccelerationX, totalAccelerationY);

    totalAccelerationX = 0;
    totalAccelerationY = 0;
    for (var i = 0; i < particles.length; i++) {
      var field = particles[i];
      if (field === this || !field.alive) continue;
      var vectorX = field.pos.x - this.pos.x;
      var vectorY = field.pos.y - this.pos.y;
      var distance = this.pos.distance(field.pos);
      if (distance < 1) {
        if (this.mass >= field.mass) {
          var massRatio = this.mass / field.mass;
          if (particles.length <= maxParticles && this.mass > 40) {
            this.alive = false;
            this.nova = true;
            collidedMass += this.mass;
          } else this.grow(field);
        } else this.alive = false;
      }
      if (this.alive) {
        var force = G(this.forceBetween(field, distance));
        totalAccelerationX += vectorX * G(force);
        totalAccelerationY += vectorY * G(force);
      }
    }

    var travelDist = this.pos.distance(this.lastPos ? this.lastPos : this.pos);
    this.velocity =
      travelDist - (this.lastDistance ? this.lastDistance : travelDist);
    this.lastDistance = travelDist;
    this.lastPos = this.pos.clone();

    this.ac.add(new Vector(totalAccelerationX, totalAccelerationY));
    this.lastPos = this.pos.clone();
    // if(this.mass > 20) {
    //   var chance = 1 / (this.mass - 20);
    //   if(Math.random()>chance) {
    //     this.supernova = true;
    //     this.supernovaDur = 10;
    //     this.alive = false;
    //     if(particles.length <= maxParticles) collidedMass += this.mass;
    //     delete this.size;
    //   }
    // }
  };
  Particle.prototype.grow = function (another) {
    this.mass += another.mass;
    this.nova = true;
    another.alive = false;
    delete this.size;
  };
  Particle.prototype.breakApart = function (minMass, maxParts) {
    if (!minMass) minMass = 1;
    if (!maxParts) maxParts = 2;
    var remainingMass = this.mass;
    var num = 0;
    while (remainingMass > 0) {
      var np = new Particle(
        this.pos.clone().random(this.mass),
        new Vector(0, 0)
      );
      np.mass = 1 + Math.random() * (remainingMass - 1);
      if (num >= maxParts - 1) np.mass = remainingMass;
      np.mass = np.mass < minMass ? minMass : np.mass;
      remainingMass -= np.mass;
      num++;
    }
    this.nova = true;
    delete this.size;
    this.alive = false;
  };
  Particle.prototype.forceBetween = function (another, distance) {
    var distance = distance ? distance : this.pos.distance(another.pos);
    return (this.mass * another.mass) / sqr(distance);
  };

  //******************************************************
  //This certainly doesn't *sub*mit to particles, that's for sure
  function ParticleEmitter(pos, vc, ang) {
    // to do config options for emitter - random, static, show emitter, emitter color, etc
    this.pos = pos;
    this.vc = vc;
    this.ang = ang || 0.09;
    this.color = "#999";
  }
  ParticleEmitter.prototype.emit = function () {
    var angle = this.vc.angle() + this.ang - Math.random() * this.ang * 2;
    var magnitude = this.vc.magnitude();
    var position = this.pos.clone();
    position.add(
      new Vector(
        ~~(Math.random() * 100 - 50) * drawScale,
        ~~(Math.random() * 100 - 50) * drawScale
      )
    );
    var velocity = Vector.fromAngle(angle, magnitude);
    return new Particle(position, velocity);
  };

  //******************************************************
  // Use it, Luke
  // to do collapse functionality into particle
  function Force(pos, m) {
    this.pos = pos;
    this.mass = m || 100;
  }
  Force.prototype.grow = function (another) {
    this.mass += another.mass;
    this.burp = true;
    another.alive = false;
  };

  function G(data) {
    return 0.00674 * data;
  }

  //******************************************************
  var canvas = document.querySelector("#playground");
  canvas.style.backgroundColor = "#111";
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;

  var renderToCanvas = function (width, height, renderFunction) {
    var buffer = document.createElement("canvas");
    buffer.width = width;
    buffer.height = height;
    renderFunction(buffer.getContext("2d"));
    return buffer;
  };

  maxParticles = 500;
  emissionRate = 1;
  drawScale = 1.3;
  let minParticleSize = 2;
  emitters = [
    //br
    new ParticleEmitter(
      new Vector(
        (canvasWidth / 2) * drawScale + 400,
        (canvasHeight / 2) * drawScale
      ),
      Vector.fromAngle(2, 5),
      1
    ),
    //   // bl
    //   new ParticleEmitter(
    //   new Vector(
    //     canvasWidth / 2 * drawScale - 400,
    //     canvasHeight / 2 * drawScale + 400
    //     ),
    //   Vector.fromAngle(1.5, 1),
    //   1
    // ),
    // tl
    new ParticleEmitter(
      new Vector(
        (canvasWidth / 2) * drawScale - 400,
        (canvasHeight / 2) * drawScale
      ),
      Vector.fromAngle(5, 5),
      1
    ),
    //   // tr
    //   new ParticleEmitter(
    //   new Vector(
    //     canvasWidth / 2 * drawScale + 400,
    //     canvasHeight / 2 * drawScale - 400
    //     ),
    //   Vector.fromAngle(4.5, 1),
    //   1
    // )
  ];
  forces = [
    new Force(
      new Vector((canvasWidth / 2) * drawScale, (canvasHeight / 2) * drawScale),
      1800
    ),
  ];

  function loop() {
    clear();
    update();
    draw();
    queue();
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  var ctr = 0;
  var c = [
    "rgba(255,255,255,",
    "rgba(0,150,255,",
    "rgba(255,255,128,",
    "rgba(255,255,255,",
  ];
  function rndc() {
    return c[~~(Math.random() * c.length - 1)];
  }
  var c2 = "rgba(255,64,32,";
  function addNewParticles() {
    var _emit = function () {
      var ret = 0;
      for (var i = 0; i < emitters.length; i++) {
        for (var j = 0; j < emissionRate; j++) {
          var p = emitters[i].emit();
          p.color =
            ctr % 10 === 0 ? (Math.random() * 5 <= 1 ? c2 : rndc()) : rndc();
          p.mass = ~~(Math.random() * 5);
          particles.push(p);
          ret += p.mass;
          ctr++;
        }
      }
      return ret;
    };
    if (collidedMass !== 0) {
      while (collidedMass !== 0) {
        collidedMass -= _emit();
        collidedMass = collidedMass < 0 ? 0 : collidedMass;
      }
    }
    if (particles.length > maxParticles) return;
    _emit();
  }

  var CLIPOFFSCREEN = 1,
    BUFFEROFFSCREEN = 2,
    LOOPSCREEN = 3;

  function isPositionAliveAndAdjust(particle, check) {
    let boundsX, boundsY;
    return true;
    var pos = particle.pos;
    if (!check) check = BUFFEROFFSCREEN;
    if (check === CLIPOFFSCREEN) {
      return !(
        !particle.alive ||
        pos.x < 0 ||
        pos.x / drawScale > boundsX ||
        pos.y < 0 ||
        pos.y / drawScale > boundsY
      );
    } else if (check === BUFFEROFFSCREEN) {
      return !(
        !particle.alive ||
        pos.x < -boundsX * drawScale ||
        pos.x > 2 * boundsX * drawScale ||
        pos.y < -boundsY * drawScale ||
        pos.y > 2 * boundsY * drawScale
      );
    } else if (check === LOOPSCREEN) {
      if (pos.x < 0) pos.x = boundsX * drawScale;
      if (pos.x / drawScale > boundsX) pos.x = 0;
      if (pos.y < 0) pos.y = boundsY * drawScale;
      if (pos.y / drawScale > boundsY) pos.y = 0;
      return true;
    }
  }

  function plotParticles(boundsX, boundsY) {
    var currentParticles = [];
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      particle.reactToForces(forces);
      if (!isPositionAliveAndAdjust(particle)) continue;
      particle.move();
      currentParticles.push(particle);
    }
  }

  var offscreenCache = {};
  function renderParticle(p) {
    var position = p.pos;
    if (!p.size) p.size = Math.floor(p.mass / 100);

    if (!p.opacity) p.opacity = 0.05;
    if (p.velocity > 0) {
      if (p.opacity <= 0.18) p.opacity += 0.04;
    }
    if (p.opacity > 0.08) p.opacity -= 0.02;

    var actualSize = p.size / drawScale;
    actualSize = actualSize < minParticleSize ? minParticleSize : actualSize;
    if (p.mass > 8) actualSize *= 2;
    if (p.nova) {
      actualSize *= 4;
      p.nova = false;
    }
    if (p.doubleSize) {
      p.doubleSize = false;
      actualSize *= 2;
    }
    // if(p.supernova) {
    //   actualSize *= 6;
    //   opacity = 0.15;
    //   p.supernovaDur = p.supernovaDur - 1;
    //   if(p.supernovaDur === 0)
    //     p.supernova = false;
    // }
    var cacheKey = actualSize + "_" + p.opacity + "_" + p.color;
    var cacheValue = offscreenCache[cacheKey];
    if (!cacheValue) {
      cacheValue = renderToCanvas(actualSize * 32, actualSize * 32, function (
        ofsContext
      ) {
        var opacity = p.opacity;
        var fills = [
          { size: actualSize / 2, opacity: 1 },
          { size: actualSize, opacity: opacity },
          { size: actualSize * 2, opacity: opacity / 2 },
          { size: actualSize * 4, opacity: opacity / 3 },
          { size: actualSize * 8, opacity: opacity / 5 },
          { size: actualSize * 16, opacity: opacity / 16 },
        ];
        ofsContext.beginPath();
        for (var f in fills) {
          f = fills[f];
          ofsContext.fillStyle = p.color + f.opacity + ")";
          ofsContext.arc(
            actualSize * 16,
            actualSize * 16,
            f.size,
            0,
            Math.PI * 2,
            true
          );
          ofsContext.fill();
        }
        ofsContext.closePath();
      });
      offscreenCache[cacheKey] = cacheValue;
    }
    var posX = p.pos.x / drawScale;
    var posY = p.pos.y / drawScale;
    ctx.drawImage(cacheValue, posX, posY);
  }

  var fills = [
    { size: 15, opacity: 1 },
    { size: 25, opacity: 0.3 },
    { size: 50, opacity: 0.1 },
  ];

  function renderScene(ofsContext) {
    for (var i = 0; i < forces.length; i++) {
      var p = forces[i];
      var position = p.pos;
      var opacity = 1;

      ofsContext.beginPath();
      for (var f in fills) {
        f = fills[f];
        var o = p.burp === true ? 1 : f.opacity;
        p.burp = false;
        // ofsContext.fillStyle = 'rgba(255,255,255,' + o + ')';
        // ofsContext.arc(position.x / drawScale,
        //   position.y / drawScale,
        //   f.size / drawScale, 0, Math.PI*2, true);
        // ofsContext.fill();
      }
      ofsContext.closePath();
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      renderParticle(p);
    }
  }

  function draw() {
    renderScene(ctx);
  }

  function update() {
    addNewParticles();
    plotParticles(canvas.width, canvas.height);
  }

  function queue() {
    window.requestAnimationFrame(loop);
  }

  canvas.addEventListener("mousedown", function (e) {});

  canvas.addEventListener("mouseup", function (e) {});

  loop();
}

export function imagination() {
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
}

export function impulse() {
  if (window.Vector2) {
    function main(window, document, vec2) {
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
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
              new Lightning(
                this.center,
                new vec2(this.mouse.x, this.mouse.y),
                5
              )
            );
          }
          if (e.type === "mouseenter") {
            this.bolts.push(
              new Lightning(
                this.center,
                new vec2(this.mouse.x, this.mouse.y),
                5
              )
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
    }
    main(this, document, Vector2);
  }
  // Vector2 library included from GitHub
}

export function impulseplus() {
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

  function press(event, input) {
    pressed = Boolean(input);
    if (pressed) {
      fire(event.clientX, event.clientY);
    }
  }

  // function tryFire() {
  //   if (pressed) {
  //     fire(event.clientX, event.clientY);
  //   }
  // }

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
  canvas.addEventListener("mousedown", (e) => press(e, 1));

  init();
}

export function impulseplusplus() {
  const canvas = document.getElementById("playground");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let particles = [],
    noParticles = 200,
    boxWidth = canvas.width,
    boxHeight = canvas.height,
    particleRadius = 2,
    maxVelocity = 6,
    minDistance = 20,
    maxDistance = 60,
    minDistanceDie = 100,
    maxDistanceDie = 150,
    sourceX = boxWidth / 2,
    sourceY = boxHeight / 2,
    mousePos = { x: sourceX, y: sourceY },
    colors = ["#C5F54A", "#FFB84D", "#496CC3", "#FF564D"],
    connections = new Array(noParticles, noParticles);

  canvas.style.backgroundColor = "#111";

  function initConnections() {
    for (let i = 0; i < noParticles; i++)
      for (let j = 0; j < noParticles; j++) connections[(i, j)] = 0;
  }

  function randomNum(coeff) {
    "use strict";
    if (coeff === "undefined") {
      coeff = 1;
    }
    return Math.random() * coeff;
  }

  function roundRandomNum(coeff) {
    "use strict";
    if (coeff === "undefined") {
      coeff = 1;
    }
    return Math.round(Math.random() * coeff);
  }

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  // Particle "class"
  function Particle() {
    "use strict";
    this.x = boxWidth / 2;
    this.y = boxHeight / 2;
    this.angle = 0;
    this.rgba = "#FFFFFF";
    this.totalDistance = 0;
    this.init = function () {
      this.angle = randomNum(89) + 1;
      this.velocity = roundRandomNum(maxVelocity - 1) + 1;
      this.distanceDie =
        roundRandomNum(maxDistanceDie - minDistanceDie) + minDistanceDie;
      this.colorIndex = roundRandomNum(3) + 1;
      this.rgba = colors[roundRandomNum(3) + 1];
      this.vy =
        Math.sin(this.angle) * this.velocity * (roundRandomNum() ? 1 : -1);
      this.vx =
        Math.cos(this.angle) * this.velocity * (roundRandomNum() ? 1 : -1);
    };
    this.step = function () {
      this.x += this.vx;
      this.y += this.vy;
      this.totalDistance += this.velocity;
      if (
        this.x > boxWidth ||
        this.x < 0 ||
        this.y > boxHeight ||
        this.y < 0 ||
        this.totalDistance > this.distanceDie
      ) {
        this.x = sourceX;
        this.y = sourceY;
        this.totalDistance = 0;
      }
    };
    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, particleRadius, 0, Math.PI * 2, true);
      ctx.fillStyle = this.rgba;
      ctx.fill();
      ctx.closePath();
    };
    this.drawLine = function (otherParticle) {
      var grad = ctx.createLinearGradient(
        this.x,
        this.y,
        otherParticle.x,
        otherParticle.y
      );
      grad.addColorStop(0, "#496CC3");
      grad.addColorStop(1, "#496CC3");
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(otherParticle.x, otherParticle.y);
      ctx.stroke();
      ctx.closePath();
    };
    this.distanceTo = function (otherParticle) {
      return Math.sqrt(
        Math.pow(this.x - otherParticle.x, 2) +
          Math.pow(this.y - otherParticle.y, 2)
      );
    };
  }

  // Render
  function draw() {
    "use strict";
    ctx.clearRect(0, 0, boxWidth, boxHeight);
    ctx.globalCompositeOperation = "lighter";
    initConnections();
    for (let i = 0; i < noParticles; i++) {
      var currentParticle = particles[i];
      // Draw lines
      for (let j = 0; j < noParticles; j++) {
        var otherParticle = particles[j];
        var distance = currentParticle.distanceTo(otherParticle);
        if (distance < maxDistance && distance > minDistance) {
          if (!connections[(j, i)]) {
            currentParticle.drawLine(otherParticle);
            connections[(i, j)] = 1;
          }
        }
      }
      currentParticle.step();
    }
  }

  const requestAnimFrame = (function (callback) {
    "use strict";
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  (function init() {
    "use strict";
    for (let i = 0; i < noParticles; i++) {
      var newParticle = new Particle();
      newParticle.init();
      particles.push(newParticle);
    }
    canvas.addEventListener(
      "mousemove",
      function (event) {
        mousePos = getMousePos(canvas, event);
        sourceX = mousePos.x;
        sourceY = mousePos.y;
      },
      false
    );
  })();

  (function loop() {
    "use strict";
    // debug = document.getElementById('debug-mode').checked;
    draw();
    requestAnimFrame(loop);
  })();
}

export function inferno() {
  let tim;
  const canvas = document.getElementById("playground");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "hsla(11,60%,60%,0.2)";
  baum();

  function baum() {
    var a, b, kai, r, x, y;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(100,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    tim = new Date().getTime() / 30;
    kai = 20;
    ctx.beginPath();
    r = -tim / 19;
    for (a = 0; a < kai; a++) {
      x = Math.cos(r);
      y = Math.sin(r);
      b = (a + 1) / kai;
      r += b;
      twis(x * 50 * (b + 0.3) + 200, y * 50 * (b + 0.3) + 200, b);
      tim *= 1.02;
    }
    ctx.stroke();
    requestAnimationFrame(baum);
  }

  function twis(tx, ty, s) {
    var a, b, c, r, x, y, p, max, bai, bai2;
    max = (s * s * 700) | (0 + 70);
    if (max % 31 === 0) max++;
    bai = 0.2 + Math.sin(tim / 31) * 0.1;
    bai2 = 0.4 - bai;
    p = [];
    r = tim / 13;
    for (a = 0; a < max; a++) {
      x =
        Math.cos(r) +
        Math.cos(r * 7 + tim / 7) * bai +
        Math.cos(r * 5 + tim / 5) * bai2;
      y =
        Math.sin(r) +
        Math.sin(r * 7 + tim / 7) * bai +
        Math.sin(r * 5 + tim / 5) * bai2;
      p.push([x, y]);
      r += (Math.PI * 2) / max;
    }
    b = 0;
    for (a = 0; a < max + 1; a++) {
      ctx.lineTo(p[b][0] * s * 250 + tx, p[b][1] * s * 250 + ty);
      b = (b + 31) % max;
    }
  }
}

export function interstellar() {
  "use strict";
  window.addEventListener("load", function () {
    var canvas = document.getElementById("playground");
    canvas.style.backgroundColor = "black";

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
        Random Number
      ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
        Var
      ********************/

    // canvas
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var X = canvas.width;
    var Y = canvas.height;
    var mouseX = X / 2;
    var mouseY = Y / 2;

    /********************
        Animation
      ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 17);
      };

    /********************
        Shape
      ********************/

    // var
    var shapeNum = 360;
    var shapes = [];
    var circleSplit = 12;
    var angleSplit = 360 / circleSplit;
    var angles = [];
    for (var i = 0; i < circleSplit; i++) {
      angles.push(rand(0, 360));
    }

    function Shape(ctx, x, y, i) {
      this.ctx = ctx;
      this.init(x, y, i);
    }

    Shape.prototype.init = function (x, y, i) {
      this.x = x;
      this.y = y;
      this.c = {
        r: rand(0, 255),
        g: rand(0, 255),
        b: rand(0, 255),
      };
      this.r = 360 - i * 1;
      this.v = Math.random() * 2;
      this.a = 0;
      this.rad = (this.a * Math.PI) / 180;
      this.a2 = i;
      this.rad2 = (this.a2 * Math.PI) / 180;
      this.points = [];
      this.setPoints();
      this.ga = Math.random();
    };

    Shape.prototype.setPoints = function () {
      for (var i = 0; i < circleSplit; i++) {
        var pointX = Math.cos(this.rad) * this.r;
        var pointY = Math.sin(this.rad) * this.r;
        var point = [pointX, pointY, angles[i]];
        this.points.push(point);
        this.a += angleSplit;
        this.rad = (this.a * Math.PI) / 180;
      }
    };

    Shape.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.save();
      ctx.strokeStyle =
        "rgb(" + this.c.r + ", " + this.c.g + ", " + this.c.b + ")";
      ctx.lineWidth = 0.4;
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = this.ga;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rad2);
      ctx.scale(Math.cos(this.rad), Math.sin(this.rad));
      ctx.translate(-this.x, -this.y);
      ctx.beginPath();
      var xav1 =
        (this.points[0][0] + this.points[circleSplit - 1][0]) / 2 + this.x;
      var yav1 =
        (this.points[0][1] + this.points[circleSplit - 1][1]) / 2 + this.y;
      ctx.moveTo(xav1, yav1);
      for (var i = 1; i < this.points.length - 1; i++) {
        var xav2 = (this.points[i][0] + this.points[i + 1][0]) / 2;
        var yav2 = (this.points[i][1] + this.points[i + 1][1]) / 2;
        ctx.quadraticCurveTo(
          this.points[i][0] + this.x,
          this.points[i][1] + this.y,
          xav2 + this.x,
          yav2 + this.y
        );
      }
      ctx.quadraticCurveTo(
        this.points[circleSplit - 1][0] + this.x,
        this.points[circleSplit - 1][1] + this.y,
        xav1,
        yav1
      );
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    Shape.prototype.resize = function () {
      this.x = X / 2;
      this.y = Y / 2;
    };

    Shape.prototype.transform = function () {
      for (var i = 0; i < this.points.length; i++) {
        this.points[i][0] -= Math.sin((this.points[i][2] * Math.PI) / 180);
        this.points[i][1] -= Math.cos((this.points[i][2] * Math.PI) / 180);
        this.points[i][2] -= this.v;
      }
    };

    Shape.prototype.updateParams = function () {
      this.a += 0.2;
      this.rad = (this.a * Math.PI) / 180;
      this.a2 += 0.1;
      this.rad2 = (this.a2 * Math.PI) / 180;
    };

    Shape.prototype.render = function () {
      this.transform();
      this.updateParams();
      this.draw();
    };

    for (var i = 0; i < shapeNum; i++) {
      var s = new Shape(ctx, X / 2, Y / 2, i);
      shapes.push(s);
    }

    /********************
        ChangeColor
      ********************/

    function changeColor() {
      var time = rand(1000, 5000);
      var r = rand(0, 255);
      var g = rand(0, 255);
      var b = rand(0, 255);
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].c = {
          r: r,
          g: g,
          b: b,
        };
      }
      setTimeout(changeColor, time);
    }

    changeColor();

    /********************
        Render
      ********************/

    function render() {
      ctx.clearRect(0, 0, X, Y);
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].render(i);
      }
      requestAnimationFrame(render);
    }

    render();

    /********************
        Event
      ********************/

    function onResize() {
      X = canvas.width;
      Y = canvas.height;
      for (var i = 0; i < shapes.length; i++) {
        shapes[i].resize();
      }
    }

    window.addEventListener("resize", function () {
      onResize();
    });
  });
  // Author
  console.log(
    "File Name / interstellar.js\nCreated Date / July 03, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo"
  );
}

export function matrix() {
  const c = document.getElementById("playground");
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  var chinese =
    "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
  chinese = chinese.split("");
  const font_size = 10;
  const columns = c.width / font_size;
  let drops = [];
  for (let x = 0; x < columns; x++) drops[x] = 1;

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#0F0";
    ctx.font = font_size + "px arial";
    for (let i = 0; i < drops.length; i++) {
      const text = chinese[Math.floor(Math.random() * chinese.length)];
      ctx.fillText(text, i * font_size, drops[i] * font_size);
      if (drops[i] * font_size > c.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

export function network() {
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
}

export function neuralcore() {
  var c, ctx, w, h, cx, cy, branches, startHue, tick;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function Branch(hue, x, y, angle, vel) {
    var move = 15;
    this.x = x + rand(-move, move);
    this.y = y + rand(-move, move);
    this.points = [];
    this.angle = angle != undefined ? angle : rand(0, Math.PI * 1);
    this.vel = vel != undefined ? vel : rand(-4, 4);
    this.spread = 0;
    this.tick = 0;
    this.hue = hue != undefined ? hue : 200;
    this.life = 1;
    this.decay = 0.0015;
    this.dead = false;

    this.points.push({
      x: this.x,
      y: this.y,
    });
  }

  Branch.prototype.step = function (i) {
    this.life -= this.decay;
    if (this.life <= 0) {
      this.dead = true;
    }

    if (!this.dead) {
      var lastPoint = this.points[this.points.length - 1];
      this.points.push({
        x: lastPoint.x + Math.cos(this.angle) * this.vel,
        y: lastPoint.y + Math.sin(this.angle) * this.vel,
      });
      this.angle += rand(-this.spread, this.spread);
      this.vel *= 0.99;
      this.spread = this.vel * 0.04;
      this.tick++;
      this.hue += 0.3;
    } else {
      branches.splice(i, 1);
    }
  };

  Branch.prototype.draw = function () {
    if (!this.points.length || this.dead) {
      return false;
    }

    var length = this.points.length,
      i = length - 1,
      point = this.points[i],
      lastPoint = this.points[i - randInt(5, 100)];
    //jitter = 8;
    if (lastPoint) {
      var jitter = 2 + this.life * 6;
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(
        point.x + rand(-jitter, jitter),
        point.y + rand(-jitter, jitter)
      );
      ctx.lineWidth = 1;
      var alpha = this.life * 0.075;
      ctx.strokeStyle =
        "hsla(" + (this.hue + rand(-10, 10)) + ", 70%, 40%, " + alpha + ")";
      ctx.stroke();
    }
  };

  function init() {
    c = document.getElementById("playground");
    c.style.backgroundColor = "#111";
    ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    startHue = 220;
    branches = [];
    reset();
    loop();
  }

  function reset() {
    w = c.width;
    h = c.height;
    cx = w / 2;
    cy = h / 2;
    branches.length = 0;
    c.width = w;
    c.height = h;
    tick = 0;

    for (var i = 0; i < 500; i++) {
      branches.push(new Branch(startHue, cx, cy));
    }
  }

  function step() {
    var i = branches.length;
    while (i--) {
      branches[i].step(i);
    }
    tick++;
  }

  function draw() {
    var i = branches.length;
    if (tick < 450) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.002;
      ctx.translate(cx, cy);
      var scale = 1 + tick * 0.00025;
      ctx.scale(scale, scale);
      ctx.translate(-cx, -cy);
      ctx.drawImage(c, rand(-150, 150), rand(-150, 150));
      ctx.restore();
    }

    ctx.globalCompositeOperation = "lighter";
    while (i--) {
      branches[i].draw();
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    step();
    draw();
    step();
    draw();
  }

  window.addEventListener("resize", reset);
  window.addEventListener("click", function () {
    startHue += 60;
    reset();
  });

  init();
}

export function painter() {
  var SCREEN_WIDTH = window.innerWidth;
  var SCREEN_HEIGHT = window.innerHeight;
  var RADIUS = 110;
  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 1.5;

  // The number of particles that are used to generate the trail
  var QUANTITY = 25;
  var canvas;
  var context;
  var particles;

  var mouseX = window.innerWidth - SCREEN_WIDTH;
  var mouseY = window.innerHeight - SCREEN_HEIGHT;
  var mouseIsDown = false;

  init();

  function init() {
    canvas = document.getElementById("playground");
    canvas.style.backgroundColor = "black";

    if (canvas && canvas.getContext) {
      context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Register event listeners
      document.addEventListener("mousemove", documentMouseMoveHandler, false);
      document.addEventListener("mousedown", documentMouseDownHandler, false);
      document.addEventListener("mouseup", documentMouseUpHandler, false);
      canvas.addEventListener("touchstart", canvasTouchStartHandler, false);
      canvas.addEventListener("touchmove", canvasTouchMoveHandler, false);
      window.addEventListener("resize", windowResizeHandler, false);

      createParticles();

      windowResizeHandler();

      setInterval(loop, 1000 / 60);
    }
  }

  function createParticles() {
    particles = [];

    for (var i = 0; i < QUANTITY; i++) {
      var particle = {
        position: { x: mouseX, y: mouseY },
        shift: { x: mouseX, y: mouseY },
        size: 1,
        angle: 0,
        speed: 0.01 + Math.random() * 0.04,
        targetSize: 1,
        fillColor:
          "#" + ((Math.random() * 0x404040 + 0xaaaaaa) | 0).toString(16),
        orbit: RADIUS * 0.5 + RADIUS * 0.5 * Math.random(),
      };

      particles.push(particle);
    }
  }

  function documentMouseMoveHandler(event) {
    mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
    mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
  }

  function documentMouseDownHandler(event) {
    mouseIsDown = true;
  }

  function documentMouseUpHandler(event) {
    mouseIsDown = false;
  }

  function canvasTouchStartHandler(event) {
    if (event.touches.length == 1) {
      event.preventDefault();

      mouseX =
        event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
      mouseY =
        event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
    }
  }

  function canvasTouchMoveHandler(event) {
    if (event.touches.length == 1) {
      event.preventDefault();

      mouseX =
        event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * 0.5;
      mouseY =
        event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * 0.5;
    }
  }

  function windowResizeHandler() {
    //SCREEN_WIDTH = window.innerWidth;
    //SCREEN_HEIGHT = window.innerHeight;

    canvas.style.position = "absolute";
    canvas.style.left = (window.innerWidth - SCREEN_WIDTH) * 0.5 + "px";
    canvas.style.top = (window.innerHeight - SCREEN_HEIGHT) * 0.5 + "px";
  }

  function loop() {
    if (mouseIsDown) {
      // Scale upward to the max scale
      RADIUS_SCALE += (RADIUS_SCALE_MAX - RADIUS_SCALE) * 0.02;
    } else {
      // Scale downward to the min scale
      RADIUS_SCALE -= (RADIUS_SCALE - RADIUS_SCALE_MIN) * 0.02;
    }

    RADIUS_SCALE = Math.min(RADIUS_SCALE, RADIUS_SCALE_MAX);

    // Fade out the lines slowly by drawing a rectangle over the entire canvas
    context.fillStyle = "rgba(0,0,0,0.01)";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (let i = 0, len = particles.length; i < len; i++) {
      var particle = particles[i];

      var lp = { x: particle.position.x, y: particle.position.y };

      // Offset the angle to keep the spin going
      particle.angle += particle.speed;

      // Follow mouse with some lag
      particle.shift.x += (mouseX - particle.shift.x) * particle.speed;
      particle.shift.y += (mouseY - particle.shift.y) * particle.speed;

      // Apply position
      particle.position.x =
        particle.shift.x +
        Math.cos(i + particle.angle) * (particle.orbit * RADIUS_SCALE);
      particle.position.y =
        particle.shift.y +
        Math.sin(i + particle.angle) * (particle.orbit * RADIUS_SCALE);

      // Limit to screen bounds
      particle.position.x = Math.max(
        Math.min(particle.position.x, SCREEN_WIDTH),
        0
      );
      particle.position.y = Math.max(
        Math.min(particle.position.y, SCREEN_HEIGHT),
        0
      );

      particle.size += (particle.targetSize - particle.size) * 0.05;

      // If we're at the target size, set a new one. Think of it like a regular day at work.
      if (Math.round(particle.size) == Math.round(particle.targetSize)) {
        particle.targetSize = 1 + Math.random() * 7;
      }

      context.beginPath();
      context.fillStyle = particle.fillColor;
      context.strokeStyle = particle.fillColor;
      context.lineWidth = particle.size;
      context.moveTo(lp.x, lp.y);
      context.lineTo(particle.position.x, particle.position.y);
      context.stroke();
      context.arc(
        particle.position.x,
        particle.position.y,
        particle.size / 2,
        0,
        Math.PI * 2,
        true
      );
      context.fill();
    }
  }
}

export function particles() {
  var canvas = document.getElementById("playground"),
    can_w = parseInt(canvas.getAttribute("width")),
    can_h = parseInt(canvas.getAttribute("height")),
    ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.style.backgroundColor = "#111";

  var ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      alpha: 1,
      phase: 0,
    },
    ball_color = {
      r: 207,
      g: 255,
      b: 4,
    },
    R = 2,
    balls = [],
    alpha_f = 0.03,
    alpha_phase = 0,
    // Line
    link_line_width = 0.8,
    dis_limit = 260,
    add_mouse_point = true,
    mouse_in = false,
    mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: "mouse",
    };

  // Random speed
  function getRandomSpeed(pos) {
    var min = -1,
      max = 1;
    switch (pos) {
      case "top":
        return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
        break;
      case "right":
        return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
        break;
      case "bottom":
        return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
        break;
      case "left":
        return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
        break;
      default:
        return;
        break;
    }
  }
  function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
  }
  // Random Ball
  function getRandomBall() {
    var pos = randomArrayItem(["top", "right", "bottom", "left"]);
    switch (pos) {
      case "top":
        return {
          x: randomSidePos(can_w),
          y: -R,
          vx: getRandomSpeed("top")[0],
          vy: getRandomSpeed("top")[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
        break;
      case "right":
        return {
          x: can_w + R,
          y: randomSidePos(can_h),
          vx: getRandomSpeed("right")[0],
          vy: getRandomSpeed("right")[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
        break;
      case "bottom":
        return {
          x: randomSidePos(can_w),
          y: can_h + R,
          vx: getRandomSpeed("bottom")[0],
          vy: getRandomSpeed("bottom")[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
        break;
      case "left":
        return {
          x: -R,
          y: randomSidePos(can_h),
          vx: getRandomSpeed("left")[0],
          vy: getRandomSpeed("left")[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
        break;
    }
  }
  function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
  }

  // Draw Ball
  function renderBalls() {
    Array.prototype.forEach.call(balls, function (b) {
      if (!b.hasOwnProperty("type")) {
        ctx.fillStyle =
          "rgba(" +
          ball_color.r +
          "," +
          ball_color.g +
          "," +
          ball_color.b +
          "," +
          b.alpha +
          ")";
        ctx.beginPath();
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  // Update balls
  function updateBalls() {
    var new_balls = [];
    Array.prototype.forEach.call(balls, function (b) {
      b.x += b.vx;
      b.y += b.vy;

      if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
        new_balls.push(b);
      }

      // alpha change
      b.phase += alpha_f;
      b.alpha = Math.abs(Math.cos(b.phase));
    });

    balls = new_balls.slice(0);
  }

  // loop alpha
  function loopAlphaInf() {}

  // Draw lines
  function renderLines() {
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
      for (var j = i + 1; j < balls.length; j++) {
        fraction = getDisOf(balls[i], balls[j]) / dis_limit;

        if (fraction < 1) {
          alpha = (1 - fraction).toString();

          ctx.strokeStyle = "rgba(150,150,150," + alpha + ")";
          ctx.lineWidth = link_line_width;

          ctx.beginPath();
          ctx.moveTo(balls[i].x, balls[i].y);
          ctx.lineTo(balls[j].x, balls[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  // calculate distance between two points
  function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
      delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
  }

  // add balls if there a little balls
  function addBallIfy() {
    if (balls.length < 20) {
      balls.push(getRandomBall());
    }
  }

  // Render
  function render() {
    ctx.clearRect(0, 0, can_w, can_h);

    renderBalls();

    renderLines();

    updateBalls();

    addBallIfy();

    window.requestAnimationFrame(render);
  }

  // Init Balls
  function initBalls(num) {
    for (var i = 1; i <= num; i++) {
      balls.push({
        x: randomSidePos(can_w),
        y: randomSidePos(can_h),
        vx: getRandomSpeed("top")[0],
        vy: getRandomSpeed("top")[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      });
    }
  }
  // Init Canvas
  function initCanvas() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);

    can_w = parseInt(canvas.getAttribute("width"));
    can_h = parseInt(canvas.getAttribute("height"));
  }
  window.addEventListener("resize", function (e) {
    initCanvas();
  });

  function goMovie() {
    initCanvas();
    initBalls(30);
    window.requestAnimationFrame(render);
  }
  goMovie();

  // Mouse effect
  canvas.addEventListener("mouseenter", function () {
    mouse_in = true;
    balls.push(mouse_ball);
  });
  canvas.addEventListener("mouseleave", function () {
    mouse_in = false;
    var new_balls = [];
    Array.prototype.forEach.call(balls, function (b) {
      if (!b.hasOwnProperty("type")) {
        new_balls.push(b);
      }
    });
    balls = new_balls.slice(0);
  });
  canvas.addEventListener("mousemove", function (e) {
    var e = e || window.event;
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
  });
}

export function parts() {
  // modified version of random-normal
  function normalPool(o) {
    var r = 0;
    do {
      var a = Math.round({ mean: o.mean, dev: o.dev });
      if (a < o.pool.length && a >= 0) return o.pool[a];
      r++;
    } while (r < 100);
  }
  function randomNormal(o) {
    if (
      ((o = Object.assign({ mean: 0, dev: 1, pool: [] }, o)),
      Array.isArray(o.pool) && o.pool.length > 0)
    )
      return normalPool(o);
    var r,
      a,
      n,
      e,
      l = o.mean,
      t = o.dev;
    do {
      r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n;
    } while (r >= 1);
    return (e = a * Math.sqrt((-2 * Math.log(r)) / r)), t * e + l;
  }

  const NUM_PARTICLES = 600;
  const PARTICLE_SIZE = 0.5; // View heights
  const SPEED = 20000; // Milliseconds

  let particles = [];

  function rand(low, high) {
    return Math.random() * (high - low) + low;
  }

  function createParticle(canvas) {
    const colour = {
      r: 255,
      g: randomNormal({ mean: 125, dev: 20 }),
      b: 50,
      a: rand(0, 1),
    };
    return {
      x: -2,
      y: -2,
      diameter: Math.max(
        0,
        randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })
      ),
      duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
      amplitude: randomNormal({ mean: 16, dev: 2 }),
      offsetY: randomNormal({ mean: 0, dev: 10 }),
      arc: Math.PI * 2,
      startTime: performance.now() - rand(0, SPEED),
      colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
    };
  }

  function moveParticle(particle, canvas, time) {
    const progress =
      ((time - particle.startTime) % particle.duration) / particle.duration;
    return {
      ...particle,
      x: progress,
      y:
        Math.sin(progress * particle.arc) * particle.amplitude +
        particle.offsetY,
    };
  }

  function drawParticle(particle, canvas, ctx) {
    canvas = document.getElementById("playground");
    const vh = canvas.height / 100;

    ctx.fillStyle = particle.colour;
    ctx.beginPath();
    ctx.ellipse(
      particle.x * canvas.width,
      particle.y * vh + canvas.height / 2,
      particle.diameter * vh,
      particle.diameter * vh,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  function draw(time, canvas, ctx) {
    // Move particles
    particles.forEach((particle, index) => {
      particles[index] = moveParticle(particle, canvas, time);
    });

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the particles
    particles.forEach((particle) => {
      drawParticle(particle, canvas, ctx);
    });

    // Schedule next frame
    requestAnimationFrame((time) => draw(time, canvas, ctx));
  }

  function initializeCanvas() {
    let canvas = document.getElementById("playground");
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    canvas.style.background = `
      linear-gradient(
        to bottom,
        rgb(10, 10, 50) 0%,
        rgb(60, 10, 60) 100%
      )
    `;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.addEventListener("resize", () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx = canvas.getContext("2d");
    });

    return [canvas, ctx];
  }

  function startAnimation() {
    const [canvas, ctx] = initializeCanvas();

    // Create a bunch of particles
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(createParticle(canvas));
    }

    requestAnimationFrame((time) => draw(time, canvas, ctx));
  }

  // Start animation when document is loaded
  (function () {
    if (document.readystate !== "loading") {
      startAnimation();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        startAnimation();
      });
    }
  })();
}

export function photons() {
  "use strict";
  window.addEventListener("load", function () {
    var canvas = document.getElementById("playground");
    canvas.style.backgroundColor = "black";

    if (!canvas || !canvas.getContext) {
      return false;
    }

    /********************
        Random Number
      ********************/

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /********************
        Var
      ********************/

    // canvas
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var X = canvas.width;
    var Y = canvas.height;
    var flg = true;
    var mouseX = X / 2;
    var mouseY = Y / 2;

    /********************
        Animation
      ********************/

    window.requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (cb) {
        setTimeout(cb, 17);
      };

    /********************
        Particle
      ********************/

    var particleNum = 1000;
    var particles = [];
    var maxParticles = 1000;

    if (X < 768) {
      particleNum = 500;
    }

    function Particle(ctx, x, y, r) {
      this.ctx = ctx;
      this.init(x, y, r);
    }

    Particle.prototype.init = function (x, y, r) {
      this.x = x;
      this.y = y;
      this.x1 = this.x;
      this.y1 = this.y;
      this.r = r;
      this.s = Math.random();
      this.a = rand(0, 360);
      this.rad = (this.a * Math.PI) / 180;
      this.z = Math.random() + 1;
      this.v = {
        x: 0,
        y: 0,
      };
      this.c = {
        r: rand(0, 0),
        g: rand(255, 255),
        b: rand(255, 255),
      };
    };

    Particle.prototype.updatePosition = function () {
      if (flg === false) {
        var x = this.x - this.x1;
        var y = this.y - this.y1;
        var d = x * x + y * y;
        var newDist = Math.sqrt(d);
        this.v.x = (x / newDist) * (1 + this.s);
        this.v.y = (y / newDist) * (1 + this.s);
        this.x = Math.sin(this.rad) * 2 + this.x;
        this.y = Math.cos(this.rad) * 2 + this.y;
        this.x -= this.v.x;
        this.y -= this.v.y;
      } else {
        var x = this.x - mouseX;
        var y = this.y - mouseY;
        var d = x * x + y * y;
        var newDist = Math.sqrt(d);
        this.v.x = (x / newDist) * (1 + this.s);
        this.v.y = (y / newDist) * (1 + this.s);
        this.x = Math.sin(this.rad) * this.z + this.x;
        this.y = Math.cos(this.rad) * this.z + this.y;
        this.x -= this.v.x;
        this.y -= this.v.y;
        if (Math.abs(this.x - mouseX) < 5 && Math.abs(this.y - mouseY) < 5) {
          this.x = rand(0, X);
          this.y = rand(0, Y);
          this.s = Math.random();
        }
      }
    };

    Particle.prototype.updateParams = function () {
      this.s += 0.001;
      this.rad += 0.01;
    };

    Particle.prototype.resize = function () {
      this.x = rand(0, X);
      this.y = rand(0, Y);
      this.x1 = this.x;
      this.y1 = this.y;
    };

    Particle.prototype.draw = function () {
      var ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle =
        "rgb(" + this.c.r + ", " + this.c.g + ", " + this.c.b + ")";
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.restore();
    };

    Particle.prototype.render = function () {
      this.updatePosition();
      this.updateParams();
      this.draw();
    };

    for (var i = 0; i < particleNum; i++) {
      var particle = new Particle(ctx, rand(0, X), rand(0, Y), rand(1, 2));
      particles.push(particle);
    }

    function changeColor() {
      var time = rand(1000, 5000);
      var r = rand(0, 255);
      var g = rand(0, 255);
      var b = rand(0, 255);
      for (var i = 0; i < particles.length; i++) {
        particles[i].c = {
          r: r,
          g: g,
          b: b,
        };
      }
      setTimeout(changeColor, time);
    }

    changeColor();

    /********************
        Render
      ********************/

    function render() {
      //ctx.clearRect(0, 0, X, Y);
      ctx.globalCompositeOperation = "darken";
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, X, Y);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      for (var i = 0; i < particles.length; i++) {
        particles[i].render(i);
      }
      //addParticle();
      requestAnimationFrame(render);
    }

    render();

    /********************
        Event
      ********************/

    function onResize() {
      X = canvas.width;
      Y = canvas.height;
      for (var i = 0; i < particles.length; i++) {
        particles[i].resize();
      }
    }

    window.addEventListener("resize", function () {
      onResize();
    });

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    canvas.addEventListener(
      "click",
      function () {
        flg === false ? (flg = true) : (flg = false);
      },
      false
    );

    window.addEventListener(
      "touchmove",
      function (e) {
        var touch = e.targetTouches[0];
        mouseX = touch.pageX;
        mouseY = touch.pageY;
        //flg === false ? flg = true : flg = false;
      },
      false
    );
  });
  // Author
  console.log(
    "File Name / simulationVer1.js\nCreated Date / April 22, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo"
  );
}

export function rain() {
  const canvas = document.getElementById("playground");
  canvas.style.backgroundColor = "#061928";

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    ctx.strokeStyle = "rgba(174,194,224,0.5)";
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    const init = [];
    const maxParts = 1000;

    for (let a = 0; a < maxParts; a++) {
      init.push({
        x: Math.random() * w,
        y: Math.random() * h,
        l: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10,
      });
    }

    let particles = [];
    for (let b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let c = 0; c < particles.length; c++) {
        let p = particles[c];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        ctx.stroke();
      }
      move();
    }

    function move() {
      for (let b = 0; b < particles.length; b++) {
        let p = particles[b];
        p.x += p.xs;
        p.y += p.ys;
        if (p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      }
    }
    setInterval(draw, 30);
  }
}

export function rainbow() {
  let c = document.getElementById("playground");
  var w = c.width,
    h = c.height,
    ctx = c.getContext("2d"),
    minDist = 10,
    maxDist = 30,
    initialWidth = 10,
    maxLines = 100,
    initialLines = 4,
    speed = 5,
    lines = [],
    frame = 0,
    timeSinceLast = 0,
    dirs = [
      // straight x, y velocity
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
      [0.7, 0.7],
      [0.7, -0.7],
      [-0.7, 0.7],
      [-0.7, -0.7],
    ],
    starter = {
      // starting parent line, just a pseudo line

      x: w / 2,
      y: h / 2,
      vx: 0,
      vy: 0,
      width: initialWidth,
    };
  ctx.clearRect(0, 0, c.width, c.height);

  function init() {
    lines.length = 0;

    for (var i = 0; i < initialLines; ++i) lines.push(new Line(starter));

    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, w, h);

    // if you want a cookie ;)
    // ctx.lineCap = 'round';
  }
  function getColor(x) {
    return "hsl( hue, 80%, 50% )".replace("hue", (x / w) * 360 + frame);
  }
  function anim() {
    window.requestAnimationFrame(anim);

    ++frame;

    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(0,0,0,.02)";
    ctx.fillRect(0, 0, w, h);
    ctx.shadowBlur = 0.5;

    for (var i = 0; i < lines.length; ++i)
      if (lines[i].step()) {
        // if true it's dead

        lines.splice(i, 1);
        --i;
      }

    // spawn new

    ++timeSinceLast;

    if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < 0.5) {
      timeSinceLast = 0;

      lines.push(new Line(starter));

      // cover the middle;
      ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
      ctx.beginPath();
      ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function Line(parent) {
    this.x = parent.x | 0;
    this.y = parent.y | 0;
    this.width = parent.width / 1.25;

    do {
      var dir = dirs[(Math.random() * dirs.length) | 0];
      this.vx = dir[0];
      this.vy = dir[1];
    } while (
      (this.vx === -parent.vx && this.vy === -parent.vy) ||
      (this.vx === parent.vx && this.vy === parent.vy)
    );

    this.vx *= speed;
    this.vy *= speed;

    this.dist = Math.random() * (maxDist - minDist) + minDist;
  }
  Line.prototype.step = function () {
    var dead = false;

    var prevX = this.x,
      prevY = this.y;

    this.x += this.vx;
    this.y += this.vy;

    --this.dist;

    // kill if out of screen
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) dead = true;

    // make children :D
    if (this.dist <= 0 && this.width > 1) {
      // keep yo self, sometimes
      this.dist = Math.random() * (maxDist - minDist) + minDist;

      // add 2 children
      if (lines.length < maxLines) lines.push(new Line(this));
      if (lines.length < maxLines && Math.random() < 0.5)
        lines.push(new Line(this));

      // kill the poor thing
      if (Math.random() < 0.2) dead = true;
    }

    ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
    ctx.beginPath();
    ctx.lineWidth = this.width;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(prevX, prevY);
    ctx.stroke();

    if (dead) return true;
  };

  init();
  anim();

  window.addEventListener("resize", function () {
    w = c.width;
    h = c.height;
    starter.x = w / 2;
    starter.y = h / 2;

    init();
  });
}

export function smoke() {
  const canvas = document.getElementById("playground");

  let config = {
    TEXTURE_DOWNSAMPLE: 1,
    DENSITY_DISSIPATION: 0.98,
    VELOCITY_DISSIPATION: 0.99,
    PRESSURE_DISSIPATION: 0.8,
    PRESSURE_ITERATIONS: 25,
    CURL: 30,
    SPLAT_RADIUS: 0.005,
  };

  let pointers = [];
  let splatStack = [];

  const { gl, ext } = getWebGLContext(canvas);

  function getWebGLContext(canvas) {
    const params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
    };

    let gl = canvas.getContext("webgl2", params);
    const isWebGL2 = !!gl;
    if (!isWebGL2)
      gl =
        canvas.getContext("webgl", params) ||
        canvas.getContext("experimental-webgl", params);

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2
      ? gl.HALF_FLOAT
      : halfFloat.HALF_FLOAT_OES;
    let formatRGBA;
    let formatRG;
    let formatR;

    if (isWebGL2) {
      formatRGBA = getSupportedFormat(
        gl,
        gl.RGBA16F,
        gl.RGBA,
        halfFloatTexType
      );
      formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    } else {
      formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    return {
      gl,
      ext: {
        formatRGBA,
        formatRG,
        formatR,
        halfFloatTexType,
        supportLinearFiltering,
      },
    };
  }

  function getSupportedFormat(gl, internalFormat, format, type) {
    if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
      switch (internalFormat) {
        case gl.R16F:
          return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        case gl.RG16F:
          return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        default:
          return null;
      }
    }

    return {
      internalFormat,
      format,
    };
  }

  function supportRenderTextureFormat(gl, internalFormat, format, type) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      4,
      4,
      0,
      format,
      type,
      null
    );

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE) return false;
    return true;
  }

  function pointerPrototype() {
    this.id = -1;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.down = false;
    this.moved = false;
    this.color = [30, 0, 300];
  }

  pointers.push(new pointerPrototype());

  class GLProgram {
    constructor(vertexShader, fragmentShader) {
      this.uniforms = {};
      this.program = gl.createProgram();

      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
        throw gl.getProgramInfoLog(this.program);

      const uniformCount = gl.getProgramParameter(
        this.program,
        gl.ACTIVE_UNIFORMS
      );
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(this.program, i).name;
        this.uniforms[uniformName] = gl.getUniformLocation(
          this.program,
          uniformName
        );
      }
    }

    bind() {
      gl.useProgram(this.program);
    }
  }

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw gl.getShaderInfoLog(shader);

    return shader;
  }

  const baseVertexShader = compileShader(
    gl.VERTEX_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
  `
  );

  const clearShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;

      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
  `
  );

  const displayShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
          gl_FragColor = texture2D(uTexture, vUv);
      }
  `
  );

  const splatShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
  `
  );

  const advectionManualFilteringShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (in sampler2D sam, in vec2 p) {
          vec4 st;
          st.xy = floor(p - 0.5) + 0.5;
          st.zw = st.xy + 1.0;
          vec4 uv = st * texelSize.xyxy;
          vec4 a = texture2D(sam, uv.xy);
          vec4 b = texture2D(sam, uv.zy);
          vec4 c = texture2D(sam, uv.xw);
          vec4 d = texture2D(sam, uv.zw);
          vec2 f = p - st.xy;
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main () {
          vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
          gl_FragColor = dissipation * bilerp(uSource, coord);
          gl_FragColor.a = 1.0;
      }
  `
  );

  const advectionShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      void main () {
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          gl_FragColor = dissipation * texture2D(uSource, coord);
          gl_FragColor.a = 1.0;
      }
  `
  );

  const divergenceShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      vec2 sampleVelocity (in vec2 uv) {
          vec2 multiplier = vec2(1.0, 1.0);
          if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
          if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
          if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
          if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
          return multiplier * texture2D(uVelocity, uv).xy;
      }

      void main () {
          float L = sampleVelocity(vL).x;
          float R = sampleVelocity(vR).x;
          float T = sampleVelocity(vT).y;
          float B = sampleVelocity(vB).y;
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
  `
  );

  const curlShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
      }
  `
  );

  const vorticityShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = vec2(abs(T) - abs(B), 0.0);
          force *= 1.0 / length(force + 0.00001) * curl * C;
          vec2 vel = texture2D(uVelocity, vUv).xy;
          gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
  `
  );

  const pressureShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      vec2 boundary (in vec2 uv) {
          uv = min(max(uv, 0.0), 1.0);
          return uv;
      }

      void main () {
          float L = texture2D(uPressure, boundary(vL)).x;
          float R = texture2D(uPressure, boundary(vR)).x;
          float T = texture2D(uPressure, boundary(vT)).x;
          float B = texture2D(uPressure, boundary(vB)).x;
          float C = texture2D(uPressure, vUv).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
  `
  );

  const gradientSubtractShader = compileShader(
    gl.FRAGMENT_SHADER,
    `
      precision highp float;
      precision mediump sampler2D;

      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      vec2 boundary (in vec2 uv) {
          uv = min(max(uv, 0.0), 1.0);
          return uv;
      }

      void main () {
          float L = texture2D(uPressure, boundary(vL)).x;
          float R = texture2D(uPressure, boundary(vR)).x;
          float T = texture2D(uPressure, boundary(vT)).x;
          float B = texture2D(uPressure, boundary(vB)).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
  `
  );

  let textureWidth;
  let textureHeight;
  let density;
  let velocity;
  let divergence;
  let curl;
  let pressure;
  initFramebuffers();

  const clearProgram = new GLProgram(baseVertexShader, clearShader);
  const displayProgram = new GLProgram(baseVertexShader, displayShader);
  const splatProgram = new GLProgram(baseVertexShader, splatShader);
  const advectionProgram = new GLProgram(
    baseVertexShader,
    ext.supportLinearFiltering
      ? advectionShader
      : advectionManualFilteringShader
  );
  const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
  const curlProgram = new GLProgram(baseVertexShader, curlShader);
  const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
  const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
  const gradienSubtractProgram = new GLProgram(
    baseVertexShader,
    gradientSubtractShader
  );

  function initFramebuffers() {
    textureWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
    textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const rg = ext.formatRG;
    const r = ext.formatR;

    density = createDoubleFBO(
      2,
      textureWidth,
      textureHeight,
      rgba.internalFormat,
      rgba.format,
      texType,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
    velocity = createDoubleFBO(
      0,
      textureWidth,
      textureHeight,
      rg.internalFormat,
      rg.format,
      texType,
      ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
    );
    divergence = createFBO(
      4,
      textureWidth,
      textureHeight,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    curl = createFBO(
      5,
      textureWidth,
      textureHeight,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
    pressure = createDoubleFBO(
      6,
      textureWidth,
      textureHeight,
      r.internalFormat,
      r.format,
      texType,
      gl.NEAREST
    );
  }

  function createFBO(texId, w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0 + texId);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      internalFormat,
      w,
      h,
      0,
      format,
      type,
      null
    );

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture,
      0
    );
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return [texture, fbo, texId];
  }

  function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

    return {
      get read() {
        return fbo1;
      },
      get write() {
        return fbo2;
      },
      swap() {
        let temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  }

  const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (destination) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  })();

  let lastTime = Date.now();
  multipleSplats(parseInt(Math.random() * 20) + 5);
  update();

  function update() {
    resizeCanvas();

    const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
    lastTime = Date.now();

    gl.viewport(0, 0, textureWidth, textureHeight);

    if (splatStack.length > 0) multipleSplats(splatStack.pop());

    advectionProgram.bind();
    gl.uniform2f(
      advectionProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read[2]);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(
      advectionProgram.uniforms.dissipation,
      config.VELOCITY_DISSIPATION
    );
    blit(velocity.write[1]);
    velocity.swap();

    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read[2]);
    gl.uniform1i(advectionProgram.uniforms.uSource, density.read[2]);
    gl.uniform1f(
      advectionProgram.uniforms.dissipation,
      config.DENSITY_DISSIPATION
    );
    blit(density.write[1]);
    density.swap();

    for (let i = 0; i < pointers.length; i++) {
      const pointer = pointers[i];
      if (pointer.moved) {
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
        pointer.moved = false;
      }
    }

    curlProgram.bind();
    gl.uniform2f(
      curlProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read[2]);
    blit(curl[1]);

    vorticityProgram.bind();
    gl.uniform2f(
      vorticityProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read[2]);
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write[1]);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(
      divergenceProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read[2]);
    blit(divergence[1]);

    clearProgram.bind();
    let pressureTexId = pressure.read[2];
    gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
    gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
    blit(pressure.write[1]);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(
      pressureProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
    pressureTexId = pressure.read[2];
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
    gl.activeTexture(gl.TEXTURE0 + pressureTexId);
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
      blit(pressure.write[1]);
      pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(
      gradienSubtractProgram.uniforms.texelSize,
      1.0 / textureWidth,
      1.0 / textureHeight
    );
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read[2]);
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read[2]);
    blit(velocity.write[1]);
    velocity.swap();

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    displayProgram.bind();
    gl.uniform1i(displayProgram.uniforms.uTexture, density.read[2]);
    blit(null);

    requestAnimationFrame(update);
  }

  function splat(x, y, dx, dy, color) {
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read[2]);
    gl.uniform1f(
      splatProgram.uniforms.aspectRatio,
      canvas.width / canvas.height
    );
    gl.uniform2f(
      splatProgram.uniforms.point,
      x / canvas.width,
      1.0 - y / canvas.height
    );
    gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
    gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
    blit(velocity.write[1]);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, density.read[2]);
    gl.uniform3f(
      splatProgram.uniforms.color,
      color[0] * 0.3,
      color[1] * 0.3,
      color[2] * 0.3
    );
    blit(density.write[1]);
    density.swap();
  }

  function multipleSplats(amount) {
    for (let i = 0; i < amount; i++) {
      const color = [
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
      ];
      const x = canvas.width * Math.random();
      const y = canvas.height * Math.random();
      const dx = 1000 * (Math.random() - 0.5);
      const dy = 1000 * (Math.random() - 0.5);
      splat(x, y, dx, dy, color);
    }
  }

  function resizeCanvas() {
    if (
      canvas.width != canvas.clientWidth ||
      canvas.height != canvas.clientHeight
    ) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      initFramebuffers();
    }
  }

  canvas.addEventListener("mousemove", (e) => {
    pointers[0].moved = pointers[0].down;
    pointers[0].dx = (e.offsetX - pointers[0].x) * 10.0;
    pointers[0].dy = (e.offsetY - pointers[0].y) * 10.0;
    pointers[0].x = e.offsetX;
    pointers[0].y = e.offsetY;
  });

  canvas.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i];
        pointer.moved = pointer.down;
        pointer.dx = (touches[i].pageX - pointer.x) * 10.0;
        pointer.dy = (touches[i].pageY - pointer.y) * 10.0;
        pointer.x = touches[i].pageX;
        pointer.y = touches[i].pageY;
      }
    },
    false
  );

  canvas.addEventListener("mousemove", () => {
    pointers[0].down = true;
    pointers[0].color = [
      Math.random() + 0.2,
      Math.random() + 0.2,
      Math.random() + 0.2,
    ];
  });

  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
      if (i >= pointers.length) pointers.push(new pointerPrototype());

      pointers[i].id = touches[i].identifier;
      pointers[i].down = true;
      pointers[i].x = touches[i].pageX;
      pointers[i].y = touches[i].pageY;
      pointers[i].color = [
        Math.random() + 0.2,
        Math.random() + 0.2,
        Math.random() + 0.2,
      ];
    }
  });

  window.addEventListener("mouseup", () => {
    pointers[0].down = false;
  });

  window.addEventListener("touchend", (e) => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++)
      for (let j = 0; j < pointers.length; j++)
        if (touches[i].identifier == pointers[j].id) pointers[j].down = false;
  });
}

export function snakes() {
  var a = document.getElementById("playground"),
    c = a.getContext("2d");
  c.style.backgroundColor = "#111";
  c.clearRect(0, 0, c.width, c.height);

  var chains = [],
    chainCount = 50,
    entityCount = 8,
    w = a.width,
    h = a.height,
    cx = w / 2,
    cy = h / 2,
    mx = cx,
    my = cy,
    md = 0,
    tick = 0,
    maxa = 2,
    maxv = 1,
    avoidTick = 20,
    avoidThresh = 50,
    TWO_PI = Math.PI * 2;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Impulse() {
    this.x = cx;
    this.y = cy;
    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
    this.r = 1;
  }

  Impulse.prototype.step = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.r >= w || this.x <= this.r) {
      this.vx = 0;
      this.ax = 0;
    }
    if (this.y + this.r >= h || this.y <= this.r) {
      this.vy = 0;
      this.ay = 0;
    }
    if (this.x + this.r >= w) {
      this.x = w - this.r;
    }
    if (this.x <= this.r) {
      this.x = this.r;
    }
    if (this.y + this.r >= h) {
      this.y = h - this.r;
    }
    if (this.y <= this.r) {
      this.y = this.r;
    }

    if (md) {
      let dx = this.x - mx;
      let dy = this.y - my;
      let dist = Math.sqrt(dx * dx + dy * dy);
      dist = rand(50, 150);
      let angle = Math.atan2(dy, dx) - Math.PI / 2;
      let frac = 0.02;
      this.vx -= Math.cos(angle) * dist * frac;
      this.vy -= Math.sin(angle) * dist * frac;

      let dx2 = this.x - mx;
      let dy2 = this.y - my;
      let dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      let angle2 = Math.atan2(dy2, dx2);
      let frac2 = 0.01;
      this.vx -= Math.cos(angle2) * dist2 * frac2;
      this.vy -= Math.sin(angle2) * dist2 * frac2;

      //this.vx += ( mx - this.x ) * 0.03;
      //this.vy += ( my - this.y ) * 0.03;
    } // else {
    let angle = rand(0, 1) * Math.PI;
    let magnitude = rand(-0.4, 0.4);
    this.ax += Math.cos(angle) * magnitude;
    this.ay += Math.sin(angle) * magnitude;
    //}

    // let angle = rand(0, 1) * Math.PI;
    // let magnitude = rand(-0.4, 0.4);
    // this.ax += Math.cos(angle) * magnitude;
    // this.ay += Math.sin(angle) * magnitude;

    // this.ax += rand( -0.4, 0.4 );
    // this.ay += rand( -0.4, 0.4 );
    this.vx += this.ax;
    this.vy += this.ay;
    this.ax *= Math.abs(this.ax) > maxa ? 0.75 : 1;
    this.ay *= Math.abs(this.ay) > maxa ? 0.75 : 1;
    this.vx *= Math.abs(this.vx) > maxv ? 0.75 : 1;
    this.vy *= Math.abs(this.vy) > maxv ? 0.75 : 1;
  };

  function Chain() {
    this.branches = [];
    this.impulse = new Impulse();
    this.branches.push(
      new Branch({
        chain: this,
        attractor: this.impulse,
      })
    );
  }

  Chain.prototype.step = function () {
    this.impulse.step();
    this.branches.forEach(function (branch, i) {
      branch.step();
    });

    this.branches.forEach(function (branch, i) {
      branch.draw();
    });
  };

  function Branch(opt) {
    this.entities = [];
    this.chain = opt.chain;
    this.avoiding = 0;
    var entity;
    for (var i = 0; i < entityCount; i++) {
      entity = new Entity({
        branch: this,
        i: i,
        x: cx,
        y: cy,
        radius: 1 + ((entityCount - i) / entityCount) * 5,
        damp: 0.2,
        attractor: i === 0 ? opt.attractor : this.entities[i - 1],
      });
      this.entities.push(entity);
    }
  }

  Branch.prototype.step = function () {
    var i = chains.length;
    while (i--) {
      var impulse = this.chain.impulse,
        oImpulse = chains[i].impulse,
        dx = oImpulse.x - impulse.x,
        dy = oImpulse.y - impulse.y,
        dist = Math.sqrt(dx * dx + dy * dy);
      if (!md && impulse !== oImpulse && dist < avoidThresh) {
        impulse.ax = 0;
        impulse.ay = 0;
        impulse.vx -= dx * 0.1;
        impulse.vy -= dy * 0.1;
        this.avoiding = avoidTick;
      }
    }

    this.entities.forEach(function (entity, i) {
      entity.step();
    });

    if (this.avoiding > 0) {
      this.avoiding--;
    }
  };

  Branch.prototype.draw = function () {
    var self = this;
    c.beginPath();
    c.moveTo(this.entities[0].x, this.entities[0].y);
    this.entities.forEach(function (entity, i) {
      if (i > 0) {
        c.lineTo(entity.x, entity.y);
      }
    });
    c.strokeStyle =
      "hsla(" + (md ? 120 : self.avoiding ? 0 : 200) + ", 70%, 60%, 0.3)";
    c.stroke();

    this.entities.forEach(function (entity, i) {
      c.save();
      c.translate(entity.x, entity.y);
      c.beginPath();
      c.rotate(entity.rot);
      if (entity.i === 0) {
        c.fillStyle = md ? "#6c6" : self.avoiding ? "#c66" : "#6bf";
      } else {
        c.fillStyle =
          "hsla(" +
          (md ? 120 : self.avoiding ? 0 : 200) +
          ", 70%, " +
          Math.min(50, 5 + (entity.av / maxv) * 20) +
          "%, " +
          (entityCount - i) / entityCount +
          ")";
      }
      c.fillRect(
        -entity.radius,
        -entity.radius,
        entity.radius * 2,
        entity.radius * 2
      );
      c.restore();
    });
  };

  function Entity(opt) {
    this.branch = opt.branch;
    this.i = opt.i;
    this.x = opt.x;
    this.y = opt.y;
    this.vx = 0;
    this.vy = 0;
    this.radius = opt.radius;
    this.attractor = opt.attractor;
    this.damp = opt.damp;
  }

  Entity.prototype.step = function () {
    this.vx = (this.attractor.x - this.x) * this.damp;
    this.vy = (this.attractor.y - this.y) * this.damp;
    this.x += this.vx;
    this.y += this.vy;
    this.av = (Math.abs(this.vx) + Math.abs(this.vy)) / 2;

    var dx = this.attractor.x - this.x,
      dy = this.attractor.y - this.y;
    this.rot = Math.atan2(dy, dx);
  };

  function loop() {
    requestAnimationFrame(loop);

    c.globalCompositeOperation = "destination-out";
    c.fillStyle = "rgba(0, 0, 0, 1)";
    c.fillRect(0, 0, a.width, a.height);
    c.globalCompositeOperation = "lighter";

    chains.forEach(function (chain, i) {
      chain.step();
    });

    tick++;
  }

  function resize() {
    w = c.width;
    h = c.height;
    a.width = w * devicePixelRatio;
    a.height = h * devicePixelRatio;
    a.style.width = `${w}px`;
    a.style.height = `${h}px`;
    c.scale(devicePixelRatio, devicePixelRatio);

    cx = w / 2;
    cy = h / 2;
  }

  window.addEventListener("resize", resize);

  window.addEventListener("mousedown", function () {
    md = 1;
  });

  window.addEventListener("mouseup", function () {
    md = 0;
  });

  window.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  resize();

  for (var i = 0; i < chainCount; i++) {
    chains.push(new Chain());
  }

  loop();
  // reset();
}

export function snow() {
  const options = {};
  const microtime = () => new Date().getTime() * 0.001;
  const irand = (min, max) =>
    Math.floor((min || 0) + Math.random() * ((max + 1 || 100) - (min || 0)));
  const frand = (min, max) =>
    (min || 0) + Math.random() * ((max || 1) - (min || 0));
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function Vector2(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.add = function (other) {
      this.x += other.x;
      this.y += other.y;
    };

    this.magnitude = function () {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };
  }

  function Color(r, g, b) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
  }

  window.addEventListener(
    "resize",
    function () {
      jsCanvasSnow.resize(this.canvas.width, this.canvas.height);
      jsCanvasSnow.init("playground", options);
    },
    false
  );

  window.addEventListener(
    "load",
    function () {
      //var options = {};
      var options = {
        amount: 1000,
        size: [8, 20],
        rotation: [1, 5],
        speed: [40, 80],
        swing: [0.1, 1],
        amplitude: [30, 50],
        alpha: [0.1, 0.95],
        images: [
          "https://i.imgur.com/jbSVFgy.png",
          "https://i.imgur.com/TT2lmN4.png",
          "https://i.imgur.com/do8589m.png",
          "https://i.imgur.com/3BxEO8i.png",
        ],
      };

      jsCanvasSnow.init("playground", options);
      jsCanvasSnow.start();
    },
    false
  );

  function jsParticle(origin, velocity, size, amplitude, rspeed, alpha, image) {
    this.origin = origin;
    this.position = new Vector2(origin.x, origin.y);
    this.velocity = velocity || new Vector2(0, 0);
    this.size = size;
    this.rspeed = rspeed;
    this.amplitude = amplitude;
    this.alpha = alpha;
    this.image = image;

    this.dx = Math.random() * 100;
    this.rotation = Math.random() * 360;

    this.update = function (delta_time) {
      this.dx += this.velocity.x * delta_time;
      this.position.y += this.velocity.y * delta_time;
      this.position.x = this.origin.x + this.amplitude * Math.sin(this.dx);
      this.rotation += this.rspeed * delta_time;
    };
  }

  var jsCanvasSnow = {
    canvas: null,
    ctx: null,
    particles: [],
    running: false,

    pImageObjects: [],

    start_time: 0,
    frame_time: 0,

    init: function (canvas_id, options) {
      // use the container width and height
      this.canvas = document.getElementById(canvas_id);
      this.canvas.style.backgroundColor = "#111";
      this.ctx = this.canvas.getContext("2d");
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.resize(window.innerWidth, window.innerHeight);

      // default values
      this.pAmount = options.amount || 500;
      this.pSize = options.size || [8, 26];
      this.pRotation = options.rotation || [-5, 5];
      this.pSwing = options.swing || [0.1, 1];
      this.pSpeed = options.speed || [40, 100];
      this.pAmplitude = options.amplitude || [20, 50];
      this.pAlpha = options.alpha || [0.25, 1];
      this.pImageNames = options.images || [];

      // initialize all the images
      for (var i = 0; i < this.pImageNames.length; i++) {
        var image = new Image();
        image.src = this.pImageNames[i];
        this.pImageObjects.push(image);
      }

      this._init_particles();
    },

    start: function () {
      this.running = true;
      this.start_time = this.frame_time = microtime();
      this._loop();
    },

    stop: function () {
      this.running = false;
    },

    resize: function (w, h) {
      this.canvas.width = w;
      this.canvas.height = h;
    },

    _loop: function () {
      if (jsCanvasSnow.running) {
        jsCanvasSnow._clear();
        jsCanvasSnow._update();
        jsCanvasSnow._draw();
        jsCanvasSnow._queue();
      }
    },

    _init_particles: function () {
      // clear the particles array
      this.particles.length = 0;

      for (var i = 0; i < this.pAmount; i++) {
        var origin = new Vector2(
          frand(0, this.canvas.width),
          frand(-this.canvas.height, 0)
        );
        var velocity = new Vector2(
          frand(this.pSwing[0], this.pSwing[1]),
          frand(this.pSpeed[0], this.pSpeed[1])
        );
        var size = frand(this.pSize[0], this.pSize[1]);
        var amplitude = frand(this.pAmplitude[0], this.pAmplitude[1]);
        var rspeed =
          frand(this.pRotation[0], this.pRotation[1]) *
          (Math.random() < 0.5 ? -1 : 1);
        var alpha = frand(this.pAlpha[0], this.pAlpha[1]);
        var image =
          this.pImageObjects.length > 0
            ? irand(0, this.pImageObjects.length - 1)
            : -1;

        this.particles.push(
          new jsParticle(
            origin,
            velocity,
            size,
            amplitude,
            rspeed,
            alpha,
            image
          )
        );
      }
    },

    _update: function () {
      var now_time = microtime();
      var delta_time = now_time - this.frame_time;

      for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        particle.update(delta_time);

        if (particle.position.y - particle.size > this.canvas.height) {
          particle.position.y = -particle.size * 2;
          particle.position.x = particle.origin.x =
            Math.random() * this.canvas.width;
        }
      }

      this.frame_time = now_time;
    },

    _draw: function () {
      this.ctx.fillStyle = "rgb(255,255,255)";

      for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        var center = -(particle.size / 2);

        this.ctx.save();
        this.ctx.translate(particle.position.x, particle.position.y);
        this.ctx.rotate(particle.rotation);
        this.ctx.globalAlpha = this.particles[i].alpha;

        if (particle.image == -1)
          this.ctx.fillRect(center, center, particle.size, particle.size);
        else
          this.ctx.drawImage(
            this.pImageObjects[particle.image],
            center,
            center,
            particle.size,
            particle.size
          );

        this.ctx.restore();
      }
    },

    _clear: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    _queue: function () {
      window.requestAnimationFrame(jsCanvasSnow._loop);
    },
  };
}

export function space() {
  let canvas = document.getElementById("playground");
  let centerX, centerY;
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;

  class Star {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.z = canvas.width;
      this.size = 0.1;
      this.radius = Math.random() * 1.2;
      this.speed = 1.3;
    }
  }
  stars = [];
  for (let i = 0; i < 100; i++) {
    stars[i] = new Star();
  }

  function animateStars() {
    for (let i = 0; i < stars.length; i++) {
      stars[i].z = stars[i].z - stars[i].speed;
      if (stars[i].z <= 0) {
        stars[i].z = canvas.width;
      }
      stars[i].x = (stars[i].x - centerX) * (canvas.width / stars[i].z);
      stars[i].x = stars[i].x + centerX;
      stars[i].y = (stars[i].y - centerY) * (canvas.width / stars[i].z);
      stars[i].y = stars[i].y + centerY;
      stars[i].size = stars[i].size * (canvas.width / stars[i].z);
      if (
        stars[i].x <= 0 ||
        stars[i].x > canvas.width ||
        stars[i].y <= 0 ||
        stars[i].y > canvas.height
      ) {
        stars[i] = new Star();
      }
      context.beginPath();
      context.arc(stars[i].x, stars[i].y, stars[i].size, 0, 360);
      context.fillStyle = "white";
      context.fill();
    }
  }

  function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    animateStars();
    window.requestAnimationFrame(update);
  }

  update();
}

export function spacespider() {
  window.onload = function () {
    let canvas = document.getElementById("playground"),
      c = canvas.getContext("2d"),
      w = canvas.width,
      h = canvas.height,
      mouse = { x: false, y: false },
      last_mouse = {};

    c.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = "#111";

    //initiation

    function dist(p1x, p1y, p2x, p2y) {
      return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }

    class segment {
      constructor(parent, l, a, first) {
        this.first = first;
        if (first) {
          this.pos = {
            x: parent.x,
            y: parent.y,
          };
        } else {
          this.pos = {
            x: parent.nextPos.x,
            y: parent.nextPos.y,
          };
        }
        this.l = l;
        this.ang = a;
        this.nextPos = {
          x: this.pos.x + this.l * Math.cos(this.ang),
          y: this.pos.y + this.l * Math.sin(this.ang),
        };
      }
      update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
      }
      show() {
        c.lineTo(this.nextPos.x, this.nextPos.y);
      }
    }

    class tentacle {
      constructor(x, y, l, n, a) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.segments = [new segment(this, this.l / this.n, 0, true)];
        for (let i = 1; i < this.n; i++) {
          this.segments.push(
            new segment(this.segments[i - 1], this.l / this.n, 0, false)
          );
        }
      }
      move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
          x: target.x - 0.8 * this.dt * Math.cos(this.angle),
          y: target.y - 0.8 * this.dt * Math.sin(this.angle),
        };
        if (this.t.x) {
          this.segments[this.n - 1].update(this.t);
        } else {
          this.segments[this.n - 1].update(target);
        }
        for (let i = this.n - 2; i >= 0; i--) {
          this.segments[i].update(this.segments[i + 1].pos);
        }
        if (
          dist(this.x, this.y, target.x, target.y) <=
          this.l + dist(last_target.x, last_target.y, target.x, target.y)
        ) {
          this.segments[0].fallback({ x: this.x, y: this.y });
          for (let i = 1; i < this.n; i++) {
            this.segments[i].fallback(this.segments[i - 1].nextPos);
          }
        }
      }
      show(target) {
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.globalCompositeOperation = "color-dodge";
          c.beginPath();
          c.lineTo(this.x, this.y);
          for (let i = 0; i < this.n; i++) {
            this.segments[i].show();
          }
          c.strokeStyle =
            "hsl(" +
            (this.rand * 60 + 180) +
            ",100%," +
            (this.rand * 60 + 25) +
            "%)";
          c.lineWidth = this.rand * 2;
          c.lineCap = "round";
          c.lineJoin = "round";
          c.stroke();
          c.globalCompositeOperation = "source-over";
        }
      }
      show2(target) {
        c.beginPath();
        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
          c.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
          c.fillStyle = "white";
        } else {
          c.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
          c.fillStyle = "darkcyan";
        }
        c.fill();
      }
    }

    let maxl = 300,
      minl = 50,
      n = 30,
      numt = 500,
      tent = [],
      clicked = false,
      target = { x: 0, y: 0 },
      last_target = {},
      t = 0,
      q = 10;

    for (let i = 0; i < numt; i++) {
      tent.push(
        new tentacle(
          Math.random() * w,
          Math.random() * h,
          Math.random() * (maxl - minl) + minl,
          n,
          Math.random() * 2 * Math.PI
        )
      );
    }
    function draw() {
      //animation
      if (mouse.x) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        target.errx =
          w / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }

      target.x += target.errx / 10;
      target.y += target.erry / 10;

      t += 0.01;

      c.beginPath();
      c.arc(
        target.x,
        target.y,
        dist(last_target.x, last_target.y, target.x, target.y) + 5,
        0,
        2 * Math.PI
      );
      c.fillStyle = "hsl(210,100%,80%)";
      c.fill();

      for (let i = 0; i < numt; i++) {
        tent[i].move(last_target, target);
        tent[i].show2(target);
      }
      for (let i = 0; i < numt; i++) {
        tent[i].show(target);
      }
      last_target.x = target.x;
      last_target.y = target.y;
    }

    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = false;
      mouse.y = false;
    });

    canvas.addEventListener(
      "mousedown",
      function (e) {
        clicked = true;
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function (e) {
        clicked = false;
      },
      false
    );

    function loop() {
      window.requestAnimationFrame(loop);
      // c.fillStyle="rgba(30,30,30,0.1)";
      // c.fillRect(0, 0, w, h);
      c.clearRect(0, 0, w, h);
      draw();
    }

    window.addEventListener("resize", function () {
      w = canvas.width;
      h = canvas.height;
      loop();
    });

    loop();
    setInterval(loop, 1000 / 60);
  };
}

export function spaceworm() {
  window.onload = function () {
    //functions definition

    //class definition
    class segm {
      constructor(x, y, l) {
        this.b = Math.random() * 1.9 + 0.1;
        this.x0 = x;
        this.y0 = y;
        this.a = Math.random() * 2 * Math.PI;
        this.x1 = this.x0 + l * Math.cos(this.a);
        this.y1 = this.y0 + l * Math.sin(this.a);
        this.l = l;
      }
      update(x, y) {
        this.x0 = x;
        this.y0 = y;
        this.a = Math.atan2(this.y1 - this.y0, this.x1 - this.x0);
        this.x1 = this.x0 + this.l * Math.cos(this.a);
        this.y1 = this.y0 + this.l * Math.sin(this.a);
      }
    }
    class rope {
      constructor(tx, ty, l, b, slq, typ) {
        if (typ == "l") {
          this.res = l / 2;
        } else {
          this.res = l / slq;
        }
        this.type = typ;
        this.l = l;
        this.segm = [];
        this.segm.push(new segm(tx, ty, this.l / this.res));
        for (let i = 1; i < this.res; i++) {
          this.segm.push(
            new segm(
              this.segm[i - 1].x1,
              this.segm[i - 1].y1,
              this.l / this.res
            )
          );
        }
        this.b = b;
      }
      update(t) {
        this.segm[0].update(t.x, t.y);
        for (let i = 1; i < this.res; i++) {
          this.segm[i].update(this.segm[i - 1].x1, this.segm[i - 1].y1);
        }
      }
      show() {
        if (this.type == "l") {
          c.beginPath();
          for (let i = 0; i < this.segm.length; i++) {
            c.lineTo(this.segm[i].x0, this.segm[i].y0);
          }
          c.lineTo(
            this.segm[this.segm.length - 1].x1,
            this.segm[this.segm.length - 1].y1
          );
          c.strokeStyle = "white";
          c.lineWidth = this.b;
          c.stroke();

          c.beginPath();
          c.arc(this.segm[0].x0, this.segm[0].y0, 1, 0, 2 * Math.PI);
          c.fillStyle = "white";
          c.fill();

          c.beginPath();
          c.arc(
            this.segm[this.segm.length - 1].x1,
            this.segm[this.segm.length - 1].y1,
            2,
            0,
            2 * Math.PI
          );
          c.fillStyle = "white";
          c.fill();
        } else {
          for (let i = 0; i < this.segm.length; i++) {
            c.beginPath();
            c.arc(
              this.segm[i].x0,
              this.segm[i].y0,
              this.segm[i].b,
              0,
              2 * Math.PI
            );
            c.fillStyle = "white";
            c.fill();
          }
          c.beginPath();
          c.arc(
            this.segm[this.segm.length - 1].x1,
            this.segm[this.segm.length - 1].y1,
            2,
            0,
            2 * Math.PI
          );
          c.fillStyle = "white";
          c.fill();
        }
      }
    }

    //setting up canvas
    let c = init("playground").c,
      canvas = init("playground").canvas,
      w = canvas.width,
      h = canvas.height,
      ropes = [];

    //variables definition
    let nameOfVariable = "value",
      mouse = {},
      last_mouse = {},
      rl = 50,
      randl = [],
      target = { x: w / 2, y: h / 2 },
      last_target = {},
      t = 0,
      q = 10,
      da = [],
      type = "l";

    for (let i = 0; i < 100; i++) {
      if (Math.random() > 0.25) {
        type = "l";
      } else {
        type = "o";
      }
      ropes.push(
        new rope(
          w / 2,
          h / 2,
          (Math.random() * 1 + 0.5) * 500,
          Math.random() * 0.4 + 0.1,
          Math.random() * 15 + 5,
          type
        )
      );
      randl.push(Math.random() * 2 - 1);
      da.push(0);
    }

    //place for objects in animation
    function draw() {
      if (mouse.x) {
        target.errx = mouse.x - target.x;
        target.erry = mouse.y - target.y;
      } else {
        target.errx =
          w / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.x;
        target.erry =
          h / 2 +
          ((h / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) /
            (Math.pow(Math.sin(t), 2) + 1) -
          target.y;
      }

      target.x += target.errx / 10;
      target.y += target.erry / 10;

      t += 0.01;

      for (let i = 0; i < ropes.length; i++) {
        if (randl[i] > 0) {
          da[i] += (1 - randl[i]) / 10;
        } else {
          da[i] += (-1 - randl[i]) / 10;
        }
        ropes[i].update({
          x:
            target.x +
            randl[i] * rl * Math.cos((i * 2 * Math.PI) / ropes.length + da[i]),
          y:
            target.y +
            randl[i] * rl * Math.sin((i * 2 * Math.PI) / ropes.length + da[i]),
        });
        ropes[i].show();
      }
      last_target.x = target.x;
      last_target.y = target.y;
    }

    //mouse position
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    canvas.addEventListener("mouseleave", function (e) {
      mouse.x = false;
      mouse.y = false;
    });

    //animation frame
    function loop() {
      window.requestAnimFrame(loop);
      c.clearRect(0, 0, w, h);
      draw();
    }

    //window resize
    window.addEventListener("resize", function () {
      w = canvas.width;
      h = canvas.height;
      loop();
    });

    //animation runner
    loop();
    setInterval(loop, 1000 / 60);
  };

  // HEAD SCRIPT

  window.requestAnimFrame = function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback);
      }
    );
  };

  function init(elemid) {
    let canvas = document.getElementById(elemid),
      c = canvas.getContext("2d"),
      w = canvas.width,
      h = canvas.height;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "rgba(30,30,30,1)";
    canvas.style.background = "#111";
    c.fillRect(0, 0, w, h);
    return { c: c, canvas: canvas };
  }
}

export function stars() {
  var canvas = document.getElementById("playground"),
    ctx = canvas.getContext("2d"),
    w = canvas.width,
    h = canvas.height,
    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1400;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
  // Cache gradient
  var canvas2 = document.createElement("canvas"),
    ctx2 = canvas2.getContext("2d");
  canvas2.width = 100;
  canvas2.height = 100;
  var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, "#fff");
  gradient2.addColorStop(0.1, "hsl(" + hue + ", 61%, 33%)");
  gradient2.addColorStop(0.25, "hsl(" + hue + ", 64%, 6%)");
  gradient2.addColorStop(1, "transparent");

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();

  // End cache

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x, y) {
    var max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
  }

  var Star = function () {
    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 12;
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
  };

  Star.prototype.draw = function () {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      canvas2,
      x - this.radius / 2,
      y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.timePassed += this.speed;
  };

  for (var i = 0; i < maxStars; i++) {
    new Star();
  }

  function animation() {
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "hsla(" + hue + ", 64%, 6%, 1)";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    }

    window.requestAnimationFrame(animation);
  }

  animation();
}

export function tunnel() {
  var canvas = document.getElementById("playground");

  // Initialize the GL context
  var gl = canvas.getContext("webgl");
  if (!gl) {
    console.error("Unable to initialize WebGL.");
  }

  //Time
  var time = 0.0;

  //************** Shader sources **************

  var vertexSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
  `;

  var fragmentSource = `
  precision highp float;

  uniform float width;
  uniform float height;
  vec2 resolution = vec2(width, height);

  uniform float time;

  //Base values modified with depth later
  float intensity = 1.0;
  float radius = 0.05;

  //Distance functions from
  //https://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
  float triangleDist(vec2 p){
    const float k = sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0/k;
    if( p.x+k*p.y>0.0 ) p=vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0, 0.0 );
    return -length(p)*sign(p.y);
  }

  float boxDist(vec2 p){
    vec2 d = abs(p)-1.0;
    return length(max(d,vec2(0))) + min(max(d.x,d.y),0.0);
  }

  float circleDist( vec2 p){
    return length(p) - 1.0;
  }

  //https://www.shadertoy.com/view/3s3GDn
  float getGlow(float dist, float radius, float intensity){
    return pow(radius/dist, intensity);
  }

  void main(){

    vec2 uv = gl_FragCoord.xy/resolution.xy;
    float widthHeightRatio = resolution.x/resolution.y;
    vec2 centre;
    vec2 pos;

    float t = time * 0.05;

    float dist;
    float glow;
    vec3 col = vec3(0);

    //The spacing between shapes
    float scale = 500.0;
    //Number of shapes
    const int layers = 15;

    float depth;
    vec2 bend;

    vec3 purple = vec3(0.611, 0.129, 0.909);
    vec3 green = vec3(0.133, 0.62, 0.698);

    float angle;
    float rotationAngle;
    mat2 rotation;

    //For movement of the anchor point in time
    float d = 2.5*(sin(t) + sin(3.0*t));

    //Create an out of frame anchor point where all shapes converge to
    vec2 anchor = vec2(0.5 + cos(d), 0.5 + sin(d));

    //Create light purple glow at the anchor loaction
    pos = anchor - uv;
    pos.y /= widthHeightRatio;
    dist = length(pos);
    glow = getGlow(dist, 0.25, 3.5);
    col += glow * vec3(0.6,0.4,1.0);

    for(int i = 0; i < layers; i++){

      //Time varying depth information depending on layer
      depth = fract(float(i)/float(layers) + t);

      //Move the focus of the camera in a circle
      centre = vec2(0.5 + 0.2 * sin(t), 0.5 + 0.2 * cos(t));

       //Position shapes between the anchor and the camera focus based on depth
       bend = mix(anchor, centre, depth);

      pos = bend - uv;
       pos.y /= widthHeightRatio;

      //Rotate shapes
      rotationAngle = 3.14 * sin(depth + fract(t) * 6.28) + float(i);
      rotation = mat2(cos(rotationAngle), -sin(rotationAngle),
                      sin(rotationAngle),  cos(rotationAngle));

      pos *= rotation;

      //Position shapes according to depth
      pos *= mix(scale, 0.0, depth);

      float m = mod(float(i), 3.0);
      if(m == 0.0){
        dist = abs(boxDist(pos));
      }else if(m == 1.0){
        dist = abs(triangleDist(pos));
      }else{
        dist = abs(circleDist(pos));
      }

      //Get glow from base radius and intensity modified by depth
      glow = getGlow(dist, radius+(1.0-depth)*2.0, intensity + depth);

      //Find angle along shape and map from [-PI; PI] to [0; 1]
      angle = (atan(pos.y, pos.x)+3.14)/6.28;
      //Shift angle depending on layer and map to [1...0...1]
      angle = abs((2.0*fract(angle + float(i)/float(layers))) - 1.0);

      //White core
       //col += 10.0*vec3(smoothstep(0.03, 0.02, dist));

      //Glow according to angle value
      col += glow * mix(green, purple, angle);
    }

    //Tone mapping
    col = 1.0 - exp(-col);

    //Gamma
    col = pow(col, vec3(0.4545));

    //Output to screen
    gl_FragColor = vec4(col,1.0);
  }
  `;

  //************** Utility functions **************

  window.addEventListener("resize", onWindowResize, false);

  function onWindowResize() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(widthHandle, canvas.width);
    gl.uniform1f(heightHandle, canvas.height);
  }

  //Compile shader and combine with source
  function compileShader(shaderSource, shaderType) {
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
    }
    return shader;
  }

  //From https://codepen.io/jlfwong/pen/GqmroZ
  //Utility to complain loudly if we fail to find the attribute/uniform
  function getAttribLocation(program, name) {
    var attributeLocation = gl.getAttribLocation(program, name);
    if (attributeLocation === -1) {
      throw "Cannot find attribute " + name + ".";
    }
    return attributeLocation;
  }

  function getUniformLocation(program, name) {
    var attributeLocation = gl.getUniformLocation(program, name);
    if (attributeLocation === -1) {
      throw "Cannot find uniform " + name + ".";
    }
    return attributeLocation;
  }

  //************** Create shaders **************

  //Create vertex and fragment shaders
  var vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
  var fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

  //Create shader programs
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.useProgram(program);

  //Set up rectangle covering entire canvas
  var vertexData = new Float32Array([
    -1.0,
    1.0, // top left
    -1.0,
    -1.0, // bottom left
    1.0,
    1.0, // top right
    1.0,
    -1.0, // bottom right
  ]);

  //Create vertex buffer
  var vertexDataBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

  // Layout of our data in the vertex buffer
  var positionHandle = getAttribLocation(program, "position");

  gl.enableVertexAttribArray(positionHandle);
  gl.vertexAttribPointer(
    positionHandle,
    2, // position is a vec2 (2 values per component)
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex (32 bit float is 4 bytes)
    0 // how many bytes inside the buffer to start from
  );

  //Set uniform handle
  var timeHandle = getUniformLocation(program, "time");
  var widthHandle = getUniformLocation(program, "width");
  var heightHandle = getUniformLocation(program, "height");

  gl.uniform1f(widthHandle, window.innerWidth);
  gl.uniform1f(heightHandle, window.innerHeight);

  var lastFrame = Date.now();
  var thisFrame;

  function draw() {
    //Update time
    thisFrame = Date.now();
    time += (thisFrame - lastFrame) / 1000;
    lastFrame = thisFrame;

    //Send uniforms to program
    gl.uniform1f(timeHandle, time);
    //Draw a triangle strip connecting vertices 0-4
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(draw);
  }

  draw();
}

export function waves() {
  (function (canvas) {
    canvas.style.backgroundColor = "#111";
    var ctx = canvas.getContext("2d"),
      W,
      H,
      P2 = 2 * Math.PI,
      organisms = [];
    var SEED_ORGANISMS = 20,
      ORG_HUE = 0,
      ORG_ALPHA = 0.9,
      ORG_RADIUS = 0.01,
      ORG_ROTDUR = 3000,
      ORG_COLDUR = 5000,
      ORG_SPACING = ORG_RADIUS * 2,
      ORG_WAVELENGTH = 1,
      ORG_TAILS = 1,
      ORH_TAIL_STEP = 1 / ORG_TAILS;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function rPixelD(v) {
      if ((isNaN(W) && isNaN(H)) || isNaN(v)) return 0;
      return Math.min(W, H) * v;
    }

    function rPixelX(x) {
      // convert relative x pos to pixel value
      if (isNaN(W) || isNaN(x)) return 0;
      return W * x;
    }

    function rPixelY(y) {
      // convert relative y pos to pixel value
      if (isNaN(H) || isNaN(y)) return 0;
      return H * y;
    }

    function Organism(props) {
      this.props = props || {};
      this.children = [];
      this.init();
    }

    Organism.prototype.getColor = function (hue, alpha) {
      var color = Math.round(hue || this.color),
        saturation = "100%",
        lightness = "50%",
        alpha = alpha || this.alpha;

      return "hsla(" + [color, saturation, lightness, alpha].join(",") + ")";
    };

    Organism.prototype.draw = function (c) {
      var items = Math.ceil(
          (1 - this.y) / (this.radius * 2 + this.spacing * 2)
        ),
        boundW = 1 / (SEED_ORGANISMS + 1);

      // draw ocilation
      c.save();
      for (let i = 0; i < items; i++) {
        for (let t = 0; t < ORG_TAILS; t++) {
          var rad =
            (i / items) * (P2 * this.wavelen) +
            P2 * this.shift +
            P2 * t * ORH_TAIL_STEP;
          c.fillStyle = this.getColor(null, this.alpha * ((t + 1) / ORG_TAILS));
          c.beginPath();
          c.arc(
            rPixelX(this.x + Math.sin(rad) * (boundW / 2)),
            rPixelY(
              this.y + this.spacing + i * (this.radius * 2 + this.spacing * 2)
            ),
            rPixelD(this.radius),
            0,
            2 * Math.PI
          );
          c.fill();
          c.closePath();
        }
      }
      c.restore();
    };

    Organism.prototype.update = function (delta) {
      var deltaShift =
          delta + (isNaN(this.props.shift) ? 0 : this.props.shift * ORG_ROTDUR),
        durRotation = (deltaShift % ORG_ROTDUR) / ORG_ROTDUR,
        durColorShift = (delta % ORG_COLDUR) / ORG_COLDUR,
        oriColor = isNaN(this.props.hue) ? this.color : this.props.hue;
      this.color = oriColor + 360 * durColorShift;
      this.shift = (Math.round(deltaShift) % ORG_ROTDUR) / ORG_ROTDUR;
    };

    Organism.prototype.init = function () {
      this.color = isNaN(this.props.hue) ? ORG_HUE : this.props.hue;
      this.alpha = isNaN(this.props.alpha) ? ORG_ALPHA : this.props.alpha;
      this.radius = isNaN(this.props.radius) ? ORG_RADIUS : this.props.radius;
      this.spacing = isNaN(this.props.spacing)
        ? ORG_SPACING
        : this.props.spacing;
      this.wavelen = isNaN(this.props.wavelen)
        ? ORG_WAVELENGTH
        : this.props.wavelen;
      this.x = this.props.x || 0;
      this.y = this.props.y || 0;
      this.shift = isNaN(this.props.shift) ? 0 : this.props.shift;
    };

    function init() {
      var xspace = 1 / SEED_ORGANISMS;
      for (let i = 0; i < SEED_ORGANISMS; i++) {
        organisms.push(
          new Organism({
            hue: 180 + (i * 360) / SEED_ORGANISMS,
            x: xspace / 2 + i * xspace,
            y: ORG_RADIUS,
            shift: i / SEED_ORGANISMS,
          })
        );
      }
    }

    function loop(delta) {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < organisms.length; i++) {
        organisms[i].update(delta);
        organisms[i].draw(ctx);
      }

      window.requestAnimationFrame(loop.bind(this));
    }

    init();
    loop(0);
  })(document.getElementById("playground"));
}
