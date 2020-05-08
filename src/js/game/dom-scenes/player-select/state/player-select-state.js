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
  // TODO 削除する
  /** シーン表示、非表示フラグ、trueで表示する*/
  isVisible: boolean,

  // TODO 削除する
  /** アームドーザアイコン */
  armdozerIcons: ArmdozerIcon[]
};