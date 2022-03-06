class Spell {
    constructor(game, x, y, target, spritesheet, heatSeeking) {
        Object.assign(this, {game, x, y, target, spritesheet, heatSeeking});
        this.speed = 30;
        this.radius = 12;
        this.smooth = false;
        var dist = distance(this, this.target)

        this.velocity = {x: (this.target.x - this.x) / dist * this.speed, y: (this.target.y - this.y) / dist * this.speed};

        this.cache = [];

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 16, 16, 4, 0.2, false, false));
        this.elapsedTime = 0;
    };

    drawAngle(ctx, angle) {
        if (angle < 0 || angle > 359) return;


        if (!this.cache[angle]) {
           let radians = angle / 360 * 2 * Math.PI;
           let offscreenCanvas = document.createElement('canvas');

            offscreenCanvas.width = 32;
            offscreenCanvas.height = 32;

            let offscreenCtx = offscreenCanvas.getContext('2d');

            offscreenCtx.save();
            offscreenCtx.translate(16, 16);
            offscreenCtx.rotate(radians);
            offscreenCtx.translate(-16, -16);
            offscreenCtx.drawImage(this.spritesheet, 80, 0, 32, 32, 0, 0, 32, 32);
            offscreenCtx.restore();
            this.cache[angle] = offscreenCanvas;
        }
        var xOffset = 16;
        var yOffset = 16;

        ctx.drawImage(this.cache[angle], this.x - xOffset, this.y - yOffset);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.x - xOffset, this.y - yOffset, 32, 32);
        }
    };
}