console.log("hello world");
const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");
const canvas_WIDTH =canvas.width = 600;
const canvas_HEIGHT = canvas.height = 600;


//game character elements
const player_image = new Image();
player_image.src = "game_images/shadow_dog.png"
const s_height = 523;
const s_width = 575;
let c_frame = 0;
let frames = 0;
const fps = 6;
let player_state = "jump"
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
Character_info.forEach((state,index)=>{
    let loc = [];
    for(let j =0;j< state.frame;j++){
        let position_x = j*s_width;
        let position_y = index*s_height ;
        loc[j]=[position_x,position_y];
    }
    Character_State_info[state.name] = loc;
    
})

console.log(Character_info)
//creating animation function
function animate() {
    //clear the canvas
    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
    let position_x = Math.floor((c_frame/fps)%Character_State_info[player_state].length)
    //draw in canvas
    ctx.drawImage(player_image,Character_State_info[player_state][position_x][0],Character_State_info[player_state][position_x][1],s_width,s_height,0,0,canvas_WIDTH,canvas_HEIGHT)
    c_frame++
    if(position_x ==Character_State_info[player_state].length-1 ){
        c_frame =0
        if(frames>9){
            frames=0
        }
        player_state = Character_info[frames].name;
        frames++;
    }
    
    requestAnimationFrame(animate)
}


//calling function
animate()