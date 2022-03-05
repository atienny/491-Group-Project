class RightDoor {
    constructor(game, x, y, spritesheet, name, collideable) {
        Object.assign(this, { game, x, y, spritesheet, collideable });
        this.facing = [0]; // idle
        this.state = [0]; // idle
        this.animations = [];
        this.updateBB();
        this.loadAnimations();
        this.name = name;
    };

    loadAnimations() {
        for (let i = 0; i < 6; i++) {
            this.animations.push([]);
            for (let j = 0; j < 6; j++) { 
                this.animations[i].push([]);
            }  
        }
        // door opening animation
        this.animations[0][0] = new Animator(this.spritesheet, 13.1, 278, 48, 48, 1, 1, false, true);
        };
    
    update() { 
        this.facing = [0];
        this.state = [0];
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 5, this.y + 4, 48, 60);
    };
    
    draw(ctx) {
        this.animations[this.facing][this.state]
        .drawFrame2(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 1.52 * PARAMS.SCALE, 1.35 * PARAMS.SCALE);
        
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
        }
    
    };
    
};