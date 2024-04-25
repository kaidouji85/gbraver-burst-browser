import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { Resources } from "../../../../resource";
import { ArmdozerPictureConfig } from "./armdozer-picture-config";
import { genesisBraver } from "./genesis-braver";
import { shinBraver } from "./shin-braver";

/**
 * アームドーザIDに応じた画像設定を生成する
 * @param resources リソース管理オブジェクト
 * @param armdozerId アームドーザID
 * @returns 生成結果
 */
export function createArmdozerPictureConfig(
  resources: Resources,
  armdozerId: ArmdozerId,
): ArmdozerPictureConfig {
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraver(resources);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraver(resources);
    default:
      return shinBraver(resources);
  }
}
