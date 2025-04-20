import { ArmdozerId } from "gbraver-burst-core";

import { CANVAS_IMAGE_CONFIGS } from "../canvas-image/configs";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture/configs";
import { GLTF_CONFIGS } from "../gltf/configs";
import { Resources } from "../index";
import { loadResources } from "../loading/load-resources";
import { ResourceType } from "../resource-type";
import { SOUND_CONFIGS } from "../sound/configs";
import { TEXTURE_CONFIGS } from "../texture/configs";

/**
 * リソースを追加読み込みする
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.additionalArmdozerIds 追加読み込みするアームドーザーのID
 * @returns 追加読み込みしたリソース
 */
export const loadAdditionalResources = (options: {
  resources: Readonly<Resources>;
  additionalArmdozerIds: Readonly<ArmdozerId[]>;
}): Promise<Resources> => {
  const { resources, additionalArmdozerIds } = options;
  const shouldLoad = (t: ResourceType) =>
    t.type === "DynamicArmdozer" &&
    additionalArmdozerIds.includes(t.armdozerId);
  const additionalLoading = loadResources({
    resourceRoot: resources.rootPath,
    preLoadImages: [],
    gltfConfigs: GLTF_CONFIGS.filter(shouldLoad),
    textureConfigs: TEXTURE_CONFIGS.filter(shouldLoad),
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS.filter(shouldLoad),
    canvasImageConfigs: CANVAS_IMAGE_CONFIGS.filter(shouldLoad),
    soundConfigs: SOUND_CONFIGS.filter(shouldLoad),
  });
  return additionalLoading.resources;
};
