/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const canvas_WIDTH = canvas.width = 1400;
const canvas_HEIGHT = canvas.height = 700;

const no_of_layers = 5;

//game player elements
let game_speed = 10;
const orignal_game_speed = game_speed;
const jump_speed = 8;
let pre_state = 0;
const player_image = new Image();
player_image.src = "game_images/shadow_dog.png"
const s_height = 523;
const s_width = 575;
let c_frame = 0;
let frames = 0;
const fps = 4;
let player_state = "run"
let player_position_x = 100;
let player_position_y = 403;
const required_x =player_position_x;
const required_y = player_position_y;
let speed_x=5;
let speed_y=10;
const character_size = 200
let score = 0;
let jump_dir = 0;
//creating object for character states and location
let Character_State_info = [];
let Character_info = [
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
//appending character state and its location as key value pair in Character_State_info


//game image elements
const background_layer1 = new Image();
const background_layer2 = new Image();
const background_layer3 = new Image();
const background_layer4 = new Image();
const background_layer5 = new Image();

const background_list = [background_layer1, background_layer2, background_layer3, background_layer4, background_layer5]
const background_image = ["game_images/layer-1.png", "game_images/layer-2.png", "game_images/layer-3.png", "game_images/layer-4.png", "game_images/layer-5.png"]
//creating class for multiple layer

class background_layer {
    constructor(image, speed_modifier) {
        this.x = 0;
        this.speed = game_speed * speed_modifier;
        this.image = image;
    }
    draw() {
        ctx.drawImage(this.image, this.x, 0);
        ctx.drawImage(this.image, this.x + 2400, 0)
    }
    update() {
        this.x = this.x - this.speed
        if (this.x < -2400) {
            this.x = 0;
        }
    }
}
const modifiers = [0.3, 0.5, 0.7, 0.9, 1.1]
for (let i = 0; i < no_of_layers; i++) {
    background_list[i].src = background_image[i]
}
//list of layers
let layers = []//[layer1,layer2,layer3,layer4,layer5]
for (let i = 0; i < no_of_layers; i++) {
    layers.push(new background_layer(background_list[i], modifiers[i]))
}
Character_info.forEach((state, index) => {
    let loc = [];
    for (let j = 0; j < state.frame; j++) {
        let x = j * s_width;
        let y = index * s_height;
        loc[j] = [x, y];
    }
    Character_State_info[state.name] = loc;
})
function pos_change(){
    if(player_position_x<character_size/2){
        player_position_x=character_size/2
    }
    if(player_position_x>canvas_WIDTH-character_size){
        player_position_x=canvas_WIDTH-character_size
    }
    else{
        if(player_position_y>required_y){
            player_position_y= required_y;
        }
        if(character_act_no != 4&&character_act_no != 5&&character_act_no != 1){
            if(player_position_y<required_y){
                player_position_y+=jump_speed;
            }
        }
        if(character_act_no == 1){
            player_position_x+=speed_x;
        }
        else{
            if(player_position_x >required_x){
                if(player_state=="run"){
                    player_position_x-=speed_x*2
                }
            }
        }
    }
}
function movement(state,speed){
    player_state= state;
    game_speed = speed;
    
    if(state=="land"){
        player_position_y=player_position_y+jump_speed;
        if(player_position_y>=required_y){
            character_act_no = 0;
            pre_state = character_act_no;
        }
        if(player_position_y<required_y){
            game_speed=orignal_game_speed;
        }
        pre_state=4
    }
    if(state =="jump"){
        if(player_position_y<=0){
            character_act_no = 4;
            pre_state = character_act_no;
        }
        else{
            player_position_y-=jump_speed;
        }
    }
    if(state=="roll"){
        game_speed = orignal_game_speed*3;
        if(pre_state == 5){
            if(player_position_y<=0){
                pre_state= 4;
            }
            else{
                player_position_y-=jump_speed;
            }
        }
        else if(player_position_y<required_y){
            player_position_y+=jump_speed;
        }
        else if(player_position_y>=required_y+0.5){
            character_act_no = pre_state;
        }
    }
    layers.forEach((object,index) =>{
        object.speed = game_speed * modifiers[index];
    })
}
function show_score(){
    ctx.font = "50px impact"
    ctx.fillStyle="black";
    ctx.fillText("score: "+score,50,50,300);
    ctx.fillStyle="white";
    ctx.fillText("score: "+score,55,55,300);
}
let character_act=["run","roll","idel","sit","land","jump"]
const character_speed = [orignal_game_speed,orignal_game_speed*2,0,0,orignal_game_speed,orignal_game_speed]
let character_act_no = 2;
pre_state = character_act_no;
function Animate() {
    if(pre_state == 1){
        pre_state=0;
    }
    pos_change()
    movement(character_act[character_act_no],character_speed[character_act_no]) ;
    ctx.clearRect(0, 0, canvas_WIDTH, canvas_HEIGHT);
    let x = Math.floor((c_frame / fps) % Character_State_info[player_state].length)
    layers.forEach(layer => {
        layer.update();
        layer.draw();
    })
    player_position_x+=jump_dir;
    ctx.drawImage(player_image, Character_State_info[player_state][x][0], Character_State_info[player_state][x][1], s_width, s_height, player_position_x, player_position_y,character_size,character_size);
    c_frame++
    if(player_state!="idel"&&player_state!="sit"){
        if(player_state=="roll"){
            if(c_frame%(fps*6)==0){
                score+=3;
            }
        }
        else if(c_frame%(fps*6)==0){
            score++;
        }
    }
    show_score()
    requestAnimationFrame(Animate)
}

window.addEventListener("load", Animate())
window.addEventListener("keydown", e => {
    if(player_state=="jump"||player_state=="land"){
        if(e.key == "a"|| e.key == "ArrowLeft"){
            jump_dir=-speed_x*2
        }
        if(e.key == "d"|| e.key == "ArrowRight"){
            jump_dir=speed_x*2
        }
    }
    if(player_state!="jump"||player_state!="land"){
        pre_state = character_act_no;
        if (e.key == "a"|| e.key == "ArrowLeft") {
            if(player_position_y==required_y){
                character_act_no = 2;
            }
        }
        else if (e.key == "s"|| e.key == "ArrowDown") {
            if(player_position_y==required_y){
                character_act_no = 3;
            }
        }
        else if (e.key == "w"|| e.key == "ArrowUp") {
            if(player_position_y==required_y){
                character_act_no = 5;
            }
        }
        else if (e.key == "d"|| e.key == "ArrowRight") {
            if(player_position_y==required_y){
                character_act_no = 0;
            }
        }
        else if (e.key == "e") {
            character_act_no = 1;
        }
    }
})
window.addEventListener("keyup", e => {
    if(player_state=="jump"||player_state=="land"){
        if(e.key == "a"|| e.key == "ArrowLeft"||e.key == "d"){
            console.log("hi")
            jump_dir=0
        }
    }
    if(player_state!="jump"||player_state!="land"){
        jump_dir=0
        if (e.key == "a"|| e.key == "ArrowLeft") {
            if(player_position_y==required_y){
                character_act_no = 2;
            }
        }
        else if (e.key == "s"|| e.key == "ArrowDown") {
            if(player_position_y<=required_y){
                character_act_no = pre_state;
            }
        }
        else if (e.key == "d"|| e.key == "ArrowRight") {
            if(player_position_y==required_y){
                character_act_no = pre_state;
            }
        }
        else if (e.key == "e") {
            if(pre_state!=4){
                character_act_no = pre_state;
            }
        }
        pre_state = character_act_no;
    }
})