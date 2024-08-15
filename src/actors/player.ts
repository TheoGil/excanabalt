import {
  Actor,
  vec,
  Keys,
  CollisionType,
  Collider,
  CollisionContact,
  Side,
} from "excalibur";
import { Palette } from "../settings";
import { Tags } from "../tags";

const KEY_JUMP = Keys.Space;

export class Player extends Actor {
  readonly jumpVelocity = -1000;

  isGrounded = false;

  readonly maxHoldJumpTime = 225; // ms, for how long player keep jumping while jump key is held
  isHoldingJump = false;
  holdJumpTimer = 0;

  readonly maxJumpBufferTime = 100; // ms, tolerance threshold to queue jump if key is pressed few ms early
  isJumpBuffering = false;
  jumpBufferTimer = 0;

  constructor() {
    super({
      pos: vec(150, 150),
      width: 100,
      height: 100,
      color: Palette.Layer1,
      collisionType: CollisionType.Active,
    });
  }

  public onPostUpdate(engine: ex.Engine, delta: number): void {
    if (this.isJumpBuffering) {
      if (this.jumpBufferTimer <= this.maxJumpBufferTime && this.isGrounded) {
        // User has reached ground before buffer timer runs out
        this.jump();
      } else if (this.jumpBufferTimer > this.maxJumpBufferTime) {
        // Buffer timer has run out, cancel buffering
        this.cancelJumpBuffer();
      } else {
        // Increment buffer timer
        this.jumpBufferTimer += delta;
      }
    }

    // Initiate jump
    if (engine.input.keyboard.wasPressed(KEY_JUMP)) {
      this.isJumpBuffering = true;

      if (this.isGrounded) {
        this.jump();
      }
    }

    // Variable height jump
    if (engine.input.keyboard.isHeld(KEY_JUMP) && this.isHoldingJump) {
      this.body.useGravity = false;
      this.holdJumpTimer += delta;
    }

    // Terminate jump
    if (
      this.holdJumpTimer >= this.maxHoldJumpTime ||
      engine.input.keyboard.wasReleased(KEY_JUMP)
    ) {
      this.body.useGravity = true;
      this.isHoldingJump = false;
      this.holdJumpTimer = 0;
    }
  }

  jump() {
    this.cancelJumpBuffer();

    // Set variable jump flag
    this.isHoldingJump = true;

    // Update vertical velocity
    this.vel.y = this.jumpVelocity;
  }

  cancelJumpBuffer() {
    this.isJumpBuffering = false;
    this.jumpBufferTimer = 0;
  }

  onCollisionStart(
    _self: Collider,
    other: Collider,
    side: Side,
    _contact: CollisionContact
  ): void {
    if (side === Side.Bottom && other.owner.hasTag(Tags.Groundable)) {
      this.onCollideWithGroundStart();
    }
  }

  onCollisionEnd(
    _self: Collider,
    other: Collider,
    _side: Side,
    _lastContact: CollisionContact
  ): void {
    if (other.owner.hasTag(Tags.Groundable)) {
      this.onCollideWithGroundEnd();
    }
  }

  onCollideWithGroundStart() {
    this.isGrounded = true;
  }

  onCollideWithGroundEnd() {
    this.isGrounded = false;
  }
}
