/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva2");
const ctx = canvas.getContext("2d");

// window element 
const canvas_HEIGHT = canvas.height = 700;
const canvas_WIDTH =canvas.width = 800;

//enemy character 
const enemy_image3 = new Image();
enemy_image3.src = "game_images/enemy3.png"
const enemy_height3 = 186;
const enemy_weight3 = 218;
let no_of_frame3 = 5;
const no_of_enemy = 1000;
const speed3 = Math.floor(Math.random()*10 +5)
let enemy_array3=[];
class enemy3{
    constructor(image){
        this.image = image ;
        this.height = enemy_height3;
        this.weight = enemy_weight3;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
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
        this.position_y = canvas_HEIGHT/2*(Math.cos(this.angle*Math.PI/90))+canvas_HEIGHT/2-20;
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

for(let i= 0;i<no_of_enemy;i++){
    enemy_array3.push(new enemy3(enemy_image));
}

function animate() {
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    enemy_array3.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    requestAnimationFrame(animate)
}

animate()