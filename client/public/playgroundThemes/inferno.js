(function () {
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
})();
