const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const canvas_WIDTH =canvas.width = 1000;
const canvas_HEIGHT = canvas.height = 700;

//game elements
let game_speed=5;

//game image elements
const background_layer1 = new Image();
background_layer1.src = "game_images/layer-1.png"
const background_layer2 = new Image();
background_layer2.src = "game_images/layer-2.png"
const background_layer3 = new Image();
background_layer3.src = "game_images/layer-3.png"
const background_layer4 = new Image();
background_layer4.src = "game_images/layer-4.png"
const background_layer5 = new Image();
background_layer5.src = "game_images/layer-5.png"

//creating class for multiple layer

class background_layer{
    constructor(image,speed_modifier){
        this. x = 0;
        this.speed = game_speed*speed_modifier;
        this.image = image;
    }
    draw(){
        ctx.drawImage(this.image,this.x,0);
        ctx.drawImage(this.image,this.x+2400,0)
    }
    update(){
        this.x = this.x - this.speed
        if (this.x < -2400) {
            this.x=0;
        }
    }

}
const layer1 = new background_layer(background_layer1,0.3);
const layer2 = new background_layer(background_layer2,0.5);
const layer3 = new background_layer(background_layer3,0.7);
const layer4 = new background_layer(background_layer4,0.9);
const layer5 = new background_layer(background_layer5,1.1);

//list of layers
let layers = [layer1,layer2,layer3,layer4,layer5]
console.log(layers[0])

function Animate() {
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    
    for(let i =0 ;i<layers.length;i++){
        layers[i].draw()
        layers[i].update()
    }
    
    requestAnimationFrame(Animate)
}
Animate()