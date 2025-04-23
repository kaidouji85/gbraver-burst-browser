import { PilotId } from "gbraver-burst-core";

/**
 * 追加読み込みするパイロットのIDを取得する
 * @param options オプション
 * @returns 追加読み込みするパイロットのID
 */
export const getAdditionalPilotIds = (options: {
  /** プレイヤーステートに存在するパイロットのID */
  playerPilotIds: PilotId[];
  /** リソース管理オブジェクトに存在するパイロットのID */
  resourcePilotIds: PilotId[];
}) => {
  const { playerPilotIds, resourcePilotIds } = options;
  return playerPilotIds.filter((id) => !resourcePilotIds.includes(id));
};
