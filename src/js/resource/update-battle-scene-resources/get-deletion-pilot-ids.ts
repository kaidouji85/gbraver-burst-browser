import { PilotId } from "gbraver-burst-core";

/**
 * 削除するパイロットのIDを取得する
 * @param options オプション
 * @returns 削除するパイロットのID
 */
export const getDeletionPilotIds = (options: {
  /** プレイヤーステートに存在するプレイヤーのID */
  playerPilotIds: PilotId[];
  /** リソース管理オブジェクトに存在するプレイヤーのID */
  resourcePilotIds: PilotId[];
}) => {
  const { playerPilotIds, resourcePilotIds } = options;
  return resourcePilotIds.filter((id) => !playerPilotIds.includes(id));
};
