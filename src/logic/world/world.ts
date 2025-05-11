import { CHUNK_LENGTH } from "../../constants";
import { Bounds, chunkify } from "../../manager";
import Vector2 from "../../util/vector2";
import { Chunk } from "../chunk/chunk";

export class World {
  chunks: { [key: string]: Chunk | undefined } = {};

  calcIndex({ x, y }: Vector2): string {
    return `${x};${y}`;
  }

  loadChunksInBounds(bounds: Bounds): void {
    const { left, right, top, bottom } = chunkify(bounds);

    for (let x = left; x <= right; x++) {
      for (let y = bottom; y <= top; y++) {
        const pos = new Vector2(x, y);
        const idx = this.calcIndex(pos);
        if (!(idx in this.chunks)) {
          this.chunks[idx] = new Chunk(pos);
        }
      }
    }
  }

  getChunkAt(pos: Vector2): Chunk | undefined {
    return this.chunks?.[this.calcIndex(pos)];
  }
}
