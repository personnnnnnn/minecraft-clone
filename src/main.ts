import "./style.scss";

export class GameManager {
  ctx: CanvasRenderingContext2D = this.canvas.getContext("2d")!;
  constructor(public canvas: HTMLCanvasElement) {}
}
