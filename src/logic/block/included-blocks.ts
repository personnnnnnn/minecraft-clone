import { block, setBlockDisplayName, setBlockTexture } from "./block";

export const GRASS = block("std:grass");
setBlockTexture(GRASS, "textures/grass.png");
setBlockDisplayName(GRASS, "Grass");

export const DIRT = block("std:dirt");
setBlockTexture(DIRT, "textures/dirt.png");
setBlockDisplayName(DIRT, "Dirt");
