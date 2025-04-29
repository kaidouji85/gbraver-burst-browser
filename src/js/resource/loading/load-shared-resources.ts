import { CANVAS_IMAGE_CONFIGS } from "../canvas-image/configs";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture/configs";
import { GLTF_CONFIGS } from "../gltf/configs";
import { ResourceRoot } from "../resource-root";
import { ResourceType } from "../resource-type";
import { SOUND_CONFIGS } from "../sound/configs";
import { TEXTURE_CONFIGS } from "../texture/configs";
import { loadResources, ResourceLoading } from "./load-resources";

/**
 * Sharedリソースを読み込む
 * @param options オプション
 * @param options.resourceRoot リソースルート
 * @returns リソース読み込みオブジェクト
 */
export function loadSharedResources(options: {
  resourceRoot: ResourceRoot;
}): ResourceLoading {
  const { resourceRoot } = options;
  const isShared = (c: ResourceType) => c.type === "Shared";
  return loadResources({
    resourceRoot,
    preLoadImages: [],
    gltfConfigs: GLTF_CONFIGS.filter(isShared),
    textureConfigs: TEXTURE_CONFIGS.filter(isShared),
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS.filter(isShared),
    canvasImageConfigs: CANVAS_IMAGE_CONFIGS.filter(isShared),
    soundConfigs: SOUND_CONFIGS.filter(isShared),
  });
}
