class Witch {

    constructor(game, x, y, path, spritesheet) {
        Object.assign(this, {game, x, y, path, spritesheet});
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1, attacking = 2
        this.speed = 25;
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};
        this.elapsedTime = 0;
        this.respawnTimer = 0;
        this.respawnTime = 15;
        this.waitingToRespawn = false;
        this.visualRadius = 200;
        this.hP = 500;
        this.animations = [];
        this.state = 1;
        this.updateBB();
        this.loadAnimations();
    };

    reset() {
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1, attacking = 2
        this.speed = 25;
        this.targetID = 0;
        if (this.path && this.path[this.targetID]) this.target = this.path[this.targetID];

        var dist = distance(this, this.target);
        this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};
        this.elapsedTime = 0;
        this.respawnTimer = 0;
        this.respawnTime = 15;
        this.waitingToRespawn = false;
        this.visualRadius = 200;
        this.hP = 500;
        this.animations = [];
        this.state = 1;
        this.updateBB();
        this.loadAnimations();
        this.update();
    }

    loadAnimations() {
        for (let i = 0; i < 4; i++) { // 4 states
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
        this.animations[2][1] = new Animator(this.spritesheet, 0, 4, 64, 59, 7, 0.20, false, true);
        this.animations[2][2] = new Animator(this.spritesheet, 0, 197, 64, 60, 7, 0.20, false, true);
        this.animations[2][3] = new Animator(this.spritesheet, 0, 64, 64, 64, 7, 0.20, false, true);

        // death animation
        this.animations[3][0] = new Animator(this.spritesheet, 0, 1286, 64, 59, 13, 0.2, false, false);

    };

    update() {
        this.elapsedTime += this.game.clockTick;
        if (this.waitingToRespawn) {
            this.respawnTimer += this.game.clockTick;
            if (this.respawnTimer >= this.respawnTime) {
                console.log("Respawn Witch");
                this.reset();
            }
        }

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
                } else if (this.elapsedTime > .8) {
        
                    ent.hitpoints -= 1;   
                    this.elapsedTime = 0;
                }
                //this.target = ent;
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

        
        if (this.state !== 2 && this.state !== 3) {
            dist = distance(this, this.target);
            this.getFacing();
            this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
        }

        if (this.hP <= 0) {
            this.state = 3;
            this.waitingToRespawn = true;
        }
        
        this.getFacing();


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

        this.getFacing();
        this.updateBB();
    };



    collide(ent) {
        return (distance(this, ent) < (this.visualRadius / 2));
    };

    getFacing() {
        if (this.state == 3) {
            this.facing[0] = 0;
        } else {
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
        }   
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 68, 59)
        this.hitBB = new BoundingBox(this.x + 17, this.y, 34, 59);
        this.collisionBB = new BoundingBox(this.hitBB.x, this.hitBB.y + 34, 34, 25);

        this.lastBC = this.BC;
        this.BC = new BoundingCircle(this.x, this.y, this.visualRadius);
    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.hitBB.x - this.game.camera.x, this.hitBB.y - this.game.camera.y, this.hitBB.width, this.hitBB.height);
            ctx.strokeRect(this.collisionBB.x - this.game.camera.x, this.collisionBB.y - this.game.camera.y, this.collisionBB.width, this.collisionBB.height);

            ctx.beginPath();
            ctx.arc(this.BC.x - this.game.camera.x + 33, this.BC.y - this.game.camera.y + 30, this.visualRadius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    
    };

};