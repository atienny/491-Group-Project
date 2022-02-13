class Zombie {
    constructor(game, x, y, path, spritesheet) {

        Object.assign(this, {game, x, y, path, spritesheet});
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1, attacking = 2
        this.speed = 25;
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        // Object.assign(this, {game, x, y, spritesheet});
        // this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        // this.state = [0]; // idle = 0, walking = 1, attacking = 2
    
        // this.velocity = { x : 0, y : 0 };
        // this.animations = [];

        var dist = distance(this, this.target);
        this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};
        this.elapsedTime = 0;
        this.visualRadius = 200;
        this.animations = [];
        this.state = 1;

        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (let i = 0; i < 3; i++) { // 3 states
            this.animations.push([]);
            for (let j = 0; j < 4; j++) { // 4 facings
                this.animations[i].push([]);
            }  
        }

// idle animation
this.animations[0][0] = new Animator(this.spritesheet, 0, 644, 64, 59, 1, 0.1, false, true);
this.animations[0][1] = new Animator(this.spritesheet, 0, 517, 64, 59, 1, 0.1, false, true);
this.animations[0][2] = new Animator(this.spritesheet, 0, 709, 64, 59, 1, 0.1, false, true);
this.animations[0][3] = new Animator(this.spritesheet, 0, 581, 64, 59, 1, 0.1, false, true);

// walking animation
this.animations[1][0] = new Animator(this.spritesheet, 0, 644, 64, 59, 9, 0.1, false, true);
this.animations[1][1] = new Animator(this.spritesheet, 0, 517, 64, 59, 9, 0.1, false, true);
this.animations[1][2] = new Animator(this.spritesheet, 0, 709, 64, 59, 9, 0.1, false, true);
this.animations[1][3] = new Animator(this.spritesheet, 0, 581, 64, 59, 9, 0.1, false, true);

// attacking animation
this.animations[2][0] = new Animator(this.spritesheet, 0, 133, 64, 59, 7, 0.20, false, true);
this.animations[2][1] = new Animator(this.spritesheet, 0, 4, 64, 60, 7, 0.20, false, true);
this.animations[2][2] = new Animator(this.spritesheet, 0, 197, 64, 60, 7, 0.20, false, true);
this.animations[2][3] = new Animator(this.spritesheet, 0, 64, 64, 64, 7, 0.20, false, true);

//this.animations[2][2] = new Animator(this.spritesheet, 0, 256, 64, 60, 7, 0.25, false, true);
//this.animations[2][3] = new Animator(this.spritesheet, 0, 128, 64, 59, 7, 0.25, false, true);


    };

    update() {
        this.elapsedTime += this.game.clockTick;
        var dist = distance(this, this.target);
        this.getFacing();
        if (dist < 5) {
            if (this.targetID < this.path.length - 1 && this.target === this.path[this.targetID]) {
                this.targetID++;
            }
            this.target = this.path[this.targetID];
            dist = distance(this, this.target);
            this.getFacing();
            
            if (this.target === this.path[1] && dist < 5) {
                this.targetID--;
                this.target = this.path[this.targetID];
                dist = distance(this, this.target);
                this.getFacing();
            }
            this.target = this.path[this.targetID];
            dist = distance(this, this.target);
            this.getFacing();
        }

        for (var i = 0; i < this.game.entities.length; i++) {
            var ent = this.game.entities[i];
            if (ent instanceof Lyra && canSee(this, ent)) {
                this.target = ent;
                this.getFacing();
            }
            if (ent instanceof Lyra && this.collide(ent)) {
                if (this.state !== 2) {
                    this.state = 2;
                    this.elapsedTime = 0;
                } else if (this.elapsedTime> .8) {
                    //ent.hitpoints -= 8;   
                    //this.elapsedTime = 0;
                }
                this.target = ent;
                this.getFacing();
                
            }
            if (ent instanceof Lyra && this.state == 2 && !this.collide(ent)) {
                this.getFacing();
                this.state = 1;
                this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};
                this.x += this.velocity.x * this.game.clockTick;
                this.y += this.velocity.y * this.game.clockTick;
            }
        }

        if (this.state !== 2) {
            dist = distance(this, this.target);
            this.getFacing();
            this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }
        
        this.getFacing();
        this.updateBB();
    };

    collide(ent) {
        return (distance(this, ent) < (this.visualRadius / 2));
    };

    getFacing() {
        if (this.velocity.x === 0 && this.velocity.y === 0) this.facing[0] = 0;
        let angle = Math.atan2(this.velocity.y, this.velocity.x) * 180 / Math.PI;
        
        if (-135 <= angle && angle < -45) {
            this.facing[0] = 1;
        } else if (45 <= angle && angle <= 135) {
            this.facing[0] = 0;
        } else if (45 > angle && angle > -45) {
            this.facing[0] = 2;
        } else if (135 < angle || angle < -135) {
            this.facing[0] = 3;
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 15, this.y + 9, 34 * 1, 49 * 1);

        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x, this.y, this.visualRadius);
    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
            ctx.beginPath();
            ctx.arc(this.BC.x - this.game.camera.x + 33, this.BC.y - this.game.camera.y + 30, this.visualRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    
    };

};