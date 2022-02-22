class Lyra {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet });
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1
        this.speed = 1;
        this.velocity = { x : 0, y : 0 };


        this.firstKey = 0;
        this.secondKey = 0;
        this.thirdKey = 0;
        this.health = 300;

        this.flashlightTimer = 5;
        this.flashlightTimerMax = 5;

        this.stunTimer = 0;
        this.stunTime = 5;
        this.isStunned = false;

        this.animations = [];
        this.width = this.x + 128;
        this.hitpoints = 0;
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
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 32, 32, 4, 0.75, false, true);

        // idle animation w/ torch
        this.animations[2][0] = new Animator(this.spritesheet, 0, 156, 32, 32, 4, 0.75, false, true);

        // walking animation w/o torch
        this.animations[1][0] = new Animator(this.spritesheet, 0, 32, 32, 32, 4, 0.25, false, true);
        this.animations[1][1] = new Animator(this.spritesheet, 0, 94, 32, 32, 4, 0.25, false, true);
        this.animations[1][2] = new Animator(this.spritesheet, 0, 63, 32, 32, 4, 0.25, false, true);
        this.animations[1][3] = new Animator(this.spritesheet, 0, 125, 32, 32, 4, 0.25, false, true);

        // walking animation w/ torch
        this.animations[3][0] = new Animator(this.spritesheet, 0, 187, 32, 32, 4, 0.25, false, true);
        this.animations[3][1] = new Animator(this.spritesheet, 0, 249, 32, 32, 4, 0.25, false, true);
        this.animations[3][2] = new Animator(this.spritesheet, 0, 280, 32, 32, 4, 0.25, false, true);
        this.animations[3][3] = new Animator(this.spritesheet, 0, 218, 32, 32, 4, 0.25, false, true);

        };
    
    update() {

        let velocity_x = 0;
        let velocity_y = 0;

        this.state[0] = 0;
        this.facing[0] = 0;
        
        if (this.game.Q == false) {

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

        this.game.entities.forEach((entity) => {
            if (entity instanceof Witch) {
                if (this.flashlightBB && this.flashlightBB.collide(entity.BB)) {
                    this.isStunned = true;
                    // entity.state = 0;
                    entity.hP -= 1;
                    console.log(entity.hp);
                    if (this.isStunned == true) {
                            entity.state = 0;
                            console.log("Stunned witch");
                        
                    }
                }

                if (this.collisionBB && this.collisionBB.collide(entity.BB)) {
                    this.health--;
                    console.log("Lost hp");
                }
            }

            if (entity instanceof Zombie) {
                if (this.flashlightBB && this.flashlightBB.collide(entity.BB)) {
                    this.isStunned = true;
                    entity.hP -= 1;
                    if (this.isStunned == true) {
                        entity.state = 0;
                        console.log("Stunned zombie");
                    }

                }
                if (this.collisionBB && this.collisionBB.collide(entity.BB)) {
                    this.health--;
                    console.log("Lost hp");
                }
                
            }

            if (entity instanceof Key) {
                if (this.BB && this.BB.collide(entity.BB)) {

                    if (this.firstKey == 0) {
                        this.firstKey = 1;
                    } else if (this.secondKey == 0) {
                        this.secondKey = 1;
                    } else {
                        this.thirdKey = 1;
                    }

                    entity.removeFromWorld = true;

                    console.log("Collide");
                    console.log(this.firstKey, this.secondKey, this.thirdKey);
                }
            }

            if (entity instanceof LeftDoor) {
                if (this.BB && this.BB.collide(entity.BB)) {

                    if (entity.name == "kitchen" && this.firstKey == 1) {
                        entity.removeFromWorld = true;
                        console.log("removed kitchen left")
                    }

                    if (entity.name == "center" && this.secondKey == 1) {
                        entity.removeFromWorld = true;
                        console.log("removed center left")
                    }

                    if (entity.name == "front" && this.thirdKey == 1) {
                        entity.removeFromWorld = true;
                        console.log("removed front left")
                    }

                    //console.log("Collide");
                }
            }

            if (entity instanceof RightDoor) {
                if (this.BB && this.BB.collide(entity.BB)) {
                    
                    if (entity.name == "kitchen" && this.firstKey == 1) {
                        entity.removeFromWorld = true;
                        console.log("removed kitchen right")
                    }

                    if (entity.name == "center" && this.secondKey == 1) {
                        entity.removeFromWorld = true;
                        console.log("removed center right")
                    }

                    if (entity.name == "front" && this.thirdKey == 1) {
                        entity.removeFromWorld = true;
                        console.log("removed front right")
                    }

                    //console.log("Collide");
                }
            }


        });


    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 96, 96)
        this.hitBB = new BoundingBox(this.x + 30, this.y + 30, 36, 46);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 26, 36, 20);

        if (this.game.down && this.game.Q == true) {
            this.flashlightBB = new BoundingBox(this.x + 44, this.y + 70, 25, 25);
        }

        if (this.game.up && this.game.Q == true) {
            this.flashlightBB = new BoundingBox(this.x + 44, this.y, 25, 25);
        }

        if (this.game.left && this.game.Q == true) {
            this.flashlightBB = new BoundingBox(this.x, this.y + 50, 25, 25);
        }

        if (this.game.right && this.game.Q == true) {
            this.flashlightBB = new BoundingBox(this.x + 70, this.y + 48, 25, 25);
        }

    };
 
    draw(ctx) {
        this.animations[this.state][this.facing]
            .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 3);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
            ctx.strokeRect(this.collisionBB.x - this.game.camera.x, this.collisionBB.y - this.game.camera.y, this.collisionBB.width, this.collisionBB.height);

        if (this.game.down && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }

        if (this.game.up && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }
        
        if (this.game.left && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }

        if (this.game.right && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }

        }
    
    };

};
