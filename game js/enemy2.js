/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva2");
const ctx = canvas.getContext("2d");

// window element 
const canvas_HEIGHT = canvas.height = 700;
const canvas_WIDTH =canvas.width = 800;

//enemy character 
const enemy_image2 = new Image();
enemy_image2.src = "game_images/enemy2.png"
const enemy_height2 = 186;
const enemy_weight2 = 267;
let no_of_frame2 = 5;
const no_of_enemy = 100;
let enemy_array2=[];
class enemy2{
    constructor(image){
        this.image = image ;
        this.height = enemy_height2;
        this.weight = enemy_weight2;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
        this.frame =  Math.floor(Math.random()*10)
        this.position=0
        this.speed_x = Math.floor(Math.random()*10 +5)
        this.speed_y = Math.floor(Math.random()*20 +5)
        this.size = Math.floor(Math.random()*30 +50)
    }
    update(){
        if(this.frame%no_of_frame2 ==0){
            this.position_x -= this.speed_x;
            this .position_y += (Math.cos(this.frame)*this.speed_y)
        }
        this.frame++;
        this.position = Math.floor((this.frame/this.flap_speed)%no_of_frame2)
        if(this.position_x < -200){
            this.position_x = canvas_WIDTH-10
        }

    }
    draw(){
        ctx.drawImage(this.image,this.position*this.weight,0,this.weight,this.height,this.position_x,this.position_y,this.size,this.size);
    }

}

for(let i= 0;i<no_of_enemy;i++){
    enemy_array2.push(new enemy2(enemy_image2));
}

function animate() {
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    enemy_array2.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    requestAnimationFrame(animate)
}

animate()