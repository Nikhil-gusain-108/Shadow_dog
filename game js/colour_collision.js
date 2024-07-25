/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const canvas_WIDTH =canvas.width = 1400;
const canvas_HEIGHT = canvas.height = 700;
const collision = document.getElementById("collision");
const collision_ctx = collision.getContext("2d",{willReadFrequently:true});
const collision_canvas_WIDTH =collision.width = 1400;
const collision_canvas_HEIGHT = collision.height = 700;
let canvas_position = canvas.getBoundingClientRect()
let Active_explosion = [];
let game_over = false;
let gone_enemy =0;
//time manager
let Time_Interval=0;
let Req_time_Interval=500;
let last_time = 0;
let score = 0 
//enemy objects
let no_of_frame2 = 5;
let enemy_array2=[];
class enemy2{
    constructor(){
        this.image = new Image();
        this.image.src = "game_images/enemy2.png";
        this.height = 186;
        this.weight = 267;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = canvas_WIDTH-10
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
        this.frame =  Math.floor(Math.random()*10);
        this.position=0;
        this.speed_x = Math.floor(Math.random()*10 +5);
        this.speed_y = Math.floor(Math.random()*20 +5);
        this.size = Math.floor(Math.random()*30 +60);
        this.remove=false;
        this.colour = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.rgbclr= "rgb("+this.colour[0]+","+this.colour[1]+","+this.colour[2]+")"
    }
    update(){
        if(this.frame%no_of_frame2 ==0){
            this.position_x -= this.speed_x;
            this .position_y += (Math.cos(this.frame)*this.speed_y);
        }
        this.frame++;
        this.position = Math.floor((this.frame/this.flap_speed)%no_of_frame2);
        if(this.position_x < (this.weight*-1)){
            this.remove = true;
            gone_enemy++;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.position*this.weight,0,this.weight,this.height,this.position_x,this.position_y,this.size,this.size);
    }
}
//class
class explosion{
    constructor(x,y,size){
        this.size = size;
        this.img_weigth = 200;
        this.img_height = 200;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.fps =0
        this.frame_speed = 10;
        this.remove = false;
        this.speed = Math.floor(Math.random()*10+1);
        this.image = new Image();
        this.image.src ="game_images/boom.png";
        this.remove=false;
    }
    update(){
        this.fps++;
        if(this.fps%this.frame_speed==0){
            this.frame++;
        }
        if(this.frame>5){
            this.remove = true;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.frame*this.img_weigth,0,this.img_weigth,this.img_height,this.x,this.y,this.size,this.size);
    }
}
canvas.addEventListener("click",(e)=>{
    let click_colour = collision_ctx.getImageData(e.x-canvas_position.x,e.y-canvas_position.y,1,1);
    
    enemy_array2.forEach((object)=>{
        if( object.colour[0]==click_colour.data[0]&&
            object.colour[1]==click_colour.data[1]&&
            object.colour[2]==click_colour.data[2]){
                
                Active_explosion.push(new explosion(object.position_x,object.position_y,object.size));
                object.remove = true;
                score ++;
            }
    })
})
function show_score(){
    ctx.font = "50px impact"
    ctx.fillStyle="black";
    ctx.fillText("score: "+score,200,100,300);
    ctx.fillStyle="white";
    ctx.fillText("score: "+score,205,105,300);
}
function animate(timestamp) {
    if(gone_enemy>5){
        game_over=true;
    }
    if(!game_over){
        canvas_position = canvas.getBoundingClientRect()
        Time_Interval+=timestamp-last_time;
        last_time = timestamp;
        if(Time_Interval > Req_time_Interval){
            Time_Interval = 0;
            enemy_array2.push(new enemy2());
        }
        //ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
        
        ctx.fillStyle = "green"
        ctx.fillRect(0,0,canvas_WIDTH,canvas_HEIGHT);
        
        collision_ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
        for(let i =0 ; i<Active_explosion.length;i++){
            Active_explosion[i].update();
            Active_explosion[i].draw()
            if(Active_explosion[i].remove){
                console.log(Time_Interval)
                Active_explosion.splice(i,1);
                i--;
            }
        }
        for(let i =0 ; i<enemy_array2.length;i++){
            collision_ctx.fillStyle = enemy_array2[i].rgbclr;
            collision_ctx.fillRect(enemy_array2[i].position_x,enemy_array2[i].position_y,enemy_array2[i].size,enemy_array2[i].size);
            enemy_array2[i].update();
            enemy_array2[i].draw()
            if(enemy_array2[i].remove){
                enemy_array2.splice(i,1);
                i--;
            }
        }
        show_score()
        requestAnimationFrame(animate);
    }
}
animate(0) 