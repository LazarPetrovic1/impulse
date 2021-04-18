(function () {
  const canvas = document.getElementById("playground");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.background = `linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(0,0,55,1) 44%, rgba(17,17,17,1) 100%)`;
})();
