class zombie {
        constructor(game, x, y, spritesheet) {
            Object.assign(this, { game, x, y, spritesheet });
            //this.facing = [0]; // down = 0, up = 1, right = 2, left = 3
            //this.state = [0]; // idle = 0, walking = 1
            //this.speed = 5;
            //this.velocity = { x : 0, y : 0 };
            //this.animations = [];
            //this.updateBB();
            //this.loadAnimations();
            this.animator = new Animator(this.spritesheet, 1500, 950, 60, 64, 1, 0.15)
        };
         
        
        // this.animator = new Animator(ASSET_MANAGER.getAsset("./zombie.png"), 1500, 950, 60, 64, 9, 0.15);
        // this.game = game;
        


    

    // loadAnimations() {
    //     for (let i = 0; i < 4; i++) { // 2 states
    //         this.animations.push([]);
    //         for (let j = 0; j < 4; j++) { // 4 facings
    //             this.animations[i].push([]);
    //         }  
    //     }
    // }

    update() { 

        // let velocity_x = 0;
        // let velocity_y = 0;

        // this.state[0] = 0;
        // this.facing[0] = 0;

        // if (this.game.Q == false) {
        //     this.state[0] = 0;
        //     this.facing[0] = 0;
        // }

        // if (this.game.Q == true) {
        //     this.state[0] = 2;
        //     this.facing[0] = 0;
        // } 

        // if (this.game.down) {
        //     velocity_y += this.speed;
        //     this.state[0] = 1;
        //     this.facing[0] = 0;
        // }

        // if (this.game.up) {
        //     velocity_y -= this.speed;
        //     this.state[0] = 1;
        //     this.facing[0] = 1;
        // }

        // if (this.game.right) {
        //     velocity_x += this.speed;
        //     this.state[0] = 1;
        //     this.facing[0] = 2;
        // }

        // if (this.game.left) {
        //     velocity_x -= this.speed;
        //     this.state[0] = 1;
        //     this.facing[0] = 3;
        // }
    
        // if (this.game.down & this.game.Q == true) {
        //     this.state[0] = 3;
        //     this.facing[0] = 0;
        // }

        // if (this.game.up & this.game.Q == true) {
        //     this.state[0] = 3;
        //     this.facing[0] = 1;
        // }

        // if (this.game.left & this.game.Q == true) {
        //     this.state[0] = 3;
        //     this.facing[0] = 2;
        // }

        // if (this.game.right & this.game.Q == true) {
        //     this.state[0] = 3;
        //     this.facing[0] = 3;
        // }

        // this.velocity.x = velocity_x;
        // this.velocity.y = velocity_y;

        // this.x += this.velocity.x;
        // this.y += this.velocity.y;
      
        // this.updateBB();

    };


    // updateBB() {
    //     this.lastBB = this.BB;
    //     this.BB = new BoundingBox(this.x + 10, this.y, 14 * PARAMS.SCALE, 19 * PARAMS.SCALE);
    // };


    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 1500, 950, PARAMS.SCALE)
    
    };

}