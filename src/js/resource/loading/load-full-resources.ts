import { CANVAS_IMAGE_CONFIGS } from "../canvas-image/configs";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture/configs";
import { GLTF_CONFIGS } from "../gltf/configs";
import { PreLoadPathConfigs } from "../path/configs";
import { ResourceRoot } from "../resource-root";
import { SOUND_CONFIGS } from "../sound/configs";
import { TEXTURE_CONFIGS } from "../texture/configs";
import { loadResources, ResourceLoading } from "./load-resources";

/**
 * フルリソースを読み込む
 * @param resourceRoot リソースルート
 * @returns リソース読み込みオブジェクト
 */
export function loadFullResources(resourceRoot: ResourceRoot): ResourceLoading {
  return loadResources({
    resourceRoot,
    preLoadImages: PreLoadPathConfigs,
    gltfConfigs: GLTF_CONFIGS,
    textureConfigs: TEXTURE_CONFIGS,
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
    canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
    soundConfigs: SOUND_CONFIGS,
  });
}
