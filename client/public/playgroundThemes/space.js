(function () {
  var canvas = document.getElementById("playground");

  context = canvas.getContext("2d");
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
})();
