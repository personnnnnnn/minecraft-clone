import loadImage from "../../util/image-loader";

const imageAssets: { [key: string]: HTMLImageElement } = {};

export async function loadImageFromPath(
  path: string
): Promise<HTMLImageElement> {
  imageAssets[path] = await loadImage(`./assets/textures/${path}`);
  return imageAssets[path];
}

export function image(path: string): HTMLImageElement {
  return imageAssets[path];
}
