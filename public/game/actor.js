/* global Victor */
class Actor {
  constructor(id, pos, size, vel, ang, accel, velCap, turnSpeed, image, mode="client") {
    this.id = id;
    this.pos = pos;
    this.size = size;
    this.vel = vel;
    this.ang = ang;
    this.friction = 0.004;
    this.image = image;
    this.frameRate = -1;
    this.mode = mode;
    this.accel = accel;
    this.velCap = velCap;
    this.turnSpeed = turnSpeed;
  }
  
  update() {
    if(this.vel > 0.1) {
      this.vel = Math.min(this.vel, this.velCap);
      this.vel *= (1-this.friction);

      let force = new Victor(0, 1).rotate(this.ang); // this still uses p5, please use victor.js
      force.multiply(new Victor(this.vel, this.vel));

      this.pos.add(force);
    }
  }
  
  turn(dir=-1) { // -1 for left, +1 for right.
    this.ang += dir * this.turnSpeed;
  }

  boost() { // accelerates the ships velocity.
    this.vel += this.accel;
  }
  
  draw(ctx, cam) {
    if(this.image[0] == "#") {
      //TODO rectangle rendering
      ctx.fillStyle = this.image;
      let drawPos = new Victor(this.pos.x - this.size.x - cam.x, this.pos.y - this.size.y - cam.y);
      ctx.fillRect(drawPos.x, drawPos.y, drawPos.x + this.size.x, drawPos.y + this.size.y);
    } else {
      //TODO sprite rendering
    }
  }
}
