import { ArmdozerId } from "gbraver-burst-core";

/**
 * 追加読み込みするアームドーザーのIDを取得する
 * @param options オプション
 * @param options.playerArmdozerIds プレイヤーステートに存在するアームドーザのID
 * @param options.resourceArmdozerIds リソース管理オブジェクトに存在するアームドーザのID
 * @returns 追加読み込みするアームドーザーのID
 */
export const getAdditionalArmdozerIds = (options: {
  playerArmdozerIds: ArmdozerId[];
  resourceArmdozerIds: ArmdozerId[];
}) => {
  const { playerArmdozerIds, resourceArmdozerIds } = options;
  return playerArmdozerIds.filter((id) => !resourceArmdozerIds.includes(id));
};
