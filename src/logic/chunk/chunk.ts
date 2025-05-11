import { CHUNK_LENGTH, CHUNK_VOLUME } from "../../constants";
import Vector2 from "../../util/vector2";
import { image } from "../asset-manager/asset-manager";
import { getBlockData } from "../block/block";
import { AIR, DIRT, GRASS } from "../block/included-blocks";

export class Chunk {
  blocks: number[];

  constructor(public pos: Vector2) {
    this.blocks = new Array(CHUNK_VOLUME);
    for (let x = 0; x < CHUNK_LENGTH; x++) {
      for (let y = 0; y < CHUNK_LENGTH; y++) {
        const lpos = new Vector2(x, y);
        const i = this.calculateIndex(lpos);
        const bpos = this.calculateGlobalPostion(lpos);
        const terrainH = Math.round(Math.sin(bpos.x / 5) * 5) + 10;
        this.blocks[i] =
          bpos.y === terrainH ? GRASS : bpos.y < terrainH ? DIRT : AIR;
      }
    }
  }

  calculateIndex(lpos: Vector2): number {
    return lpos.x + lpos.y * CHUNK_LENGTH;
  }

  calculateGlobalPostion(lpos: Vector2): Vector2 {
    return this.pos.mul(new Vector2(CHUNK_LENGTH)).add(lpos);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let x = 0; x < CHUNK_LENGTH; x++) {
      for (let y = 0; y < CHUNK_LENGTH; y++) {
        const i = this.calculateIndex(new Vector2(x, y));
        const block = this.blocks[i];
        const texture = getBlockData(block)?.texture;
        if (!texture) {
          continue;
        }

        const { x: bx, y: by } = this.calculateGlobalPostion(new Vector2(x, y));

        const img = image(texture);

        ctx.drawImage(img, bx, -by + CHUNK_LENGTH, 1, 1);
      }
    }
  }
}
