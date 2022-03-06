class Animator {

    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse, loop });
        this.elapsedTime = 0;
        
        this.totalTime = this.frameCount * this.frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        ctx.drawImage(this.spritesheet, this.xStart + frame * this.width, 
                      this.yStart, this.width, this.height, x, y, this.width * scale, this.height * scale);
    };

    // Allows for scaling of height and width separately
    drawFrame2(tick, ctx, x, y, xscale, yscale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        
        ctx.drawImage(this.spritesheet, this.xStart + frame * this.width, 
                      this.yStart, this.width, this.height, x, y, this.width * xscale, this.height * yscale);
    };

    // For ghost transparency
    drawFrame3(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        
        ctx.globalAlpha = 0.7;
        ctx.drawImage(this.spritesheet, this.xStart + frame * this.width, 
                      this.yStart, this.width, this.height, x, y, this.width * scale, this.height * scale);
        ctx.globalAlpha = 1;
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return this.elapsedTime >= this.totalTime;
    };
};