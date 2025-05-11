import { GameManager } from "./manager";
import { prepareAssets } from "./logic/asset-manager/prepare-assets";

import "./style.scss";
import "./logic/block/included-blocks";

document.addEventListener("DOMContentLoaded", async () => {
  await prepareAssets();

  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  new GameManager(canvas);
});
