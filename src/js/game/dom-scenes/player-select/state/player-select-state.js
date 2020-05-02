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
  /** シーン表示、非表示フラグ、trueで表示する*/
  isVisible: boolean,

  /** アームドーザアイコン */
  armdozerIcons: ArmdozerIcon[]
};