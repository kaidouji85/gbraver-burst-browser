// @flow

import type {Pilot} from "gbraver-burst-core";

// TODO gbraver-burst-coreを共有する
/**
 * 空のパイロット
 */
export const EMPTY_PILOT: Pilot = {
  id: 'EmptyPilot',
  name: 'ななし',
  skill: {
    type: 'RecoverBatterySkill',
    recoverBattery: 2
  }
};