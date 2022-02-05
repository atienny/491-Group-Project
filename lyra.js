class Lyra {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet });
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1
        this.speed = 1.5;
        this.velocity = { x : 0, y : 0 };


        this.flashlightTimer = 5;
        this.flashlightTimerMax = 5;


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

            // this.flashlightTimer = Math.max(0, this.flashlightTimer + this.game.clockTick);
            // console.log(this.flashlightTimer);

            if (this.flashlightTimer <= this.flashlightTimerMax) {
                this.flashlightTimer = Math.max(0, this.flashlightTimer + (this.game.clockTick/2));
                console.log(this.flashlightTimer);
            }

            this.state[0] = 0;
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

// 

        if (this.game.Q == true) {

            this.flashlightTimer = Math.max(0, this.flashlightTimer - this.game.clockTick);
            console.log(this.flashlightTimer);
            
            this.state[0] = 2;
            this.facing[0] = 0;

            if (this.flashlightTimer == 0) {
                this.game.Q = false;
                console.log("timer at 0");
            }

        // }

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

    }

        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
         
        // this.updateBB();

        this.originalCollisionBB = this.collisionBB;
        this.updateBB();
        let collisionList = [];

        let that = this;
        this.game.entities.forEach(function(entity) {
            if (entity.collideable && that.collisionBB.collide(entity.BB)) { 
                collisionList.push(entity);
            }
        });

        if (collisionList.length > 0) {
            collisionList.sort((boundary1, boundary2) => distance(this.collisionBB.center, boundary1.BB.center) -
                                                         distance(this.collisionBB.center, boundary2.BB.center));
            for (let i = 0; i < collisionList.length; i++) {
                if (this.collisionBB.collide(collisionList[i].BB)) {
                    Collision.resolveCollision(this, collisionList[i]);
                    this.updateBB();
                }
            }
        }

    };

    updateBB() {
        // this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 27, this.y + 23, 42 * PARAMS.SCALE, 52 * PARAMS.SCALE);
        this.wallBB = new BoundingBox(this.x + 35, this.y + 49, 26 * PARAMS.SCALE, 26 * PARAMS.SCALE);
        this.collisionBB = new BoundingBox(this.wallBB.x + 27 * PARAMS.SCALE, this.wallBB.y + 23 * PARAMS.SCALE, 10 * PARAMS.SCALE, 10 * PARAMS.SCALE);
    };
    
    draw(ctx) {
        this.animations[this.state][this.facing]
            .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.wallBB.x - this.game.camera.x, this.wallBB.y - this.game.camera.y, this.wallBB.width, this.wallBB.height);
            ctx.strokeRect(this.collisionBB.x - this.game.camera.x, this.collisionBB.y - this.game.camera.y, this.collisionBB.width, this.collisionBB.height);
        }
    
    };

};
