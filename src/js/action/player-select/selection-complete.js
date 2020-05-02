// @flow

import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";

/**
 * 選択完了
 */
export type SelectionComplete = {
  type: 'SelectionComplete',

  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId
};