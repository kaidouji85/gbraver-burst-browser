import { PlayerState } from "gbraver-burst-core";

/** 最低限出すべきバッテリーが存在する */
type Exist = {
  isExist: true;
  /** バッテリー値 */
  value: number;
};

/** 最低限出すべきバッテリーが存在しない */
type NotExist = {
  isExist: false;
};

/** 結果 */
type Result = Exist | NotExist;

/**
 * 最低限出すべきバッテリーを計算する
 * @param defender 防御側のステータス
 * @returns 計算結果
 */
export const getOptimalDefenseBattery = (defender: PlayerState): Result => {
  const value =
    defender.armdozer.battery +
    defender.armdozer.batteryAutoRecovery -
    defender.armdozer.maxBattery;
  return 0 < value ? { isExist: true, value } : { isExist: false };
};
