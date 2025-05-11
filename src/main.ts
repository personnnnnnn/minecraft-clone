import "./style.scss";
import { Vector2 } from "./util/vector2";

export class GameManager {
  ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;

  stepCallback = () => void this.step();
  intervalID: number | null = null;

  #framerate: number = 0;

  scaleFactor: number = 10;

  get framerate(): number {
    return this.#framerate;
  }

  set framerate(value: number) {
    this.#framerate = value;
    if (this.intervalID !== null) {
      window.clearInterval(this.intervalID);
      this.intervalID = null;
    }
    if (this.#framerate > 0) {
      this.intervalID = window.setInterval(
        this.stepCallback,
        1000 / this.#framerate
      );
    }
  }

  player: Vector2 = new Vector2();

  constructor(public canvas: HTMLCanvasElement) {
    this.framerate = 60;
  }

  get canvasWidth(): number {
    return this.canvas.width;
  }

  get canvasHeight(): number {
    return this.canvas.height;
  }

  get width(): number {
    return this.canvasWidth / this.scaleFactor;
  }

  get height(): number {
    return this.canvasHeight / this.scaleFactor;
  }

  step(): void {
    this.update();
    this.draw();
  }

  transformations(): void {
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.scale(this.scaleFactor, this.scaleFactor);

    this.ctx.translate(-this.player.x, -this.player.y);
  }

  draw(): void {
    this.transformations();

    // test rect
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(1, 1, 1, 1);
  }

  update(): void {}
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  const manager = new GameManager(canvas);
  console.log("Hello, World!");
});
