import { block, setBlockDisplayName, setBlockTexture } from "./block";

export const AIR = block("std:air");

export const GRASS = block("std:grass");
setBlockTexture(GRASS, "std/grass.png");
setBlockDisplayName(GRASS, "Grass");

export const DIRT = block("std:dirt");
setBlockTexture(DIRT, "std/dirt.png");
setBlockDisplayName(DIRT, "Dirt");
