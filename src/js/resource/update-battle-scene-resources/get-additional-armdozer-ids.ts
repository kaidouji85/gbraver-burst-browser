import { Player } from "gbraver-burst-core";

import { ResourceType } from "../resource-type";

/**
 * 追加読み込みするアームドーザーのIDを取得する
 * @param options オプション
 * @param options.resourceTypes リソース種類
 * @param options.players バトルに参加するプレイヤーの情報
 * @returns 追加読み込みするアームドーザーのID
 */
export const getAdditionalArmdozerIds = (options: {
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
