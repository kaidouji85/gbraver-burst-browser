import { Player } from "gbraver-burst-core";

import { CANVAS_IMAGE_CONFIGS } from "../canvas-image/configs";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture/configs";
import { GLTF_CONFIGS } from "../gltf/configs";
import { Resources } from "../index";
import { loadResources } from "../loading/load-resources";
import { mergeResources } from "../loading/merge-resources";
import { ResourceType } from "../resource-type";
import { SOUND_CONFIGS } from "../sound/configs";
import { TEXTURE_CONFIGS } from "../texture/configs";
import { getAdditionalArmdozerIds } from "./get-additional-armdozer-ids";
import { getResourceTypes } from "./get-resource-types";

/**
 * バトルシーンのためにリソースの追加読み込み、破棄を行う
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.players バトルに参加するプレイヤーの情報
 * @returns リソース読み込みオブジェクト
 */
export async function updateBattleSceneResources(options: {
  resources: Resources;
  players: [Player, Player];
}): Promise<Resources> {
  const { players, resources } = options;
  const resourceTypes = getResourceTypes(resources);
  const additionalArmdozerIds = getAdditionalArmdozerIds({
    resourceTypes,
    players,
  });
  const shouldLoading = (t: ResourceType) =>
    t.type === "DynamicArmdozer" &&
    additionalArmdozerIds.includes(t.armdozerId);
  const additionalLoading = loadResources({
    resourceRoot: resources.rootPath,
    preLoadImages: [],
    gltfConfigs: GLTF_CONFIGS.filter(shouldLoading),
    textureConfigs: TEXTURE_CONFIGS.filter(shouldLoading),
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS.filter(shouldLoading),
    canvasImageConfigs: CANVAS_IMAGE_CONFIGS.filter(shouldLoading),
    soundConfigs: SOUND_CONFIGS.filter(shouldLoading),
  });
  const loaded = await additionalLoading.resources;
  return mergeResources({ resources, loaded });
}
