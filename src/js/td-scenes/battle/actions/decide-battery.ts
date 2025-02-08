/** バッテリーボタン押下 */
export type DecideBattery = {
  type: "decideBattery";
  /** 選択したバッテリーの値 */
  battery: number;
  /** バッテリーボタン押下時のDOMイベント */
  event: Event;
};
