/** ミニコントローラーのバッテリーボタンが押された */
export type DecideBatteryByMiniController = {
  type: "decideBatteryByMiniController";
  /** 選択したバッテリーの値 */
  battery: number;
  /** バッテリーボタン押下時のDOMイベント */
  event: Event;
};
