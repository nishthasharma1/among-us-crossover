/* global createCanvas, background, loadImage, image, tint, color
 */
// Name: Andrew Elysee, Nishtha Sharma
let dvdimage;
let xsize = 400;
let ysize = 300;
let x = 0;
let y = 0;
let xv;
let yv;
let r,g,b;
let c = (255,255,255);
let z = 0;
let speed = 1;
let gravity  = 0.1;
let img = 0;
/*
let img1 = 
let img2 = 
let img3 = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fimages.jpeg?v=1626189432565")
let img4 = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fimage-20150902-6714-163lw5t.png?v=1626189483166")
let img5 = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fgooglephotos-logo.webp?v=1626189491805")
let img6 = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fyoutube-logo.jpg?v=1626189496048")
let img7 = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fgoogledrive-logo.webp?v=1626189501838")
let img8 = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fthumbnails%2Flogo-gmail.png?1626189505066")
*/
let imgList
function setup() {
  createCanvas(xsize, ysize);
  xv = 1;
  yv = 0.5;
  dvdimage = loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fgoogle-logo.webp?v=1626189314579")
  r = 0
  g = 0
  b = 0
  imgList = [loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fgoogle-logo.webp?v=1626189314579"), 
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Falphapbet-logo.webp?v=1626189321117"), 
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fimages.jpeg?v=1626189432565"),
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fimage-20150902-6714-163lw5t.png?v=1626189483166"),
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fgooglephotos-logo.webp?v=1626189491805"), 
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fyoutube-logo.jpg?v=1626189496048"), 
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fgoogledrive-logo.webp?v=1626189501838"), 
               loadImage("https://cdn.glitch.com/374ae288-8096-4253-aaf1-c1a3dafaffa5%2Fthumbnails%2Flogo-gmail.png?1626189505066")]
}

//if you set only one of these to 100 it looks like a tennis game with one angry player
let vxpositive = 10;
let vxnegative = 10;
function xBounce(xpos){
  if (xpos < 0) {
    xv = Math.floor(Math.random() * vxpositive)
    r = Math.floor(Math.random() * 255)
    g = Math.floor(Math.random() * 255)
    b = Math.floor(Math.random() * 255)
    c = color (Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255))
  } else if (xpos > xsize - 100) {
    xv = Math.floor(Math.random() * -1 * vxnegative)
    r = Math.floor(Math.random() * 255)
    g = Math.floor(Math.random() * 255)
    b = Math.floor(Math.random() * 255)
    c = color (Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255))
  }
}

let vypositive = 10;
let vynegative = 10;
function yBounce(xpos){
  if (xpos < 0) {
    yv = Math.floor(Math.random() * vypositive)
    r = Math.floor(Math.random() * 255)
    g = Math.floor(Math.random() * 255)
    b = Math.floor(Math.random() * 255)
    c = color (Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255))
  } else if (xpos > ysize - 75) {
    //yv = Math.floor(Math.random() * vynegative * -1)
    yv *= -0.85;
    if (yv < -0.01) {
      yv = -7
    }
    r = Math.floor(Math.random() * 255)
    g = Math.floor(Math.random() * 255)
    b = Math.floor(Math.random() * 255)
    c = color (Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255))
    img = Math.floor(Math.random() * 7.99);
    randlogo(img);
  }
}

function randlogo(n){
  dvdimage = imgList[n]
}


function draw() {
  //background(r, g, b);
  background(0);
  tint(c)
  image(dvdimage, x, y, 100, 75)
  
  xBounce(x);
  
  yBounce(y);
  
  x += xv;
  y += yv;
  yv += gravity;
  
}
