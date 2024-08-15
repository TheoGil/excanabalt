import {
  Engine,
  Actor,
  Vector,
  vec,
  Line,
  Color,
  SolverStrategy,
  CollisionType,
} from "excalibur";
import { loader } from "./resources";
import { Player } from "./actors/player";
import { Palette } from "./settings";
import { Tags } from "./tags";

class Game extends Engine {
  constructor() {
    super({
      width: 800,
      height: 600,
      backgroundColor: Palette.Layer4,
      physics: {
        solver: SolverStrategy.Arcade,
        gravity: vec(0, 10000),
      },
    });
  }

  initialize() {
    const player = new Player();

    // const lineActor = new Actor({
    //   pos: vec(0, 0),
    // });
    // lineActor.graphics.anchor = Vector.Zero;
    // lineActor.graphics.use(
    //   new Line({
    //     start: vec(0, 400),
    //     end: vec(800, 400),
    //     color: Color.Green,
    //     thickness: 2,
    //   })
    // );
    // game.add(lineActor);
    const ground = new Actor({
      pos: vec(this.halfDrawWidth, this.drawHeight),
      width: this.drawWidth,
      height: 100,
      color: Palette.Layer2,
      collisionType: CollisionType.Fixed,
    });
    ground.addTag(Tags.Groundable);

    this.add(player);
    this.add(ground);

    this.start(loader);
  }

  onPostUpdate() {
    // Update platforms
  }
}

export const game = new Game();
game.initialize();
