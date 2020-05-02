// @flow

import type {ArmDozerId} from "gbraver-burst-core";

/**
 * 選択完了
 */
export type SelectionComplete = {
  type: 'SelectionComplete',

  /** 選択したアームドーザのID */
  armdozerId: ArmDozerId
};