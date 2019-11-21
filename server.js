const express = require("express");
const app = express();
const { createCanvas } = require('canvas');
var palettes = [
  ["#9da6cf", "#b1d3df", "#1b79af", "#5cc6e5", "#9da6cf", "#b1d3df", "#1b79af", "#5cc6e5"],
  ["#e24e77", "#de6985", "#da8594", "#e46e8d", "#e18297", "#de97a2", "#e58da2", "#e39ba9", "#e1a9b1"],
  ["#e9b8d2", "#d3a2ca", "#be8cc2", "#a876b9", "#9260b1", "#be8cc2"],
  ["#f1ead1", "#dfd5e6", "#cfceb4", "#b9bde4", "#afaed7"],
  ["#4c4c4c", "#995eab", "#e57fe8", "#fc89ff", "#a2edff"]
]

app.get("*", function(request, response) {
  if(request.url=="/"){
    response.sendFile(__dirname+"/public/index.html");
  }else{
    var url = request.url.substr(1);
    var dimensions = url.split("/");
    var x = dimensions[0];
    if(!dimensions[1]){
      y=x
    }else{
      var y = dimensions[1];
    }
    
      var canvas = createCanvas(parseInt(x),parseInt(y));
      var ctx = canvas.getContext("2d");
    
      var palette = palettes[Math.floor(Math.random()*palettes.length)]
      
      ctx.fillStyle=palette[0]
      ctx.fillRect(0,0,canvas.width,canvas.height);
    
      const circle = function(list){
          ctx.beginPath();
          ctx.fillStyle = palette[list];
          ctx.arc(Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height), Math.floor(Math.random()*canvas.height/3), 0, 2 * Math.PI);
          ctx.fill();
      }
      
      for(var i=1; i<palette.length; i++){
          if(palette.length>8){
            circle(i);
            circle(i);
          }else if(palette.length>5){
            circle(i);
            circle(i);
            circle(i);
            circle(i);
          }else{
            circle(i);
            circle(i);
            circle(i);
            circle(i);
            circle(i);
            circle(i);
          }
      }
      
      const img = Buffer.from(canvas.toDataURL().split(",")[1], 'base64');
      
        response.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': img.length
        });

        response.end(img); 
    
  }
});

const listener = app.listen(3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
