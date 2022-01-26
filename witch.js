class Witch {

    constructor(game, x, y, spritesheet) {
        Object.assign(this, {game, x, y, spritesheet});
        this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
        this.state = [0]; // idle = 0, walking = 1, attacking = 2
        this.speed = 1;
        this.velocity = { x : 0, y : 0 };
        this.animations = [];
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
        this.animations[0][0] = new Animator(this.spritesheet, 16, 640, 32, 59, 1, 0.25, false, true);

        // walking animation
        this.animations[1][0] = new Animator(this.spritesheet, 16, 640, 32, 59, 9, 0.1, false, true);
        this.animations[1][1] = new Animator(this.spritesheet, 16, 768, 32, 59, 9, 0.1, false, true);
        this.animations[1][2] = new Animator(this.spritesheet, 16, 703, 32, 59, 9, 0.1, false, true);
        this.animations[1][3] = new Animator(this.spritesheet, 16, 576, 32, 59, 9, 0.1, false, true);

        // attacking animation
        this.animations[2][0] = new Animator(this.spritesheet, 16, 191, 32, 59, 7, 0.25, false, true);
        this.animations[2][1] = new Animator(this.spritesheet, 16, 64, 32, 59, 7, 0.25, false, true);
        this.animations[2][2] = new Animator(this.spritesheet, 16, 256, 32, 59, 7, 0.25, false, true);
        this.animations[2][3] = new Animator(this.spritesheet, 16, 128, 32, 59, 7, 0.25, false, true);

    };

    update() {
        let velocity_x = 0;
        let velocity_y = 0;
        this.state[0] = 0;
        this.facing[0] = 0;

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
        
        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 32 * PARAMS.SCALE, 32 * PARAMS.SCALE);
    };

    draw(ctx) {
        this.animations[this.state][this.facing]
            .drawFrame(this.game.clockTick, ctx, this.x /*- this.game.camera.x*/, this.y /*- this.game.camera.y*/, PARAMS.SCALE);
    
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x/* - this.game.camera.x*/, this.BB.y/* - this.game.camera.y*/, this.BB.width, this.BB.height);
        
        }
    
    };

};