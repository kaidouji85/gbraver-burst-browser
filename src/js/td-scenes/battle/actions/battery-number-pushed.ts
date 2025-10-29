/** バッテリーセレクタの数字が押された */
export type BatteryNumberPushed = {
  type: "batteryNumberPushed";
  /** 押した数字 */
  value: number;
};
