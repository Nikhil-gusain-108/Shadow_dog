/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const canvas_WIDTH =canvas.width = 1400;
const canvas_HEIGHT = canvas.height = 700;
let canvas_position = canvas.getBoundingClientRect()
let Active_explosion = [];
let game_over = false;
//time manager
let Time_Interval=0;
let Req_time_Interval= 800;
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
        this.speed_x = Math.floor(Math.random()*20 +5);
        this.speed_y = Math.floor(Math.random()*20 +5);
        this.size = Math.floor(Math.random()*30 +60);
        this.remove=false;
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
            game_over=true;
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
    for(let i =0 ; i<enemy_array2.length;i++){
        if( e.x-canvas_position.x>enemy_array2[i].position_x&&
            e.x-canvas_position.x<enemy_array2[i].position_x+enemy_array2[i].size&&
            e.y>enemy_array2[i].position_y&&
            e.y<enemy_array2[i].position_y+enemy_array2[i].size){
                Active_explosion.push(new explosion(enemy_array2[i].position_x,enemy_array2[i].position_y,enemy_array2[i].size))
                enemy_array2[i].remove = true;
                score ++;
            }
    }
})
function show_score(){
    ctx.font = "50px impact"
    ctx.fillStyle="black";
    ctx.fillText("score: "+score,200,100,300);
    ctx.fillStyle="white";
    ctx.fillText("score: "+score,205,105,300);
}
function animate(timestamp) {
    if(!game_over){
        canvas_position = canvas.getBoundingClientRect()
        Time_Interval+=timestamp-last_time;
        last_time = timestamp;
        if(Time_Interval > Req_time_Interval){
            Time_Interval = 0;
            enemy_array2.push(new enemy2());
        }
        ctx.fillStyle ="green"
        ctx.fillRect(0,0,canvas_WIDTH,canvas_HEIGHT);
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