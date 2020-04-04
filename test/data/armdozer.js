// @flow

import type {Armdozer} from "gbraver-burst-core/lib/player/armdozer/armdozer";

// TODO gbraver-burst-coreと共有する
/**
 * 空のアームドーザ
 */
export const EMPTY_ARMDOZER: Armdozer = {
  id: '',
  name: '',
  maxHp: 3000,
  maxBattery: 5,
  power: 2000,
  speed: 2000,
  appearance: '',
  burst: {
    type: 'RecoverBattery',
    recoverBattery: 3,
  },
};