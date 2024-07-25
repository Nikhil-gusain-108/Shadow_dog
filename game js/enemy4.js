/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva2");
const ctx = canvas.getContext("2d");

// window element 
const canvas_HEIGHT = canvas.height = 700;
const canvas_WIDTH =canvas.width = 800;

//enemy character 
const enemy_image = new Image();
enemy_image.src = "game_images/enemy4.png"
const enemy_height = 210;
const enemy_weight = 213;
let no_of_frame = 5;
const no_of_enemy = 10;
let enemy_array=[];
class enemy{
    constructor(image){
        this.image = image ;
        this.height = enemy_height;
        this.weight = enemy_weight;
        this.spin_speed =  Math.floor(Math.random()*8+2);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
        this.new_position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.new_position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
        this.frame = 0
        this.position=0
        this.speed_x =Math.floor(Math.random()*10 +5)
        this.speed_y = Math.floor(Math.random()*20 +5)
        this.size = 80//Math.floor(Math.random()*30 +50)
        this.dx = this.new_position_x-this.position_x;
        this.dy = this.new_position_y-this.position_y;
        this.speed = Math.floor(Math.random()*10 +50)
    }
    update(){
        this.position_x +=this.dx/this.speed
        this.position_y +=this.dy/this.speed
        if(this.frame%this.speed ===0){
            this.new_position_x = Math.floor(Math.random()*(canvas_WIDTH-this.weight/2));
            this.new_position_y = Math.floor(Math.random()*(canvas_HEIGHT-this.height/2));
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

for(let i= 0;i<no_of_enemy;i++){
    enemy_array.push(new enemy(enemy_image));
}

function animate() {
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    enemy_array.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    requestAnimationFrame(animate)
}

animate()