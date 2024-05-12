import { Resources } from "..";

/**
 * 読みこんだリソースをマージする
 * @param resources マージ前のリソース
 * @param loaded 読みこまれたリソース
 * @returns マージ結果
 */
export async function mergeResources(
  resources: Resources,
  loaded: Resources,
): Promise<Resources> {
  return {
    ...resources,
    gltfs: [...resources.gltfs, ...loaded.gltfs],
    textures: [...resources.textures, ...loaded.textures],
    cubeTextures: [...resources.cubeTextures, ...loaded.cubeTextures],
    canvasImages: [...resources.canvasImages, ...loaded.canvasImages],
    sounds: [...resources.sounds, ...loaded.sounds],
  };
}
