class StairsVertical {
    constructor(game, x, y, spritesheet, type, collideable) {
        Object.assign(this, { game, x, y, spritesheet, type, collideable });
        this.facing = [0]; // idle
        this.state = [0]; // idle
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

        this.animations[0][0] = new Animator(this.spritesheet, 32, 272, 32, 64, 1, 1, false, true);
       
    };
    
    update() { 
        this.facing = [0];
        this.state = [0];

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y + 80, 50, 48);
    };
    
    draw(ctx) {
        this.animations[this.facing][this.state]
        .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, 2);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        
        }
    
    };
    
};