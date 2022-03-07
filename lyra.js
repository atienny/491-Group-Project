class Lyra {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet });
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1
        this.speed = 100;
        this.velocity = { x : 0, y : 0 };

        this.game.changeLevel = false;

        this.firstKey = 0;
        this.secondKey = 0;
        this.thirdKey = 0;
        this.fourthKey = 0;
        this.fifthKey = 0;
        this.sixthKey = 0;

        this.health = 600;
        this.win = false;

        this.flashlightTimer = 5;
        this.flashlightTimerMax = 5;

        this.stunTimer = 0;
        this.stunTimeMax = 5;
        this.isStunned = false;

        this.animations = [];
        this.width = this.x + 128;
        this.hitpoints = 0;
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {

        this.animations.push([], [], [], []);

        // idle w/o torch
        this.animations[0].push(new Animator(this.spritesheet, 0, 0, 32, 32, 4, 0.75, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 0, 94, 32, 32, 1, 0.75, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 0, 63, 32, 32, 1, 0.75, false, true));
        this.animations[0].push(new Animator(this.spritesheet, 0, 125, 32, 32, 1, 0.75, false, true));

        // walking w/o torch
        this.animations[1].push(new Animator(this.spritesheet, 0, 32, 32, 32, 4, 0.25, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 0, 94, 32, 32, 4, 0.25, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 0, 63, 32, 32, 4, 0.25, false, true));
        this.animations[1].push(new Animator(this.spritesheet, 0, 125, 32, 32, 4, 0.25, false, true));

        // idle w/ torch
        this.animations[2].push(new Animator(this.spritesheet, 0, 156, 32, 32, 4, 0.25, false, true));
        this.animations[2].push(new Animator(this.spritesheet, 0, 249, 32, 32, 1, 0.25, false, true));
        this.animations[2].push(new Animator(this.spritesheet, 0, 218, 32, 32, 1, 0.25, false, true));
        this.animations[2].push(new Animator(this.spritesheet, 0, 280, 32, 32, 1, 0.25, false, true));

        // walking w/ torch
        this.animations[3].push(new Animator(this.spritesheet, 0, 156, 32, 32, 4, 0.25, false, true));
        this.animations[3].push(new Animator(this.spritesheet, 0, 249, 32, 32, 4, 0.25, false, true));
        this.animations[3].push(new Animator(this.spritesheet, 0, 218, 32, 32, 4, 0.25, false, true));
        this.animations[3].push(new Animator(this.spritesheet, 0, 280, 32, 32, 4, 0.25, false, true));

        };
    
    update() {

        var down = this.game.down;
        var up = this.game.up;
        var right = this.game.right;
        var left = this.game.left;

        if (down) this.facing = 0;
        else if (up) this.facing = 1;
        else if (right) this.facing = 2;
        else if (left) this.facing = 3;

        if (this.flashlightTimer <= this.flashlightTimerMax) {
            this.flashlightTimer = Math.max(0, this.flashlightTimer + (this.game.clockTick/2));
            console.log(this.flashlightTimer);
        }

        if (left || right || up || down) {
            this.state = 1;
      
            if (left && !right) {
                this.velocity.x = -this.speed;
            }   else if (!left && right) {
                this.velocity.x = this.speed;
            } else if (!(left || right)) {
                this.velocity.x = 0;
            }

            if (up && !down) {
                this.velocity.y = -this.speed;
            } else if (!up && down) {
                this.velocity.y = this.speed;
            } else if (!(up || down)) {
                this.velocity.y = 0;
            }

            if (left && right) this.velocity.x = 0;
            if (up && down) this.velocity.y = 0;

        } else {
            this.state = 0;
            this.velocity.x = this.velocity.y = 0;
        }

        if (this.game.Q == true) {

            this.flashlightTimer = Math.max(0, this.flashlightTimer - this.game.clockTick);
            console.log(this.flashlightTimer);

            this.state = 2;

            if (down) this.facing = 0;
            else if (up) this.facing = 1;
            else if (right) this.facing = 2;
            else if (left) this.facing = 3

        if (left || right || up || down) {
            this.state = 3;
      
            if (left && !right) {
                this.velocity.x = -this.speed;
            }   else if (!left && right) {
                this.velocity.x = this.speed;
            } else if (!(left || right)) {
                this.velocity.x = 0;
            }

            if (up && !down) {
                this.velocity.y = -this.speed;
            } else if (!up && down) {
                this.velocity.y = this.speed;
            } else if (!(up || down)) {
                this.velocity.y = 0;
            }

            if (left && right) this.velocity.x = 0;
            if (up && down) this.velocity.y = 0;

        } else {
            this.state = 2;
            this.velocity.x = this.velocity.y = 0;
        }

        if (this.flashlightTimer == 0) {
            this.game.Q = false;
            console.log("timer at 0");
        }

        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

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
                    entity.isStunned = true;
                    console.log("is stunned");
                }

                if (this.collisionBB && this.collisionBB.collide(entity.BB)) {
                    this.health--;
                    console.log("Lost hp");
                }
            }

            if (entity instanceof Zombie) {
                if (this.flashlightBB && this.flashlightBB.collide(entity.BB)) {
                    entity.isStunned = true;
                    console.log("is stunned");
                }
                if (this.collisionBB && this.collisionBB.collide(entity.BB)) {
                    this.health--;
                    console.log("Lost hp");
                }
                
            }

            if (entity instanceof Key) {
                if (this.hitBB && this.hitBB.collide(entity.BB)) {

                    if (this.firstKey == 0) {
                        this.firstKey = 1;
                    } else if (this.secondKey == 0) {
                        this.secondKey = 1;
                    } else if (this.thirdKey == 0) {
                        this.thirdKey = 1;
                    } 

                    entity.removeFromWorld = true;

                    console.log("Collide");
                    console.log(this.firstKey, this.secondKey, this.thirdKey);
                }
            }

            if (entity instanceof LeftDoor) {
                if (this.BB && this.BB.collide(entity.BB)) {

                    if ((entity.name == "kitchen" && this.firstKey == 1) || 
                    (entity.name == "bedroomLeft" && this.firstKey == 1) || 
                    (entity.name == "inner" && this.firstKey == 1)) {
                        entity.removeFromWorld = true;
                        console.log("removed door")
                    }

                    if ((entity.name == "center" && this.secondKey == 1) || 
                    (entity.name == "bedroomRight" && this.secondKey == 1) ||
                    (entity.name == "mid" && this.secondKey == 1)) {
                        entity.removeFromWorld = true;
                        console.log("removed door")
                    }

                    if ((entity.name == "front" && this.thirdKey == 1) || 
                    (entity.name == "secondStairwell" && this.thirdKey == 1) ||
                    (entity.name == "outer" && this.thirdKey == 1)) {
                        entity.removeFromWorld = true;
                        this.win = true;
                        console.log("removed door")
                    }

                }
            }

            if (entity instanceof RightDoor) {
                if (this.BB && this.BB.collide(entity.BB)) {
                    
                    if ((entity.name == "kitchen" && this.firstKey == 1) || 
                    (entity.name == "bedroomLeft" && this.firstKey == 1) || 
                    (entity.name == "inner" && this.firstKey == 1)) {
                        entity.removeFromWorld = true;
                        console.log("removed door")
                    }

                    if ((entity.name == "center" && this.secondKey == 1) || 
                    (entity.name == "bedroomRight" && this.secondKey == 1) ||
                    (entity.name == "mid" && this.secondKey == 1)) {
                        entity.removeFromWorld = true;
                        console.log("removed door")
                    }

                    if ((entity.name == "front" && this.thirdKey == 1) || 
                    (entity.name == "secondStairwell" && this.thirdKey == 1) ||
                    (entity.name == "outer" && this.thirdKey == 1)) {
                        entity.removeFromWorld = true;
                        this.win = true;
                        console.log("removed door")
                    }

                }
            }

            if ((entity instanceof StairsTwotoOne)) {

                if (this.hitBB && this.hitBB.collide(entity.BB)) {
                    that.game.changeLevel = true;
                    console.log("stairs");
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

        if (this.facing == 0 && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }

        if (this.facing == 1 && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }
        
        if (this.facing == 2 && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }

        if (this.facing == 3 && this.game.Q == true) {
            ctx.strokeRect(this.flashlightBB.x - this.game.camera.x, this.flashlightBB.y - this.game.camera.y, this.flashlightBB.width, this.flashlightBB.height);
        }

        }
    
    };

};
