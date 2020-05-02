// @flow

import type {ArmDozerId} from "gbraver-burst-core";

/**
 * アームドーザ アイコン
 */
export type ArmdozerIcon = {
  image: string,
  armdozerId: ArmDozerId
};

/**
 * プレイヤーセレクト ステート
 */
export type PlayerSelectState = {
  /** アームドーザアイコン */
  armdozerIcons: ArmdozerIcon[]
};