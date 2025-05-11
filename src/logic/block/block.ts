let ids: { [key: string]: number } = {};
let topId: number = 0;

export function block(blockName: string): number {
  if (!blockName.includes(":")) {
    blockName = `std:${blockName}`;
  }
  if (blockName in ids) {
    return ids[blockName];
  }
  blockData[topId] = { name: blockName };
  ids[blockName] = topId;
  return topId++;
}

export type BlockData = {
  texture?: string;
  name: string;
  displayName?: string;
};

export const blockData: { [key: number]: BlockData } = {};

export function getBlockData(id: number): BlockData {
  return blockData[id];
}

export function setBlockTexture(id: number, texture: string): void {
  getBlockData(id).texture = texture;
}

export function setBlockDisplayName(id: number, displayName: string): void {
  getBlockData(id).displayName = displayName;
}
