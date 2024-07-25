/**@type {HTMLCanvasElement} */
document.addEventListener("DOMContentLoaded",()=>{

    const canvas = document.getElementById("canva1");
    const ctx = canvas.getContext("2d");
    const canvas_height = canvas.height=700;
    const canvas_width = canvas.width=1400;
    const Worm = document.getElementById("Worm");
    const dog = document.getElementById("Dog");
    const Explosion = document.getElementById("Explosion");
    let lasttime = 0;
    let game_over = false;
    let score = 0;
    let stop_time = 0;
    let explosion_array = []
    /****************** classes for game ******************/
    //Handling input
    class InputHandler{
        constructor(){
            this.key=[];
            document.addEventListener("keydown",(e)=>{
                if(game_over==false){
                    if(e.key === "ArrowUp"&&this.key.indexOf(e.key)===-1){
                        this.key.push(e.key)
                    }
                    if(e.key === "ArrowDown"&&this.key.indexOf(e.key)===-1){
                        this.key.push(e.key)
                    }
                    if(e.key === "ArrowLeft"&&this.key.indexOf(e.key)===-1){
                        this.key.push(e.key)
                    }
                    if(e.key === "ArrowRight"&&this.key.indexOf(e.key)===-1){
                        this.key.push(e.key)
                    }
                    if(e.key === " " &&this.key.indexOf(e.key)===-1){
                        this.key.push(e.key)
                    }
                }
            })
            document.addEventListener("keyup",(e)=>{
                if(game_over==false){
                    if(e.key === "ArrowUp"){
                        this.key.splice(this.key.indexOf(e.key),1);
                    }
                    if(e.key === "ArrowDown"){
                        this.key.splice(this.key.indexOf(e.key),1);
                    }
                    if(e.key === "ArrowLeft"){
                        this.key.splice(this.key.indexOf(e.key),1);
                    }
                    if(e.key === "ArrowRight"){
                        this.key.splice(this.key.indexOf(e.key),1);
                    }
                    if(e.key === " "){
                        this.key.splice(this.key.indexOf(e.key),1);
                    }
                }
            })
            
        }
    }
    //handling enemy 
    class Enemy{
        constructor(width,height){
            this.Enemy = []
            this.width = width;
            this.height = height;
            this.markedfordeletion = false;
            this.speed = Math.random()*3+3;
            this.timer = 0;
            this.gamespeed = 1500;
            this.frame = 0;
            this.framex = 0;
            this.fps = Math.random()*10+5;
        }
        update(deltatime,character,time){
            this.Enemy=this.Enemy.filter(e=>!e.markedfordeletion); 
            this.x-=this.speed;
            addnewexplosion(character,this,time);
            if(this.timer>this.gamespeed){
                newenemy(this);
                this.timer=0;
            }else{
                this.timer+=deltatime;
            }
    
        }
        draw(){
            //this.ctx.fillRect(this.x,this.y,this.size,this.size);
            /*
            ctx.beginPath()
            ctx.arc(this.x+this.length/2,this.y+this.length/2,this.length/2,0,Math.PI*2);
            ctx.stroke()
            */
            ctx.drawImage(this.image,this.framex*this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.length,this.breath);
        }
    }
    class Ghost extends Enemy{
        constructor(width,height){
            super(width,height)
            this.spritewidth = 260;
            this.spriteheight = 207;
            this.length =this.spritewidth/2 ;
            this.breath = this.spriteheight/2;
            this.maxframe = 6;
            this.image = ghost;
            this.x = this.width;
            this.y = Math.random()*height*0.7;
            this.framespeed = Math.random()*20+10
            this.opesity = Math.random();
            this.opesityspeed =Math.floor(Math.random()*20+30);
        }
        update(deltatime,character,time){
            super.update(deltatime,character,time);
            this.framex = Math.floor((this.frame/this.fps)%this.maxframe);
            this.frame++;
            if(this.frame%this.opesityspeed==0)this.opesity = Math.random();
        }
        draw(){
            ctx.save();
            ctx.globalAlpha = this.opesity;
            super.draw(ctx);
            ctx.restore();
        }
    }
    class worm extends Enemy{
        constructor(width,height){
            super(width,height)
            this.spriteheight = 171;
            this.spritewidth = 229;
            this.length =this.spritewidth/2 ;
            this.breath = this.spriteheight/2;
            this.x= this.width;
            this.y = this.height-this.breath;
            this.image = Worm;
            this.maxframe = 6;
        }
        update(deltatime,character,time){
            super.update(deltatime,character,time)
            this.framex = Math.floor((this.frame/this.fps)%this.maxframe);
            this.frame++
            if(this.x<-this.length){
                this.markedfordeletion=true;
            }
        }
    }
    class Spider extends Enemy{
        constructor(width,height){
            super(width,height)
            this.image = spider;
            this.spritewidth = 310;
            this.spriteheight = 175;
            this.length =this.spritewidth/2 ;
            this.breath = this.spriteheight/2;
            this.x =  Math.random()*this.width*0.8;
            this.y =-this.height;
            this.maxy= Math.random()*(this.height-this.spriteheight)
            this.maxframe = 6
        }
        update(deltatime,character,time){
            if(this.y<-this.height)this.markedfordelition = true;
            this.framex = Math.floor((this.frame/this.fps)%this.maxframe);
            this.y+= this.speed;
            this.frame++;
            addnewexplosion(character,this,time);
            this.frameno = Math.floor((this.frame/this.speed)%this.maxframe)
            if (this.y>this.maxy)this.speed = this.speed*-1;
        }
        draw(){
            ctx.beginPath();
            ctx.moveTo(this.x+(this.length/2),0);
            ctx.lineTo(this.x+(this.length/2),this.y+this.breath/2)
            ctx.stroke()
            super.draw(ctx)
        }
    }
    const Enemyclass = new Enemy(ctx,canvas_width,canvas_height);
    //character handling
    class Player{
        constructor(width,height){
            this.image = dog ;
            this.width = width;
            this.height = height;
            this.spriteheight = 523;
            this.spritewidth = 575;
            this.weight = 0;
            this.size = 200;
            this.x = 100;
            this.y = this.height-this.size;
            this.speedx = 0;
            this.speedy = 0;
            this.maxframe = 7;
            this.frame = 0;
            this.framex = 8;
            this.framey = 3;
            this.fps = 6;
            }
        update(keys){
            this.y-=this.speedy-this.weight;
            this.x+=this.speedx
            this.frame++
            this.framex = Math.floor((this.frame/this.fps)%this.maxframe);
            if(keys.indexOf("ArrowLeft")===-1&&keys.indexOf("ArrowRight")===-1){
                this.speedx = 0;
            }
            if(this.x>this.width-this.size){
                this.x=this.width-this.size;
            }
            if(this.x<0){
                this.x=0;
            }
            if(this.y<this.height-this.size){
                this.weight++;
                if(this.speedy-this.weight <= 0){
                    this.framey=2;
                }
            }else{
                this.weight=0;
                this.speedy = 0;
                this.framey = 3;
                this.maxframe = 7
                this.y = this.height-this.size;
            }
            keys.forEach(key => {
                if(key ==="ArrowUp"){
                    this.framey = 1;
                    this.maxframe =6
                    this.speedy=34;
                }else if (key ==="ArrowDown"){
                    this.speedy =0;
                }else if (key ==="ArrowLeft"){
                    this.speedx =-10;
                }else if (key ==="ArrowRight"){
                    this.speedx =10;
                }else if( key ===" "){
                    this.framey = 6;
                    this.maxframe = 7;
                }
            });
    
        }
        draw(){
            ctx.drawImage(this.image,this.framex*this.spritewidth,this.framey*this.spriteheight,this.spritewidth,this.spriteheight,this.x,this.y,this.size,this.size);
            //this.ctx.fillRect(this.x,this.y,this.size,this.size);
        }
    }
    //explosion handling 
    class explosion{
        constructor(x,y,sizex,sizey){
            this.image = Explosion;
            this.x = x;
            this.y = y;
            this.spriteheight = 200;
            this.spritewidth = 200;
            this.sizex = sizex;
            this.sizey = sizey;
            this.markedfordeletion = false;
            this.frame = 0;
            this.framex = 0 ;
            this.speed = Math.random()*5 +5;
            this.maxframe = 5;
        }
        update(){
            explosion_array = explosion_array.filter(object =>!object.markedfordeletion);
            this.frame++
            this.framex = Math.floor((this.frame/this.speed)%this.maxframe);
            if(this.framex==(this.maxframe-1)){
                this.markedfordeletion = true
            }
        }
        draw(){
            ctx.drawImage(this.image,this.framex*this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.sizex,this.sizey);
        }
    }
    //background
     class Background{
        constructor(){
            this.image = document.getElementById("background");
            this.x = 0;
            this.speed = 4;
        }
        draw(){
            ctx.drawImage(this.image,this.x,0);
            ctx.drawImage(this.image,this.x+2399,0)
        }
        update(){
            this.x = this.x - this.speed
            if (this.x < -2400) {
                this.x=0;
            }
        }
     }
    /************** functions **************/
    const enemy_list = [worm,Ghost,Spider]
    //add new enemy
    function newenemy(enemy){
        const enmycls = enemy_list[Math.floor(Math.random()*enemy_list.length)]
        //const enmycls = Ghost;
        enemy.Enemy.push(new enmycls(canvas_width,canvas_height))
    }
    function addnewexplosion(character,enemy,time){
        const distance = character.size/2 + enemy.length/2;
        const x = character.x - enemy.x +  enemy.length/2;
        const y = character.y - enemy.y +  enemy.length/2;
        const calcdis = Math.sqrt(x*x + y*y);
        if(calcdis<=distance){
            if(character.framey==6){
                explosion_array.push( new explosion(enemy.x,enemy.y,enemy.length,enemy.breath));
                enemy.markedfordeletion = true;
                score++;
            }else{
                game_over = true;
                stop_time = time
            }
        }
    }
    //score printing function
    function print_score(time){
        if(game_over == false){
            ctx.font = "50px impact"
            ctx.fillStyle="black";
            ctx.fillText("score: "+score,50,50,300);
            ctx.fillText("time: "+Math.floor((time-stop_time)/1000)+" sec",1100,50,300);
            if(Math.floor((time-stop_time)/1000)<10){
                ctx.fillText("welcome to infinite runner",canvas_width/2.5,canvas_height/3,300);
                ctx.fillText("press space to roll and kill enemy",canvas_width/2.8,canvas_height/2,300);
            }
            ctx.fillStyle="white";
            if(Math.floor((time-stop_time)/1000)<10){
                ctx.fillText("welcome to infinite runner",canvas_width/2.5+5,canvas_height/3+5,300);
                ctx.fillText("press space to roll and kill enemy",canvas_width/2.8+5,canvas_height/2+5,300);
            }
            ctx.fillText("score: "+score,55,55,300);
            ctx.fillText("time: "+Math.floor((time-stop_time)/1000)+" sec",1105,55,300);
        }else{
            ctx.font = "50px impact"
            ctx.fillStyle="black";
            ctx.fillText("score: "+score,canvas_width/2.5,canvas_height/3,300);
            ctx.fillText("press enter to restart",canvas_width/2.8,canvas_height/2,300);
            ctx.fillStyle="white";
            ctx.fillText("score: "+score,canvas_width/2.5+5,canvas_height/3+5,300);
            ctx.fillText("press enter to restart",canvas_width/2.8+5,canvas_height/2+5,300);
        }
        
    }
    const input = new InputHandler();
    const player = new Player(canvas_width,canvas_height);
    const BG= new Background()
    //animation
    newenemy(Enemyclass)
    function animate(timestamp) {
        ctx.clearRect(0,0,canvas_width,canvas_height);
        BG.update()
        BG.draw()
        const deltatime = timestamp- lasttime;
        lasttime= timestamp;
        if(game_over == false){
            player.update(input.key)
            player.draw()
            Enemyclass.update(deltatime,player)
            Enemyclass.Enemy.forEach(Object => {
                Object.update(deltatime,player,timestamp);
                Object.draw()
            });
            explosion_array.forEach(object =>{
                object.update()
                object.draw()
            })
        }
        print_score(timestamp);
        
        requestAnimationFrame(animate);
    }
    animate(1);
    document.addEventListener("keydown",e=>{
        if(game_over == true){
            if(e.key ==="Enter"){
                lasttime = 0;
                score=0;
                game_over=false;
                explosion_array = []
                Enemyclass.Enemy = []
                player.x = 100;
                player.y = player.height-player.size;
                input.key=[]
                newenemy(Enemyclass)
            }
        }
    })
})