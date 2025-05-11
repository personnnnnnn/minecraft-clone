import { BLOCK_SIZE, CHUNK_LENGTH } from "./constants";
import { World } from "./logic/world/world";
import Vector2 from "./util/vector2";

export type Bounds = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export function chunkify(bounds: Bounds): Bounds {
  let { left, right, top, bottom } = bounds;

  left = Math.floor(left / CHUNK_LENGTH) - 1;
  right = Math.ceil(right / CHUNK_LENGTH) + 1;
  top = Math.ceil(top / CHUNK_LENGTH) + 2;
  bottom = Math.floor(bottom / CHUNK_LENGTH) - 1;

  return { left, right, top, bottom };
}

export class GameManager {
  ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;

  stepCallback = () => void this.step();
  intervalID: number | null = null;

  #framerate: number = 0;

  scaleFactor: number = BLOCK_SIZE;

  world: World = new World();

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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
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

  getRenderBounds(): Bounds {
    const left = this.player.x - this.width / 2;
    const right = this.player.x + this.width / 2;

    const top = this.player.y - this.height / 2;
    const bottom = this.player.y + this.height / 2;

    return { left, right, top, bottom };
  }

  step(): void {
    this.update();
    this.draw();
  }

  transformations(): void {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    this.ctx.scale(this.scaleFactor, this.scaleFactor);

    this.ctx.translate(-this.player.x, this.player.y);
  }

  draw(): void {
    this.transformations();

    const bounds = this.getRenderBounds();
    const chunkBounds = chunkify(bounds);
    this.world.loadChunksInBounds(this.getRenderBounds());

    for (let x = chunkBounds.left; x <= chunkBounds.right; x++) {
      for (let y = chunkBounds.bottom; y <= chunkBounds.top; y++) {
        const pos = new Vector2(x, y);
        const chunk = this.world.getChunkAt(pos);
        if (!chunk) {
          continue;
        }
        chunk.draw(this.ctx);
      }
    }
  }

  update(): void {
    this.player.x += 0.1;
    this.player.y -= 0.1;
  }
}
