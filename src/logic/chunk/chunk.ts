import { CHUNK_LENGTH, CHUNK_VOLUME } from "../../constants";
import { image } from "../asset-manager/asset-manager";
import { getBlockData } from "../block/block";
import { AIR, DIRT, GRASS } from "../block/included-blocks";

export class Chunk {
  blocks: number[];

  constructor(public cx: number, public cy: number) {
    this.blocks = new Array(CHUNK_VOLUME);
    for (let i = 0; i < CHUNK_VOLUME; i++) {
      this.blocks[i] = [AIR, GRASS, DIRT][Math.floor(Math.random() * 3)];
    }
  }

  calculateIndex(lx: number, ly: number): number {
    return lx + ly * CHUNK_LENGTH;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let x = 0; x < CHUNK_LENGTH; x++) {
      for (let y = 0; y < CHUNK_LENGTH; y++) {
        const i = this.calculateIndex(x, y);
        const block = this.blocks[i];
        const texture = getBlockData(block)?.texture;
        if (!texture) {
          continue;
        }

        const bx = this.cx * CHUNK_LENGTH + x;
        const by = this.cy * CHUNK_LENGTH + y;

        const img = image(texture);

        ctx.drawImage(img, bx, by, 1, 1);
      }
    }
  }
}
