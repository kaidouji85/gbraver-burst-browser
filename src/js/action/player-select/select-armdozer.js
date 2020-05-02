// @flow

import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";

/**
 * アームドーザ選択
 */
export type SelectArmdozer = {
  type: 'SelectArmdozer',

  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId
};