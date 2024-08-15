import { Actor, vec, Color } from "excalibur";
import type { Engine } from "excalibur";

const SPEED_X = 10;

export class Platform extends Actor {
  engine: Engine;

  constructor({ engine }: { engine: Engine }) {
    super({
      pos: vec(
        engine.screen.viewport.width / 2,
        engine.screen.viewport.height / 2
      ),
      width: 100,
      height: 100,
      color: Color.Chartreuse,
    });

    this.engine = engine;
  }

  onInitialize() {
    // this.graphics.add(Resources.Sword.toSprite());
    // this.on("pointerup", () => {
    //   alert("yo");
    // });
    console.log("Init");
  }

  public onPostUpdate(_engine: ex.Engine, _delta: number) {
    this.pos.x -= SPEED_X;

    if (this.pos.x + this.width / 2 < 0) {
      debugger;
      this.kill();
    }
  }
}
