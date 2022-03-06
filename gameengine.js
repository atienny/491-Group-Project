class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.action = false;

        this.mouse = null;
        this.click = null;

    };

    init(ctx) { // called after the page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        
        let that = this;

        this.ctx.canvas.addEventListener("keydown", function(e) {
            let direction = "";
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    direction = "left";
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    direction = "right";
                    break;
                case "ArrowUp":
                case "KeyW":
                    direction = "up";
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    direction = "down";
                    that.down = true;
                    break;
                case "KeyQ":
                    that.Q = !that.Q;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function(e) {
            let direction = "";
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    direction = "left";
                    break;
                case "ArrowRight":
                case "KeyD":
                    direction = "right";
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    direction = "up";
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    direction = "down";
                    that.down = false;
                    break;
            }
        }, false);

        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("click", e => {
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            this.mouse = getXandY(e);
        });

    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
        this.camera.draw(this.ctx);
    };

    update() {
        let entitiesCount = this.entities.length;
        
        for (let i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }
        this.camera.update();

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};