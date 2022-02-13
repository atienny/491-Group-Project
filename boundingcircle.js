class BoundingCircle {

    constructor (x, y, radius) {
        Object.assign(this, {x, y, radius});
        this.x = x;
        this.y = y; 
        this.radius = radius;
    };

    collide(other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        var distance = Math.sqrt(dx * dx + dy * dy); 

        return distance < this.radius + other.radius;
    }
};