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

/**
 * アームドーザを選択した
 */
export type SelectArmdozer = {
  type: 'SelectArmdozer',

  /** 選択したアームドーザID */
  armDozerId: ArmDozerId
};