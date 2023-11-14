(() => {
  var w = window
  var d = document
  var M = Math
  var _o = () => {
    var pt = d.getElementById('d');
  
    var tmr1 = undefined;
    var A=1, B=1;
  
    var af=() => {
      var b=[];
      var z=[];
      A += 0.07;
      B += 0.03;
      var cA=M.cos(A), sA=M.sin(A),
          cB=M.cos(B), sB=M.sin(B);
      for(var k=0;k<1760;k++) {
        b[k]=k%80 == 79 ? "\n" : " ";
        z[k]=0;
      }
      for(var j=0;j<6.28;j+=0.07) {
        var ct=M.cos(j),st=M.sin(j);
        for(i=0;i<6.28;i+=0.02) {
          var sp=M.sin(i),cp=M.cos(i),
              h=ct+2,
              D=1/(sp*h*sA+st*cA+5),
              t=sp*h*cA-st*sA;
  
          var x=0|(40+30*D*(cp*h*cB-t*sB)),
              y=0|(12+15*D*(cp*h*sB+t*cB)),
              o=x+80*y,
              N=0|(8*((st*sA-sp*ct*cA)*cB-sp*ct*sA-st*cA-cp*ct*sB));
          if(y<22 && y>=0 && x>=0 && x<79 && D>z[o])
          {
            z[o]=D;
            b[o]=".,-~:;=!*#$@"[N>0?N:0];
          }
        }
      }
      pt.innerHTML = b.join("");
      console.log(b.join(""))
    };
  
    w.an = () => {
      if(tmr1 === undefined) {
        tmr1 = setInterval(af, 50);
      } else {
        clearInterval(tmr1);
        tmr1 = undefined;
      }
    };

    an();
  }

  w.onload = _o;
})();