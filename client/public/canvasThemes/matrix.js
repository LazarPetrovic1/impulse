const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = window.innerWidth;
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
chinese = chinese.split("");
const font_size = 10;
const columns = c.width/font_size;
let drops = [];
for(let x = 0; x < columns; x++) drops[x] = 1;

function draw() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#0F0";
	ctx.font = font_size + "px arial";
	for(let i = 0; i < drops.length; i++) {
		const text = chinese[Math.floor(Math.random()*chinese.length)];
		ctx.fillText(text, i*font_size, drops[i]*font_size);
		if(drops[i]*font_size > c.height && Math.random() > 0.975) drops[i] = 0;
		drops[i]++;
	}
}

setInterval(draw, 33);
