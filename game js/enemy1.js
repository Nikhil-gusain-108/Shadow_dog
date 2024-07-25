/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva2");
const ctx = canvas.getContext("2d");

// window element 
const canvas_HEIGHT = canvas.height = 700;
const canvas_WIDTH =canvas.width = 400;

//enemy character 
const enemy_image1 = new Image();
enemy_image1.src = "game_images/enemy1.png"
let no_of_frame = 5;
const no_of_enemy = 100;
const enemy_size = 70;
let enemy_array1=[];
class enemy1{
    constructor(image){
        this.image = image ;
        this.height = 155;
        this.weight = 293;
        this.flap_speed =  Math.floor(Math.random()*7+1);
        this.position_x = Math.floor(Math.random()*(canvas_WIDTH-100));
        this.position_y = Math.floor(Math.random()*(canvas_HEIGHT-100));
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

for(let i= 0;i<no_of_enemy;i++){
    enemy_array1.push(new enemy1(enemy_image1));
}

function animate() {
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    enemy_array1.forEach(enemys=>{
        enemys.update()
        enemys.draw()
    })
    requestAnimationFrame(animate)
}

animate()