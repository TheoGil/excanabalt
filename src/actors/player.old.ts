import { Actor, vec } from "excalibur";

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
    });
  }

  public onPostUpdate(_engine: ex.Engine, _delta: number) {
    console.log(_delta);

    this.pos.x += 1;
  }
}
