/** ミニコントローラーのバーストボタンが押された */
export type DoBurstByMiniController = {
  type: "doBurstByMiniController";
  /** バーストボタン押下時のDOMイベント */
  event: Event;
};
