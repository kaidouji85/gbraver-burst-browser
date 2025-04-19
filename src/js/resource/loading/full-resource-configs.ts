import { CANVAS_IMAGE_CONFIGS } from "../canvas-image";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture";
import { GLTF_CONFIGS } from "../gltf/configs";
import { SOUND_CONFIGS } from "../sound/configs";
import {
  DEVELOPING_TEXTURE_CONFIGS,
  TEXTURE_CONFIGS,
} from "../texture/configs";
import { LoadingTargetConfigs } from "./resource-loading";

/** フルリソースの設定 */
export const FULL_RESOURCE_CONFIGS: LoadingTargetConfigs = {
  gltfConfigs: GLTF_CONFIGS,
  textureConfigs: TEXTURE_CONFIGS,
  cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
  canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
  soundConfigs: SOUND_CONFIGS,
};

/** 開発中素材も含めたフルリソース設定 */
export const DEVELOPING_FULL_RESOURCE_CONFIGS: LoadingTargetConfigs = {
  gltfConfigs: GLTF_CONFIGS,
  textureConfigs: [...TEXTURE_CONFIGS, ...DEVELOPING_TEXTURE_CONFIGS],
  cubeTextureConfigs: CUBE_TEXTURE_CONFIGS,
  canvasImageConfigs: CANVAS_IMAGE_CONFIGS,
  soundConfigs: SOUND_CONFIGS,
};
