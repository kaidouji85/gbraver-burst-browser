import { Player } from "gbraver-burst-core";

import { Resources } from "../index";
import { mergeResources } from "../loading/merge-resources";
import { deleteUnusedResources } from "./delete-unused-resources";
import { getAdditionalArmdozerIds } from "./get-additional-armdozer-ids";
import { getAdditionalPilotIds } from "./get-additional-pilot-ids";
import { getDeletionArmdozerIds } from "./get-deletion-armdozer-ids";
import { getDeletionPilotIds } from "./get-deletion-pilot-ids";
import { getPlayerArmdozerIds } from "./get-player-armdozer-ids";
import { getPlayerPilotIds } from "./get-player-pilot-ids";
import { getResourceArmdozerIds } from "./get-resource-armdozer-ids";
import { getResourcePilotIds } from "./get-resource-pilot-ids";
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
  const playerPilotIds = getPlayerPilotIds(players);
  const resourceArmdozerIds = getResourceArmdozerIds(resourceTypes);
  const resourcePilotIds = getResourcePilotIds(resourceTypes);

  const deletionArmdozerIds = getDeletionArmdozerIds({
    playerArmdozerIds,
    resourceArmdozerIds,
  });
  const deletionPilotIds = getDeletionPilotIds({
    playerPilotIds,
    resourcePilotIds,
  });
  const resourcesAfterDeletion = deleteUnusedResources({
    resources,
    deletionArmdozerIds,
    deletionPilotIds,
  });

  const additionalArmdozerIds = getAdditionalArmdozerIds({
    playerArmdozerIds,
    resourceArmdozerIds,
  });
  const additionalPilotIds = getAdditionalPilotIds({
    playerPilotIds,
    resourcePilotIds,
  });
  const additionalResources = await loadAdditionalResources({
    resources,
    additionalArmdozerIds,
    additionalPilotIds,
  });

  return mergeResources({
    resources: resourcesAfterDeletion,
    loaded: additionalResources,
  });
}
