/* eslint-disable */
var _createClass = (function () {
  function t(t, i) {
    for (var e = 0; e < i.length; e++) {
      var n = i[e];
      // (n.enumerable = n.enumerable || !1),
      //   (n.configurable = !0),
      //   "value" in n && (n.writable = !0),
      //   Object.defineProperty(t, n.key, n);
    }
  }
  return function (i, e, n) {
    return e && t(i.prototype, e), n && t(i, n), i;
  };
})();

function _classCallCheck(t, i) {
  if (!(t instanceof i))
    throw new TypeError("Cannot call a class as a function");
}

var Vector2 = (function () {
  function t(i, e) {
    return (
      _classCallCheck(this, t),
      (this.x = "number" == typeof i ? i : 0),
      (this.y = "number" == typeof e ? e : 0),
      this
    );
  }
  return (
    _createClass(t, [
      {
        key: "zero",
        value: function () {
          return (this.x = 0), (this.y = 0), this;
        },
      },
      {
        key: "clone",
        value: function () {
          return new t(this.x, this.y);
        },
      },
      {
        key: "add",
        value: function (t) {
          return (this.x += t.x || 0), (this.y += t.y || 0), this;
        },
      },
      {
        key: "addX",
        value: function (t) {
          return (this.x += t.x || 0), this;
        },
      },
      {
        key: "addY",
        value: function (t) {
          return (this.y += t.y || 0), this;
        },
      },
      {
        key: "addScalar",
        value: function (t) {
          return (this.x += t || 0), (this.y += t || 0), this;
        },
      },
      {
        key: "addScalarX",
        value: function (t) {
          return (this.x += t || 0), this;
        },
      },
      {
        key: "addScalarY",
        value: function (t) {
          return (this.y += t || 0), this;
        },
      },
      {
        key: "sub",
        value: function (t) {
          return (this.x -= t.x || 0), (this.y -= t.y || 0), this;
        },
      },
      {
        key: "subX",
        value: function (t) {
          return (this.x -= t.x || 0), this;
        },
      },
      {
        key: "subY",
        value: function (t) {
          return (this.y -= t.y || 0), this;
        },
      },
      {
        key: "subScalar",
        value: function (t) {
          return (this.x -= t || 0), (this.y -= t || 0), this;
        },
      },
      {
        key: "subX",
        value: function (t) {
          return (this.x -= t || 0), this;
        },
      },
      {
        key: "subY",
        value: function (t) {
          return (this.y -= t || 0), this;
        },
      },
      {
        key: "multiply",
        value: function (t) {
          return (this.x *= t.x || 1), (this.y *= t.y || 1), this;
        },
      },
      {
        key: "multiplyX",
        value: function (t) {
          return (this.x *= t.x || 1), this;
        },
      },
      {
        key: "multiplyY",
        value: function (t) {
          return (this.y *= t.y || 1), this;
        },
      },
      {
        key: "multiplyScalar",
        value: function (t) {
          return (this.x *= t || 1), (this.y *= t || 1), this;
        },
      },
      {
        key: "multiplyScalarX",
        value: function (t) {
          return (this.x *= t || 1), this;
        },
      },
      {
        key: "multiplyScalarY",
        value: function (t) {
          return (this.y *= t || 1), this;
        },
      },
      {
        key: "divide",
        value: function (t) {
          return 0 === t.x || 0 === t.y
            ? void console.log("! Cannot divide by zero !")
            : ((this.x /= t.x || 1), (this.y /= t.y || 1), this);
        },
      },
      {
        key: "divideX",
        value: function (t) {
          return 0 === t.x
            ? void console.log("! Cannot divide by zero !")
            : ((this.x /= t.x || 1), this);
        },
      },
      {
        key: "divideY",
        value: function (t) {
          return 0 === t.y
            ? void console.log("! Cannot divide by zero !")
            : ((this.y /= t.y || 1), this);
        },
      },
      {
        key: "divideScalar",
        value: function (t) {
          return 0 === t
            ? void console.log("! Cannot divide by zero !")
            : ((this.x /= t || 1), (this.y /= t || 1), this);
        },
      },
      {
        key: "divideScalarX",
        value: function (t) {
          return 0 === t
            ? void console.log("! Cannot divide by zero !")
            : ((this.x /= t || 1), this);
        },
      },
      {
        key: "divideScalarY",
        value: function (t) {
          return 0 === t
            ? void console.log("! Cannot divide by zero !")
            : ((this.Y /= t || 1), this);
        },
      },
      {
        key: "getMagnitude",
        value: function () {
          return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        },
      },
      {
        key: "normalize",
        value: function () {
          this.divideScalar(this.getMagnitude());
        },
      },
      {
        key: "randomize",
        value: function (i) {
          return (
            (i = i || new t(1, 1)),
            (this.x = Math.random() * i.x),
            (this.y = Math.random() * i.y),
            this
          );
        },
      },
      {
        key: "addRandom",
        value: function (t) {
          t = t || 0;
          this.x += t - Math.random() * (2 * t);
          this.y += t - Math.random() * (2 * t);
        },
      },
      {
        key: "addRandomX",
        value: function (t) {
          t = t || 0;
          this.x += t - Math.random() * (2 * t);
        },
      },
      {
        key: "addRandomY",
        value: function (t) {
          t = t || 0;
          this.y += t - Math.random() * (2 * t);
        },
      },
      {
        key: "lerp",
        value: function (t, i) {
          return (
            (t = t || this),
            (i = i || 0.05),
            (this.x = (1 - i) * this.x + i * t.x),
            (this.y = (1 - i) * this.y + i * t.y),
            this
          );
        },
      },
      {
        key: "midpoint",
        value: function (i) {
          var e = new t(this.x + i.x, this.y + i.y);
          return e.divideScalar(2), e;
        },
      },
      {
        key: "slope",
        value: function (t) {
          return ((t.y - this.y) / (t.x - this.x)) * -1;
        },
      },
      {
        key: "intercept",
        value: function (t) {
          return console.log(-t * this.x + this.y), -t * this.x + this.y;
        },
      },
      {
        key: "distanceTo",
        value: function (t) {
          return (
            (t = t || this),
            Math.sqrt(Math.pow(t.x - this.x, 2) + Math.pow(t.y - this.y, 2))
          );
        },
      },
      {
        key: "angleTo",
        value: function (t, i) {
          return (
            (t = t || this),
            "rad" === (i = i || "rad")
              ? Math.atan2(t.y - this.y, t.x - this.x)
              : "deg" === i
              ? (180 * Math.atan2(t.y - this.y, t.x - this.x)) / Math.PI
              : void 0
          );
        },
      },
    ]),
    t
  );
})();
