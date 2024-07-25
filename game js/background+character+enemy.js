//335 lines of code before editing
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const canvas_WIDTH =canvas.width = 1400;
const canvas_HEIGHT = canvas.height = 700;

//no of frames per enemy 
const no_of_frame = 5;
const types_of_enemy = 4
const no_of_layers = 5;

//enemy character images
const enemy_image3 = new Image();
const enemy_image2 = new Image();
const enemy_image1 = new Image();
const enemy_image4 = new Image();
/*
const enemy_image1.src ="game_images/enemy1.png"
const enemy_image2.src ="game_images/enemy2.png"
const enemy_image3.src ="game_images/enemy3.png"
const enemy_image4.src ="game_images/enemy4.png"
*/
const enemy_image_list = [enemy_image1,enemy_image2,enemy_image3,enemy_image4];
const image_list = ["game_images/enemy1.png","game_images/enemy2.png","game_images/enemy3.png","game_images/enemy4.png"]
for(let i =0;i<types_of_enemy;i++){
    enemy_image_list[i].src =image_list[i];
}
//making list of enemy array to collect the enemy types
let enemy_array_list = []
for(let j= 0;j<types_of_enemy;j++){
    enemy_array_list.push([]);
}

// other enemy element 
const speed3 = Math.floor(Math.random()*10 +5)
const enemy_size = 70;
const no_of_enemy = 2;
//enemy class 
class enemy3{
    constructor(image){
        this.image = image ;
        this.height = 186;
        this.weight = 218;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-200));
        this.frame = 0
        this.position=0
        this.speed_x =Math.floor(Math.random()*10 +5)
        this.speed_y = Math.floor(Math.random()*20 +5)
        this.size = 50//Math.floor(Math.random()*30 +50)
        this.angle_speed = Math.random()*0.9+0.9
        this.angle = 0
    }
    update(){
        this.position_x = canvas_WIDTH/2*(Math.sin(this.angle*Math.PI/260))+canvas_WIDTH/2-20;
        this.position_y = canvas_HEIGHT/2*(Math.cos(this.angle*Math.PI/90))+canvas_HEIGHT/2-200;
        this.frame++;
        this.angle += this.angle_speed;
        this.position = Math.floor((this.frame/this.flap_speed)%no_of_frame)
        if(this.position_x < -200){
            this.position_x = canvas_WIDTH-10
        }
        

    }
    draw(){
        ctx.drawImage(this.image,this.position*this.weight,0,this.weight,this.height,this.position_x,this.position_y,this.size,this.size);
    }

}
class enemy2{
    constructor(image){
        this.image = image ;
        this.height = 186;
        this.weight = 267;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-200));
        this.frame =  Math.floor(Math.random()*10)
        this.position=0
        this.speed_x = Math.floor(Math.random()*10 +5)
        this.speed_y = Math.floor(Math.random()*20 +5)
        this.size = Math.floor(Math.random()*30 +50)
    }
    update(){
        if(this.frame%no_of_frame ==0){
            this.position_x -= this.speed_x;
            this .position_y += (Math.cos(this.frame)*this.speed_y)
        }
        this.frame++;
        this.position = Math.floor((this.frame/this.flap_speed)%no_of_frame)
        if(this.position_x < -200){
            this.position_x = canvas_WIDTH-10
        }

    }
    draw(){
        ctx.drawImage(this.image,this.position*this.weight,0,this.weight,this.height,this.position_x,this.position_y,this.size,this.size);
    }

}


class enemy1{
    constructor(image){
        
        this.image = image ;
        this.height = 155;
        this.weight = 293;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-200));
        this.frame = 0
        this.position=0
        this.speed_x = Math.floor(Math.random()*4 + -2);
        this.speed_y =Math.floor(Math.random()*4 + -2);
    }
    update(){
        this.speed_x = Math.floor(Math.random()*5 + -2);
        this.speed_y = Math.floor(Math.random()*5 + -2);
        this.position_x = this.position_x+this.speed_x;
        this.position_y = this.position_y+this.speed_y;
        this.frame++;
        this.position = Math.floor((this.frame/this.flap_speed)%no_of_frame)
    }
    draw(){
        ctx.drawImage(this.image,this.position*this.weight,0,this.weight,this.height,this.position_x,this.position_y,enemy_size,enemy_size);
    }

}

class enemy4{
    constructor(image){
        this.image = image ;
        this.height = 210;
        this.weight = 213;
        this.spin_speed =  Math.floor(Math.random()*8+2);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
        this.new_position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.new_position_y = Math.floor(Math.random()*(canvas_HEIGHT-200));
        this.frame = 0
        this.position=0
        this.speed_x =Math.floor(Math.random()*10 +5)
        this.speed_y = Math.floor(Math.random()*20 +5)
        this.size = Math.floor(Math.random()*30 +50)
        this.dx = this.new_position_x-this.position_x;
        this.dy = this.new_position_y-this.position_y;
        this.speed = Math.floor(Math.random()*10 +50)
    }
    update(){
        this.position_x +=this.dx/this.speed
        this.position_y +=this.dy/this.speed
        if(this.frame%this.speed ===0){
            this.new_position_x = Math.floor(Math.random()*(canvas_WIDTH-this.weight/2));
            this.new_position_y = Math.floor(Math.random()*(canvas_HEIGHT-150));
            this.dx = this.new_position_x-this.position_x;
            this.dy = this.new_position_y-this.position_y;
        }
        this.frame++;
        this.angle += this.angle_speed;
        
        this.position = Math.floor((this.frame/this.spin_speed)%no_of_frame)
        if(this.position_x < -200){
            this.position_x = canvas_WIDTH-10
        }
    }
    draw(){
        ctx.drawImage(this.image,this.position*this.weight,0,this.weight,this.height,this.position_x,this.position_y,this.size,this.size);
    }

}


//game player elements
let game_speed=5;
const player_image = new Image();
player_image.src = "game_images/shadow_dog.png"
const s_height = 523;
const s_width = 575;
let c_frame = 0;
let frames = 0;
const fps = 4;
let player_state = "run"
//creating object for character states and location
let Character_State_info =[];
let Character_info =[
    {
        name: "idel",
        frame: 7,
    },
    {
        name: "jump",
        frame: 7,
    },
    {
        name: "land",
        frame: 7,
    },
    {
        name: "run",
        frame: 9,
    },
    {
        name: "over",
        frame: 11,
    },
    {
        name: "sit",
        frame: 5,
    },
    {
        name: "roll",
        frame: 7,
    },
    {
        name: "bite",
        frame: 7,
    },
    {
        name: "fall",
        frame: 12,
    },
    {
        name: "gethit",
        frame: 4,
    },
];
console.log(Character_info[0].name)
//appending character state and its location as key value pair in Character_State_info


//game image elements
const background_layer1 = new Image();
const background_layer2 = new Image();
const background_layer3 = new Image();
const background_layer4 = new Image();
const background_layer5 = new Image();
/*
// improvised below using list and loop 
background_layer2.src = "game_images/layer-2.png"
background_layer3.src = "game_images/layer-3.png"
background_layer4.src = "game_images/layer-4.png"
background_layer1.src = "game_images/layer-1.png"
background_layer5.src = "game_images/layer-5.png"
*/
const background_list=[background_layer1,background_layer2,background_layer3,background_layer4,background_layer5]
const background_image =["game_images/layer-1.png","game_images/layer-2.png","game_images/layer-3.png","game_images/layer-4.png","game_images/layer-5.png"]
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
const modifiers =[0.3,0.5,0.7,0.9,1.1]
for(let i= 0;i<no_of_layers;i++){
    background_list[i].src = background_image[i]
}
//list of layers
let layers = []//[layer1,layer2,layer3,layer4,layer5]
for(let i= 0;i<no_of_layers;i++){
    layers.push(new background_layer(background_list[i],modifiers[i]))
}
Character_info.forEach((state,index)=>{
    let loc = [];
    for(let j =0;j< state.frame;j++){
        let position_x = j*s_width;
        let position_y = index*s_height ;
        loc[j]=[position_x,position_y];
    }
    Character_State_info[state.name] = loc;
    
})
const enemy_lists = [enemy1,enemy2,enemy3,enemy4];
for(let i= 0;i<no_of_enemy;i++){
    for(let j= 0;j<types_of_enemy;j++){
        enemy_array_list[j].push(new enemy_lists[j] (enemy_image_list[j]));
    }
}

function Animate() {
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    let position_x = Math.floor((c_frame/fps)%Character_State_info[player_state].length)
    layers.forEach(layer=>{
        layer.update();
        layer.draw();
    })
    enemy_array_list.forEach(enemy_lists=>{
        enemy_lists.forEach(enemys=>{
            enemys.update()
            enemys.draw()
        })
    })
    /*
    for(let i =0 ;i<layers.length;i++){
        layers[i].draw()
        layers[i].update()
    }
    enemy_array.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    enemy_array1.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    enemy_array2.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    enemy_array3.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    */
    ctx.drawImage(player_image,Character_State_info[player_state][position_x][0],Character_State_info[player_state][position_x][1],s_width,s_height,100,403,200,200)
    c_frame++
    requestAnimationFrame(Animate)
}

window.addEventListener("load",Animate())