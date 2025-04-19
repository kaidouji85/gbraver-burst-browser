import { Player } from "gbraver-burst-core";

import { CANVAS_IMAGE_CONFIGS } from "../canvas-image/configs";
import { CUBE_TEXTURE_CONFIGS } from "../cube-texture/configs";
import { GLTF_CONFIGS } from "../gltf/configs";
import { Resources } from "../index";
import { ResourceType } from "../resource-type";
import { SOUND_CONFIGS } from "../sound/configs";
import { TEXTURE_CONFIGS } from "../texture/configs";
import { loadResources, ResourceLoading } from "./load-resources";

/**
 * 指定したリソース管理オブジェクトのリソース種類を取得する
 * @param resources リソース管理オブジェクト
 * @returns 取得結果
 */
const getResourceTypes = (resources: Resources): ResourceType[] => {
  const { textures, gltfs, sounds, canvasImages, cubeTextures } = resources;
  return [...textures, ...gltfs, ...sounds, ...canvasImages, ...cubeTextures];
};

/**
 * 追加読み込みするアームドーザーのIDを取得する
 * @param options オプション
 * @param options.resourceTypes リソース種類
 * @param options.players バトルに参加するプレイヤーの情報
 * @returns 追加読み込みするアームドーザーのID
 */
const getAdditionalArmdozerIds = (options: {
  resourceTypes: ResourceType[];
  players: [Player, Player];
}) => {
  const { players, resourceTypes } = options;
  const playersArmdozerIds = [...new Set(players.map((p) => p.armdozer.id))];
  const resourceArmdozerIds = [
    ...new Set(
      resourceTypes
        .filter((t) => t.type === "DynamicArmdozer")
        .map((v) => v.armdozerId),
    ),
  ];
  return playersArmdozerIds.filter((id) => !resourceArmdozerIds.includes(id));
};

/**
 * 追加でバトルシーン関連のリソースを読み込む
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.players バトルに参加するプレイヤーの情報
 * @returns リソース読み込みオブジェクト
 */
export function loadAdditionalBattleSceneResources(options: {
  resources: Resources;
  players: [Player, Player];
}): ResourceLoading {
  const { players, resources } = options;
  const resourceTypes = getResourceTypes(resources);
  const additionalArmdozerIds = getAdditionalArmdozerIds({
    resourceTypes,
    players,
  });
  const shouldLoading = (t: ResourceType) =>
    t.type === "DynamicArmdozer" &&
    additionalArmdozerIds.includes(t.armdozerId);
  return loadResources({
    resourceRoot: resources.rootPath,
    preLoadImages: [],
    gltfConfigs: GLTF_CONFIGS.filter(shouldLoading),
    textureConfigs: TEXTURE_CONFIGS.filter(shouldLoading),
    cubeTextureConfigs: CUBE_TEXTURE_CONFIGS.filter(shouldLoading),
    canvasImageConfigs: CANVAS_IMAGE_CONFIGS.filter(shouldLoading),
    soundConfigs: SOUND_CONFIGS.filter(shouldLoading),
  });
}
