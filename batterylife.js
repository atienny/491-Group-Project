class BatteryLife {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y, spritesheet });
        this.facing = [0]; // idle
        this.state = [0]; // 6 different states
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (let i = 0; i < 6; i++) {
            this.animations.push([]);
            for (let j = 0; j < 6; j++) { 
                this.animations[i].push([]);
            }  
        }
        // 5 green bars
        this.animations[0][0] = new Animator(this.spritesheet, 58, 41, 238, 94, 1, 1, false, true);

        // 4 green bars
        this.animations[0][1] = new Animator(this.spritesheet, 296, 41, 238, 94, 1, 1, false, true);

        // 3 green bars
        this.animations[0][2] = new Animator(this.spritesheet, 534, 41, 238, 94, 1, 1, false, true);

        // 2 green bars
        this.animations[0][3] = new Animator(this.spritesheet, 770, 41, 238, 94, 1, 1, false, true);

        // 1 red bar
        this.animations[0][4] = new Animator(this.spritesheet, 1008, 41, 238, 94, 1, 1, false, true);

        // no battery remaining
        this.animations[0][5] = new Animator(this.spritesheet, 1246, 41, 238, 94, 1, 1, false, true);
        };
    
    update() { 
        this.facing[0] = 0;
        this.state[0] = 0;
        if (this.flashlightTimer == this.flashlightTimerMax) {
            this.state[0] = 0;
        }
        else if (this.flashlightTimer < this.flashlightTimerMax && (this.flashlighTimer > (this.flashlightTimerMax / 5) * 4)) {
            this.state[0] = 1;
        }
        else if (this.flashlightTimer < this.flashlightTimerMax && (this.flashlighTimer > (this.flashlightTimerMax / 5) * 3)) {
            this.state[0] = 2;
        }
        else if (this.flashlightTimer < this.flashlightTimerMax && (this.flashlighTimer > (this.flashlightTimerMax / 5) * 2)) {
            this.state[0] = 3;
        }
        else if (this.flashlightTimer < this.flashlightTimerMax && (this.flashlighTimer > (this.flashlightTimerMax / 5))) {
            this.state[0] = 4;
        }
        else if (this.flashlightTimer < this.flashlightTimerMax && (this.flashlighTimer < (this.flashlightTimerMax / 5))) {
            this.state[0] = 5;
        }
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 10, this.y, 14 * PARAMS.SCALE, 19 * PARAMS.SCALE);
    };
    
    draw(ctx) {
        this.animations[this.facing][this.state]
        .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 0.5 * PARAMS.SCALE);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
        }
    
    };

};