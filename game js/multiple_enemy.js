/**@type {HTMLCanvasElement} */
document.addEventListener("DOMContentLoaded",()=>{
    const canvas = document.getElementById("canva1");
    const ctx = canvas.getContext("2d");
    const canvas_WIDTH =canvas.width = 1000;
    const canvas_HEIGHT = canvas.height = 700;
    const no_of_frames = 6;
    //game class to call all other class by using this class
    class game{
        constructor(ctx,height,width){
            this.enemylis = [];
            this.ctx = ctx;
            this.height = height;
            this.width = width;
            this.timer = 0;
            this.requiredtime = 500;
            //this.classes = [worm,Bat,Spider,Fluffy,Bird,Ghost]
            this.classes = [worm,Spider,Bat]
            this.#addnewenemy(worm)
        }
        update(deltatime){
            this.enemylis = this.enemylis.filter(object=>!object.markedfordelition)
            if(this.timer>this.requiredtime){
                let cls = Math.floor(Math.random()*this.classes.length)
                this.#addnewenemy(this.classes[cls]);
                this.timer = 0;
            }
            else this.timer+=deltatime;
            this.enemylis.forEach(object=>object.update());
        }
        draw(){
            this.enemylis.forEach(object=>object.draw(this.ctx));
        }
        #addnewenemy(cls){
            this.enemylis.push(new cls(this))
        }
    }
    //enemy class to create its child class
    class enemy{
        constructor(game){
            this.game = game;
            this.frame = 0;
            this.frameno = 0;
            this.markedfordelition = false;
        }
        update(){
            this.x-=this.speed;
            this.frame++;
            this.frameno = Math.floor((this.frame/this.framespeed)%no_of_frames)
            if(this.x<-this.width)this.markedfordelition = true;
        }
        draw(ctx){
            //ctx.fillRect(this.x,this.y,this.width,this.height);
            ctx.drawImage(this.image,this.frameno*this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height)
        }
    }
    //enemy child classes
    class worm extends enemy{
        constructor(game){
            super(game)
            this.image = Worm;
            this.x = this.game.width;
            this.spritewidth = 229;
            this.spriteheight = 171;
            this.height = this.spriteheight/2;
            this.width = this.spritewidth/2;
            this.y = this.game.height-this.height;
            this.speed=Math.random()*4 +1
            this.framespeed = Math.random()*20+10
        }
    }
    class Spider extends enemy{
        constructor(game){
            super(game)
            this.image = spider;
            this.spritewidth = 310;
            this.spriteheight = 175;
            this.height = this.spriteheight/2;
            this.width = this.spritewidth/2;
            this.x =  Math.random()*this.game.width*0.8;
            this.y =-this.height;
            this.speed=Math.random()*4 +1
            this.framespeed = Math.random()*20+10
            this.maxy= Math.random()*(this.game.height-this.spriteheight)
        }
        update(){
            if(this.y<-this.height)this.markedfordelition = true;
            this.y+= this.speed;
            this.frame++;
            this.frameno = Math.floor((this.frame/this.framespeed)%no_of_frames)
            if (this.y>this.maxy)this.speed = this.speed*-1;
        }
        draw(ctx){
            ctx.beginPath();
            ctx.moveTo(this.x+(this.width/2),0);
            ctx.lineTo(this.x+(this.width/2),this.y+this.height/2)
            ctx.stroke()
            super.draw(ctx)
        }
    }
    class Ghost extends enemy{
        constructor(game){
            super(game)
            this.image = ghost;
            this.x = this.game.width;
            this.spritewidth = 260;
            this.spriteheight = 207;
            this.height = this.spriteheight/2;
            this.width = this.spritewidth/2;
            this.y = Math.random()*this.game.height*0.6;
            this.speed=Math.random()*4 +1
            this.framespeed = Math.random()*20+10
            this.opesity = Math.random();
            this.opesityspeed =Math.floor(Math.random()*20+30);
        }
        update(){
            super.update();
            if(this.frame%this.opesityspeed==0)this.opesity = Math.random();
        }
        draw(){
            ctx.save();
            ctx.globalAlpha = this.opesity;
            super.draw(ctx);
            ctx.restore();
        }
    }
    class Bat extends enemy{
        constructor(game){
            super(game)
            this.image = bat;
            this.x = this.game.width;
            this.spritewidth = 293;
            this.spriteheight = 155;
            this.height = this.spriteheight/2;
            this.width = this.spritewidth/2;
            this.y = Math.random()*this.game.width*0.6;
            this.speed=Math.random()*4 +1
            this.framespeed = Math.random()*5+10
        }
    }
    class Bird extends enemy{
        constructor(game){
            super(game)
            this.image = bird;
            this.x = this.game.width;
            this.spritewidth = 267;
            this.spriteheight = 186;
            this.height = this.spriteheight/2;
            this.width = this.spritewidth/2;
            this.y = Math.random()*this.game.width*0.6;
            this.speed=Math.random()*4 +1
            this.framespeed = Math.random()*20+10
        }
    }
    class Fluffy extends enemy{
        constructor(game){
            super(game)
            this.image = fluffy;
            this.x = this.game.width;
            this.spritewidth = 218;
            this.spriteheight = 186;
            this.height = this.spriteheight/2;
            this.width = this.spritewidth/2;
            this.y = Math.random()*this.game.width*0.6;
            this.speed=Math.random()*4 +1
            this.framespeed = Math.random()*20+10
        }
    }
    let lasttime=0;
    const enemy1 = new game(ctx,canvas_HEIGHT,canvas_WIDTH);
    function animate(timestamp) {
        ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT);
        enemy1.draw()
        const deltatime = timestamp-lasttime;
        enemy1.update(deltatime)
        lasttime = timestamp;
        requestAnimationFrame(animate)
    }
    animate(1)
})
