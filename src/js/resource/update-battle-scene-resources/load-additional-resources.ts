import { ArmdozerId, PilotId } from "gbraver-burst-core";

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
 * @returns 追加読み込みしたリソース
 */
export const loadAdditionalResources = (options: {
  /** リソース管理オブジェクト*/
  resources: Readonly<Resources>;
  /** 追加読み込みするアームドーザーのID */
  additionalArmdozerIds: Readonly<ArmdozerId[]>;
  /** 追加読み込みするパイロットのID */
  additionalPilotIds: Readonly<PilotId[]>;
}): Promise<Resources> => {
  const { resources, additionalArmdozerIds, additionalPilotIds } = options;
  const shouldLoad = (t: ResourceType) =>
    (t.type === "DynamicArmdozer" &&
      additionalArmdozerIds.includes(t.armdozerId)) ||
    (t.type === "DynamicPilot" && additionalPilotIds.includes(t.pilotId));
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
