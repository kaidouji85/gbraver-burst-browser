// @flow

import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer/armdozer";

/**
 * アームドーザを選択した
 */
export type SelectArmdozer = {
  type: 'SelectArmdozer',

  /** 選択したアームドーザID */
  armDozerId: ArmDozerId
};