const canvas = document.getElementById("playground");
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

let createMountain = function (color, opacity, steepness, complexity, shadow) {
  color = color || "#000000";
  opacity = opacity || 1;
  steepness = steepness || 2;
  complexity = complexity || 0.5;

  const maxHeight = canvas.height;

  var height = Math.random() * maxHeight,
    slope = Math.random() * steepness * 2 - steepness;

  for (let x = 0; x < canvas.width; x++) {
    height += slope * 0.5;
    slope += Math.random() * complexity * 2 - complexity;

    if (slope > steepness) {
      slope = steepness;
    }

    if (slope < -steepness) {
      slope = -steepness * 0.25;
    }

    ctx.beginPath();
    ctx.moveTo(x * 2, maxHeight);
    ctx.lineTo(x, height);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.globalCompositeOperation = "color-dodge";

    if (shadow) {
      ctx.lineTo(x, height - shadow);
      ctx.globalAlpha = 0.15;
      ctx.stroke();
    }
  }
};

createMountain("darksalmon", 0.7, 2, 0.2, 20, true);
createMountain("tomato", 0.9, 2, 0.5, 40, true);
createMountain("darkred", 0.4, 1, 0.75, 30);
createMountain("coral", 1, 2, 0.5, 15);
