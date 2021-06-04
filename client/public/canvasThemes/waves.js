(function (canvas) {
  canvas.style.background = "#111";
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
    var items = Math.ceil((1 - this.y) / (this.radius * 2 + this.spacing * 2)),
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
    this.spacing = isNaN(this.props.spacing) ? ORG_SPACING : this.props.spacing;
    this.wavelen = isNaN(this.props.wavelen)
      ? ORG_WAVELENGTH
      : this.props.wavelen;
    this.x = this.props.x || 0;
    this.y = this.props.y || 0;
    this.shift = isNaN(this.props.shift) ? 0 : this.props.shift;
  };

  function resize() {
    canvas.setAttribute("width", (W = window.innerWidth));
    canvas.setAttribute("height", (H = window.innerHeight));
  }

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

  window.onresize = resize.bind(this);
  resize();
  init();
  loop(0);
})(document.getElementById("canvas"));
