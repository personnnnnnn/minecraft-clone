import { blockData } from "../block/block";
import { loadImageFromPath } from "./asset-manager";

const toAdd: string[] = [];

export function isImage(path: string): boolean {
  return path.match(/\.(png|jpe?g|webp|bmp|svg)$/) !== null;
}

export function addAsset(path: string): void {
  toAdd.push(path);
}

export async function prepareAssets(): Promise<void> {
  for (const [_, data] of Object.entries(blockData)) {
    if (data.texture) {
      addAsset(data.texture);
    }
  }

  for (const asset of toAdd) {
    if (isImage(asset)) {
      await loadImageFromPath(asset);
    }
  }
}
