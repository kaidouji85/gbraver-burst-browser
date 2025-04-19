import { Resources } from "..";

/**
 * 読みこんだリソースをマージする
 * @params options マージオプション
 * @param options.resources マージ前のリソース
 * @param options.loaded 読みこまれたリソース
 * @returns マージ結果
 */
export function mergeResources(options: {
  resources: Resources;
  loaded: Resources;
}): Resources {
  const { resources, loaded } = options;
  return {
    ...resources,
    gltfs: [...resources.gltfs, ...loaded.gltfs],
    textures: [...resources.textures, ...loaded.textures],
    cubeTextures: [...resources.cubeTextures, ...loaded.cubeTextures],
    canvasImages: [...resources.canvasImages, ...loaded.canvasImages],
    sounds: [...resources.sounds, ...loaded.sounds],
  };
}
