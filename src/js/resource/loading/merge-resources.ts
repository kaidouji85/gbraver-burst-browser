import { Resources } from "..";

/**
 * 読みこんだリソースをマージする
 * rootPath、pathsは一度生成されたら変更されない想定なので、本関数ではマージしない
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
    rootPath: resources.rootPath,
    paths: resources.paths,
    gltfs: [...resources.gltfs, ...loaded.gltfs],
    textures: [...resources.textures, ...loaded.textures],
    cubeTextures: [...resources.cubeTextures, ...loaded.cubeTextures],
    canvasImages: [...resources.canvasImages, ...loaded.canvasImages],
    sounds: [...resources.sounds, ...loaded.sounds],
  };
}
