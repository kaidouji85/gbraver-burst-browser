import { Player } from "gbraver-burst-core";

import { Resources } from "../index";
import { mergeResources } from "../loading/merge-resources";
import { deleteUnusedResources } from "./delete-unused-resources";
import { getAdditionalArmdozerIds } from "./get-additional-armdozer-ids";
import { getDeletionArmdozerIds } from "./get-deletion-armdozer-ids";
import { getPlayerArmdozerIds } from "./get-player-armdozer-ids";
import { getResourceArmdozerIds } from "./get-resource-armdozer-ids";
import { getResourceTypes } from "./get-resource-types";
import { loadAdditionalResources } from "./load-additional-resources";

/**
 * バトルシーンのためにリソースの追加読み込み、破棄を行う
 * @param options オプション
 * @param options.resources リソース管理オブジェクト
 * @param options.players バトルに参加するプレイヤーの情報
 * @returns リソース読み込みオブジェクト
 */
export async function updateBattleSceneResources(options: {
  resources: Readonly<Resources>;
  players: [Player, Player];
}): Promise<Resources> {
  const { players, resources } = options;
  const resourceTypes = getResourceTypes(resources);
  const playerArmdozerIds = getPlayerArmdozerIds(players);
  const resourceArmdozerIds = getResourceArmdozerIds(resourceTypes);

  const deletionArmdozerIds = getDeletionArmdozerIds({
    playerArmdozerIds,
    resourceArmdozerIds,
  });
  const resourcesAfterDeletion = deleteUnusedResources({
    resources,
    deletionArmdozerIds,
  });

  const additionalArmdozerIds = getAdditionalArmdozerIds({
    playerArmdozerIds,
    resourceArmdozerIds,
  });
  const additionalResources = await loadAdditionalResources({
    resources,
    additionalArmdozerIds,
  });

  return mergeResources({
    resources: resourcesAfterDeletion,
    loaded: additionalResources,
  });
}
