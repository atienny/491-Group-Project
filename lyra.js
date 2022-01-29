class Lyra {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet });
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1
        this.speed = 1.5;
        this.velocity = { x : 0, y : 0 };
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (let i = 0; i < 4; i++) { // 2 states
            this.animations.push([]);
            for (let j = 0; j < 4; j++) { // 4 facings
                this.animations[i].push([]);
            }  
        }

        // idle animation w/o torch
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 32, 32, 1, 0.25, false, true);

        // idle animation w/ torch
        this.animations[2][0] = new Animator(this.spritesheet, 0, 124, 32, 32, 1, 0.25, false, true);

        // walking animation w/o torch
        this.animations[1][0] = new Animator(this.spritesheet, 0, 0, 32, 32, 4, 0.25, false, true);
        this.animations[1][1] = new Animator(this.spritesheet, 0, 62, 32, 32, 4, 0.25, false, true);
        this.animations[1][2] = new Animator(this.spritesheet, 0, 31, 32, 32, 4, 0.25, false, true);
        this.animations[1][3] = new Animator(this.spritesheet, 0, 93, 32, 32, 4, 0.25, false, true);

        // walking animation w/ torch
        this.animations[3][0] = new Animator(this.spritesheet, 0, 124, 32, 32, 4, 0.25, false, true);
        this.animations[3][1] = new Animator(this.spritesheet, 0, 186, 32, 32, 4, 0.25, false, true);
        this.animations[3][2] = new Animator(this.spritesheet, 0, 217, 32, 32, 4, 0.25, false, true);
        this.animations[3][3] = new Animator(this.spritesheet, 0, 155, 32, 32, 4, 0.25, false, true);

        };
    
    update() { 

        let velocity_x = 0;
        let velocity_y = 0;

        this.state[0] = 0;
        this.facing[0] = 0;

        if (this.game.Q == false) {
            this.state[0] = 0;
            this.facing[0] = 0;
        }

        if (this.game.Q == true) {
            this.state[0] = 2;
            this.facing[0] = 0;
        } 

        if (this.game.down) {
            velocity_y += this.speed;
            this.state[0] = 1;
            this.facing[0] = 0;
        }

        if (this.game.up) {
            velocity_y -= this.speed;
            this.state[0] = 1;
            this.facing[0] = 1;
        }

        if (this.game.right) {
            velocity_x += this.speed;
            this.state[0] = 1;
            this.facing[0] = 2;
        }

        if (this.game.left) {
            velocity_x -= this.speed;
            this.state[0] = 1;
            this.facing[0] = 3;
        }
    
        if (this.game.down & this.game.Q == true) {
            this.state[0] = 3;
            this.facing[0] = 0;
        }

        if (this.game.up & this.game.Q == true) {
            this.state[0] = 3;
            this.facing[0] = 1;
        }

        if (this.game.left & this.game.Q == true) {
            this.state[0] = 3;
            this.facing[0] = 2;
        }

        if (this.game.right & this.game.Q == true) {
            this.state[0] = 3;
            this.facing[0] = 3;
        }

        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
      
        this.updateBB();

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 10, this.y, 42 * PARAMS.SCALE, 57 * PARAMS.SCALE);
    };
    
    draw(ctx) {
        this.animations[this.state][this.facing]
            .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
        }
    
    };

};