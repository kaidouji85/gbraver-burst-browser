import { Resources } from ".";
import { ResourceRoot } from "./resource-root";

/**
 * 空のリソース管理オブジェクトを生成する
 * @param resourceRoot リソースルート
 * @return リソース管理オブジェクト
 */

export function emptyResources(resourceRoot: ResourceRoot): Resources {
  return {
    rootPath: resourceRoot,
    paths: [],
    gltfs: [],
    textures: [],
    cubeTextures: [],
    canvasImages: [],
    sounds: [],
  };
}
