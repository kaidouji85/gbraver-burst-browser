// @flow

import type {ArmDozerId} from "gbraver-burst-core";

/**
 * アームドーザを選択した
 */
export type SelectArmdozer = {
  type: 'SelectArmdozer',

  /** 選択したアームドーザID */
  armDozerId: ArmDozerId
};