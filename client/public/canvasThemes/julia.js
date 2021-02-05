const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let creal = -.8
let cimag = .156;
let frame = 0;

let pallette=[];

function julia() {
  for(y=0;y<200;y++) {
    for(x=0;x<200;x++) {
      var cx=-2+x/50;
      var cy=-2+y/50;
      var i = 0;
      do {
        xt=cx*cx-cy*cy+creal;
        cy=2*cx*cy+cimag;
        cx=xt;
        i++;
      } while ((cx*cx+cy*cy<4)&&i<25);
      context.beginPath();
      context.rect(x*4, y*4, 4, 4);
      context.fillStyle = pallette[i];
      context.fill();
    }
  }
  frame++;
  creal=-.8+.6*Math.sin(frame/(3.14*20));
  cimag=.156+.4*Math.cos(frame/(3.14*40));
}

for(x=0;x<9;x++) {
  color=(31*x).toString(16);
  if(color.length==1) color='0'+color;
  pallette[x]="#"+color+color+'ff';
  pallette[x+8]='#00ff'+color;
  pallette[17+x]="#"+color+'0000';
}

setInterval(julia,10);
